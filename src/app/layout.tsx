import { DM_Mono, Inter } from 'next/font/google';
import localFont from 'next/font/local';

import type { Metadata } from 'next';

import { Footer } from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

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
  title: {
    default: 'Westrise',
    template: '%s | Westrise',
  },
  description:
    'A modern, fully featured Next.js template built with Shadcn/UI, TailwindCSS and TypeScript, perfect for your next web application.',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'TailwindCSS',
    'Template',
    'Shadcn/UI',
    'Web Development',
  ],
  authors: [{ name: 'Westrise Team' }],
  creator: 'Westrise Team',
  publisher: 'Westrise',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    title: 'Westrise',
    description: 'Startup from west side of vietnam',
    siteName: 'Westrise',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Westrise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Westrise',
    description: 'Startup from west side of vietnam',
    images: ['/og-image.jpg'],
    creator: '@westrise',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
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
