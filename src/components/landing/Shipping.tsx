import { Container } from "./Container";
import { SectionHeading, Badge } from "./Typography";
import vision from "@/content/vision.json";

/** Single global vision statement. The text lives in `src/content/vision.json`
 *  so the docs pipeline can rewrite it; this component only frames it. */
export const Shipping = () => (
  <Container
    id="vision"
    className="scroll-mt-20 border-x border-divide px-4 py-20 md:px-8 md:py-28"
  >
    <div className="mx-auto max-w-3xl text-center">
      <div className="flex justify-center">
        <Badge text="Vision" />
      </div>
      <SectionHeading className="mt-4">Where we're headed</SectionHeading>
      <p className="mx-auto mt-6 max-w-2xl text-balance font-display text-xl font-medium leading-relaxed text-olive-200 md:text-2xl">
        {vision.vision}
      </p>
    </div>
  </Container>
);
