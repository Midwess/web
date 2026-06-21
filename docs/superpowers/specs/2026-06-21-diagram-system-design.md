# Midwess docs diagram system — design

**Date:** 2026-06-21
**Status:** approved (exemplar-first rollout)

## Problem

Docs diagrams were hand-authored inline SVG: ~83 diagrams across 30 MDX files, each
repeating gradient/shadow/marker boilerplate with hardcoded colors and `fontSize`
8.5–11. Under the docs' `forcedTheme:"dark"` this produced 226 effectively-invisible
text elements and an inconsistent, too-small, hard-to-maintain result. Fixing colors
per-diagram is whack-a-mole.

## Decision

Replace per-diagram inline SVG with a small **component library** + **semantic token
palette**, rendered as SVG (keeps flows/branches/arrows). Claude.ai-style warm dark
palette. Hard text-size floor. Tokens applied to **diagrams only** (fumadocs page
chrome unchanged).

## Token palette (`.mw-diagram` scoped CSS vars, dark-only)

```
--dg-bg     #1F1D1B   diagram panel
--dg-card   #2A2724   node fill (top)      --dg-card-2 #322E2A (node fill bottom)
--dg-border #3D3935
--dg-text   #ECEAE3   (12:1 on card)       --dg-muted  #A8A29A (6:1)
--dg-accent #D97757   clay (primary)       --dg-success #7BA87B
--dg-warn   #D9A24E                        --dg-error  #C77B6B   --dg-info #8AA6C9
```

One **unified semantic** palette (clay accent + success/warn/error/info). Color encodes
state/role, not project identity. Every token is ≥4.5:1 on `--dg-card`.

## Components (`src/components/docs/diagram/`, registered in `mdxComponents`)

Coordinate-based SVG primitives (no auto-layout). Each `<Diagram>` gets a unique id
(`useId`) for its markers/filter via context — no cross-diagram id collisions.

- `<Diagram width height title label>` — `<figure class="mw-diagram">` + `<svg>`,
  shared `<defs>` (per-kind arrow markers, soft shadow, card gradient), rounded warm panel.
- `<DNode x y w h kind title sub mono badge>` — card: gradient fill + left accent bar
  (kind color) + shadow; title 15/700, sub 12.5/400 muted (string | string[] lines);
  optional numbered badge.
- `<DLane x y w h label kind>` — dashed region container + label.
- `<DEdge x1 y1 x2 y2 kind dashed label>` — connector + kind arrowhead + optional label.
- `<DBadge cx cy n kind>` — numbered step circle.
- `<DLabel x y variant kind anchor>` — text: variant title(16) / body(13) / caption(12) /
  section(11 caps).

`kind` ∈ default | accent | success | warn | error | info | muted.

## Text scale (floor 12px)

title 16/700 · node-title 15/700 · body 13/500 · caption 12/400 · section 11/700 caps ·
badge 13/700. (was 8.5–11.)

## Rollout

1. Build tokens + components, wire into `mdxComponents` (`ProjectDocs.tsx`).
2. Convert `pglite/how-it-works` (6 diagrams) by hand → exemplar.
3. User approves the look via `pnpm dev`.
4. Workflow converts the other ~77 diagrams; analyzer-gate 0 severe + build green.

## Verification

Deterministic WCAG analyzer (`/tmp/diagram-contrast-audit.mjs`): every token is AA on the
card, so component-built diagrams pass by construction. Plus MDX compile + `vite build`.
