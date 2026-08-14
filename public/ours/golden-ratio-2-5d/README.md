# Midwess golden-ratio 2.5D drafts

These are isolated alternatives to the live faithful signal. Nothing in the application references this folder.

## Original 2.5D edition

The front face retains the approved geometry:

- Terminal radius `r = 44`
- Heights `188 / 304.190 / 492.190`, or `1 : φ : φ²`
- Existing golden-derived spacing and tilt

The dimensional system also derives from `r` and `φ`:

- Horizontal extrusion: `dx = r / φ² = 16.8065`
- Vertical extrusion: `dy = r / φ = 27.1935`
- Therefore `dy / dx = φ`
- And `dx + dy = r`
- Thirteen vector slices form the extrusion
- Face-gradient transitions sit at `0 / 0.382 / 0.618 / 1`

## Circular-boundary edition

`mark-circle-boundary.svg` adds restrained curvature without changing the five-bar rhythm or the existing 2.5D system:

- Terminal radius remains `r = 44`
- Centerline source radii are `rφ⁵ / rφ⁶ / rφ⁷`
- The three radii are `487.967 / 789.548 / 1277.515`
- Therefore `R₃ / R₂ = R₂ / R₁ = φ`
- Each visible front-face side is a true concentric-circle arc at `R − r` or `R + r`
- Every terminal remains a radius-`r` circle
- The center uses two tangent, opposing `rφ⁵` arcs to preserve optical symmetry
- No Bézier curves are used

The larger source circles deliberately keep the bend quiet, so the result still reads as the faithful signal rather than a ball or parenthesis icon.

Files for the stricter edition:

- `mark-circle-boundary.svg`
- `lockup-circle-boundary-dark.svg`
- `lockup-circle-boundary-light.svg`
- `app-icon-circle-boundary.svg`
- `construction-circle-boundary.svg`
- `circle-boundary-options.svg`

Open `preview.html` through the local dev server to compare the original and circular-boundary editions.
