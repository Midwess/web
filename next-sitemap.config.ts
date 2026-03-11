import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://midwess.com';

export default {
  ...nextConfig,
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
