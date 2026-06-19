/**
 * DocsLink — adapter that lets vendored fumadocs components keep their
 * `href` / `external` / `prefetch` API while routing through react-router.
 *
 * fumadocs components import `fumadocs-core/link`; in this Vite + react-router
 * app we map `href` → react-router `<Link to>` for internal paths and fall back
 * to a plain `<a>` for external / hash / mailto links. `prefetch` is accepted
 * and ignored (react-router has no equivalent here).
 */

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

export interface DocsLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href?: string;
  external?: boolean;
  prefetch?: boolean;
  children?: ReactNode;
}

export const DocsLink = forwardRef<HTMLAnchorElement, DocsLinkProps>(
  function DocsLink({ href = "", external, prefetch: _prefetch, ...props }, ref) {
    const isExternal =
      external ||
      /^(https?:)?\/\//.test(href) ||
      href.startsWith("mailto:") ||
      href.startsWith("#");

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          {...(external || /^(https?:)?\/\//.test(href)
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
          {...props}
        />
      );
    }

    return <RouterLink ref={ref} to={href} {...props} />;
  },
);
