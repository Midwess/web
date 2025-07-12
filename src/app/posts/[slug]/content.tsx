import { getMDXComponent } from 'next-contentlayer/hooks';

import { allPosts } from 'contentlayer/generated';

export default function PostPageContent(props: object) {
  return (
    <div className={'relative h-screen w-screen'}>
      <div className={'h-screen w-screen'}>
        <HtmlDom {...props} />
      </div>
    </div>
  );
}

function HtmlDom(props: object) {
  const {
    params: { slug },
  } = props as never;

  const post = allPosts.find((post) => post.slug === slug)!;
  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <div className={'h-full w-full'}>
        <div className="bg-cream container flex flex-col">
          <div className="container grid w-full grid-cols-12 !px-2 backdrop-blur-3xl">
            <div className="cols-span-full col-span-full mt-2 flex flex-col items-center md:mt-8 lg:col-span-6 lg:justify-start lg:pl-16">
              <article className="px-auto container overflow-hidden rounded-xl !pt-0 backdrop-blur-lg">
                <Content />
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
