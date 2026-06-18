import { Container } from "./Container";
import { SectionHeading, SubHeading, Badge } from "./Typography";

type Milestone = {
  date: string;
  project: string;
  title: string;
  body: string;
};

const milestones: Milestone[] = [
  {
    date: "2026 · 06",
    project: "worldant",
    title: "M1 — keystone + durability proven",
    body: "Rust hosts JS on deno_core, every run/step is an atomic SQL update, exactly-once across process restart. End-to-end e2e suite green.",
  },
  {
    date: "2026 · 06",
    project: "worldant",
    title: "Supervisor design (M2) cut",
    body: "Library stays in the app. The supervisor wraps the app from the outside, owns the public socket, watches + forwards traffic. Scale-to-zero deferred to the next slice.",
  },
  {
    date: "2026 · 05",
    project: "pglite-rs",
    title: "Multi-process mode",
    body: "Single-binary Postgres that can serve multiple OS-level clients, not just in-process callers. Wire protocol exposed without spinning up a separate postmaster.",
  },
  {
    date: "2026 · 04",
    project: "PgPaw",
    title: "Realtime SSE deltas shipped",
    body: "Each subscription starts with a snapshot pointer, then insert/update/delete events per affected row. Cache invalidation keyed on per-table / per-PK LSN state.",
  },
  {
    date: "2026 · 03",
    project: "pglite-rs",
    title: "First crates.io release",
    body: "Runtime-agnostic async API on top of futures. Pulled in by PgPaw and worldant in production.",
  },
];

export const Shipping = () => (
  <Container className="border-x border-divide px-4 py-20 md:px-8 md:py-28">
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Badge text="What's shipping" />
        <SectionHeading className="mt-4 text-left">
          Recent milestones
        </SectionHeading>
        <SubHeading as="p" className="mt-4 text-left">
          The public timeline across all three projects.
        </SubHeading>
      </div>
      <ol className="relative space-y-10 border-l border-olive-800 pl-8">
        {milestones.map((m, idx) => (
          <li key={`${m.date}-${idx}`} className="relative">
            <span className="absolute -left-[2.4rem] top-1 flex size-3 items-center justify-center rounded-full border border-olive-700 bg-olive-950">
              <span className="size-1 rounded-full bg-olive-300" />
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive-500">
                  {m.date}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive-400">
                  {m.project}
                </span>
              </div>
              <h3 className="font-display text-lg font-medium text-olive-100">
                {m.title}
              </h3>
              <p className="text-sm leading-relaxed text-olive-400">{m.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </Container>
);
