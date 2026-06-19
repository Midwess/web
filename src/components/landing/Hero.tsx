import { motion } from "motion/react";
import { Container } from "./Container";
import { Heading, SubHeading } from "./Typography";
import { DesertBackground } from "./DesertBackground";
import { HeroHighlights } from "./HeroHighlights";
import { HeroNoise } from "./HeroNoise";

export const Hero = () => (
  <Container className="relative flex min-h-[85vh] flex-col overflow-hidden border-x border-divide bg-olive-950">
    <DesertBackground variant="mountain" withMesh={false} />
    <HeroNoise />

    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-16 pb-16 md:pt-32 md:pb-24">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 rounded-full border border-olive-50/10 bg-olive-50/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-olive-100/70 backdrop-blur-xl"
      >
        <span>Aim for the top</span>
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Heading className="mt-6 text-olive-50 [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
          Agents that are efficient, smart,
          <br />
          <span className="text-olive-200">
            and understand exactly what you want
          </span>
        </Heading>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SubHeading
          as="p"
          className="mx-auto mt-6 max-w-xl font-medium text-olive-100/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]"
        >
          That's what we're building — the infrastructure that makes it real.
        </SubHeading>
      </motion.div>

    </div>

    <div className="relative z-20 w-full">
      <HeroHighlights />
    </div>
  </Container>
);
