/**
 * DocsProvider — wires fumadocs to *this* app's router.
 *
 * `@fumadocs/base-ui/provider/react-router` targets react-router **v7** (it
 * imports `Link`/`useRevalidator` from the `react-router` package, which v6
 * doesn't re-export). We're on react-router-dom v6, so instead we build the
 * framework adapter by hand from v6 hooks and compose it with the base
 * `RootProvider` (theme / search / direction).
 *
 * The framework object is defined at module scope so its `usePathname` /
 * `useParams` / `useRouter` entries are stable hook references (fumadocs calls
 * them internally as hooks).
 */

import { type ReactNode, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FrameworkProvider, type Framework } from "fumadocs-core/framework";
import { RootProvider } from "@fumadocs/base-ui/provider/base";
import { DocsLink } from "./_link";
import DocsSearchDialog from "./search";

const framework: Framework = {
  usePathname() {
    return useLocation().pathname;
  },
  useParams() {
    return useParams() as Record<string, string | string[]>;
  },
  useRouter() {
    const navigate = useNavigate();
    return useMemo(
      () => ({
        push: (url: string) => navigate(url),
        refresh: () => {},
      }),
      [navigate],
    );
  },
  Link: DocsLink as never,
};

export function DocsProvider({ children }: { children: ReactNode }) {
  return (
    <FrameworkProvider {...framework}>
      <RootProvider
        theme={{ forcedTheme: "dark" }}
        search={{ SearchDialog: DocsSearchDialog }}
      >
        {children}
      </RootProvider>
    </FrameworkProvider>
  );
}
