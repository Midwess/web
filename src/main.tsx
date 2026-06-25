/**
 * App entry — used by both `vite` (CSR dev) and `vite-react-ssg build` (SSG).
 *
 * `ViteReactSSG` returns a `createRoot` function:
 *  - In dev (CSR), it mounts the SPA into `#root`.
 *  - At build, it pre-renders every route from `routes.tsx` to a real
 *    `.html` file under `dist/`, so crawlers see content without JS.
 *
 * The library wraps the app tree with `HelmetProvider` for us, so the
 * `<Helmet>` tags from each page land in the SSG output's `<head>`.
 */
import { ViteReactSSG } from "vite-react-ssg";

import { routes } from "@/routes";
import "./index.css";

export const createRoot = ViteReactSSG({ routes });
