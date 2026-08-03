# Midwess website

This repository builds the Midwess marketing site, project documentation, and
the Orbit UI catalog published under `/ui/`.

The Worldant documentation is actively in progress. It is sourced from the
pinned public Worldant submodule and currently describes the target runtime
architecture rather than a stable product surface.

Reusable interface primitives and the `/ui/*` documentation shell belong
exclusively to the Orbit design-language repository mounted at `ui/`. The web
SSG renders Orbit's exported `UnifiedSession` directly, so there is no iframe,
second client-only UI application, duplicated `src/components/ui`
implementation, or local shadcn registry configuration. The
`src/components/landing` directory contains only website-specific composition.

## Getting started

Initialize both public submodules before installing dependencies:

```bash
git submodule update --init --recursive
pnpm install
npm ci --prefix ui
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
such as `/ui/components/select` and `/ui/blocks/work-os`, are pre-rendered as
dedicated pages by the same `vite-react-ssg` build as the main website.

`main` keeps Worldant and the Orbit design language as pinned submodules. The
design-language repository is mounted directly at `ui/`, matching its public
`/ui/*` route. Every
push to `main` runs `materialize-production.yml`, checks out all submodules
recursively, converts them to regular files, and force-updates the generated
`deploy-production` branch. Railway builds from that branch, so Docker receives
a self-contained source tree and never needs GitHub credentials or network
access to fetch dependencies from source repositories.
