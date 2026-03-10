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
      <section className="w-full py-20 lg:py-32 border-t bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.05] max-w-5xl">
            Midwess <span className="text-muted-foreground/30 font-medium">builds high-performance, secure software that empowers teams to innovate without friction.</span>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            We are dedicated to building user-centric solutions that enable modern engineering teams 
            to achieve more through reliable, high-speed tools.
          </p>
        </div>
      </section>

      {/* Professional Compact Footer */}
      <footer className="w-full bg-secondary/50 border-t py-12 lg:py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Logo and Tagline */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="inline-block transition-opacity hover:opacity-80">
                <Image
                  src="/logo.svg"
                  alt="Midwess"
                  width={110}
                  height={28}
                  className="dark:invert"
                />
              </Link>
              <p className="text-[13px] text-muted-foreground max-w-[240px] leading-relaxed">
                Empowering the next generation of engineers with intelligent file sharing solutions.
              </p>
            </div>

            {/* Navigation - End Aligned */}
            <div className="flex flex-wrap gap-x-16 gap-y-10 md:text-end ml-auto">
              <div className="flex flex-col gap-5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Product</h4>
                <nav className="flex flex-col gap-3">
                  {productLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Company</h4>
                <nav className="flex flex-col gap-3">
                  {companyLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Connect</h4>
                <div className="flex items-center md:justify-end gap-5">
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
          <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] text-muted-foreground/60 font-medium uppercase tracking-wider">
              © {new Date().getFullYear()} Midwess LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground/20 select-none">
              <span>Midwestern Heart</span>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>Global Reach</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
