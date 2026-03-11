import { ArrowRight, Code2, Globe2 } from 'lucide-react';

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
              Est. 2025 • Mekong Delta, South Vietnam
            </div>

            <div className="space-y-4 text-left">
              <h1 className="font-sans text-4xl leading-[1] font-extrabold tracking-tighter text-balance uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                Software that <span className="text-orange-500">feels</span> <br />{' '}
                like magic
              </h1>
              <p className="text-muted-foreground max-w-[600px] text-lg leading-relaxed sm:text-xl">
                Midwess is a boutique startup studio and open knowledge base. We build high-performance productivity tools.
              </p>            </div>

            <Button
              size="lg"
              className="h-12 border-none bg-orange-500 px-8 text-base font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
            >
              Experience the magic
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-bold"
            >
              Read our journey
            </Button>

            <div className="grid grid-cols-2 gap-8 pt-8 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
                  <Globe2 className="h-4 w-4 text-orange-500" />
                  Vibe
                </div>
                <div className="text-2xl font-bold tracking-tight">
                  High Fidelity
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
                  <Code2 className="h-4 w-4 text-orange-500" />
                  Heart
                </div>
                <div className="text-2xl font-bold tracking-tight">
                  Mekong Delta
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="border-border bg-card relative z-10 rounded-xl border p-6 shadow-2xl">
              <div className="border-border mb-4 flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20" />
                    <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/20" />
                    <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20" />
                  </div>
                  <span className="text-muted-foreground ml-2 font-mono text-xs">
                    ~/midwess/dna.json
                  </span>
                </div>
                <div className="bg-muted text-muted-foreground flex items-center gap-2 rounded-lg px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
                  ethos
                </div>
              </div>
              <pre className="text-foreground overflow-x-auto font-mono text-sm leading-relaxed">
                <code>{`{
  "mission": "Create moments of delight",
  "vision": "Software worth loving",
  "craft": ["Beauty", "Speed", "Intent"],
  "location": "Mekong Delta",
  "status": "Building magic"
}`}</code>
              </pre>
            </div>

            {/* Subtle decorative glow behind the code block */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-orange-500/5 opacity-40 blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
