import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Container } from "./Container";
import { SectionHeading } from "./Typography";
import { Link } from "./_link";
import { GitHubStars } from "./GitHubStars";
import { PetSprite } from "./PetSprite";
import { Dot } from "./Dot";
import { ImageNoise } from "./ImageNoise";

type Project = {
  name: string;
  /** URL slug used by the docs pipeline + internal route. */
  slug: string;
  /** Whether the project has docs at `/${slug}`. Drives the row's
   *  primary click target — docs if true, the website otherwise. */
  hasDocs: boolean;
  tagline: string;
  sprite: string;
  /** External site — used as the row's click target when the project has
   *  no docs, and as a fallback for projects whose docs are still in flight. */
  website: string;
  /** GitHub repo — opened via the star. Omit for projects without one. */
  repo?: string;
  progress: number;
  /** Avatar backdrop tint, matched to each pet's own color. */
  accent: string;
  /** 2–4 factual capability points, sourced from the project's own docs
   *  (`src/content/docs/<slug>/index.mdx`). Omitted for projects without docs. */
  features?: string[];
};

const projects: Project[] = [
  {
    name: "Worldant",
    slug: "worldant",
    hasDocs: true,
    tagline: "Vercel world implementation in Rust for agentic",
    sprite: "/pets/capvolt.webp",
    website: "https://github.com/Midwess/worldant",
    repo: "Midwess/worldant",
    progress: 80,
    accent: "rgb(250 204 21 / 0.18)", // pikachu yellow
    features: [
      "In-process Vercel Workflow world",
      "Embedded SQLite — no external DB",
      "Scale-to-zero supervisor",
      "Cross-process exactly-once",
    ],
  },
  {
    name: "Pglite",
    slug: "pglite-rs",
    hasDocs: true,
    tagline: "Lightweight embedded Postgres like SQLite",
    sprite: "/pets/goose-default.png",
    website: "https://github.com/Midwess/pglite-rs",
    repo: "Midwess/pglite-rs",
    progress: 100,
    accent: "rgb(96 165 250 / 0.18)", // goose blue
    features: [
      "Real Postgres 17 in your binary",
      "Async on any runtime",
      "Multi-process mode",
      "pgvector & logical replication",
    ],
  },
  {
    name: "PgPaw",
    slug: "pgpaw",
    hasDocs: true,
    tagline: "A high performance realtime service with full SQL syntax support",
    sprite: "/pets/kaka-2.webp",
    website: "https://github.com/Midwess/PgPaw",
    repo: "Midwess/PgPaw",
    progress: 100,
    accent: "rgb(244 114 182 / 0.18)", // kaka pink
    features: [
      "Plain Postgres SQL over HTTP",
      "Immutable CDN-cacheable snapshots",
      "Realtime SSE deltas",
      "Built on pglite-rs",
    ],
  },
  {
    name: "Bytover",
    slug: "bytover",
    hasDocs: false,
    tagline: "P2P file management and P2P transfer solution",
    sprite: "/pets/froggle.webp",
    website: "https://bytover.com",
    repo: "midwess/bytover",
    progress: 90,
    accent: "rgb(74 222 128 / 0.18)", // froggle green
  },
];

/** Completion bar — fixed at 20% of the row width, grouped with the star. */
const ProgressBar = ({ value }: { value: number }) => (
  <div
    className="h-1.5 w-1/5 shrink-0 overflow-hidden rounded-full bg-olive-800"
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label={`${value}% complete`}
  >
    <div
      className="h-full rounded-full bg-olive-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => {
  // Row click target: docs if the project has them, otherwise the
  // external website. The `Docs` button is gone — the whole row is the
  // primary action. GitHub stays as a separate secondary target.
  const primaryHref = project.hasDocs ? `/${project.slug}` : project.website;
  const primaryLabel = project.hasDocs
    ? `${project.name} — open docs`
    : `${project.name} — open site`;
  return (
    <div className="group border-1 border-olive-700 relative flex flex-col gap-2 rounded-lg px-3 py-2 transition-colors duration-300 bg-olive-700/80">
      {/* Whole-card click → docs (if available) or website. */}
      <Link
        href={primaryHref}
        aria-label={primaryLabel}
        className="absolute inset-0 z-10"
      />
      <div className="flex items-center gap-3">
        <span className="relative flex shrink-0 items-center gap-3">
          <span
            className="flex items-center justify-center rounded-lg p-1"
            style={{ backgroundColor: project.accent }}
          >
            <PetSprite src={project.sprite} size={36} />
          </span>
          <span className="font-display text-sm font-medium text-olive-50">
            {project.name}
          </span>
        </span>
        <span className="relative min-w-0 flex-1 truncate text-center text-xs text-olive-400">
          {project.tagline}
        </span>
        <ProgressBar value={project.progress} />
        {project.repo && (
          <Link
            href={`https://github.com/${project.repo}`}
            aria-label={`${project.name} on GitHub`}
            className="relative z-20 shrink-0"
          >
            <GitHubStars repo={project.repo} />
          </Link>
        )}
      </div>
      {project.features && (
        <ul className="pointer-events-none relative z-20 flex flex-wrap gap-1.5 pl-1 sm:pl-12">
          {project.features.map((f) => (
            <li
              key={f}
              className="rounded-full border border-olive-600/70 bg-olive-800/60 px-2 py-0.5 text-[10px] font-medium text-olive-300"
            >
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const springConfig = { stiffness: 300, damping: 30 };

/** Wraps the project list in the same treatment as the portal's "workflow
 *  dashboard": a framed panel with corner dots, a diagonal-hatch backdrop, a
 *  mouse-parallax tilt on the content, and a fade-in (triggered on scroll). */
const ProjectsPanel = () => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const translateX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / rect.width);
    mouseY.set((e.clientY - cy) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex w-full flex-1 flex-col overflow-hidden bg-olive-950 px-4 py-12 perspective-distant md:px-8 md:py-16">
      <Dot top left />
      <Dot top right />
      <Dot bottom left />
      <Dot bottom right />
      {/* Hoi An photo, dithered with the shader algorithm — strong at bottom */}
      <ImageNoise
        image="/hoian.webp"
        size={3}
        className="absolute inset-0 z-0 size-full [mask-image:linear-gradient(to_top,black_0%,transparent_50%)]"
      />
      <motion.div
        ref={ref}
        className="relative z-10 flex w-full flex-1 flex-col overflow-hidden rounded-2xl p-5 md:p-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        style={{
          translateX,
          translateY,
          background:
            "radial-gradient(120% 75% at 50% -10%, rgba(198,187,88,0.12) 0%, transparent 58%), linear-gradient(to bottom, oklch(24% 0.013 107.4), oklch(16.5% 0.006 107.1))",
        }}
      >
        {/* dithered photo on the card — subtle, fading up */}
        <ImageNoise
          image="/hoian.webp"
          size={3.5}
          className="absolute inset-0 z-0 size-full opacity-50 [mask-image:linear-gradient(to_top,black_0%,transparent_70%)]"
        />
        <div className="relative z-10 flex flex-1 flex-col">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <SectionHeading className="mt-3 text-left text-lg [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] md:text-xl lg:text-2xl">
                Projects
              </SectionHeading>
            </div>
            <Link
              href="https://github.com/Midwess"
              className="text-sm font-medium text-olive-200 transition-colors hover:text-olive-50"
            >
              All projects →
            </Link>
          </div>
          <div className="mt-8 flex flex-1 flex-col gap-2">
            {projects.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects = () => (
  <Container
    id="projects"
    className="flex min-h-screen scroll-mt-20 flex-col border-x border-divide"
  >
    <ProjectsPanel />
  </Container>
);
