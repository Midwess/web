'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashedLine } from '../dashed-line';
import { cn } from '@/lib/utils';

export const Features = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="our-products" className="py-24 bg-background">
      <div className="container mb-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-xs font-semibold text-orange-500 uppercase tracking-widest">
            Portfolio
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl uppercase text-balance">
            Our <span className="text-orange-500">Products</span>
          </h2>
        </div>
      </div>

      {/* Paging Container using Embla */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          
          {/* Page 1: Video Showcase */}
          <div className="flex-[0_0_100%] min-w-0 px-4 md:px-8 lg:px-12">
            <div className="mx-auto max-w-[1400px] relative aspect-[21/9] w-full overflow-hidden rounded-[3rem] border border-white/10 bg-black group shadow-2xl">
              <video
                src="/video/bytover-space.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="max-w-2xl space-y-4">
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                    Bytover <span className="text-orange-500">Direct</span>
                  </h3>
                  <p className="text-gray-300 text-lg md:text-xl font-medium">
                    Skip the cloud. Stream entire folders instantly via ultra-fast P2P. No zipping, no uploading, no latency—just raw throughput.
                  </p>
                </div>
                <Link href="https://bytover.com" target="_blank">
                  <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 h-16 px-10 font-bold shadow-xl">
                    Visit Website
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Page 2: Feature Introduction (MiniMax Style) */}
          <div className="flex-[0_0_100%] min-w-0 px-4 md:px-8 lg:px-12">
            <div className="mx-auto max-w-[1400px] relative aspect-[21/9] w-full overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl flex items-center">

              {/* Background Image Layer */}
              <div className="absolute inset-0">
                <Image
                  src="/images/bytover-background.png"
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/40" />

              <div className="grid lg:grid-cols-2 w-full p-12 md:p-20 relative z-10">
                <div className="flex flex-col justify-center space-y-8 text-white">
                  <div className="space-y-4">
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8]">
                      Bytover <br/> <span className="text-orange-400">Core</span>
                    </h3>
                    <p className="text-blue-50 text-xl leading-relaxed max-w-lg opacity-90">
                      The raw power of Peer-to-Peer. High-speed transfers that never touch a server. Your data, your rules, your speed.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-400/20 p-2">
                        <Zap className="h-6 w-6 text-orange-400" />
                      </div>
                      <span className="font-bold text-lg uppercase tracking-wider">Zero-Zip</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-400/20 p-2">
                        <Shield className="h-6 w-6 text-blue-300" />
                      </div>
                      <span className="font-bold text-lg uppercase tracking-wider">Local-First</span>
                    </div>
                  </div>

                  <div>
                    <Link href="https://bytover.com" target="_blank">
                      <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-12 h-16 text-xl font-black rounded-full transition-all group shadow-2xl">
                        Visit Website
                        <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* 3D Emojis Layer */}
                <div className="relative hidden lg:flex items-center justify-center">
                  <div className="absolute top-0 right-0 animate-bounce-slow">
                    <Image src="/3d-emoji/ThumbsUp.png" alt="Emoji" width={180} height={140} className="drop-shadow-2xl rotate-[-15deg]" />
                  </div>
                  <div className="absolute bottom-0 left-0 animate-float">
                    <Image src="/3d-emoji/OkRight.png" alt="Emoji" width={200} height={160} className="drop-shadow-2xl rotate-[10deg]" />
                  </div>
                  <div className="absolute top-1/2 -right-12 animate-bounce-slow">
                    <Image src="/3d-emoji/Horns.png" alt="Emoji" width={120} height={110} className="drop-shadow-2xl" />
                  </div>
                  <div className="absolute top-0 -left-10 animate-float" style={{ animationDelay: '1s' }}>
                    <Image src="/3d-emoji/Love.png" alt="Emoji" width={100} height={100} className="drop-shadow-2xl rotate-[20deg]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Paging Indicators / Dots */}
      <div className="container flex justify-center mt-10 gap-3">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-2 transition-all duration-300 rounded-full",
              selectedIndex === index ? "w-16 bg-orange-500" : "w-2 bg-gray-300 dark:bg-gray-800"
            )}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      <div className="container mt-24">
        <DashedLine className="opacity-20" />
      </div>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(15px, -15px) rotate(2deg); }
          66% { transform: translate(-15px, 15px) rotate(-2deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
