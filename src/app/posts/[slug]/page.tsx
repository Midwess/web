import React from 'react';

import { allPosts } from 'contentlayer/generated';

import PostPageContent from '@/app/posts/[slug]/content';
import { siteMetadata } from '@/utils/site-meta-data';

export async function generateStaticParams() {
  return allPosts.map((post) => {
    return {
      slug: post.slug,
    };
  });
}

export async function generateMetadata(props: object) {
  const {
    params: { slug },
  } = props as never;

  const post = allPosts.find((post) => post.slug === slug);
  if (!post) {
    return {};
  }

  const publishedAt = new Date(post.publishedDate!).toString();
  const modifiedAt = new Date(post.publishedDate!).toString();

  let imageList = [siteMetadata.siteLogo];
  if (post.image) {
    imageList = [
      siteMetadata.siteUrl + post.image.filePath.replace('../public', ''),
    ];
  }

  const ogImages = imageList.map((img) => {
    return { url: img.includes('http') ? img : siteMetadata.siteUrl + img };
  });

  const authors = [{ name: post.authorFullName }];

  return {
    ...siteMetadata,
    authors,
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: siteMetadata.siteUrl + post.url,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ogImages,
    },
  };
}

export default function PostPage(props: object) {
  return (
    <>
      <div className={'h-screen'}>
        <div className={`absolute top-0 left-0 z-0 bg-white`}>
          <PostPageContent {...props} />
        </div>
      </div>
    </>
  );
}
