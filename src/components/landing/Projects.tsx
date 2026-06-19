import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Container } from "./Container";
import { SectionHeading, Badge } from "./Typography";
import { Link } from "./_link";
import { GitHubStars } from "./GitHubStars";
import { PetSprite } from "./PetSprite";
import { Dot } from "./Dot";
import { ImageNoise } from "./ImageNoise";

type Project = {
  name: string;
  tagline: string;
  sprite: string;
  /** Detail site — opened when the row itself is clicked. */
  website: string;
  /** GitHub repo — opened via the star. Omit for projects without one. */
  repo?: string;
  progress: number;
  /** Avatar backdrop tint, matched to each pet's own color. */
  accent: string;
};

const projects: Project[] = [
  {
    name: "Worldant",
    tagline: "Vercel world implementation in Rust for agentic",
    sprite: "/pets/capvolt.webp",
    website: "https://github.com/Midwess/worldant",
    repo: "Midwess/worldant",
    progress: 80,
    accent: "rgb(250 204 21 / 0.18)", // pikachu yellow
  },
  {
    name: "Pglite",
    tagline: "Lightweight embedded Postgres like SQLite",
    sprite: "/pets/goose-default.png",
    website: "https://github.com/Midwess/pglite-rs",
    repo: "Midwess/pglite-rs",
    progress: 100,
    accent: "rgb(96 165 250 / 0.18)", // goose blue
  },
  {
    name: "PgPaw",
    tagline: "A high performance realtime service with full SQL syntax support",
    sprite: "/pets/kaka-2.webp",
    website: "https://github.com/Midwess/PgPaw",
    repo: "Midwess/PgPaw",
    progress: 100,
    accent: "rgb(244 114 182 / 0.18)", // kaka pink
  },
  {
    name: "Bytover",
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

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group border-1 border-olive-700 relative flex items-center gap-3 rounded-lg px-3 py-1.5 transition-colors duration-300 bg-olive-700/80">
    {/* Whole-row click → the project's detail site. */}
    <Link
      href={project.website}
      aria-label={`${project.name} — open site`}
      className="absolute inset-0 z-10"
    />
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
);

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
        className="absolute inset-0 z-0 size-full [mask-image:linear-gradient(to_top,black_0%,transparent_60%)]"
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
          size={3}
          className="absolute inset-0 z-0 size-full opacity-50 [mask-image:linear-gradient(to_top,black_0%,transparent_65%)]"
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
  <Container className="flex min-h-screen flex-col border-x border-divide">
    <ProjectsPanel />
  </Container>
);
