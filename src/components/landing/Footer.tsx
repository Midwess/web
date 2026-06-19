import { Container } from "./Container";
import { Link } from "./_link";
import { GithubIcon } from "./_icons/GithubIcon";
import { XIcon } from "./_icons/XIcon";

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

export const Footer = () => (
  <Container>
    <div className="flex flex-col items-center justify-between border-t border-olive-800 px-4 py-8 md:flex-row">
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
