import { Container } from "./Container";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { SubHeading } from "./Typography";
import { Link } from "./_link";
import { GithubIcon } from "./_icons/GithubIcon";
import { XIcon } from "./_icons/XIcon";

const projects = [
  { title: "worldant", href: "https://github.com/Midwess/worldant" },
  { title: "pglite-rs", href: "https://github.com/Midwess/pglite-rs" },
  { title: "PgPaw", href: "https://github.com/Midwess/PgPaw" },
];

const org = [
  { title: "GitHub", href: "https://github.com/Midwess" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "mailto:hello@midwess.ai" },
];

const legal = [
  { title: "Privacy", href: "/policy" },
  { title: "Terms", href: "/policy" },
];

const SocialLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-footer-link transition-colors hover:text-olive-100"
  >
    {children}
  </Link>
);

const FooterCol = ({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) => (
  <div className="col-span-1 mb-4 flex flex-col gap-2 md:mb-0">
    <p className="text-sm font-medium text-olive-300">{title}</p>
    {links.map((item) => (
      <Link
        key={item.title}
        href={item.href}
        className="my-1 text-sm font-medium text-footer-link"
      >
        {item.title}
      </Link>
    ))}
  </div>
);

export const Footer = () => (
  <Container>
    <div className="grid grid-cols-1 px-4 py-20 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
      <div className="mb-6 sm:col-span-2 md:col-span-4 lg:col-span-3">
        <Logo />
        <SubHeading as="p" className="mt-4 max-w-lg text-left">
          Open source infrastructure for stateful work — embedded Postgres,
          durable runtimes, and a read-replica cache.
        </SubHeading>
        <Button
          as={Link}
          href="https://github.com/Midwess"
          className="mt-4 mb-8 lg:mb-0"
        >
          <GithubIcon className="mr-1.5 size-3.5" />
          View on GitHub
        </Button>
      </div>
      <FooterCol title="Projects" links={projects} />
      <FooterCol title="Org" links={org} />
      <FooterCol title="Legal" links={legal} />
      <div className="col-span-1 mb-4 flex flex-col items-start md:mb-0 lg:col-span-2">
        <p className="text-sm font-medium text-footer-link">Newsletter</p>
        <div className="mt-2 flex w-full items-center rounded-xl border border-olive-800 bg-olive-900 p-1">
          <input
            type="email"
            placeholder="you@somewhere.dev"
            className="flex-1 bg-transparent px-2 text-sm text-olive-50 placeholder-olive-500 outline-none"
          />
          <Button className="my-0 flex h-8 shrink-0 items-center justify-center rounded-lg px-3 text-xs">
            Subscribe
          </Button>
        </div>
        <SubHeading as="p" className="mt-4 text-left text-sm md:text-sm lg:text-sm">
          Release notes, design decisions, occasional post-mortems.
        </SubHeading>
      </div>
    </div>
    <div className="my-4 flex flex-col items-center justify-between border-t border-olive-800 px-4 pt-8 md:flex-row">
      <p className="text-sm text-footer-link">
        © {new Date().getFullYear()} Midwess. MIT licensed.
      </p>
      <div className="mt-4 flex items-center gap-4 md:mt-0">
        <SocialLink href="https://github.com/Midwess">
          <GithubIcon className="size-4" />
        </SocialLink>
        <SocialLink href="https://twitter.com">
          <XIcon className="size-4" />
        </SocialLink>
      </div>
    </div>
  </Container>
);
