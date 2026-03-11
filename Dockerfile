# syntax=docker/dockerfile:1
# Build from project root: docker build -f Dockerfile -t web:latest .

FROM --platform=linux/amd64 midwess/deno:builder2.5.2 AS builder
WORKDIR /app
COPY . .

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG AWS_S3_BUCKET_NAME
ARG S3_CDN_PREFIX
ARG VERSION
ARG RAILWAY_GIT_COMMIT_SHA
ARG AWS_ENDPOINT_URL

ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_REGION=${AWS_REGION}
ENV AWS_S3_BUCKET_NAME=${AWS_S3_BUCKET_NAME}
ENV S3_CDN_PREFIX=${S3_CDN_PREFIX}
ENV VERSION=${RAILWAY_GIT_COMMIT_SHA}
ENV RAILWAY_GIT_COMMIT_SHA=${RAILWAY_GIT_COMMIT_SHA}
ENV AWS_ENDPOINT_URL=${AWS_ENDPOINT_URL}

ENV NODE_ENV=production
ENV CI=true

RUN pnpm install --frozen-lockfile

RUN pnpm next build

FROM --platform=linux/amd64 midwess/deno:runner2.5.2 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copy package.json and lock file
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Copy built Next.js standalone output
COPY --from=builder /app/.next/standalone ./
# Copy static files separately
COPY --from=builder /app/.next/static ./.next/static

# Copy node_modules (needed for instrumentation if running locally)
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["deno", "task", "deno-next", "start"]
