import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'export',
  turbopack: {
    rules: {
      '*.{glsl,vs,fs,vert,frag}': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  images: {
    unoptimized: true,

    // If you want to use a custom image loader, uncomment the following lines
    // loader: 'custom',
    // loaderFile: './src/lib/imageLoader.ts',
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};
const withMDX = createMDX({
  // Add markdown plugins here, if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withContentlayer(withMDX(nextConfig));
