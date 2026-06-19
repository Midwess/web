import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Link } from "./_link";

type NavItem = { title: string; href: string };

const items: NavItem[] = [
  { title: "Projects", href: "/#projects" },
  { title: "Writing", href: "/#writing" },
  { title: "About", href: "/about" },
];

const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

const NavLinks = ({ items, onClick }: { items: NavItem[]; onClick?: () => void }) => (
  <>
    {items.map((item) => (
      <Link
        key={item.title}
        href={item.href}
        onClick={onClick}
        className="font-medium text-olive-400 transition duration-200 hover:text-olive-100"
      >
        {item.title}
      </Link>
    ))}
  </>
);

const DesktopNav = () => (
  <div className="hidden items-center justify-between px-4 py-4 md:flex md:px-8">
    <Logo />
    <div className="flex items-center gap-10">
      <NavLinks items={items} />
    </div>
  </div>
);

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-between px-4 py-4 md:hidden">
      <Logo />
      <button
        onClick={() => setOpen(true)}
        className="flex size-8 items-center justify-center rounded-md border border-olive-800 text-olive-300"
        aria-label="Open menu"
      >
        <HamburgerIcon className="size-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] h-full w-full bg-olive-950"
          >
            <div className="flex items-center justify-between p-2">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-md border border-olive-800 text-olive-300"
                aria-label="Close menu"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
            <div className="mt-6 flex flex-col divide-y divide-olive-800 border-t border-olive-800">
              {items.map((item, idx) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 font-medium text-olive-300 transition hover:text-olive-50"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    {item.title}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar = () => (
  <Container as="nav" className="border-x border-divide">
    <DesktopNav />
    <MobileNav />
  </Container>
);
