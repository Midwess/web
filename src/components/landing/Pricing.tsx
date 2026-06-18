import { Container } from "./Container";
import { Badge, SectionHeading, SubHeading } from "./Typography";
import { Button } from "./Button";
import { Link } from "./_link";
import { Check } from "lucide-react";

type Tier = {
  name: string;
  blurb: string;
  price: string;
  cadence: string;
  featured?: boolean;
  perks: string[];
  cta: string;
  ctaHref: string;
};

const tiers: Tier[] = [
  {
    name: "Community",
    blurb: "Use the projects, file issues, ship on your own.",
    price: "$0",
    cadence: "free, forever",
    cta: "Read the docs",
    ctaHref: "https://github.com/Midwess",
    perks: [
      "All three projects on GitHub",
      "Discord + GitHub Discussions",
      "Public roadmap",
      "MIT licensed",
    ],
  },
  {
    name: "Sponsor",
    blurb: "Fund the work. Get a faster line when you need one.",
    price: "$250",
    cadence: "/ month",
    featured: true,
    cta: "Sponsor on GitHub",
    ctaHref: "https://github.com/sponsors/Midwess",
    perks: [
      "Private Discord channel",
      "Prioritized issue triage",
      "Quarterly office hours",
      "Logo on the project sites",
      "Everything in Community",
    ],
  },
  {
    name: "Partner",
    blurb: "Custom integration, dedicated time, and a roadmap seat.",
    price: "Custom",
    cadence: "annual",
    cta: "Get in touch",
    ctaHref: "mailto:hello@midwess.ai",
    perks: [
      "Dedicated engineering hours",
      "Architecture review",
      "Custom feature work",
      "On-call escalation",
      "Everything in Sponsor",
    ],
  },
];

export const Pricing = () => (
  <Container className="border-x border-divide px-4 py-20 md:px-8 md:py-28">
    <div className="flex flex-col items-center text-center">
      <Badge text="Support the work" />
      <SectionHeading className="mt-4">
        Open source. Funded directly.
      </SectionHeading>
      <SubHeading as="p" className="mt-4 max-w-2xl">
        All three projects are MIT licensed and free to use. If the work
        matters to you, sponsor it — funding goes to the people doing the
        building.
      </SubHeading>
    </div>
    <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={
            tier.featured
              ? "relative flex flex-col gap-6 rounded-2xl border border-olive-50/20 bg-olive-950/70 p-8 shadow-[0_0_0_1px_rgba(231,229,228,0.06)]"
              : "flex flex-col gap-6 rounded-2xl border border-olive-800 bg-olive-950/30 p-8"
          }
        >
          {tier.featured && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-olive-50/20 bg-olive-950 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-olive-200">
              Most chosen
            </span>
          )}
          <div>
            <h3 className="font-display text-2xl font-medium text-olive-50">
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-olive-400">{tier.blurb}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-medium text-olive-50">
              {tier.price}
            </span>
            <span className="text-sm text-olive-500">{tier.cadence}</span>
          </div>
          <ul className="flex-1 space-y-2.5">
            {tier.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm text-olive-300">
                <Check className="mt-0.5 size-4 shrink-0 text-olive-200" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
          <Button
            as={Link}
            href={tier.ctaHref}
            variant={tier.featured ? "primary" : "secondary"}
            className="w-full"
          >
            {tier.cta}
          </Button>
        </div>
      ))}
    </div>
  </Container>
);
