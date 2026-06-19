import { useParams, useLocation, Link } from "react-router-dom";
import slugs from "@/content/slugs.json";
import NotFound from "./NotFound";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const KNOWN = slugs as readonly string[];

type MdxModule = { default: React.ComponentType };

const modules = import.meta.glob<MdxModule>("/src/content/docs/*/*.mdx", {
  eager: true,
});

const toFile = (sub: string) => {
  const cleaned = sub.replace(/^\/+|\/+$/g, "");
  return cleaned === "" ? "index" : cleaned;
};

/**
 * Renders the MDX page at `/<slug>/<sub-path>`.
 * Docs source lives at `src/content/docs/<slug>/<sub>.mdx`.
 * All MDX files are bundled eagerly at build time — no runtime fetch.
 */
const ProjectDocs = () => {
  const { slug = "" } = useParams();
  const { pathname } = useLocation();
  if (!KNOWN.includes(slug)) return <NotFound />;

  const sub = pathname.replace(new RegExp(`^/${slug}`), "") || "/";
  const file = toFile(sub);
  const mod = modules[`/src/content/docs/${slug}/${file}.mdx`];

  if (!mod) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-2xl font-semibold text-olive-100">Not found</h1>
          <p className="mt-2 text-olive-300">
            No page at <code>/{slug}/{file}</code>.
          </p>
          <Link to={`/${slug}`} className="mt-4 inline-block text-olive-200 underline">
            ← Back to {slug}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const C = mod.default;
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <Link to={`/${slug}`} className="mb-6 inline-block text-sm text-olive-300 hover:text-olive-100">
          ← /{slug}
        </Link>
        <article className="prose prose-invert max-w-none">
          <C />
        </article>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDocs;

