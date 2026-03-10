import { BlogPosts } from '@/components/sections/blogpost';
import { Features } from '@/components/sections/features';
import Hero from '@/components/sections/hero';
import DottedBackground from '@/components/layout/dotted-background';
import GridSection from '@/components/layout/grid-section';
import PageFrame from '@/components/layout/page-frame';

export default function Home() {
  return (
    <PageFrame>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <DottedBackground showGlow={true}>
          <GridSection showTopBorder showBottomBorder>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
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
            <BlogPosts />
          </GridSection>
        </DottedBackground>
      </div>
    </PageFrame>
  );
}
