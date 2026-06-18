import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { ForkIcon } from "../icons/general";

type CardVariant = "default" | "danger" | "success" | "warning";

const deployCards: { title: string; subtitle: string; branch: string; variant?: CardVariant }[] = [
  { title: "deploy-dev-eu-324", subtitle: "2h ago", branch: "master" },
  { title: "deploy-prod-eu-128", subtitle: "10m ago", branch: "main", variant: "success" },
  { title: "deploy-dev-us-445", subtitle: "45m ago", branch: "feature/auth" },
  { title: "deploy-prod-ap-223", subtitle: "1h ago", branch: "main", variant: "success" },
  { title: "deploy-dev-eu-891", subtitle: "2h ago", branch: "fix/cache", variant: "warning" },
  { title: "deploy-prod-us-337", subtitle: "3h ago", branch: "main", variant: "success" },
  { title: "deploy-dev-ap-556", subtitle: "4h ago", branch: "feat/api", variant: "danger" },
  { title: "deploy-dev-eu-672", subtitle: "5h ago", branch: "feat/search", variant: "default" },
  { title: "deploy-prod-ap-445", subtitle: "6h ago", branch: "main", variant: "success" },
  { title: "deploy-dev-us-891", subtitle: "7h ago", branch: "fix/perf", variant: "warning" },
  { title: "deploy-prod-eu-223", subtitle: "8h ago", branch: "main", variant: "success" },
  { title: "deploy-dev-ap-337", subtitle: "9h ago", branch: "feat/analytics", variant: "default" },
];

export const DeployAndScaleSkeleton = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const extendedCards = [...deployCards, ...deployCards, ...deployCards];

  const cardHeight = 64;
  const gap = 4;
  const itemHeight = cardHeight + gap;
  const offset = (containerHeight - cardHeight) / 2;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height ?? 0;
      setContainerHeight(height);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const y = useMotionValue(0);
  const totalHeight = extendedCards.length * itemHeight;

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 30;

    function animateScroll(now: number) {
      const elapsed = (now - lastTime) / 1000;
      lastTime = now;
      let current = y.get();
      current -= speed * elapsed;
      if (Math.abs(current) >= totalHeight / 3) current += totalHeight / 3;
      y.set(current);
      animationFrame = requestAnimationFrame(animateScroll);
    }
    animationFrame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [y, totalHeight]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      ref={containerRef}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      <motion.div
        className="absolute left-1/2 flex w-full -translate-x-1/2 flex-col items-center"
        style={{ y }}
      >
        {extendedCards.map((card, index) => (
          <DeployCardRow
            key={`${index}-${card.title}`}
            y={y}
            offset={offset}
            itemHeight={itemHeight}
            index={index}
            card={card}
          />
        ))}
      </motion.div>
    </div>
  );
};

const DeployCardRow = ({
  y,
  offset,
  itemHeight,
  index,
  card,
}: {
  y: ReturnType<typeof useMotionValue<number>>;
  offset: number;
  itemHeight: number;
  index: number;
  card: { title: string; subtitle: string; branch: string; variant?: CardVariant };
}) => {
  const scale = useTransform(
    y,
    [
      offset + (index - 2) * -itemHeight,
      offset + (index - 1) * -itemHeight,
      offset + index * -itemHeight,
      offset + (index + 1) * -itemHeight,
      offset + (index + 2) * -itemHeight,
    ],
    [0.85, 0.95, 1.1, 0.95, 0.85],
  );
  const background = useTransform(
    y,
    [
      offset + (index - 1) * -itemHeight,
      offset + index * -itemHeight,
      offset + (index + 1) * -itemHeight,
    ],
    ["#FFFFFF", "var(--color-brand)", "#FFFFFF"],
  );
  const borderColor = useTransform(
    y,
    [
      offset + (index - 1) * -itemHeight,
      offset + index * -itemHeight,
      offset + (index + 1) * -itemHeight,
    ],
    ["#FFFFFF", "var(--color-brand)", "#FFFFFF"],
  );

  return (
    <motion.div
      className="mx-auto mt-4 w-full max-w-sm shrink-0 rounded-2xl shadow-xl"
      style={{ scale, background, borderColor }}
    >
      <DeployCard
        variant={card.variant}
        title={card.title}
        subtitle={card.subtitle}
        branch={card.branch}
      />
    </motion.div>
  );
};

const DeployCard = ({
  variant = "default",
  title,
  subtitle,
  branch,
}: {
  variant?: CardVariant;
  title: string;
  subtitle: string;
  branch: string;
}) => (
  <div className="mx-auto flex w-full max-w-sm items-center justify-between rounded-lg p-3">
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-md",
          variant === "default" && "bg-gray-200",
          variant === "danger" && "bg-red-200",
          variant === "success" && "bg-green-200",
          variant === "warning" && "bg-yellow-200",
        )}
      >
        <ForkIcon
          className={cn(
            "h-4 w-4",
            variant === "default" && "text-gray-500",
            variant === "danger" && "text-red-500",
            variant === "success" && "text-green-500",
            variant === "warning" && "text-yellow-500",
          )}
        />
      </div>
      <span className="text-charcoal-700 text-xs font-medium sm:text-sm">{title}</span>
    </div>
    <div className="ml-2 flex flex-row items-center gap-2">
      <span className="text-charcoal-700 text-xs font-normal">{subtitle}</span>
      <div className="size-1 rounded-full bg-gray-400" />
      <span className="text-charcoal-700 text-xs font-normal">{branch}</span>
    </div>
  </div>
);
