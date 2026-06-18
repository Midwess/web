import { lazy, Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// WebGL shader — load it lazily and client-only (mirrors fumadocs' dynamic
// ssr:false import) so it stays out of the initial bundle.
const GrainGradient = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({
    default: m.GrainGradient,
  })),
);

/** Animated grainy gradient backdrop, tuned to the olive palette. */
export const HeroNoise = ({ className }: { className?: string }) => {
  const [show, setShow] = useState(false);

  // Small delay before mounting: on slower devices the shader errors if its
  // uniforms aren't ready yet (same reason fumadocs delays it).
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <Suspense fallback={null}>
      <GrainGradient
        className={cn("animate-in fade-in duration-1000", className)}
        colors={["#8a9a4b", "#a65f2e", "#15170c00"]}
        colorBack="#00000000"
        softness={1}
        intensity={0.85}
        noise={0.5}
        speed={1}
        shape="corners"
        minPixelRatio={1}
        maxPixelCount={1920 * 1080}
      />
    </Suspense>
  );
};
