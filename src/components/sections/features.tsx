import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { DashedLine } from '../dashed-line';

import { Card, CardContent } from '@/components/ui/card';

const items = [
  {
    title: 'Bit bridge',
    image: '/features/bitbridge_mockup_1.png',
    description:
      'Sharing files to both nearby friends and remote via internet and P2P network',
  },
];

export const Features = () => {
  return (
    <section id="feature-modern-teams" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            My products
          </span>
        </div>

        <Card className="bg-cream/80 mt-8 rounded-3xl md:mt-12 lg:mt-20">
          <CardContent id={'bit-bridge'} className="flex p-0 max-md:flex-col">
            {items.map((item, i) => (
              <div key={i} className="flex flex-1 max-md:flex-col">
                <div className="flex-1">
                  <div className="relative aspect-[1.28/1] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.title} interface`}
                      fill
                      className="object-cover object-left-top ps-4 pt-2"
                    />
                    <div className="from-cream/80 absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent" />
                  </div>

                  <div className={'flex flex-col p-4'}>
                    <Link
                      href="#"
                      className={
                        'group flex items-center justify-between gap-4 pe-4 pt-4 md:pe-6 md:pt-6'
                      }
                    >
                      <h3 className="max-w-60 font-sans text-2xl leading-tight font-bold tracking-tight">
                        {item.title}
                      </h3>
                      <div className="rounded-full border p-2">
                        <ChevronRight className="size-6 transition-transform group-hover:translate-x-1 lg:size-9" />
                      </div>
                    </Link>
                    <p>{item.description}</p>
                  </div>
                </div>
                {i < items.length - 1 && (
                  <div className="relative hidden md:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
                {i < items.length - 1 && (
                  <div className="relative block md:hidden">
                    <DashedLine orientation="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
