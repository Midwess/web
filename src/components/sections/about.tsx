import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Images Left - Text Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection
          images={[
            { src: '/about/1.webp', alt: 'Team collaboration' },
            { src: '/about/2.webp', alt: 'Team workspace' },
          ]}
          className="xl:-translate-x-10"
        />

        <TextSection
          title="The team"
          paragraphs={[
            'We started building our team in the late 2024, and launch our first product BitBridge in the late 2025.',
            "We are 100% founder and team-owned, profitable, and we keep our team lean.",
          ]}
        />
      </div>

      {/* Text Left - Images Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection
          paragraphs={[
            "When creating a new product, we always start with the end user in mind. We want to build a product that is easy to use, easy to understand, and easy to love.",
            "We believe that the best products are not the ones that are the most feature-rich or the one that not have been exists",
            "but the one that is the most useful and the one that can help users to save time and money.",
          ]}
        />
        <ImageSection
          images={[
            { src: '/about/3.webp', alt: 'Modern workspace' },
            { src: '/about/4.webp', alt: 'Team collaboration' },
          ]}
          className="hidden lg:flex xl:translate-x-10"
        />
      </div>
    </section>
  );
};

export default About;

interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <div className="flex-1 space-y-4 text-lg font-medium md:space-y-6">
      {title && <h2 className="text-primary text-4xl font-medium">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <Link href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
