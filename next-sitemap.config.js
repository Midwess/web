/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://midwess.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://midwess.com/sitemap-0.xml',
    ],
  },
};
