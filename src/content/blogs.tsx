import type { ReactNode } from "react";
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
    slug: "deploy-flutter-web",
    title: "Deploying Flutter Web with GitHub Actions",
    description:
      "Ship a Flutter web app on every push — Docker, Nginx, and a GitHub Actions pipeline.",
    date: "2026-01-20",
    readTime: "4 min read",
    author: "James Dang",
    cover: dunes,
    body: (
      <>
        <p>
          Building a Flutter web app is easy. Shipping it the same way every
          time is the hard part. Here's the setup we use: package the app with
          Docker, serve it with Nginx, and let GitHub Actions deploy on every
          push to <code>main</code>.
        </p>
        <h2>Package it with a multi-stage build</h2>
        <p>
          One stage builds the Flutter bundle, the next drops it into a tiny
          Nginx image — so the final image carries no toolchain, just the
          static site.
        </p>
        <Code>{`# build
FROM ubuntu:22.04 AS builder
RUN flutter build web --release
# serve
FROM nginx:alpine
COPY --from=builder /app/build/web /usr/share/nginx/html`}</Code>
        <h2>Automate the deploy</h2>
        <p>
          The workflow logs in to Docker Hub, builds and pushes the image, then
          SSHes to the server to pull and restart the container. Keep the
          registry and SSH credentials in <strong>Settings → Secrets</strong>,
          never in the repo.
        </p>
        <h2>The payoff</h2>
        <p>
          After this, the app is always one <code>git push</code> from live. No
          manual builds, no forgotten steps — the pipeline does the boring part
          so you don't have to.
        </p>
      </>
    ),
  },
  {
    slug: "js-to-rust",
    title: "Why we moved our backend to Rust",
    description:
      "Tired of silent failures in JavaScript, we migrated to Rust — without a big-bang rewrite.",
    date: "2026-01-05",
    readTime: "4 min read",
    author: "James Dang",
    cover: mountain,
    body: (
      <>
        <p>
          JavaScript is too quiet about its mistakes. A single missing{" "}
          <code>await</code> once took down production while we were away — the
          kind of bug Rust's compiler refuses to let ship. After years of
          walking on eggshells, we switched our backend to{" "}
          <strong>Rust</strong>.
        </p>
        <h2>Migrate without stopping</h2>
        <p>
          You can't freeze a live product for a rewrite. So we ran a Rust
          service <em>beside</em> the JavaScript one, talking over gRPC, and
          moved functions across one at a time behind a feature flag. If a new
          path misbehaved, we flipped the switch back instantly.
        </p>
        <Code>{`@Migrated(async (data) => rustService.createUser(data))
async createUser(data) {
  // old JS path — runs only if the flag is off
}`}</Code>
        <h2>What changed</h2>
        <p>
          We spend far less time chasing silent failures and more time
          shipping. The bridge strategy gives you Rust's safety and speed
          without the risk of a "big bang" — and it's how we build everything
          at Midwess.
        </p>
      </>
    ),
  },
  {
    slug: "rust-variants",
    title: "Polymorphism in Rust: Traits vs Enums",
    description:
      "Two ways Rust handles many types behind one interface — and when to reach for each.",
    date: "2025-12-15",
    readTime: "3 min read",
    author: "James Dang",
    cover: night,
    body: (
      <>
        <p>
          Polymorphism means handling different types through one interface —
          call <code>say()</code> and the dog barks, the cat meows. Rust gives
          you two tools for it: <strong>Traits</strong> and{" "}
          <strong>Enums</strong>.
        </p>
        <h2>Traits — an open set</h2>
        <p>
          A trait defines shared behavior. Any type can implement it, and
          functions accept <code>&amp;dyn Trait</code> without knowing the
          concrete type. This is dynamic dispatch — reach for it when others
          should be able to add new types (plugins, extensions).
        </p>
        <Code>{`trait Speak { fn say(&self); }
fn make_it_speak(a: &dyn Speak) { a.say(); }`}</Code>
        <h2>Enums — a closed set</h2>
        <p>
          If you already know every variant, an enum is better. The compiler
          uses static dispatch (faster) and forces you to handle every case in
          a <code>match</code>.
        </p>
        <Code>{`enum Animal { Dog, Cat }
impl Animal {
  fn say(&self) {
    match self { Animal::Dog => /* woof */, Animal::Cat => /* meow */ }
  }
}`}</Code>
        <h2>Which one</h2>
        <p>
          Open to extension → <strong>Traits</strong>. Fixed list, like the
          states in a workflow → <strong>Enums</strong>: faster, simpler, and
          exhaustively checked.
        </p>
      </>
    ),
  },
  {
    slug: "implement-resource-pool-in-rust",
    title: "Building a resource pool in Rust",
    description:
      "Connections are expensive. Here's the async pool pattern we use to reuse them safely.",
    date: "2025-12-01",
    readTime: "5 min read",
    author: "James Dang",
    cover: dunes,
    body: (
      <>
        <p>
          Opening a Postgres connection costs a TCP handshake, auth, and a
          backend process — far too much to repeat per request. A{" "}
          <strong>resource pool</strong> keeps open connections around: borrow
          one, use it, return it.
        </p>
        <h2>The shape</h2>
        <p>
          A pool holds idle resources behind a <code>Mutex</code>, with a{" "}
          <code>min_size</code> it always keeps warm and a <code>max_size</code>{" "}
          it never exceeds. When everything is checked out, new requests wait in
          a queue on a one-shot channel until one comes back.
        </p>
        <h2>Return for free with Drop</h2>
        <p>
          The trick that makes it ergonomic: implement <code>Drop</code> on the
          borrow handle, and the resource returns to the pool the moment it goes
          out of scope — the caller never has to remember.
        </p>
        <Code>{`impl<T> Drop for PoolResponse<T> {
  fn drop(&mut self) {
    if let Some(item) = self.item.take() {
      let pool = self.pool.clone();
      tokio::spawn(async move { pool.return_resource(item).await; });
    }
  }
}`}</Code>
        <h2>Clean up lazily</h2>
        <p>
          A background task closes resources that have idled past their limit
          (above <code>min_size</code>). Instead of polling on a timer, it sleeps
          exactly until the next item is due to expire. <code>Arc</code>,{" "}
          <code>Mutex</code>, and <code>Drop</code> are all you need for a pool
          that's fast and safe.
        </p>
      </>
    ),
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
