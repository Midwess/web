import React from 'react';

import { getMDXComponent } from 'next-contentlayer2/hooks';

import { allPosts } from 'contentlayer/generated';

import { TableOfContent } from '@/app/posts/table-of-content';

import Lottie from '@/components/lottie';

export default function PostPageContent(props: any) {
  return (
    <div className={'w-screen'}>
      <div className={'w-screen'}>
        <HtmlDom slug={props.slug} />
      </div>
    </div>
  );
}

function HtmlDom(props: any) {
  const { slug } = props;

  const post = allPosts.find((post) => post.slug === slug)!;
  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <div className={'h-full w-full'}>
        <div className="container flex flex-col">
          <section className="py-28 lg:py-32 lg:pt-44">
            <div className="container max-w-2xl">
              <h1 className="w-full text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
            </div>
          </section>
          <div className="container grid w-full grid-cols-12 !px-2 backdrop-blur-3xl">
            <div className="col-span-full flex h-fit flex-row items-center justify-center lg:sticky lg:top-20 lg:left-5 lg:col-span-3 lg:items-start lg:justify-start">
              <TableOfContent post={post} />
            </div>
            <div className="cols-span-full col-span-full mt-2 flex flex-col items-center md:mt-8 lg:col-span-6 lg:justify-start lg:pl-16">
              <article className="px-auto [&>p]:text-muted-foreground [&>h3]:text-foreground [&>h2]:text-foreground container overflow-visible rounded-xl !pt-0 font-sans backdrop-blur-lg [&>figure]:w-2xl [&>figure]:overflow-x-scroll [&>figure]:py-4 [&>h1]:py-5 [&>h1]:text-3xl [&>h1]:font-semibold [&>h3]:py-4 [&>img]:overflow-clip [&>img]:rounded-4xl [&>p]:py-3 [&>p]:text-lg [&>p]:font-medium">
                <Content components={{ Lottie }} />
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
