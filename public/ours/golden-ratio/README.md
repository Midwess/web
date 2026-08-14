# Midwess golden-ratio baselines

This folder contains two preview-only directions. No application references point to these assets.

Both start from the current five-beat Midwess waveform and retain the sampled brand colors:

- Orange: `#ff8a3d`
- Midnight: `#141420`
- Depth layer: `#9b2d14`

## Baseline A — faithful golden signal

This is the recommended starting point because it preserves the current identity:

- Five separate round-ended bars
- Symmetrical inward tilt
- Heights of `188`, `304.190`, and `492.190`, giving `1 : φ : φ²`
- Terminal radius `44`
- Inner gap `44/φ`; outer gap `44`

Files: `mark.svg`, `construction.svg`, `lockup-dark.svg`, `lockup-light.svg`, and `app-icon.svg`.

## Baseline B — golden feather grid

This is the more advanced exploration. It retains the five positions and golden height progression while changing the edge language:

- Five tapered feathers instead of capsules
- Each feather is the intersection of two equal-radius circles
- Ten construction circles in total
- Tips are exact circle intersections
- No freehand Bézier contours

Files: `advanced-mark.svg`, `advanced-construction.svg`, `advanced-lockup-dark.svg`, and `advanced-app-icon.svg`.

Open `preview.html` through the local dev server for a direct comparison.
