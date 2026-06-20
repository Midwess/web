import { Container } from "./Container";
import { Logo } from "./Logo";
import { Link } from "./_link";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#writing" },
  { label: "Vision", href: "#vision" },
  { label: "GitHub", href: "https://github.com/Midwess" },
];

export const Navbar = () => (
  <Container as="nav" className="border-x border-divide">
    <div className="flex items-center justify-between px-4 py-4 md:px-8">
      <Logo />
      <div className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-olive-300 transition-colors hover:text-olive-50"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </Container>
);
