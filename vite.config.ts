import { readFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeShiki from "@shikijs/rehype";
import { worldantVite } from "@midwess/worldant/react/vite";
import path from "node:path";
import { rehypeToc } from "./src/lib/docs/rehype-toc";
import { recmaExportToc } from "./src/lib/docs/recma-toc";

const WORLDANT_COMPILER_PATH = "worldant-browser/world_browser.js";
const WORLDANT_COMPILER_URL = `/${WORLDANT_COMPILER_PATH}`;
const worldantReactEntry = fileURLToPath(
  import.meta.resolve("@midwess/worldant/react"),
);
const worldantCompilerModule = readFileSync(
  path.join(
    path.dirname(worldantReactEntry),
    "worldant-browser/world_browser.js",
  ),
  "utf8",
);
const worldantClassicCompiler = worldantCompilerModule
  .replace("export function start()", "function start()")
  .replace(
    "new URL('world_browser_bg.wasm', import.meta.url)",
    "new URL('world_browser_bg.wasm', self.location.href)",
  )
  .replace(
    "export { initSync, __wbg_init as default };",
    "self.wasm_bindgen = Object.assign(__wbg_init, { initSync, start });",
  );

if (!worldantClassicCompiler.includes("self.wasm_bindgen =")) {
  throw new Error(
    "The packaged Worldant compiler glue no longer matches its classic-worker adapter.",
  );
}

const serveWorldantClassicCompiler = (
  request: IncomingMessage,
  response: ServerResponse,
  next: () => void,
) => {
  const pathname = new URL(request.url ?? "/", "http://worldant.local")
    .pathname;
  if (pathname !== WORLDANT_COMPILER_URL) return next();
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/javascript");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  response.end(worldantClassicCompiler);
};

const worldantClassicCompilerDev = (): Plugin => ({
  name: "worldant-classic-compiler-dev",
  apply: "serve",
  enforce: "pre",
  configureServer(server) {
    server.middlewares.use(serveWorldantClassicCompiler);
  },
  configurePreviewServer(server) {
    server.middlewares.use(serveWorldantClassicCompiler);
  },
});

const worldantClassicCompilerBuild = (): Plugin => ({
  name: "worldant-classic-compiler-build",
  apply: "build",
  enforce: "post",
  generateBundle(_options, bundle) {
    const compiler = bundle[WORLDANT_COMPILER_PATH];
    if (!compiler || compiler.type !== "asset") {
      this.error("The Worldant Vite plugin did not emit its browser compiler.");
    }
    compiler.source = worldantClassicCompiler;
  },
});

/**
 * Strip shiki's baked-in `background-color` from the `<pre>`. fumadocs'
 * CodeBlock renders the whole block (chrome + body) on `bg-fd-card` with
 * `keepBackground=false`; if shiki keeps its theme background, that color
 * leaks onto the block and the header/body end up different colors. Removing
 * it lets the block use a single `fd-card` surface.
 */
const removeShikiBg = {
  name: "remove-shiki-bg",
  pre(node: { properties?: Record<string, unknown> }) {
    const style = node.properties?.style;
    if (typeof style === "string") {
      node.properties!.style = style
        .replace(/background-color:[^;]*;?/g, "")
        .trim();
    }
  },
};

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-origin",
    },
    hmr: {
      overlay: false,
    },
  },
  preview: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-origin",
    },
  },
  plugins: [
    worldantClassicCompilerDev(),
    worldantVite(),
    worldantClassicCompilerBuild(),
    tailwindcss(),
    {
      enforce: "pre" as const,
      ...mdx({
        remarkPlugins: [
          remarkGfm,
          [remarkFrontmatter, "yaml"],
          // exports `export const frontmatter = {…}` from the YAML block
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        rehypePlugins: [
          rehypeToc,
          [
            rehypeShiki,
            { theme: "github-dark", transformers: [removeShikiBg] },
          ],
        ],
        // exports `export const toc = [...]` from rehypeToc's vfile data
        recmaPlugins: [recmaExportToc],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react(),
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@midwess/schema": path.resolve(
        __dirname,
        "../libs/schema/typescript/dist/bundle.esm.js",
      ),
    },
  },
  optimizeDeps: {
    exclude: ["@mdx-js/react"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ["unb/node"],
    },
  },
  // `ssgOptions` is read by `vite-react-ssg` and isn't part of Vite's
  // own config schema — cast through `unknown` so tsc doesn't complain.
  ...({
    ssgOptions: {
      // Emit `dist/<route>/index.html` instead of `dist/<route>.html`. Sitemap
      // + canonical URLs use trailing slashes, which line up with static
      // hosts and Google canonicalisation.
      dirStyle: "nested",
      // Pretty-print the HTML so it's diff-friendly in PRs. Requires the
      // `prettier` package to be installed.
      formatting: "prettify",
    },
  } as unknown as Record<string, unknown>),
}));
