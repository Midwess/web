import { Link as RouterLink } from "react-router-dom";
import React from "react";

type LinkProps = Omit<React.ComponentProps<typeof RouterLink>, "to"> & {
  href: string;
};

/** Adapter so template components can keep their `<Link href="...">` API
 *  while routing through `react-router-dom`. External / hash / mailto links
 *  fall back to a plain anchor. */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, ...props }, ref) => {
    const isExternal =
      /^https?:\/\//.test(href) ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#");
    if (isExternal) {
      return <a ref={ref} href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
    }
    return <RouterLink ref={ref} to={href} {...props} />;
  },
);
Link.displayName = "Link";
