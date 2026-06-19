/**
 * Builds the sidebar page-tree at build time by eagerly loading all
 * `meta.json` files under `src/content/docs/<slug>/` and pairing them with
 * the frontmatter exported by each `.mdx` module.
 *
 * Shape mirrors `fumadocs-core/page-tree` (PageNode / FolderNode) but is
 * intentionally minimal — flat per-project docs only for now.
 *
 * Supports nested folders: a folder can contain pages, and folders can
 * contain folders. The mdx glob is `**\/*.mdx` so a file at
 * `src/content/docs/<slug>/<sub>/<file>.mdx` is matched, and its URL is
 * `/${slug}/<sub>/<file>`.
 */

type MdxModule = {
  default: React.ComponentType;
  frontmatter?: { title?: string; description?: string };
};

const mdxModules = import.meta.glob<MdxModule>(
  "/src/content/docs/*/**/*.mdx",
  { eager: true },
);

type MetaJson = {
  title?: string;
  description?: string;
  pages?: string[];
  /** Optional repo URL; overrides the default `github.com/midwess/<slug>`. */
  github?: string;
};

const metaModules = import.meta.glob<MetaJson>(
  "/src/content/docs/*/meta.json",
  { eager: true },
);

export type PageNode = {
  type: "page";
  name: string;
  url: string;
  description?: string;
};

export type FolderNode = {
  type: "folder";
  name: string;
  index?: PageNode;
  children: TreeNode[];
};

export type TreeNode = PageNode | FolderNode;

export type DocsTree = {
  projectTitle: string;
  projectDescription?: string;
  github?: string;
  nodes: TreeNode[];
};

/** Pull frontmatter for a single MDX file. `file` may include a subfolder
 *  prefix (e.g. `"api/query"`). */
function getFrontmatter(slug: string, file: string) {
  const key = `/src/content/docs/${slug}/${file}.mdx`;
  return mdxModules[key]?.frontmatter;
}

/** Resolve a single meta.json pages entry → TreeNode. Strings are
 *  page filenames (with optional subfolder prefix); objects are folders
 *  that may contain pages and other folders. */
function resolveEntry(slug: string, entry: unknown): TreeNode | null {
  if (typeof entry === "string") {
    // Separator ("---") or empty strings are ignored.
    if (entry === "---" || entry === "") return null;
    const fm = getFrontmatter(slug, entry);
    return {
      type: "page",
      name: fm?.title ?? entry,
      url: `/${slug}/${entry === "index" ? "" : entry}`,
      description: fm?.description,
    };
  }
  // Folder entry: { name, pages, ... }
  if (entry && typeof entry === "object" && "name" in entry && "pages" in entry) {
    const folder = entry as { name: string; pages?: unknown[] };
    const children = (folder.pages ?? [])
      .map((c) => resolveEntry(slug, c))
      .filter((n): n is TreeNode => n !== null);
    return {
      type: "folder",
      name: folder.name,
      children,
    };
  }
  return null;
}

function buildTree(slug: string, meta: MetaJson): DocsTree {
  const nodes: TreeNode[] = (meta.pages ?? [])
    .map((entry) => resolveEntry(slug, entry))
    .filter((n): n is TreeNode => n !== null);
  return {
    projectTitle: meta.title ?? slug,
    projectDescription: meta.description,
    github: meta.github,
    nodes,
  };
}

/** Map of slug → DocsTree, computed once at module load. */
export const trees: Record<string, DocsTree> = Object.fromEntries(
  Object.entries(metaModules).map(([path, meta]) => {
    const slug = path.match(/\/([^/]+)\/meta\.json$/)?.[1] ?? "";
    return [slug, buildTree(slug, meta)];
  }),
);

export function getTree(slug: string): DocsTree | undefined {
  return trees[slug];
}

/**
 * Flatten the tree into the in-order list of navigable pages (folder index +
 * children, with nested folders recursed in order), mirroring how fumadocs
 * derives prev/next footer links.
 */
export function flattenPages(tree: DocsTree): PageNode[] {
  const out: PageNode[] = [];
  const walk = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      if (node.type === "page") {
        out.push(node);
      } else {
        if (node.index) out.push(node.index);
        walk(node.children);
      }
    }
  };
  walk(tree.nodes);
  return out;
}

/**
 * Convert our `DocsTree` into a `fumadocs-core/page-tree` `Root`, the shape the
 * real `<DocsLayout>` / `<DocsPage>` consume (drives the sidebar, breadcrumb,
 * and prev/next footer). URLs are normalised to match our react-router paths
 * (index → `/<slug>`, no trailing slash). Nested folders recurse.
 */
export function toPageTree(
  slug: string,
): import("fumadocs-core/page-tree").Root {
  const tree = trees[slug];
  if (!tree) return { name: slug, children: [] };

  const url = (u: string) => u.replace(/\/+$/, "") || `/${slug}`;
  const toItem = (
    p: PageNode,
  ): import("fumadocs-core/page-tree").Item => ({
    type: "page",
    name: p.name,
    url: url(p.url),
    description: p.description,
  });

  const toChild = (
    node: TreeNode,
  ): import("fumadocs-core/page-tree").Node =>
    node.type === "page"
      ? toItem(node)
      : ({
          type: "folder",
          name: node.name,
          index: node.index ? toItem(node.index) : undefined,
          children: node.children.map(toChild),
          defaultOpen: true,
        } as import("fumadocs-core/page-tree").Folder);

  const children = tree.nodes.map(toChild);

  return { name: tree.projectTitle, children };
}

/** Resolve the previous/next page relative to `url` within a project tree. */
export function getAdjacent(
  tree: DocsTree,
  url: string,
): { previous?: PageNode; next?: PageNode } {
  const pages = flattenPages(tree);
  const norm = (u: string) => u.replace(/\/+$/, "") || "/";
  const idx = pages.findIndex((p) => norm(p.url) === norm(url));
  if (idx === -1) return {};
  return { previous: pages[idx - 1], next: pages[idx + 1] };
}
