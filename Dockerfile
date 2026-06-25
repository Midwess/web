# syntax=docker/dockerfile:1.7
# Multi-stage build for the Vite SPA. Stage 1 builds the dist/, stage 2
# serves it with nginx.

# ---- Stage 1: build ----
FROM node:22-alpine AS build

# pnpm via corepack (no global install)
RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Cache layer 1: copy lockfile first and install deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Cache layer 2: copy source and build
COPY index.html ./
COPY public ./public
COPY src ./src
COPY scripts ./scripts
COPY tsconfig*.json vite.config.ts eslint.config.js vitest.config.ts ./
COPY components.json ./

# pnpm build runs vite build (via the npm script "build" → "vite build")
RUN pnpm run build

# ---- Stage 2: serve ----
FROM nginx:1.27-alpine AS serve

# Static asset path inside the image
COPY --from=build /app/dist /usr/share/nginx/html

# SPA fallback: any unknown path → index.html so client-side routing works.
# The docs routes (/pgpaw, /worldant, /pglite-rs, etc.) are SPA routes that
# need to be served by index.html on first load.
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 8080 default_server;
    server_name _;
    # Behind Railway's HTTPS edge proxy, nginx only sees plain HTTP on 8080.
    # absolute_redirect off makes Location relative to the request URL,
    # preserving the original https:// scheme the client used.
    absolute_redirect off;
    port_in_redirect off;
    root /usr/share/nginx/html;
    index index.html;

    # Cache hashed asset bundles aggressively
    location ~* \.(?:css|js|woff2?|ttf|otf|eot|ico|svg|png|jpe?g|webp|avif|gif|map)$ {
        try_files $uri =404;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
        expires 1y;
    }

    # Long max-age for assets under /assets/ (Vite's hashed bundle path)
    location /assets/ {
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Hashed pet / illustration images
    location ~* \.(webp|png|jpg|jpeg)$ {
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # HTML — short cache, must revalidate
    location ~* \.html$ {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    # SPA fallback: any other path is a client-side route
    # $uri/index.html (not $uri/) avoids nginx's directory-detection redirect
    # that would 301 /worldant -> /worldant/. merge_slashes on (default) lets
    # the trailing-slash variant still resolve to the same index.html.
    location / {
        try_files $uri $uri/index.html /index.html;
    }

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
EOF

EXPOSE 8080

# nginx already runs in the foreground as its entrypoint
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
