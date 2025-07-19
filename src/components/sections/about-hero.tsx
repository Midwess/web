import { DashedLine } from '@/components/dashed-line';

export function AboutHero() {
  return (
    <section className="">
      <div className="container flex max-w-5xl flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            As a Vietnamese team, we are dedicated to bringing modern software to life with AI magic.
          </h1>

          <p className="text-muted-foreground mt-8 hidden space-y-6 text-lg font-medium text-balance md:block lg:mt-12">
            As a evolution of AI, we see our chance to develop high quality software with smallest effort than ever before.
            With just several members, we are building and will continue to build many products to help you and your team to be more productive.
            <br />
          </p>
        </div>
      </div>
    </section>
  );
}
