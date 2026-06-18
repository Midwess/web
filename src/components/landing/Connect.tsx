import { Container } from "./Container";
import { SectionHeading, SubHeading, Badge } from "./Typography";
import { Button } from "./Button";
import { Link } from "./_link";
import { SendIcon } from "./_icons/SendIcon";

export const Connect = () => (
  <Container className="border-x border-divide px-4 py-20 md:px-8 md:py-28">
    <div className="flex flex-col items-center gap-8 text-center">
      <Badge text="Stay close" />
      <SectionHeading>
        Follow the work as it ships
      </SectionHeading>
      <SubHeading as="p" className="max-w-xl">
        Release notes, design decisions, and the occasional post-mortem.
      </SubHeading>
      <form
        className="mt-2 flex w-full max-w-md items-center gap-2 rounded-xl border border-olive-800 bg-olive-900/60 p-1.5"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          required
          placeholder="you@somewhere.dev"
          className="flex-1 bg-transparent px-3 py-2 text-sm text-olive-50 placeholder-olive-500 outline-none"
        />
        <Button type="submit" className="px-4 py-2">
          <span className="hidden sm:inline">Subscribe</span>
          <SendIcon className="size-4 sm:hidden" />
        </Button>
      </form>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm">
        <Button as={Link} href="https://github.com/Midwess" variant="secondary">
          GitHub
        </Button>
        <Button as={Link} href="mailto:hello@midwess.ai" variant="secondary">
          hello@midwess.ai
        </Button>
      </div>
    </div>
  </Container>
);
