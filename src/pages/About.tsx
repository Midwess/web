import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Container } from "@/components/landing/Container";
import { Badge, Heading, SectionHeading, SubHeading } from "@/components/landing/Typography";
import { Values } from "@/components/landing/Values";

const principles = [
  {
    title: "State outlives the process",
    body: "A runtime is only durable if its state survives the things that kill it — restart, crash, deploy, scale-to-zero. The work is making that property compose across layers instead of leaking into every application.",
  },
  {
    title: "Postgres, not a lookalike",
    body: "We don't ship a custom query language, a bespoke type system, or a new wire protocol where Postgres already has one. The faster the world agrees on a SQL, the more leverage every team gets from it.",
  },
  {
    title: "Operator-grade defaults",
    body: "Sane retries, audit logs, per-step observability — boring infrastructure that ships inside the platform, not as tribal knowledge bolted on by each team that picks us up.",
  },
];

const About = () => (
  <>
    <Navbar />
    <main>
      <DivideX />
      <Container className="flex flex-col items-center justify-center border-x border-divide px-4 pt-16 pb-12 md:px-8 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <Badge text="About" />
            <Heading className="mt-4 text-left">
              We build the layer
              <br />
              <span className="text-olive-50/40">under your runtime</span>
            </Heading>
            <SubHeading className="mt-6 mr-auto text-left">
              Midwess is a small team working on durable infrastructure for
              stateful workloads. We started with pglite-rs — an embedded
              Postgres for Rust — and grew out from there: worldant puts a
              durable world runtime on top, and PgPaw turns the same engine
              into a read-replica cache with realtime updates.
              <br />
              <br />
              Everything we ship is MIT licensed. We make money from sponsors
              and partners, not from a hosted control plane.
            </SubHeading>
          </div>
          <div className="rounded-3xl border border-divide bg-olive-900 p-8">
            <div className="grid h-full grid-cols-1 gap-6">
              {[
                { value: "3", label: "Open source projects" },
                { value: "MIT", label: "License" },
                { value: "Rust", label: "Primary language" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col items-start justify-end gap-2"
                >
                  <div className="font-display text-3xl font-medium text-olive-50 md:text-4xl">
                    {m.value}
                  </div>
                  <div className="text-sm text-olive-400">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <DivideX />

      <Container className="border-x border-divide px-4 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2">
          <div className="flex flex-col items-start justify-start">
            <Badge text="Principles" />
            <SectionHeading className="mt-4 text-left">
              What we hold to
            </SectionHeading>
            <SubHeading className="mt-6 mr-auto text-left">
              The principles that shape what we build and — more often — what
              we deliberately don't.
            </SubHeading>
          </div>
          <div className="grid grid-cols-1 divide-y divide-divide rounded-2xl border border-divide bg-olive-950">
            {principles.map((p) => (
              <div key={p.title} className="p-6 md:p-8">
                <h3 className="font-display text-lg font-medium text-olive-100">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-olive-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <DivideX />
      <Values />
      <DivideX />
    </main>
    <Footer />
  </>
);

export default About;
