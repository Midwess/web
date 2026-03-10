import { ArrowRight, Code2, Globe2, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold text-orange-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
              </span>
              Est. 2024 • West Vietnam
            </div>

            <div className="space-y-4 text-left">
              <h1 className="text-balance font-sans text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[1]">
                Crafting the <span className="text-orange-500">Future of Software</span> from the West
              </h1>
              <p className="text-muted-foreground max-w-[600px] text-lg sm:text-xl leading-relaxed">
                Midwess is a boutique startup studio and open knowledge base. We build high-performance productivity tools while documenting the journey for the next generation of engineers.
              </p>
            </div>

              <Button size="lg" className="h-12 px-8 text-base font-bold bg-orange-500 hover:bg-orange-600 text-white border-none shadow-orange-500/20 shadow-lg">
                Explore our studio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-bold">
                Read the devlogs
              </Button>

            <div className="grid grid-cols-2 gap-8 pt-8 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <Globe2 className="h-4 w-4 text-orange-500" />
                  Culture
                </div>
                <div className="text-2xl font-bold tracking-tight">Open Knowledge</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <Code2 className="h-4 w-4 text-orange-500" />
                  Foundation
                </div>
                <div className="text-2xl font-bold tracking-tight">Mekong Delta</div>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="relative z-10 rounded-xl border border-border bg-card p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">~/midwess/manifesto.json</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  values
                </div>
              </div>
              <pre className="font-mono text-sm leading-relaxed text-foreground overflow-x-auto">
                <code>{`{
  "mission": "Co-create intelligence",
  "vision": "Scale through knowledge",
  "craft": ["Rust", "Next.js", "AI"],
  "location": "West Side of Vietnam",
  "status": "Building the future"
}`}</code>
              </pre>
            </div>
            
            {/* Subtle decorative glow behind the code block */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-orange-500/5 blur-[100px] opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
