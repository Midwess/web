import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const format = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);

type Cached = { count: number; ts: number };

const readCache = (repo: string): Cached | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`gh-stars:${repo}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (
      typeof parsed.count === "number" &&
      typeof parsed.ts === "number" &&
      Date.now() - parsed.ts < CACHE_TTL_MS
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
};

const writeCache = (repo: string, count: number) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      `gh-stars:${repo}`,
      JSON.stringify({ count, ts: Date.now() } satisfies Cached),
    );
  } catch {
    /* ignore quota / privacy mode */
  }
};

export const GitHubStars = ({
  repo,
  className,
}: {
  repo: string;
  className?: string;
}) => {
  const [stars, setStars] = useState<number | null>(() => readCache(repo)?.count ?? null);

  useEffect(() => {
    const cached = readCache(repo);
    if (cached) {
      setStars(cached.count);
      return;
    }
    const ctrl = new AbortController();
    fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { stargazers_count?: number } | null) => {
        if (data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
          writeCache(repo, data.stargazers_count);
        }
      })
      .catch(() => {
        /* offline or rate-limited — keep placeholder */
      });
    return () => ctrl.abort();
  }, [repo]);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs text-olive-400",
        className,
      )}
      aria-label={stars == null ? "Loading star count" : `${stars} stars`}
    >
      <Star className="size-3 fill-olive-400 text-olive-400" />
      <span className="tabular-nums">{stars == null ? "—" : format(stars)}</span>
    </span>
  );
};
