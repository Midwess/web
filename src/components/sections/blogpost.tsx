'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { allPosts } from '../../../.contentlayer/generated/Post/_index.mjs';
import { DashedLine } from '../dashed-line';
import { PostItem } from '@/components/threejs/post_item';
import { PostPopup } from './post-popup';
import { Post } from 'contentlayer/generated';

export const BlogPosts = ({ initialPost }: { initialPost?: Post }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(initialPost || null);
  const router = useRouter();
  const pathname = usePathname();

  // Handle initial load and browser back/forward
  useEffect(() => {
    const handleUrlChange = () => {
      const pathParts = window.location.pathname.split('/');
      if (pathParts[1] === 'blog' && pathParts[2]) {
        const slug = pathParts[2];
        const post = allPosts.find((p) => p.slug === slug);
        if (post) {
          setSelectedPost(post as never);
        } else {
          setSelectedPost(null);
        }
      } else {
        // If we have an initial post and we're on a blog route, keep it
        // otherwise if we're on / we should eventually clear it if it's not the intended state
        if (!initialPost) {
          setSelectedPost(null);
        }
      }
    };

    if (!initialPost) {
      handleUrlChange();
    }
    
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [initialPost]);

  const handleOpenPost = (post: Post) => {
    setSelectedPost(post);
    window.history.pushState(null, '', `/blog/${post.slug}`);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <section id="feature-modern-teams" className="py-12 lg:py-16">
      <div className="container">
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-background text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            Blog posts.
          </span>
        </div>

        <div className="mx-auto mt-10 grid items-center gap-8 md:gap-0 lg:mt-16 lg:grid-cols-2">
          <h2 className="pr-16 text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Where curiosity meets the keyboard.
          </h2>
          <p className="text-muted-foreground leading-snug font-medium">
            Building software is a journey of discovery. We share the stories, 
            the mistakes, and the breakthroughs behind the products we craft.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {allPosts.map((it, index) => {
            return (
              <PostItem 
                key={index} 
                post={it as never} 
                onClick={() => handleOpenPost(it as never)} 
              />
            );
          })}
        </div>
      </div>
      
      <PostPopup 
        post={selectedPost} 
        onClose={handleClosePost} 
      />
    </section>
  );
};
