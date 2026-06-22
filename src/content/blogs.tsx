import type { ReactNode } from "react";
import { Link } from "@/components/landing/_link";
import dunes from "@/assets/desert-dunes.jpg";
import night from "@/assets/desert-night.jpg";
import mountain from "@/assets/mountain.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readTime: string;
  author: string;
  cover: string;
  body: ReactNode;
};

const Code = ({ children }: { children: string }) => (
  <pre>
    <code>{children}</code>
  </pre>
);

export const posts: BlogPost[] = [
  {
    slug: "introducing-worldant",
    title: "Worldant: Enhancing Vercel Workflow for the Agentic Era",
    description: "Vercel Workflow makes durable execution simple. Worldant enhances it by bringing workflows in-process on embedded SQLite and projecting them directly as MCP tools for AI agents.",
    date: "2026-06-22",
    readTime: "6 min read",
    author: "James Dang",
    cover: mountain,
    body: (
      <>
        <p>
          <Link href="https://vercel.com/docs/workflow">Vercel Workflow</Link>{" "}
          changed how we write resilient backend code. By writing simple TypeScript functions with <code>"use workflow"</code> and <code>"use step"</code> directives, developers get durable execution, automatic retries, and state persistence for free. It’s an incredibly elegant way to build checkout flows, data ingestion pipelines, and multi-step sagas.
        </p>
        <p>
          But as developers start building agentic applications, a new challenge emerges: <strong>how do we expose these robust, durable workflows to AI agents?</strong>
        </p>
        <p>
          Today, a workflow is usually written for your users to trigger via your app's HTTP API. If you want an AI agent to call that same workflow, you have to hand-maintain a separate{" "}
          <Link href="https://modelcontextprotocol.io">Model Context Protocol (MCP)</Link> server. Suddenly, you have two integration paths for the same piece of business logic, slowly drifting apart.
        </p>
        <p>
          We built <strong>Worldant</strong> to bridge this gap. Worldant is a self-hosted, in-process <em>World</em> implementation (implementing the <code>@workflow/world</code> interface) that runs directly inside your Node.js app and persists to embedded SQLite. It doesn't replace Vercel Workflow; it enhances it, allowing you to write a durable workflow once and expose it to both human users and AI agents with no rewrite and no Postgres to babysit.
        </p>

        <h2>How Worldant Works</h2>
        <p>
          Vercel Workflow splits into two halves: a <em>core</em> that owns the programming model (the replay runtime, retries, and steps) and a <em>world</em> that owns storage. Worldant is a drop-in replacement for that storage layer, backing it with a Rust-backed SQLite database running in-process:
        </p>
        <Code>{`// at your app's entry, before it serves a single request
import { install } from "@midwess/worldant";

await install(); // durable World on embedded SQLite, wired into Vercel Workflow`}</Code>
        <p>
          With that one call, every run, step, and event is persisted to a single SQLite file with cross-process exactly-once execution. If your process restarts, the log is resumed, and a step that already committed never runs twice.
        </p>

        <h2>Enhancing the Workflow for Agents</h2>
        <p>
          Because a durable Vercel Workflow is already structured, typed, and resilient, it has everything an AI agent needs to discover and invoke it. Worldant leverages this by making MCP tools a <em>projection</em> of your existing workflows, rather than a separate integration.
        </p>
        <p>
          Consider this simple workflow:
        </p>
        <Code>{`// workflows/research.ts
export async function research(topic: string) {
  "use workflow";

  const sources = await search(topic);              // step 1
  const notes = await Promise.all(sources.map(read)); // step 2
  return await summarize(notes);                     // step 3
}`}</Code>
        <p>
          Under Worldant, this single workflow serves three calling surfaces simultaneously:
        </p>
        <ul>
          <li>
            <strong>API (Shipped today):</strong> Your users trigger the workflow over your app's standard HTTP routes.
          </li>
          <li>
            <strong>MCP (On the roadmap):</strong> The same workflow is automatically surfaced as an MCP tool, allowing LLM agents to invoke it natively.
          </li>
          <li>
            <strong>RPC (On the roadmap):</strong> A generated client lets other services call your workflows like local functions.
          </li>
        </ul>
        <p>
          Your core business logic remains identical. One implementation, two audiences: humans through your app's API, and agents through MCP. Both get exactly-once execution, retries, and durability for free.
        </p>

        <h2>Built for Scale-to-Zero and Zero-Downtime</h2>
        <p>
          Agent workloads are bursty—they trigger intensive runs and then sit idle. Traditional serverless pipelines or continuous VMs charge you while waiting. Worldant ships with a native supervisor CLI that runs in front of your app to solve this:
        </p>
        <ul>
          <li>
            <strong>Scale to Zero:</strong> When your app is idle, the supervisor shuts down your Node process, leaving only a thin Rust daemon. The supervisor holds the public TCP port open. When a new request (or a scheduled workflow step) arrives, it wakes the process in milliseconds.
          </li>
          <li>
            <strong>Massive Density, Low Footprint:</strong> If your agents need to generate and run a massive number of micro-applications to serve your workloads, keeping them all running continuously would quickly exhaust your server's memory. With Worldant's automatic scale-to-zero, dozens or even hundreds of Node.js applications can co-exist on the same single machine, keeping the memory footprint exceptionally low while remaining instantly responsive to incoming tasks.
          </li>
          <li>
            <strong>Zero-Downtime Redeploys:</strong> Running <code>worldant run -- npm start</code> hot-swaps your app. The supervisor drains the old version, buffers incoming connections, boots the new process, and hot-swaps them with zero dropped requests.
          </li>
        </ul>

        <h2>Quickstart</h2>
        <p>
          Getting started is simple. Install the library in your app and the supervisor CLI globally:
        </p>
        <Code>{`# 1. Install the durable World library
npm install @midwess/worldant

# 2. Install the supervisor CLI
npm install -g @midwess/worldant-cli

# 3. Run your app under the supervisor
worldant run -- npm start`}</Code>

        <h2>Where to Go Next</h2>
        <p>
          If durable, in-process workflows that your users and agents can both reach sounds like the right architecture for your project, dive into the docs. Read{" "}
          <Link href="/worldant">the Worldant documentation</Link> for detailed guides on the supervisor architecture, configuration options, and a quickstart to get your first workflow running.
        </p>
      </>
    ),
  },
  {
    slug: "deploy-flutter-web",
    title: "Deploying Flutter Web with GitHub Actions",
    description:
      "A repeatable pipeline for Flutter web — a multi-stage Docker build, an Nginx runtime, and a GitHub Actions workflow that ships on every push.",
    date: "2026-01-20",
    readTime: "6 min read",
    author: "James Dang",
    cover: dunes,
    body: (
      <>
        <p>
          Flutter web brings Flutter's declarative model to the browser, and
          building the bundle is the easy part. Shipping it the same way every
          time — without a human running commands and hoping — is what actually
          saves you. Here's the setup we keep coming back to: package the app
          with <strong>Docker</strong>, serve it with <strong>Nginx</strong>,
          and let <strong>GitHub Actions</strong> build and deploy on every push
          to <code>main</code>.
        </p>

        <h2>What you'll need</h2>
        <p>
          Docker installed locally so you can test the image before it ever
          reaches a server, a Docker Hub account to push the image to, and a
          server to run it on. Any host works — we use a small $6/month cloud VM
          running Ubuntu, reachable over SSH. Pick the region closest to your
          users.
        </p>

        <h2>A multi-stage Docker build</h2>
        <p>
          The trick to a small, secure image is two stages. The first stage
          installs the Flutter SDK and compiles the web bundle; the second
          copies <em>only</em> the build output into a clean Nginx image. The
          final image ships the static site and nothing else — no Dart, no SDK,
          no build tools.
        </p>
        <Code>{`# ---- build stage ----
FROM ubuntu:22.04 AS builder
RUN apt-get update && apt-get install -y \\
    git curl unzip xz-utils libglu1-mesa ca-certificates
# install the Flutter SDK, then:
WORKDIR /src
COPY . .
RUN flutter build web --release

# ---- run stage ----
FROM nginx:alpine AS runner
COPY --from=builder /src/build/web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf`}</Code>

        <h2>Serving it with Nginx</h2>
        <p>
          The Nginx config is tiny — point the root at the built site and let
          it serve <code>index.html</code> as the entry point.
        </p>
        <Code>{`server {
    listen 80;
    location / {
        root  /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}`}</Code>
        <p>
          The <code>try_files</code> line matters for a single-page app: it
          routes unknown paths back to <code>index.html</code> so deep links and
          client-side routing don't 404.
        </p>

        <h2>Test it locally first</h2>
        <p>
          Never let the CI runner be the first place your image runs. Build and
          run it on your machine, then open the port and click around.
        </p>
        <Code>{`docker build -t simple_web .
docker run -p 3000:80 --name simple_web simple_web:latest
# visit http://localhost:3000`}</Code>

        <h2>Automate with GitHub Actions</h2>
        <p>
          Two jobs: <strong>build</strong> pushes the image to Docker Hub, and{" "}
          <strong>deploy</strong> SSHes into the server to pull and restart the
          container. Keep every credential in{" "}
          <strong>Settings → Secrets and variables</strong> — registry login,
          the server's host, and an SSH private key — never in the repo.
        </p>
        <Code>{`on:
  push:
    branches: [main]

env:
  IMAGE_NAME: \${{ secrets.DOCKER_REGISTRY_USERNAME }}/simple_web

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo \${{ secrets.DOCKER_REGISTRY_PASSWORD }} | docker login -u \${{ secrets.DOCKER_REGISTRY_USERNAME }} --password-stdin
      - run: docker build -t \${{ env.IMAGE_NAME }} .
      - run: docker push \${{ env.IMAGE_NAME }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Pull & restart on the server
        run: |
          install -m 600 -D /dev/null ~/.ssh/id_rsa
          echo "\${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
          ssh-keyscan -H "\${{ secrets.SSH_HOST }}" > ~/.ssh/known_hosts
          ssh root@\${{ secrets.SSH_HOST }} "docker pull \${{ env.IMAGE_NAME }}:latest && \\
            docker rm -f simple_web && \\
            docker run -d --name simple_web -p 3000:80 \${{ env.IMAGE_NAME }}:latest"`}</Code>
        <p>
          The <code>deploy</code> job declares <code>needs: build</code>, so it
          only runs once the image is published — a failed build never reaches
          the server.
        </p>

        <h2>The payoff</h2>
        <p>
          After this, the app is always one <code>git push</code> from live.
          No manual builds, no forgotten steps, no "works on my machine." The
          pipeline does the boring part so you can spend your attention on the
          product instead of the deploy.
        </p>
      </>
    ),
  },
  {
    slug: "js-to-rust",
    title: "Migrating a backend from JavaScript to Rust — without a rewrite",
    description:
      "A migration plan that runs the new language beside the old one, moves functions across one at a time behind a flag, and never freezes the product.",
    date: "2026-01-05",
    readTime: "7 min read",
    author: "James Dang",
    cover: mountain,
    body: (
      <>
        <p>
          JavaScript is too quiet about its mistakes. I once forgot a single{" "}
          <code>await</code> and took down production while I was away on
          vacation — Slack lighting up on the first night of the trip. The
          compiler in Java, Go, or Rust would have caught it before it shipped.
          JavaScript just stays silent and lets it happen.
        </p>
        <p>
          That quiet is exhausting. Every nested access becomes a defensive{" "}
          <code>a?.b?.c</code>; every PR over a couple hundred lines gets read
          line by line, and you still don't sleep well. After enough of those
          nights, we moved our backend to <strong>Rust</strong> — and we did it
          without ever stopping feature work.
        </p>

        <h2>The real constraint</h2>
        <p>
          You can't freeze a live product for a rewrite, and you can't ship a
          half-migrated system that quietly drops behavior. Functions are
          interdependent, so a big-bang switch risks <em>migration gaps</em> —
          replacing one bug with two. We needed to write new features in Rust{" "}
          <em>immediately</em>, move existing functions across gradually, and
          verify each one in the same sprint.
        </p>

        <h2>The idea: run both, side by side</h2>
        <p>
          So we ran a Rust service <em>beside</em> the JavaScript one. They talk
          over gRPC, and we move functions across one at a time. Each migrated
          function gets a switch — if the new path misbehaves, we flip back to
          the old one instantly. New code ships now; old code stays as a safety
          net until we trust the replacement.
        </p>

        <h2>gRPC, via ConnectRPC</h2>
        <p>
          Nothing exotic for the wire — gRPC is familiar and it works. We
          skipped <code>grpc-js</code>, though: its generated code confuses the
          IDE (no autocomplete) and the API is clumsy.{" "}
          <strong>ConnectRPC</strong> reads like normal modern JavaScript:
        </p>
        <Code>{`// grpc-js — no constructor args, setter soup, callbacks
const msg = new ProtoMessage();
msg.setPropA("something");
service.create(msg, (err, data) => { /* ... */ });

// connectrpc — plain objects, real promises
const msg = new ProtoMessage({ propA: "something" });
const data = await service.create(msg);`}</Code>

        <h2>A throwaway protobuf bridge</h2>
        <p>
          The bridge is temporary — it dies with the old service — so we don't
          over-invest. Using <code>google.protobuf.Struct</code> for both the
          request and response keeps it loose and JavaScript-friendly: the
          response comes back looking like a plain object.
        </p>
        <Code>{`syntax = "proto3";
package devlog;
import "google/protobuf/struct.proto";

service Discussion {
  rpc create (google.protobuf.Struct) returns (google.protobuf.Struct);
  rpc get    (google.protobuf.Struct) returns (google.protobuf.Struct);
}`}</Code>
        <p>
          Building a <code>Struct</code> by hand is verbose — you have to spell
          out every value and its type — so we wrote one small helper that
          converts any JS object into a <code>Struct</code> and never thought
          about it again.
        </p>

        <h2>The Migrated decorator</h2>
        <p>
          The piece that ties it together is a decorator. It wraps an existing
          method, and an environment flag decides whether the call goes to the
          new Rust path or the original implementation:
        </p>
        <Code>{`export function Migrated(fn: (...args: any[]) => any) {
  return (_t: any, _k: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return process.env.USE_MIGRATED_CODE
        ? fn.apply(this, args)        // new Rust service, over gRPC
        : original.apply(this, args); // old JS path
    };
  };
}`}</Code>
        <p>And applying it leaves the old code completely untouched:</p>
        <Code>{`class DiscussionService {
  @Migrated(async function (discussion) {
    const res = await rustService.create(struct(discussion));
    return res.fields;
  })
  async create(discussion) {
    // original JS implementation — runs only when the flag is off
  }
}`}</Code>
        <p>
          No old code changes, the new path is live immediately, and the flag
          flips both ways. That toggle is the whole point: it turns a scary
          migration into a reversible one.
        </p>

        <h2>Deployment</h2>
        <p>
          On Kubernetes, put both services in the <em>same pod</em>. They scale
          together as one unit, so your existing scaling and routing keep
          working while the gRPC hop between them stays local.
        </p>

        <h2>When this is worth it</h2>
        <p>
          This shines on large projects with sprint deliverables, where you
          can't pause to rewrite. For a small app or a side project, the bridge
          is probably more scaffolding than it's worth. But at scale, running
          Rust beside JavaScript and migrating behind a flag is how we got the
          compiler's safety without betting the product on a single cutover —
          and it's how we build everything at Midwess now.
        </p>
      </>
    ),
  },
  {
    slug: "rust-variants",
    title: "Polymorphism in Rust: Traits vs Enums",
    description:
      "Two ways Rust handles many types behind one interface — open sets with traits, closed sets with enums — and how to choose between them.",
    date: "2025-12-15",
    readTime: "4 min read",
    author: "James Dang",
    cover: night,
    body: (
      <>
        <p>
          Polymorphism means handling different types through one interface:
          call <code>say()</code> and the dog barks, the cat meows, and the
          caller doesn't care which it's holding. Most languages give you one
          tool for this. Rust gives you two — <strong>traits</strong> and{" "}
          <strong>enums</strong> — and picking the right one comes down to a
          single question: is the set of types <em>open</em> or{" "}
          <em>closed</em>?
        </p>

        <h2>Traits — an open set</h2>
        <p>
          A trait defines shared behavior. Any type — including ones that don't
          exist yet — can implement it, and a function can accept{" "}
          <code>&amp;dyn Trait</code> without knowing the concrete type. That's
          dynamic dispatch: the call is resolved at runtime through a vtable.
        </p>
        <Code>{`trait Speak {
    fn say(&self);
}

fn make_it_speak(a: &dyn Speak) {
    a.say();
}`}</Code>
        <p>
          Reach for traits when other people — plugins, downstream crates,
          future you — should be able to add new types without touching your
          code. The cost is a small runtime indirection and the loss of
          exhaustiveness: the compiler can't tell you "you forgot a case,"
          because the set is open by design.
        </p>

        <h2>Enums — a closed set</h2>
        <p>
          If you already know every variant up front, an enum is the better
          fit. Dispatch is static (often faster, and inline-able), and{" "}
          <code>match</code> forces you to handle every case — add a variant
          later and the compiler walks you to every place that needs updating.
        </p>
        <Code>{`enum Animal {
    Dog,
    Cat,
}

impl Animal {
    fn say(&self) {
        match self {
            Animal::Dog => println!("woof"),
            Animal::Cat => println!("meow"),
        }
    }
}`}</Code>

        <h2>Which one</h2>
        <p>
          Open to extension by others → <strong>traits</strong>. A fixed,
          known list — like the states of a workflow or the kinds of a token →{" "}
          <strong>enums</strong>: faster, simpler, and checked exhaustively at
          compile time. When in doubt, start with an enum; reach for a trait the
          moment you need someone outside your code to plug in a new type.
        </p>
      </>
    ),
  },
  {
    slug: "implement-resource-pool-in-rust",
    title: "Building an async resource pool in Rust",
    description:
      "Connections are expensive to open and limited in number. Here's the async pooling pattern we use to reuse them safely — copy-paste ready, no library.",
    date: "2025-12-01",
    readTime: "9 min read",
    author: "James Dang",
    cover: dunes,
    body: (
      <>
        <p>
          Every system runs into hard limits — Postgres defaults to 100
          concurrent connections, Ubuntu to 1024 open files per process. You
          can nudge those numbers, but you can never escape them, and slamming
          into the ceiling panics your system. On top of that, opening a
          connection isn't free: a TCP handshake, auth, and a backend process,
          paid on every request if you're careless. A <strong>resource pool</strong>{" "}
          fixes both: it keeps a bounded set of ready connections, hands them
          out, and takes them back. This is the async (Tokio) pool we actually
          run — no external library, just code you can lift into your project.
        </p>

        <h2>What using it looks like</h2>
        <p>
          Borrow a resource, use it, and let it return itself. The borrow handle
          implements <code>Deref</code>/<code>DerefMut</code>, so you call
          straight through to the connection:
        </p>
        <Code>{`async fn find_all(&self) -> Result<Vec<User>, Error> {
    let db = self.db_request.retrieve().await
        .ok_or(Error::DatabaseConnection)?;

    // Deref lets us call the resource directly
    let users = db.query("SELECT * FROM users").await;
    // returns to the pool automatically when \`db\` drops
    Ok(users)
}`}</Code>
        <p>
          <code>PoolRequest&lt;T&gt;</code> is a cheap{" "}
          <code>Send + Sync + Clone</code> handle you hand to every caller;
          its <code>retrieve()</code> asks the pool for a{" "}
          <code>PoolResponse&lt;T&gt;</code>, which guards the resource and
          guarantees it can't escape — it always finds its way home.
        </p>

        <h2>Four problems, four knobs</h2>
        <p>
          A naïve "keep N connections" pool breaks under real traffic. Four
          issues show up, each answered by one configuration knob:
        </p>
        <ul>
          <li>
            <strong>Bursts exceed the pool.</strong> Keep a{" "}
            <code>min_size</code> always warm, but allow growth up to a larger{" "}
            <code>max_size</code> when demand spikes.
          </li>
          <li>
            <strong>Growth never shrinks back.</strong> A{" "}
            <code>resource_idle_timeout</code> reclaims the extra resources once
            they sit unused — while never dropping below{" "}
            <code>min_size</code>. A spike to 1,000 settles back to 10 instead
            of leaving 990 idle forever.
          </li>
          <li>
            <strong>Requests past <code>max_size</code>.</strong> Rather than
            failing immediately, a <code>retrieving_timeout</code> lets a
            request wait for a resource to come back, then fails only if none
            does in time.
          </li>
          <li>
            <strong>Slow startup.</strong> Initialize the{" "}
            <code>min_size</code> resources <em>concurrently</em>, not one by
            one, so a warm pool doesn't mean a cold boot.
          </li>
        </ul>

        <h2>Abstracting the resource</h2>
        <p>
          The pool shouldn't know what a resource <em>is</em> — only how to make
          one. A provider trait captures that, and a struct carries the
          construction parameters:
        </p>
        <Code>{`pub trait PoolResourceProvider<T>: Send + Sync
where T: Send + Sync {
    async fn new(&self) -> T;
}

impl PoolResourceProvider<PgConnection> for DbProvider {
    async fn new(&self) -> PgConnection {
        postgres::connect(&self.connection_string).await
    }
}`}</Code>
        <p>
          Each resource is wrapped in a <code>PoolItem&lt;T&gt;</code> that
          tracks how long it's been idle. <code>refresh()</code> resets that
          clock when a resource returns from a job; <code>timeleft()</code>{" "}
          reports how long until it's eligible for cleanup — returning{" "}
          <code>Duration::ZERO</code> once it's overstayed.
        </p>

        <h2>Pool, Allocator, Cleaner</h2>
        <p>
          The design splits into three parts. The <strong>Pool</strong> owns the
          items and a counter; the <strong>Allocator</strong> creates and hands
          out resources; the <strong>Cleaner</strong> reclaims idle ones in the
          background.
        </p>
        <Code>{`pub struct Pool<T> where T: Send + Sync + 'static {
    min_size: usize,
    max_size: usize,
    items: Mutex<VecDeque<PoolItem<T>>>,
    counter: Mutex<usize>,
}`}</Code>
        <p>
          Why a separate <code>counter</code> instead of{" "}
          <code>items.len()</code>? Because a borrowed resource is{" "}
          <em>out</em> of <code>items</code> but still alive and owed back —
          the length undercounts it. The counter is the real source of truth for
          how many resources exist.
        </p>

        <h2>One lock at a time</h2>
        <p>
          The fastest way to deadlock a pool is to hold two locks at once: thread
          A waits on lock B while holding A, thread B waits on A while holding B,
          and they wait forever. The rule we enforce is simple — never hold more
          than one lock simultaneously.
        </p>
        <Code>{`// never:
let a = mutex_a.lock().await;
let b = mutex_b.lock().await; // both held — deadlock risk

// instead:
let a = mutex_a.lock().await;
drop(a);                      // release before acquiring the next
let b = mutex_b.lock().await;`}</Code>
        <p>
          The cleaner runs as a single background task, started only when the
          allocator notices the pool has grown past <code>min_size</code>. It
          calls <code>yield_now()</code> to avoid hogging the runtime and sleeps
          exactly until the next item is due to expire, instead of polling on a
          timer and re-locking the pool constantly.
        </p>

        <h2>Returning resources for free</h2>
        <p>
          I'd love <code>retrieve()</code> to just hand you the resource by
          value — but then nothing stops a caller from dropping it on the floor
          and starving the pool. So the resource comes wrapped in a{" "}
          <code>PoolResponse&lt;T&gt;</code>, and its <code>Drop</code>{" "}
          implementation returns it automatically:
        </p>
        <Code>{`impl<T> Drop for PoolResponse<T>
where T: Send + Sync + 'static {
    fn drop(&mut self) {
        let pool = self.pool.take();
        let resource = self.resource.take();
        if let (Some(pool), Some(resource)) = (pool, resource) {
            // hand it back without blocking the dropper
            tokio::spawn(async move { pool.put(resource).await; });
        }
    }
}`}</Code>
        <p>
          That's why the fields are <code>Option</code>: <code>Drop</code>{" "}
          takes the resource out and moves it into a spawned task that runs
          after the handle is gone. On return, if anyone is waiting in the queue,
          the resource gets one more trip out to serve them before it rests —
          first come, first served. The caller never has to remember anything;{" "}
          <code>Arc</code>, <code>Mutex</code>, and <code>Drop</code> are the
          whole toolkit behind a pool that's fast, bounded, and safe.
        </p>
      </>
    ),
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
