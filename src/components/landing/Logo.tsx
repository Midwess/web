import { cn } from "@/lib/utils";
import { Link } from "./_link";

export const LogoSVG = ({ className, ...props }: React.ComponentProps<"img">) => (
  <img
    src="/ours/web-lockup-dark.png"
    alt="Midwess"
    className={cn("h-8 w-auto", className)}
    {...props}
  />
);

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-olive-50">
    <LogoSVG />
  </Link>
);
