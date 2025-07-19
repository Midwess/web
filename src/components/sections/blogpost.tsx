'use client';

import { allPosts } from '../../../.contentlayer/generated/Post/_index.mjs';
import { DashedLine } from '../dashed-line';

import { PostItem } from '@/components/threejs/post_item';

export const BlogPosts = () => {
  return (
    <section id="feature-modern-teams" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            Blog posts.
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 grid items-center gap-8 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="pr-16 text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            We are a Rust lover, mobile software developer, and a product builder.
          </h2>
          <p className="text-muted-foreground leading-snug font-medium">
            We mainly used Rust to written all of our projects, So we will share our
            Rust experience with you.
          </p>
        </div>
        <div className={'w-ful mt-20 flex flex-col gap-12'}>
          {allPosts.map((it, index) => {
            return <PostItem key={index} post={it as never} />;
          })}
        </div>
      </div>
    </section>
  );
};
