import { Container } from "./Container";
import { SectionHeading, SubHeading, Badge } from "./Typography";
import milestonesData from "@/content/milestones.json";

type Milestone = {
  date: string;
  project: string;
  title: string;
  body: string;
};

/** Timeline entries live in `src/content/milestones.json` so the docs pipeline
 *  can keep them current; this component only renders them. */
const milestones = milestonesData as Milestone[];

export const Shipping = () => (
  <Container
    id="shipping"
    className="scroll-mt-20 border-x border-divide px-4 py-20 md:px-8 md:py-28"
  >
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Badge text="What's shipping" />
        <SectionHeading className="mt-4 text-left">
          Recent milestones
        </SectionHeading>
        <SubHeading as="p" className="mt-4 text-left">
          The public timeline across our projects.
        </SubHeading>
      </div>
      <ol className="relative space-y-10 border-l border-olive-800 pl-8">
        {milestones.map((m, idx) => (
          <li key={`${m.date}-${idx}`} className="relative">
            <span className="absolute -left-[2.4rem] top-1 flex size-3 items-center justify-center rounded-full border border-olive-700 bg-olive-950">
              <span className="size-1 rounded-full bg-olive-300" />
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive-500">
                  {m.date}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-olive-400">
                  {m.project}
                </span>
              </div>
              <h3 className="font-display text-lg font-medium text-olive-100">
                {m.title}
              </h3>
              <p className="text-sm leading-relaxed text-olive-400">{m.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </Container>
);
