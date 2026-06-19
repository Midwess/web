import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeShiki from "@shikijs/rehype";
import path from "node:path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    mdx({
      remarkPlugins: [remarkGfm, [remarkFrontmatter, "yaml"]],
      rehypePlugins: [rehypeShiki],
      providerImportSource: "@mdx-js/react",
    }),
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
