import { Container } from "./Container";
import { Link } from "./_link";
import { ImageNoise } from "./ImageNoise";
import { posts } from "@/content/blogs";

// Static fine grain (fractalNoise), inlined — gives the olive half its texture.
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/** Writing section — fumadocs "Docs for Engineers." style: a banner image on
 *  top of the section, then the posts displayed as a vertical list of rows. */
export const Writing = () => (
  <Container
    id="writing"
    className="scroll-mt-20 border-x border-divide px-4 py-20 md:px-8 md:py-28"
  >
    <h2 className="mb-10 text-center font-display text-4xl font-medium tracking-tight text-[#e8c64a] md:text-4xl">
      Blog posts
    </h2>
    {/* Banner — fumadocs blog layout: left olive half + dithered photo on the
        right, split by a hard straight line at the middle. */}
    <div className="relative isolate flex aspect-[2.2/1] flex-col justify-start overflow-hidden rounded-2xl border border-olive-800 bg-olive-950 p-8 shadow-aceternity sm:aspect-[3.2/1] md:p-12">
      {/* right half — the dithered photo */}
      <ImageNoise
        image="/background5.jpg"
        size={2}
        className="absolute rounded-xl inset-0 z-0 size-full [filter:brightness(1.35)_saturate(1.15)]"
      />
      {/* left half — solid olive, hard straight-line divide at 50% */}
      <div className="rounded-xl pointer-events-none absolute inset-0 z-0 bg-[oklch(36%_0.045_106)] [mask-image:linear-gradient(to_right,black_50%,transparent_50%)]" />
      {/* fine grain over the olive half (fumadocs-style noise) */}
      <div
        aria-hidden
        className="rounded-xl overflow-clip pointer-events-none absolute inset-0 z-0 opacity-90 mix-blend-overlay [mask-image:linear-gradient(to_right,black_50%,transparent_50%)]"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: "180px 180px" }}
      />
      {/* orange glare — a sharp, thin diagonal reflection streak (sun on glass) */}
      <div className="pointer-events-none absolute -bottom-1/4 left-[200%] z-0 h-[170%] w-[9%] -rotate-[33deg] bg-[radial-gradient(closest-side,#ff5e00,#ff5e0000)] blur-md mix-blend-screen" />
      <div className="pointer-events-none absolute -bottom-1/4 left-[7%] z-0 h-[155%] w-[3%] -rotate-[33deg] bg-[radial-gradient(closest-side,#ff7a2e,#ff7a2e00)] blur-sm mix-blend-screen" />
      {/* a second, thicker glare beside the first */}
      <div className="pointer-events-none absolute -bottom-1/4 left-[14%] z-0 h-[165%] w-[15%] -rotate-[33deg] bg-[radial-gradient(closest-side,#ff5e00,#ff5e0000)] blur-lg mix-blend-screen" />
      <div className="relative z-10 max-w-md">
        <h2 className="font-mono text-2xl font-medium tracking-tight text-olive-50 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] md:text-3xl">
          What we want to share
        </h2>
        <p className="mt-3 font-mono text-sm text-olive-200 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
          Notes from building durable, agentic infrastructure in Rust.
        </p>
      </div>
    </div>

    {/* Posts as a vertical list. */}
    <div className="mt-4 flex flex-col divide-y divide-divide overflow-hidden rounded-2xl border border-olive-800">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col justify-between gap-2 px-5 py-5 transition-colors duration-300 hover:bg-olive-900/50 md:flex-row md:items-center md:gap-6 md:px-6"
        >
          <div className="min-w-0">
            <h3 className="font-display font-medium text-olive-50">
              {post.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-olive-400">
              {post.description}
            </p>
          </div>
          <div className="shrink-0 md:text-right">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-brand">
              {formatDate(post.date)}
            </div>
            <div className="mt-1 text-sm text-olive-300">{post.author}</div>
          </div>
        </Link>
      ))}
    </div>
  </Container>
);
