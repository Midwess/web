/**
 * DocsSearchDialog — client-side search over the bundled docs.
 *
 * This is a Vite SPA with no `/api/search` backend, so instead of fumadocs'
 * server/Orama clients we build an in-memory index at module load from the same
 * eagerly-globbed MDX the pages use: every page (frontmatter title +
 * description) and every heading (from the exported `toc`). The fumadocs search
 * dialog UI (`components/dialog/search`) is reused verbatim, and selection
 * navigates through our react-router framework provider.
 */

import { useMemo, useState } from "react";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
  type SearchItemType,
} from "@fumadocs/base-ui/components/dialog/search";
import { type TocItem } from "@/lib/docs/rehype-toc";

type MetaJson = {
  title?: string;
  pages?: (string | { name?: string; pages?: string[] })[];
};
type MdxModule = {
  frontmatter?: { title?: string; description?: string };
  toc?: TocItem[];
};

type Entry = {
  id: string;
  type: "page" | "heading";
  url: string;
  content: string;
  breadcrumbs: string[];
  keywords: string;
};

/** `/slug/installation`, `/slug` for index — matches our react-router paths. */
function fileToUrl(slug: string, file: string): string {
  const path = `/${slug}/${file === "index" ? "" : file}`.replace(/\/+$/, "");
  return path || `/${slug}`;
}

/** Flatten meta `pages` (strings + folder groups) into page-file names. */
function flattenPages(pages: MetaJson["pages"] = []): string[] {
  const out: string[] = [];
  for (const entry of pages) {
    if (typeof entry === "string") {
      if (entry && entry !== "---") out.push(entry);
    } else if (entry?.pages) {
      out.push(...flattenPages(entry.pages));
    }
  }
  return out;
}

function buildIndex(): Entry[] {
  const localMetas = import.meta.glob<MetaJson>("/src/content/docs/*/meta.json", {
    eager: true,
  });
  const vendorWorldantMetas = import.meta.glob<MetaJson>(
    "/src/content/vendor/worldant/docs/worldant/meta.json",
    { eager: true },
  );
  const localMdx = import.meta.glob<MdxModule>("/src/content/docs/*/**/*.mdx", {
    eager: true,
  });
  const vendorWorldantMdx = import.meta.glob<MdxModule>(
    "/src/content/vendor/worldant/docs/worldant/**/*.mdx",
    { eager: true },
  );

  const toDocsPath = (path: string) =>
    path.replace("/src/content/vendor/worldant/docs/", "/src/content/docs/");

  const metas: Record<string, MetaJson> = {
    ...localMetas,
    ...Object.fromEntries(
      Object.entries(vendorWorldantMetas).map(([path, meta]) => [
        toDocsPath(path),
        meta,
      ]),
    ),
  };
  const mdx: Record<string, MdxModule> = {
    ...localMdx,
    ...Object.fromEntries(
      Object.entries(vendorWorldantMdx).map(([path, mod]) => [
        toDocsPath(path),
        mod,
      ]),
    ),
  };

  const entries: Entry[] = [];
  for (const [path, meta] of Object.entries(metas)) {
    const slug = path.match(/\/([^/]+)\/meta\.json$/)?.[1];
    if (!slug) continue;
    const projectTitle = meta.title ?? slug;

    for (const file of flattenPages(meta.pages)) {
      const mod = mdx[`/src/content/docs/${slug}/${file}.mdx`];
      if (!mod) continue;
      const pageTitle = mod.frontmatter?.title ?? file;
      const url = fileToUrl(slug, file);

      entries.push({
        id: url,
        type: "page",
        url,
        content: pageTitle,
        breadcrumbs: [projectTitle],
        keywords: `${pageTitle} ${mod.frontmatter?.description ?? ""}`.toLowerCase(),
      });

      for (const h of mod.toc ?? []) {
        entries.push({
          id: `${url}#${h.id}`,
          type: "heading",
          url: `${url}#${h.id}`,
          content: h.text,
          breadcrumbs: [projectTitle, pageTitle],
          keywords: h.text.toLowerCase(),
        });
      }
    }
  }
  return entries;
}

const INDEX = buildIndex();

export default function DocsSearchDialog(props: SharedProps) {
  const [search, setSearch] = useState("");

  const items = useMemo<SearchItemType[]>(() => {
    const q = search.trim().toLowerCase();
    const source = q
      ? INDEX.filter((e) => e.keywords.includes(q))
      : INDEX.filter((e) => e.type === "page");
    return source.slice(0, 40).map((e) => ({
      id: e.id,
      type: e.type,
      url: e.url,
      content: e.content,
      breadcrumbs: e.breadcrumbs,
    }));
  }, [search]);

  return (
    <SearchDialog search={search} onSearchChange={setSearch} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
