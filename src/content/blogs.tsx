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
      "Worldant is an actively in-progress runtime for agent-owned software worlds, durable workflows, reactive data, and typed remote functions.",
    date: "2026-06-28",
    readTime: "4 min read",
    author: "Midwess",
    cover: dunes,
    body: (
      <>
        <p>
          Worldant is being rebuilt around one idea: a world is a directory that
          can grow into database schema, callable logic, durable workflow,
          reactive streams, and generated client contracts.
        </p>
        <p>
          The project is actively in progress. The current documentation
          describes the direction we are implementing, not a stable production
          API.
        </p>
        <h2>The goal</h2>
        <p>
          Agents should be able to add capability by editing files, running a
          validated build, and receiving a typed world interface. Humans,
          agents, generated UI, and services should all call the same commands,
          mutations, workflows, and subscriptions.
        </p>
        <h2>The boundary</h2>
        <p>
          Worldant owns the runtime, database truth, durable workflow replay,
          reactive subscriptions, and npm remote-function protocol. Ragent owns
          generated UI and consumes Worldant through that protocol.
        </p>
        <h2>The proof</h2>
        <p>
          The design is proven when an agent can create a small application
          world, expose typed functions through the live package endpoint,
          subscribe to data changes, run long workflow jobs durably, and let a
          generated UI participate through the same committed database truth.
        </p>
      </>
    ),
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
