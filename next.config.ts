import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const VERSION = process.env.VERSION || process.env.RAILWAY_GIT_COMMIT_SHA;

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
  env: {
    NEXT_PUBLIC_S3_CDN_PREFIX: process.env.S3_CDN_PREFIX || '',
    NEXT_PUBLIC_VERSION: VERSION || '',
  },
  transpilePackages: ["shared_types"],
  assetPrefix: process.env.S3_CDN_PREFIX && VERSION ? `${process.env.S3_CDN_PREFIX}/commit-${VERSION}` : undefined,
  turbopack: {
    rules: {
      '*.{glsl,vs,fs,vert,frag}': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    return config;
  },
  allowedDevOrigins: [
    'https://premises-bedrooms-democrat-philadelphia.trycloudflare.com',
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cbe9ef0f806f8e7c2ed195f658a0c88b.r2.cloudflarestorage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-13678040a05e4d5eaa3d4afbb253827c.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.ap-southeast-1.wasabisys.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "s3.wasabisys.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "s3.us-east-2.wasabisys.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "s3.us-west-1.wasabisys.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "s3.ap-southeast-2.wasabisys.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "s3.eu-central-2.wasabisys.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "midwess.sgp1.digitaloceanspaces.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "midwess.sgp1.cdn.digitaloceanspaces.com",
        pathname: "/**"
      }
    ],
    unoptimized: true,
  }
};
const withMDX = createMDX({
  // Add markdown plugins here, if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withContentlayer(withMDX(nextConfig));
