/**
 * Route table for the whole site.
 *
 * Static routes (`/`, `/about`, `/pricing`, `/policy`, `*`) are pre-rendered
 * by `vite-react-ssg` automatically. Dynamic routes (`/blog/:slug`,
 * `/:slug/*`) declare a `getStaticPaths()` so SSG knows which concrete
 * URLs to emit as static `.html` files. The runtime client router uses
 * the same table — `getStaticPaths` is ignored at runtime.
 *
 * The `:slug` / `*` paths that contain `:` or `*` are filtered out by
 * `vite-react-ssg`'s `DefaultIncludedRoutes`, so the raw patterns never
 * end up as on-disk files.
 */
import type { RouteRecord } from "vite-react-ssg";
import { documentationPaths } from "@midwess/orbit-ui/docs";
import slugs from "@/content/slugs.json";
import { posts } from "@/content/blogs";
import { getTree, flattenPages } from "@/lib/docs/tree";

import Landing from "@/pages/Landing";
import About from "@/pages/About";
import Pricing from "@/pages/Pricing";
import Policy from "@/pages/Policy";
import BlogPost from "@/pages/BlogPost";
import ProjectDocs from "@/pages/ProjectDocs";
import NotFound from "@/pages/NotFound";
import OrbitUI from "@/pages/OrbitUI";

/** Pre-render every known docs page across every project. */
const projectDocPaths = (): string[] => {
  const out: string[] = [];
  for (const slug of slugs) {
    const tree = getTree(slug);
    if (!tree) continue;
    for (const p of flattenPages(tree)) {
      out.push(p.url);
    }
  }
  return out;
};

/** Pre-render every blog post. */
const blogPostPaths = (): string[] =>
  posts.map((p) => `/blog/${p.slug}`);

/** Pre-render the exact Orbit documentation shell at every public UI route. */
const orbitPaths = (): string[] => [
  "/ui/",
  ...documentationPaths.map((path) => `/ui${path}`),
];

export const routes: RouteRecord[] = [
  { path: "/", element: <Landing /> },
  { path: "/about", element: <About /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/policy", element: <Policy /> },
  {
    path: "/ui/*",
    element: <OrbitUI />,
    getStaticPaths: orbitPaths,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
    getStaticPaths: blogPostPaths,
  },
  {
    path: "/:slug/*",
    element: <ProjectDocs />,
    getStaticPaths: projectDocPaths,
  },
  { path: "*", element: <NotFound /> },
];
