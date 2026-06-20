import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRemoteCount, fetchGithubStars, format } from "@/lib/remoteCount";

export const GitHubStars = ({
  repo,
  className,
}: {
  repo: string;
  className?: string;
}) => {
  const stars = useRemoteCount(`gh-stars:${repo}`, () => fetchGithubStars(repo));

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
