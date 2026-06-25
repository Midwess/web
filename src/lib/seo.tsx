/**
 * Centralized SEO helpers — title, description, canonical, OpenGraph, Twitter,
 * JSON-LD. One <SeoHead /> per route, fed by frontmatter (docs) / post meta
 * (blog) / static config (landing, about, pricing, policy).
 *
 * `react-helmet-async` writes the head into the SSR/SSG stream so the tags
 * end up in the static `.html` file the crawler fetches — not just the
 * client-rendered DOM.
 */
import { Helmet } from "react-helmet-async";

export const SITE = {
  name: "midwess.ai",
  url: "https://midwess.ai",
  ogImage: "/ours/app-icon.png",
  description:
    "Midwess builds durable infrastructure for stateful workloads — embedded Postgres, durable workflow runtimes, and realtime caches.",
  locale: "en_US",
  twitter: "@midwess",
} as const;

export type SeoProps = {
  /** Page title (no site name suffix; we add it). */
  title: string;
  /** Page description, ~150 chars ideal. */
  description: string;
  /** Path on site, e.g. "/worldant/installation". Leading slash required. */
  path: string;
  /** og:type. "website" for pages, "article" for blog. */
  type?: "website" | "article";
  /** Absolute or root-relative image URL for og:image / twitter:image. */
  image?: string;
  /** Article-only meta. */
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  /** Set true to add <meta name="robots" content="noindex">. */
  noindex?: boolean;
  /** JSON-LD blocks to embed as a <script type="application/ld+json">. */
  jsonLd?: object | object[];
  /** Optional canonical override; defaults to `${SITE.url}${path}`. */
  canonical?: string;
};

const toAbsolute = (url: string) =>
  url.startsWith("http") ? url : `${SITE.url}${url.startsWith("/") ? "" : "/"}${url}`;

const fullTitle = (title: string) => `${title} — ${SITE.name}`;
const fullUrl = (path: string) => toAbsolute(path);

const serializeJsonLd = (blocks: object | object[]) =>
  JSON.stringify(Array.isArray(blocks) ? blocks : [blocks]);

export const SeoHead = ({
  title,
  description,
  path,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  author,
  noindex,
  jsonLd,
  canonical,
}: SeoProps) => {
  const url = fullUrl(path);
  const ogImage = image ? toAbsolute(image) : toAbsolute(SITE.ogImage);
  return (
    <Helmet>
      <title>{fullTitle(title)}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical ?? url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle(title)} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={SITE.locale} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {author && <meta property="article:author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:title" content={fullTitle(title)} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {serializeJsonLd(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

/* -------------------------------------------------------------------------- */
/*  JSON-LD builders                                                          */
/* -------------------------------------------------------------------------- */

export type WebSiteLd = ReturnType<typeof webSiteLd>;
export type SoftwareSourceCodeLd = ReturnType<typeof softwareSourceCodeLd>;
export type TechArticleLd = ReturnType<typeof techArticleLd>;
export type BlogPostingLd = ReturnType<typeof blogPostingLd>;
export type BreadcrumbListLd = ReturnType<typeof breadcrumbListLd>;
export type OrganizationLd = ReturnType<typeof organizationLd>;

/** Landing page: identifies the site to Google and exposes the search action. */
export const webSiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: SITE.locale,
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
});

/** Header for the site, used in landing + footer contexts. */
export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: toAbsolute(SITE.ogImage),
});

/** OSS project landing (`/<slug>`) — surfaces in software-result rich snippets. */
export const softwareSourceCodeLd = (args: {
  name: string;
  description: string;
  path: string;
  repoUrl: string;
  programmingLanguage: string[];
  keywords?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: args.name,
  description: args.description,
  url: fullUrl(args.path),
  codeRepository: args.repoUrl,
  license: "https://opensource.org/licenses/MIT",
  programmingLanguage: args.programmingLanguage,
  keywords: args.keywords?.join(", "),
  author: { "@type": "Organization", name: SITE.name, url: SITE.url },
});

/** Single docs page — `TechArticle` so it shows for "how to" / docs queries. */
export const techArticleLd = (args: {
  title: string;
  description: string;
  path: string;
  projectPath: string;
  projectName: string;
  repoUrl?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: args.title,
  description: args.description,
  url: fullUrl(args.path),
  inLanguage: SITE.locale,
  author: { "@type": "Organization", name: SITE.name, url: SITE.url },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  isPartOf: {
    "@type": "SoftwareSourceCode",
    name: args.projectName,
    url: fullUrl(args.projectPath),
    ...(args.repoUrl ? { codeRepository: args.repoUrl } : {}),
  },
  // Indicates a long-form, code-heavy doc.
  proficiencyLevel: "https://schema.org/Expert",
});

/** Blog post. */
export const blogPostingLd = (args: {
  title: string;
  description: string;
  path: string;
  date: string;
  author: string;
  cover?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: args.title,
  description: args.description,
  url: fullUrl(args.path),
  inLanguage: SITE.locale,
  datePublished: args.date,
  author: { "@type": "Person", name: args.author },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  ...(args.cover ? { image: toAbsolute(args.cover) } : {}),
});

/** Generic breadcrumb for docs / blog navigation. */
export const breadcrumbListLd = (
  items: { name: string; path: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: fullUrl(it.path),
  })),
});
