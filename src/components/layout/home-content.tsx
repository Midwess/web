import DottedBackground from '@/components/layout/dotted-background';
import GridSection from '@/components/layout/grid-section';
import PageFrame from '@/components/layout/page-frame';
import { BlogPosts } from '@/components/sections/blogpost';
import { Features } from '@/components/sections/features';
import Hero from '@/components/sections/hero';

import { Post } from 'contentlayer/generated';

export default function HomeContent({ initialPost }: { initialPost?: Post }) {
  return (
    <PageFrame>
      <div className="bg-background min-h-screen">
        {/* Hero Section */}
        <DottedBackground showGlow={true}>
          <GridSection showTopBorder showBottomBorder>
            <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
              <Hero />
            </div>
          </GridSection>
        </DottedBackground>

        {/* Features Section */}
        <DottedBackground showGlow={false}>
          <GridSection showTopBorder showBottomBorder>
            <Features />
          </GridSection>
        </DottedBackground>

        {/* Blog Posts Section */}
        <DottedBackground showGlow={false}>
          <GridSection showTopBorder showBottomBorder>
            <BlogPosts initialPost={initialPost} />
          </GridSection>
        </DottedBackground>
      </div>
    </PageFrame>
  );
}
