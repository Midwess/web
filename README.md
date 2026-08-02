# Midwess website

This repository builds the Midwess marketing site, project documentation, and
the Orbit UI catalog published under `/ui/`.

The Worldant documentation is actively in progress. It is sourced from the
pinned public Worldant submodule and currently describes the target runtime
architecture rather than a stable product surface.

## Getting started

Initialize both public submodules before installing dependencies:

```bash
git submodule update --init --recursive
pnpm install
npm ci --prefix vendor/orbit-ui
```

Run the main website during development:

```bash
pnpm dev
```

Build and preview the complete production output, including Orbit UI:

```bash
pnpm build
pnpm preview
```

Open `http://localhost:4173/ui/` for Orbit UI. Component and block deep links,
such as `/ui/components/select` and `/ui/blocks/work-os`, are served by the
nginx `/ui/` fallback in production.

The Docker build does not require the parent checkout's `.git` directory. It
fetches the pinned public Worldant and Orbit UI revisions itself, which keeps
remote builders reproducible even when their source context omits Git metadata.
