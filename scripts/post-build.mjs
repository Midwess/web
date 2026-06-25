#!/usr/bin/env node
/**
 * Post-build step for `vite-react-ssg`.
 *
 * Walks `dist/`, finds every `index.html`, extracts the canonical URL +
 * lastmod (from the file's mtime), and writes:
 *   - dist/sitemap.xml
 *   - dist/robots.txt
 *
 * Run automatically via the npm `build` script after SSG finishes.
 */
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const SITE = "https://midwess.ai";
const DIST = new URL("../dist/", import.meta.url).pathname;

/** Recursively find every pre-rendered `.html` file under `dir`. */
async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.isFile() && e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

/**
 * Convert `dist/worldant/installation.html` → `/worldant/installation/`.
 * Handles both `path.html` (vite-react-ssg default) and `path/index.html`
 * (when a host is configured for trailing-slash folders).
 */
const toPath = (file) => {
  const rel = relative(DIST, file).split(sep).join("/");
  const noIndex = rel.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  if (noIndex === "" || noIndex === ".") return "/";
  return `/${noIndex}/`;
};

/** Extract <link rel="canonical" href="..."> from a built HTML file. */
async function readCanonical(file) {
  const html = await readFile(file, "utf8");
  const m = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
  );
  return m?.[1];
}

/** W3C datetime format (UTC) for <lastmod>. */
const isoDate = (d) => d.toISOString().slice(0, 10);

async function main() {
  const files = await walk(DIST);
  if (files.length === 0) {
    console.warn("[post-build] no .html files under dist/ — skipping sitemap.");
    return;
  }

  const urls = [];
  for (const f of files) {
    const path = toPath(f);
    const canonical = (await readCanonical(f)) ?? `${SITE}${path}`;
    const mtime = (await stat(f)).mtime;
    urls.push({ loc: canonical, lastmod: isoDate(mtime) });
  }

  // Stable order: alphabetical by path. Stable so diffs are clean.
  urls.sort((a, b) => a.loc.localeCompare(b.loc));

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        ({ loc, lastmod }) =>
          `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;

  const robots =
    `User-agent: *\n` +
    `Allow: /\n` +
    `Disallow: /*?*\n` +
    `\n` +
    `Sitemap: ${SITE}/sitemap.xml\n`;

  await writeFile(join(DIST, "sitemap.xml"), sitemap, "utf8");
  await writeFile(join(DIST, "robots.txt"), robots, "utf8");
  console.log(
    `[post-build] wrote sitemap.xml (${urls.length} urls) + robots.txt`,
  );
}

main().catch((err) => {
  console.error("[post-build] failed:", err);
  process.exit(1);
});
