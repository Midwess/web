import { cn } from "@/lib/utils";
import { Link } from "./_link";

export const LogoSVG = ({ className, ...props }: React.ComponentProps<"img">) => (
  <img
    src="/ours/web-lockup-dark.svg"
    alt="Midwess"
    width={1280}
    height={340}
    className={cn("h-8 w-auto", className)}
    {...props}
  />
);

export const MarkSVG = ({ className, ...props }: React.ComponentProps<"img">) => (
  <img
    src="/ours/web-flat.svg"
    alt="Midwess"
    width={640}
    height={560}
    className={cn("size-8", className)}
    {...props}
  />
);

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-olive-50">
    <LogoSVG />
  </Link>
);
