import React from 'react';
import { allPosts } from 'contentlayer/generated';
import { siteMetadata } from '@/utils/site-meta-data';
import HomeContent from '@/components/layout/home-content';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: any) {
  const params = await props.params;
  const { slug } = params;

  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const publishedAt = new Date(post.publishedDate!).toISOString();
  const modifiedAt = new Date(post.publishedDate!).toISOString();

  let imageList = [siteMetadata.siteLogo];
  if (post.image) {
    imageList = [
      siteMetadata.siteUrl + post.image.filePath.replace('../public', ''),
    ];
  }

  const ogImages = imageList.map((img) => ({
    url: img.includes('http') ? img : siteMetadata.siteUrl + img,
  }));

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
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

export default async function Page(props: any) {
  const params = await props.params;
  const { slug } = params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <HomeContent initialPost={post as any} />;
}
