import Image from 'next/image';

import { Zap, Shield, Globe } from 'lucide-react';

import DottedBackground from '@/components/layout/dotted-background';
import GridSection from '@/components/layout/grid-section';
import PageFrame from '@/components/layout/page-frame';
import { Button } from '@/components/ui/button';

export default function BytoverPage() {
  return (
    <PageFrame>
      <div className="bg-background min-h-screen pt-32">
        {/* Section 1: Product Hero */}
        <DottedBackground showGlow={true}>
          <GridSection showBottomBorder className="py-20 lg:py-32">
            <div className="container mx-auto px-6 text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-sm font-semibold tracking-widest text-orange-500 uppercase">
                Revolutionizing Data
              </div>
              <h1 className="mb-6 text-5xl leading-none font-black tracking-tighter uppercase md:text-8xl">
                Bytover <span className="text-orange-500 italic">Direct</span>
              </h1>
              <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-xl leading-relaxed md:text-2xl">
                The next generation of file sharing. No servers, no limits, no
                compromises. Experience direct peer-to-peer data intelligence.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 rounded-full px-10 text-lg font-bold"
                >
                  Start Sharing Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-10 text-lg font-bold"
                >
                  Read Documentation
                </Button>
              </div>
            </div>
          </GridSection>
        </DottedBackground>

        {/* Section 2: High Impact Banner (The Requested "Second Panner") */}
        <section className="relative flex min-h-[500px] w-full items-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/bytover-background.png"
              alt="Bytover Core Technology"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Creative Overlay Grid */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="relative z-10 container mx-auto px-6 py-24">
            <div className="max-w-5xl">
              <h2 className="mb-10 text-4xl leading-[1] font-black tracking-tighter text-white uppercase italic md:text-7xl lg:text-8xl">
                The raw power of <br />
                <span className="text-orange-400">Peer-to-Peer</span>.
              </h2>
              <p className="max-w-3xl text-2xl leading-snug font-bold tracking-tight text-white/95 md:text-4xl">
                High-speed transfers that never touch a server.{' '}
                <br className="hidden md:block" />
                Your data, your rules, your speed.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Deep Dive Features */}
        <DottedBackground showGlow={false}>
          <GridSection
            showTopBorder
            showBottomBorder
            className="py-24 lg:py-32"
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <div className="bg-secondary/30 border-border/50 rounded-3xl border p-8">
                  <Zap className="mb-6 size-10 text-orange-500" />
                  <h3 className="mb-4 text-2xl font-bold tracking-tight uppercase">
                    Blazing Speed
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By bypassing the cloud entirely, we eliminate bottlenecking
                    and latency. Your transfer speed is limited only by your own
                    connection.
                  </p>
                </div>
                <div className="bg-secondary/30 border-border/50 rounded-3xl border p-8">
                  <Shield className="mb-6 size-10 text-orange-500" />
                  <h3 className="mb-4 text-2xl font-bold tracking-tight uppercase">
                    Private by Design
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Zero-knowledge architecture. Since data never touches our
                    servers, we couldn't see your files even if we wanted to.
                  </p>
                </div>
                <div className="bg-secondary/30 border-border/50 rounded-3xl border p-8">
                  <Globe className="mb-6 size-10 text-orange-500" />
                  <h3 className="mb-4 text-2xl font-bold tracking-tight uppercase">
                    Global Network
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sync across devices anywhere in the world with localized
                    data intelligence that optimizes routes in real-time.
                  </p>
                </div>
              </div>

              {/* Product Video / Mockup */}
              <div className="group relative mt-24 aspect-[21/9] overflow-hidden rounded-[3rem] border border-white/10 bg-black shadow-2xl">
                <video
                  src="/video/bytover-space.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-12">
                  <div className="max-w-2xl">
                    <h4 className="mb-4 text-3xl font-black tracking-tighter text-white uppercase">
                      Bytover Core Engine
                    </h4>
                    <p className="text-lg leading-relaxed font-medium text-gray-300">
                      Built for modern engineering teams who handle massive
                      datasets and require absolute integrity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GridSection>
        </DottedBackground>
      </div>
    </PageFrame>
  );
}
