import { useEffect, useState } from "react";

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

type Cached = { count: number; ts: number };

const readCache = (key: string): number | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (
      typeof parsed.count === "number" &&
      typeof parsed.ts === "number" &&
      Date.now() - parsed.ts < CACHE_TTL_MS
    ) {
      return parsed.count;
    }
  } catch {
    /* ignore */
  }
  return null;
};

const writeCache = (key: string, count: number) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({ count, ts: Date.now() } satisfies Cached),
    );
  } catch {
    /* ignore quota / privacy mode */
  }
};

/** Reusable client-side counter: reads a cached value, otherwise runs `loader`
 *  once and caches the result. Returns `null` until a real value arrives — never
 *  a fabricated number. Generalized from the original GitHubStars fetch+cache. */
export const useRemoteCount = (
  key: string,
  loader: () => Promise<number | null>,
): number | null => {
  const [count, setCount] = useState<number | null>(() => readCache(key));

  useEffect(() => {
    const cached = readCache(key);
    if (cached != null) {
      setCount(cached);
      return;
    }
    let active = true;
    loader()
      .then((n) => {
        if (active && n != null) {
          setCount(n);
          writeCache(key, n);
        }
      })
      .catch(() => {
        /* offline or rate-limited — keep placeholder */
      });
    return () => {
      active = false;
    };
    // loader identity is tied to `key`; re-running on key change is sufficient.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return count;
};

export const format = (n: number): string =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);

export const fetchGithubStars = async (repo: string): Promise<number | null> => {
  try {
    const r = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!r.ok) return null;
    const data = (await r.json()) as { stargazers_count?: number } | null;
    return data && typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
};

/** Sum of stars across repos. Returns null only if every fetch failed, so a
 *  partial outage still shows a real (if low) aggregate rather than nothing. */
export const fetchGithubStarsTotal = async (
  repos: string[],
): Promise<number | null> => {
  const counts = await Promise.all(repos.map(fetchGithubStars));
  const valid = counts.filter((c): c is number => c != null);
  return valid.length ? valid.reduce((a, b) => a + b, 0) : null;
};

export const fetchCratesDownloads = async (
  crate: string,
): Promise<number | null> => {
  try {
    const r = await fetch(`https://crates.io/api/v1/crates/${crate}`);
    if (!r.ok) return null;
    const data = (await r.json()) as { crate?: { downloads?: number } } | null;
    return data && typeof data.crate?.downloads === "number"
      ? data.crate.downloads
      : null;
  } catch {
    return null;
  }
};

export const fetchCratesDownloadsTotal = async (
  crates: string[],
): Promise<number | null> => {
  const counts = await Promise.all(crates.map(fetchCratesDownloads));
  const valid = counts.filter((c): c is number => c != null);
  return valid.length ? valid.reduce((a, b) => a + b, 0) : null;
};
