import Image from 'next/image';
import Link from 'next/link';

import { Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { name: 'X', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
  ];

  const productLinks = [
    { name: 'Bytover', href: '/products/bytover' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
  ];

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <>
      {/* Catching Brand Section - Separate from Footer */}
      <section className="bg-background w-full border-t py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-foreground max-w-5xl text-4xl leading-[1.05] font-bold tracking-tighter md:text-6xl lg:text-7xl">
            Midwess{' '}
            <span className="text-muted-foreground/30 font-medium">
              builds high-performance, secure software that empowers teams to
              innovate without friction.
            </span>
          </h2>
          <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
            We are dedicated to building user-centric solutions that enable
            modern engineering teams to achieve more through reliable,
            high-speed tools.
          </p>
        </div>
      </section>

      {/* Professional Compact Footer */}
      <footer className="bg-secondary/50 w-full border-t py-12 lg:py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
            {/* Logo and Tagline */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <Image
                  src="/logo.svg"
                  alt="Midwess"
                  width={110}
                  height={28}
                  className="dark:invert"
                />
              </Link>
              <p className="text-muted-foreground max-w-[240px] text-[13px] leading-relaxed">
                Empowering the next generation of engineers with intelligent
                file sharing solutions.
              </p>
            </div>

            {/* Navigation - End Aligned */}
            <div className="ml-auto flex flex-wrap gap-x-16 gap-y-10 md:text-end">
              <div className="flex flex-col gap-5">
                <h4 className="text-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
                  Product
                </h4>
                <nav className="flex flex-col gap-3">
                  {productLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-5">
                <h4 className="text-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
                  Company
                </h4>
                <nav className="flex flex-col gap-3">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-5">
                <h4 className="text-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
                  Connect
                </h4>
                <div className="flex items-center gap-5 md:justify-end">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                      aria-label={link.name}
                    >
                      <link.icon className="size-4.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-border/40 mt-16 flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row">
            <p className="text-muted-foreground/60 text-[11px] font-medium tracking-wider uppercase">
              © {new Date().getFullYear()} Midwess LLC. All rights reserved.
            </p>
            <div className="text-muted-foreground/20 flex items-center gap-3 text-[9px] font-bold tracking-[0.3em] uppercase select-none">
              <span>Midwestern Heart</span>
              <span className="h-1 w-1 rounded-full bg-current" />
              <span>Global Reach</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
