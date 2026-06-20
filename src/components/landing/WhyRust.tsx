import { motion } from "motion/react";
import { Container } from "./Container";
import { SectionHeading, SubHeading, Badge } from "./Typography";

type Reason = { title: string; body: string };

const reasons: Reason[] = [
  {
    title: "In-process, single binary",
    body: "Postgres, durable workflows, and realtime sync compile straight into your binary. No sidecar processes, no Docker, no install step.",
  },
  {
    title: "No external services to babysit",
    body: "Embedded storage and in-process dispatch mean no standing Postgres, Redis, or managed workflow service to provision, scale, or page you at 3am.",
  },
  {
    title: "Durable by construction",
    body: "Every run and step is an atomic commit with cross-process exactly-once semantics. State survives crashes and restarts because the log replays.",
  },
];

export const WhyRust = () => (
  <Container className="border-x border-divide px-4 py-20 md:px-8 md:py-28">
    <div className="text-center">
      <div className="flex justify-center">
        <Badge text="Why Rust" />
      </div>
      <SectionHeading className="mt-4">
        Infrastructure that ships inside your app
      </SectionHeading>
      <SubHeading as="p" className="mx-auto mt-5 max-w-2xl">
        Rust lets us compile real databases and durable execution into native
        static libraries — the embeddable footprint of SQLite with the semantics
        of Postgres and Vercel Workflow.
      </SubHeading>
    </div>

    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
      {reasons.map((r, i) => (
        <motion.div
          key={r.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.08 }}
          className="rounded-2xl border border-olive-800 bg-olive-900/40 p-6"
        >
          <h3 className="font-display text-lg font-medium text-olive-50">
            {r.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-olive-400">{r.body}</p>
        </motion.div>
      ))}
    </div>
  </Container>
);
