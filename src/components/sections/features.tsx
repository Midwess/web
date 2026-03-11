'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, Shield, Zap } from 'lucide-react';

import { DashedLine } from '../dashed-line';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAssetUrl } from '@/utils/asset-url';

export const Features = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
  });
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
    <section id="our-products" className="bg-background py-24">
      <div className="container mb-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-xs font-semibold tracking-widest text-orange-500 uppercase">
            Portfolio
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-balance uppercase sm:text-5xl md:text-6xl">
            Our <span className="text-orange-500">Products</span>
          </h2>
        </div>
      </div>

      {/* Paging Container using Embla */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {/* Page 1: Video Showcase */}
          <div className="min-w-0 flex-[0_0_100%] px-4 md:px-8 lg:px-12">
            <div className="group relative mx-auto aspect-[21/9] w-full max-w-[1400px] overflow-hidden rounded-[3rem] border border-white/10 bg-black shadow-2xl">
              <video
                src={getAssetUrl('/video/bytover-space.mp4')}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={getAssetUrl('/hero.webp')}
                className="h-full w-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              <div className="absolute right-12 bottom-12 left-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-2xl space-y-4">
                  <h3 className="text-4xl leading-none font-black tracking-tighter text-white uppercase md:text-6xl">
                    Bytover <span className="text-orange-500">Magic</span>
                  </h3>
                  <p className="text-lg font-medium text-gray-300 md:text-xl">
                    Experience the freedom of instant sharing. No cloud, no zips, 
                    no waiting. Just a link and your files move like magic, 
                    directly between devices.
                  </p>
                </div>
                <Link href="https://bytover.com" target="_blank">
                  <Button
                    size="lg"
                    className="h-16 rounded-full bg-white px-10 font-bold text-black shadow-xl hover:bg-gray-200"
                  >
                    Try the magic
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Page 2: Feature Introduction (MiniMax Style) */}
          <div className="min-w-0 flex-[0_0_100%] px-4 md:px-8 lg:px-12">
            <div className="relative mx-auto flex aspect-[21/9] w-full max-w-[1400px] items-center overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
              {/* Background Image Layer */}
              <div className="absolute inset-0">
                <Image
                  src={getAssetUrl('/images/bytover-background.png')}
                  alt="Background"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 grid w-full p-12 md:p-20 lg:grid-cols-2">
                <div className="flex flex-col justify-center space-y-8 text-white">
                  <div className="space-y-4">
                    <h3 className="text-5xl leading-[0.8] font-black tracking-tighter uppercase md:text-7xl">
                      Bytover <br />{' '}
                      <span className="text-orange-400">Direct</span>
                    </h3>
                    <p className="max-w-lg text-xl leading-relaxed text-blue-50 opacity-90">
                      Why upload when you can just share? Bytover creates a direct 
                      bridge between devices, giving you total control and 
                      unmatched speed.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-orange-400/20 p-2">
                        <Zap className="h-6 w-6 text-orange-400" />
                      </div>
                      <span className="text-lg font-bold tracking-wider uppercase">
                        Instant
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-400/20 p-2">
                        <Shield className="h-6 w-6 text-blue-300" />
                      </div>
                      <span className="text-lg font-bold tracking-wider uppercase">
                        Private
                      </span>
                    </div>
                  </div>

                  <div>
                    <Link href="https://bytover.com" target="_blank">
                      <Button
                        size="lg"
                        className="group h-16 rounded-full bg-white px-12 text-xl font-black text-blue-900 shadow-2xl transition-all hover:bg-blue-50"
                      >
                        Visit Website
                        <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* 3D Emojis Layer */}
                <div className="relative hidden items-center justify-center lg:flex">
                  <div className="animate-bounce-slow absolute top-0 right-0">
                    <Image
                      src={getAssetUrl('/3d-emoji/ThumbsUp.png')}
                      alt="Emoji"
                      width={180}
                      height={140}
                      className="rotate-[-15deg] drop-shadow-2xl"
                    />
                  </div>
                  <div className="animate-float absolute bottom-0 left-0">
                    <Image
                      src={getAssetUrl('/3d-emoji/OkRight.png')}
                      alt="Emoji"
                      width={200}
                      height={160}
                      className="rotate-[10deg] drop-shadow-2xl"
                    />
                  </div>
                  <div className="animate-bounce-slow absolute top-1/2 -right-12">
                    <Image
                      src={getAssetUrl('/3d-emoji/Horns.png')}
                      alt="Emoji"
                      width={120}
                      height={110}
                      className="drop-shadow-2xl"
                    />
                  </div>
                  <div
                    className="animate-float absolute top-0 -left-10"
                    style={{ animationDelay: '1s' }}
                  >
                    <Image
                      src={getAssetUrl('/3d-emoji/Love.png')}
                      alt="Emoji"
                      width={100}
                      height={100}
                      className="rotate-[20deg] drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paging Indicators / Dots */}
      <div className="container mt-10 flex justify-center gap-3">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              selectedIndex === index
                ? 'w-16 bg-orange-500'
                : 'w-2 bg-gray-300 dark:bg-gray-800',
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
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(15px, -15px) rotate(2deg);
          }
          66% {
            transform: translate(-15px, 15px) rotate(-2deg);
          }
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
