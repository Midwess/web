import { motion } from "motion/react";
import { Container } from "./Container";
import {
  useRemoteCount,
  fetchGithubStarsTotal,
  fetchCratesDownloadsTotal,
  format,
} from "@/lib/remoteCount";

const REPOS = [
  "Midwess/worldant",
  "Midwess/pglite-rs",
  "Midwess/PgPaw",
  "midwess/bytover",
];
const CRATES = ["pglite-rs", "pgpaw"];

export const Stat = ({
  count,
  label,
}: {
  count: number | null;
  label: string;
}) => (
  <div className="flex flex-col items-center justify-center gap-1 px-4 py-8 text-center">
    <span className="font-display text-3xl font-medium tabular-nums text-olive-50 md:text-4xl">
      {count == null ? "—" : format(count)}
    </span>
    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-olive-400">
      {label}
    </span>
  </div>
);

export const Metrics = () => {
  const stars = useRemoteCount("metrics:gh-stars-total", () =>
    fetchGithubStarsTotal(REPOS),
  );
  const downloads = useRemoteCount("metrics:crates-downloads-total", () =>
    fetchCratesDownloadsTotal(CRATES),
  );

  return (
    <Container className="border-x border-divide bg-olive-950">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 divide-x divide-divide"
      >
        <Stat count={4} label="Open-source projects" />
        <Stat count={stars} label="GitHub stars" />
        <Stat count={downloads} label="crates.io downloads" />
      </motion.div>
    </Container>
  );
};
