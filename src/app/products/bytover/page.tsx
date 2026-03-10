import Image from 'next/image';
import PageFrame from '@/components/layout/page-frame';
import DottedBackground from '@/components/layout/dotted-background';
import GridSection from '@/components/layout/grid-section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export default function BytoverPage() {
  return (
    <PageFrame>
      <div className="min-h-screen bg-background pt-32">
        {/* Section 1: Product Hero */}
        <DottedBackground showGlow={true}>
          <GridSection showBottomBorder className="py-20 lg:py-32">
            <div className="container mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-sm font-semibold text-orange-500 uppercase tracking-widest mb-8">
                Revolutionizing Data
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
                Bytover <span className="text-orange-500 italic">Direct</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                The next generation of file sharing. No servers, no limits, no compromises. 
                Experience direct peer-to-peer data intelligence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full">
                  Start Sharing Now
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-full">
                  Read Documentation
                </Button>
              </div>
            </div>
          </GridSection>
        </DottedBackground>

        {/* Section 2: High Impact Banner (The Requested "Second Panner") */}
        <section className="relative w-full overflow-hidden min-h-[500px] flex items-center">
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
          
          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="max-w-5xl">
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1] uppercase italic mb-10">
                The raw power of <br/>
                <span className="text-orange-400">Peer-to-Peer</span>.
              </h2>
              <p className="text-2xl md:text-4xl font-bold text-white/95 tracking-tight leading-snug max-w-3xl">
                High-speed transfers that never touch a server. <br className="hidden md:block"/> 
                Your data, your rules, your speed.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Deep Dive Features */}
        <DottedBackground showGlow={false}>
          <GridSection showTopBorder showBottomBorder className="py-24 lg:py-32">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="p-8 rounded-3xl bg-secondary/30 border border-border/50">
                  <Zap className="size-10 text-orange-500 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Blazing Speed</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By bypassing the cloud entirely, we eliminate bottlenecking and latency. 
                    Your transfer speed is limited only by your own connection.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-secondary/30 border border-border/50">
                  <Shield className="size-10 text-orange-500 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Private by Design</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Zero-knowledge architecture. Since data never touches our servers, 
                    we couldn't see your files even if we wanted to.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-secondary/30 border border-border/50">
                  <Globe className="size-10 text-orange-500 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Global Network</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sync across devices anywhere in the world with localized data intelligence 
                    that optimizes routes in real-time.
                  </p>
                </div>
              </div>
              
              {/* Product Video / Mockup */}
              <div className="mt-24 relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 bg-black group shadow-2xl">
                <video
                  src="/video/bytover-space.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                   <div className="max-w-2xl">
                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Bytover Core Engine</h4>
                    <p className="text-gray-300 text-lg font-medium leading-relaxed">
                      Built for modern engineering teams who handle massive datasets and require absolute integrity.
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
