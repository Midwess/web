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
npm ci --prefix vendor/design-language
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

`main` keeps Worldant and the Orbit design language as pinned submodules. Every
push to `main` runs `materialize-production.yml`, checks out all submodules
recursively, converts them to regular files, and force-updates the generated
`deploy-production` branch. Railway builds from that branch, so Docker receives
a self-contained source tree and never needs GitHub credentials or network
access to fetch dependencies from source repositories.
