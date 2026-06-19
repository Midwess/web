import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeShiki from "@shikijs/rehype";
import path from "node:path";
import { rehypeToc } from "./src/lib/docs/rehype-toc";
import { recmaExportToc } from "./src/lib/docs/recma-toc";

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
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    tailwindcss(),
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [
          remarkGfm,
          [remarkFrontmatter, "yaml"],
          // exports `export const frontmatter = {…}` from the YAML block
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        rehypePlugins: [
          rehypeToc,
          [rehypeShiki, { theme: "github-dark", transformers: [removeShikiBg] }],
        ],
        // exports `export const toc = [...]` from rehypeToc's vfile data
        recmaPlugins: [recmaExportToc],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@midwess/schema": path.resolve(__dirname, "../libs/schema/typescript/dist/bundle.esm.js"),
    },
  },
  optimizeDeps: {
    exclude: ["@mdx-js/react"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
