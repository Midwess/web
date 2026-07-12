import type { ReactNode } from "react";
import dunes from "@/assets/desert-dunes.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: string;
  cover: string;
  body: ReactNode;
};

export const posts: BlogPost[] = [
  {
    slug: "worldant-active-development",
    title: "Worldant is being rebuilt as a world runtime",
    description:
      "Worldant is a filesystem-authored runtime for immediate Commands, durable Workflows, and PostgreSQL-backed runtime state.",
    date: "2026-06-28",
    readTime: "4 min read",
    author: "Midwess",
    cover: dunes,
    body: (
      <>
        <p>
          Worldant is being rebuilt around one idea: a world is a directory that
          can grow into database schema, immediate Commands, durable Workflows,
          internal Steps, event streams, and generated runtime knowledge.
        </p>
        <p>
          The project is actively in progress. The current documentation
          describes the direction we are implementing, not a stable production
          API.
        </p>
        <h2>The goal</h2>
        <p>
          Developers and AI tools should be able to add capability by editing
          files, running a validated build, and receiving a stable world
          interface. Clients call Commands for immediate work and run Workflows
          for durable orchestration.
        </p>
        <h2>The boundary</h2>
        <p>
          Worldant owns the runtime, PostgreSQL truth, build snapshots,
          durable Workflow replay, event streams, and the client protocol. UI
          and application services remain separate consumers.
        </p>
        <h2>The proof</h2>
        <p>
          The design is proven when a small application world can publish a
          snapshot, call Commands, run long Workflow jobs durably, subscribe to
          data changes, and keep every participant on the same committed
          PostgreSQL truth.
        </p>
      </>
    ),
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
