import type { ComponentType } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import slugs from "@/content/slugs.json";
import NotFound from "./NotFound";
import { getTree, toPageTree } from "@/lib/docs/tree";
import { type TocItem } from "@/lib/docs/rehype-toc";
import { DocsLayout } from "@fumadocs/base-ui/layouts/docs";
import { DocsPage, DocsBody } from "@fumadocs/base-ui/layouts/docs/page";
import defaultMdxComponents from "@fumadocs/base-ui/mdx";
import type { Root } from "fumadocs-core/page-tree";
import { FileText, BookOpen } from "lucide-react";
import { DocsProvider } from "@/components/docs/_provider";
import { LogoSVG } from "@/components/landing/Logo";

const KNOWN = slugs as readonly string[];

type MdxModule = {
  default: ComponentType<{ components?: Record<string, unknown> }>;
  frontmatter?: { title?: string; description?: string };
  toc?: TocItem[];
};

const modules = import.meta.glob<MdxModule>("/src/content/docs/*/**/*.mdx", {
  eager: true,
});

/** MDX tag/components map — fumadocs defaults (Heading, CodeBlock, Callout, …). */
const mdxComponents = { ...defaultMdxComponents };

const pageIcon = <FileText className="size-4" />;
const folderIcon = <BookOpen className="size-4" />;

/** Decorate the page tree with lucide icons, like fumadocs' sidebars. */
function withIcons(root: Root): Root {
  for (const node of root.children) {
    if (node.type === "folder") {
      node.icon = folderIcon;
      if (node.index) node.index.icon = pageIcon;
      for (const child of node.children) {
        if (child.type === "page") child.icon = pageIcon;
      }
    } else if (node.type === "page") {
      node.icon = pageIcon;
    }
  }
  return root;
}

const toFile = (sub: string) => {
  const cleaned = sub.replace(/^\/+|\/+$/g, "");
  return cleaned === "" ? "index" : cleaned;
};

/**
 * Renders an MDX page inside fumadocs' real full-page docs layout
 * (`@fumadocs/base-ui`): own header, collapsible sidebar, sticky TOC with the
 * animated thumb, breadcrumb + prev/next footer. The page tree, breadcrumb and
 * footer are all derived from `toPageTree(slug)`.
 *
 * Wrapped in `<RootProvider>` (react-router framework adapter) so every
 * fumadocs link/router hook resolves; `theme` is forced dark and search is
 * disabled (we ship no search index). The react-router `<Link>` is injected so
 * internal navigation uses the SPA router.
 */
const ProjectDocs = () => {
  const { slug = "" } = useParams();
  const { pathname } = useLocation();

  if (!KNOWN.includes(slug)) return <NotFound />;

  const tree = getTree(slug);
  if (!tree) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold text-fd-foreground">No docs</h1>
        <p className="mt-2 text-fd-muted-foreground">
          Project <code>{slug}</code> has no <code>meta.json</code>.
        </p>
        <Link to="/" className="mt-4 inline-block text-fd-primary underline">
          ← Home
        </Link>
      </main>
    );
  }

  const sub = pathname.replace(new RegExp(`^/${slug}`), "") || "/";
  const file = toFile(sub);
  const mod = modules[`/src/content/docs/${slug}/${file}.mdx`];

  if (!mod) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold text-fd-foreground">Not found</h1>
        <p className="mt-2 text-fd-muted-foreground">
          No page at <code>/{slug}/{file}</code>.
        </p>
        <Link
          to={`/${slug}`}
          className="mt-4 inline-block text-fd-primary underline"
        >
          ← Back to {slug}
        </Link>
      </main>
    );
  }

  const C = mod.default;
  // fumadocs' TOCItemType wants `{ title, url, depth }`; ours is `{ text, … }`.
  const toc = (mod.toc ?? []).map((t) => ({
    title: t.text,
    url: t.url,
    depth: t.depth,
  }));
  const pageTree = withIcons(toPageTree(slug));

  return (
    <DocsProvider>
      <DocsLayout
        tree={pageTree}
        // full Midwess logo (icon + wordmark) in the sidebar header
        nav={{ title: <LogoSVG className="h-6 w-auto" />, url: "/" }}
        themeSwitch={{ enabled: false }}
        // GitHub icon link in the sidebar footer — per-project repo
        // (meta.json `github` override, else github.com/midwess/<slug>).
        githubUrl={tree.github ?? `https://github.com/midwess/${slug}`}
        // Paint the real fumadocs background over our (darker) olive body bg.
        containerProps={{ className: "bg-fd-background" }}
      >
        <DocsPage key={pathname} toc={toc}>
          <DocsBody>
            <C components={mdxComponents} />
          </DocsBody>
        </DocsPage>
      </DocsLayout>
    </DocsProvider>
  );
};

export default ProjectDocs;
