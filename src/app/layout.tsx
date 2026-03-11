import { DM_Mono, Inter } from 'next/font/google';
import localFont from 'next/font/local';

import type { Metadata } from 'next';

import { Footer } from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const getMetadataAssetUrl = (path: string): string => {
  const prefix = process.env.NEXT_PUBLIC_S3_CDN_PREFIX;
  const version = process.env.NEXT_PUBLIC_VERSION;

  if (prefix && version) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${prefix}/commit-${version}${normalizedPath}`;
  }

  return path;
};

const dmSans = localFont({
  src: [
    {
      path: '../../fonts/dm-sans/DMSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/dm-sans/DMSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../fonts/dm-sans/DMSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/dm-sans/DMSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../fonts/dm-sans/DMSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../fonts/dm-sans/DMSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://midwess.com'),
  title: {
    default: 'Midwess - High-Performance Software Development Studio',
    template: '%s | Midwess',
  },
  description:
    'Midwess builds high-performance, secure software for engineering teams. A software studio specializing in modern, high-speed web applications.',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'TailwindCSS',
    'Template',
    'Shadcn/UI',
    'Web Development',
    'Software Studio',
  ],
  authors: [{ name: 'Midwess Team' }],
  creator: 'Midwess Team',
  publisher: 'Midwess',
  alternates: {
    canonical: 'https://midwess.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: getMetadataAssetUrl('/favicon/favicon.ico?v=1'), sizes: 'any' },
      { url: getMetadataAssetUrl('/favicon/favicon.svg?v=1'), type: 'image/svg+xml' },
    ],
    apple: [{ url: getMetadataAssetUrl('/favicon/apple-touch-icon.png?v=1'), sizes: '180x180' }],
  },
  manifest: getMetadataAssetUrl('/favicon/site.webmanifest'),
  openGraph: {
    title: 'Midwess',
    description: 'High-performance software studio from Vietnam',
    siteName: 'Midwess',
    images: [
      {
        url: getMetadataAssetUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Midwess',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midwess',
    description: 'High-performance software studio from Vietnam',
    images: [getMetadataAssetUrl('/og-image.jpg')],
    creator: '@midwess',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Midwess',
    url: 'https://midwess.com',
    logo: 'https://midwess.com/logo.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'South Vietnam',
      addressCountry: 'VN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-000-000-000',
      contactType: 'customer service',
    },
    sameAs: [
      'https://github.com/midwess',
      'https://x.com/midwess',
      'https://linkedin.com/company/midwess',
      'https://facebook.com/midwess',
      'https://instagram.com/midwess',
      'https://youtube.com/@midwess',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`flex h-screen flex-col ${dmSans.variable} ${dmMono.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
