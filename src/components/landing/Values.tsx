import { Container } from "./Container";
import { SectionHeading, SubHeading, Badge } from "./Typography";
import { Database, Server, Workflow } from "lucide-react";

type Value = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  layer: string;
  title: string;
  body: string;
};

const values: Value[] = [
  {
    icon: Database,
    layer: "L1",
    title: "Real Postgres, embedded",
    body: "pglite-rs compiles a single-process Postgres fork straight into your binary. Full types, transactions, MVCC, extensions — no server, no Docker, no install step.",
  },
  {
    icon: Server,
    layer: "L2",
    title: "Durable runtimes",
    body: "worldant hosts JS workflows on a V8 isolate owned by Rust. Every step transition is an atomic SQL write, so the isolate can sleep on idle and replay from the log when work arrives. Exactly-once across a restart.",
  },
  {
    icon: Workflow,
    layer: "L3",
    title: "Realtime at the edge",
    body: "PgPaw serves the same query as both a CDN-cacheable snapshot and a live SSE feed, with watermark-derived invalidation. Plain Postgres SQL, native RLS, no bespoke query language to learn.",
  },
];

export const Values = () => (
  <Container className="border-x border-divide px-4 py-20 md:px-8 md:py-28">
    <div className="flex flex-col items-center text-center">
      <Badge text="What we build" />
      <SectionHeading className="mt-4">
        One stack, three layers
      </SectionHeading>
      <SubHeading as="p" className="mt-4 max-w-2xl">
        Each layer stands alone. Together they keep stateful work alive through
        anything short of disk failure.
      </SubHeading>
    </div>
    <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      {values.map((v) => (
        <div
          key={v.title}
          className="group flex flex-col gap-4 rounded-2xl border border-olive-800 bg-olive-950/30 p-6 transition-colors duration-300 hover:border-olive-700 hover:bg-olive-950/60 md:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex size-9 items-center justify-center rounded-lg border border-olive-800 bg-olive-900/60">
              <v.icon className="size-4 text-olive-200" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive-500">
              {v.layer}
            </span>
          </div>
          <h3 className="font-display text-xl font-medium text-olive-50">
            {v.title}
          </h3>
          <p className="text-sm leading-relaxed text-olive-400">{v.body}</p>
        </div>
      ))}
    </div>
  </Container>
);
