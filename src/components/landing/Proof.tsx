import { motion } from "motion/react";
import { Container } from "./Container";
import { SectionHeading, SubHeading, Badge } from "./Typography";
import { Link } from "./_link";

export const Proof = () => (
  <Container
    id="proof"
    className="scroll-mt-20 border-x border-divide px-4 py-20 md:px-8 md:py-28"
  >
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="flex justify-center">
        <Badge text="Dogfooding" />
      </div>
      <SectionHeading className="mt-4">
        We run on our own infrastructure
      </SectionHeading>
      <SubHeading as="p" className="mx-auto mt-5 max-w-2xl text-olive-300">
        PgPaw embeds pglite-rs as its logical replica — our realtime Postgres
        cache runs on our own embedded Postgres engine, in production. We ship the
        same libraries we build on.
      </SubHeading>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
        <Link
          href="/pgpaw"
          className="text-olive-200 transition-colors hover:text-olive-50"
        >
          See PgPaw →
        </Link>
        <Link
          href="/pglite-rs"
          className="text-olive-200 transition-colors hover:text-olive-50"
        >
          Built on pglite-rs →
        </Link>
      </div>
    </motion.div>
  </Container>
);
