import CreamContainer from '@/components/layout/cream-container';
import { BlogPosts } from '@/components/sections/blogpost';
import { Features } from '@/components/sections/features';
import Hero from '@/components/sections/hero';

export default function Home() {
  return (
    <>
      <CreamContainer className="via-muted to-muted/80">
        <Hero />
        <Features />
        <BlogPosts />
      </CreamContainer>
    </>
  );
}
