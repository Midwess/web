import { Blend, CircleDot } from 'lucide-react';

import { DashedLine } from '../dashed-line';

import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Sharing',
    description: 'I share my experience and knowledge to this website',
    icon: CircleDot,
  },
  {
    title: `Let's connect`,
    description: (
      <div className={'flex flex-col gap-1'}>
        <p>Stay connected and get my latest updates</p>
        <a href={'https://x.com'} className={'underline'}>
          My X account
        </a>
      </div>
    ),
    icon: Blend,
  },
];

export default function Hero() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left side - Main content */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl md:whitespace-nowrap lg:text-6xl">
            Hi! I'm Tien 👋
          </h1>

          <p className="text-muted-foreground mt-5 font-sans text-2xl font-medium md:text-3xl lg:text-4xl">
            Welcome to my studio, I'm working as a indie developer, productivity
            software.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button>Join my waiting list</Button>
          </div>
        </div>

        {/* Right side - Features */}
        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:ps-10">
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="mt-1 size-4 shrink-0 lg:size-5" />
                <div>
                  <h2 className="font-inter font-semibold">{feature.title}</h2>
                  <div className="text-muted-foreground max-w-76 text-sm">
                    {feature.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
