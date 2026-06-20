import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useIsVisible } from "./useIsVisible";

// WebGL shader — lazy + client-only (mirrors fumadocs' dynamic ssr:false).
const GrainGradient = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({
    default: m.GrainGradient,
  })),
);

/** Grainy gradient overlay for the hero, colored to match the mountain photo's
 *  own theme (cool teal / slate) so it reads as one image. */
export const HeroNoise = () => {
  // Wrapper is always mounted so the IntersectionObserver has a stable target,
  // even before the shader itself mounts.
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);
  const [show, setShow] = useState(false);

  // Delay mount: shader uniforms can error before the canvas is ready.
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-[1]">
      {show && (
        <Suspense fallback={null}>
          <GrainGradient
            className="size-full mix-blend-screen opacity-90 animate-in fade-in duration-1000"
            colors={["#5aa0bb", "#225267", "#14253300"]}
            colorBack="#00000000"
            softness={1}
            intensity={0.9}
            noise={0.5}
            // Pause when the hero scrolls off-screen: speed 0 cancels the
            // shader's requestAnimationFrame loop entirely (per
            // @paper-design/shaders), so it stops burning CPU/GPU while the
            // user reads the rest of the page.
            speed={visible ? 1 : 0}
            shape="corners"
            minPixelRatio={1}
            // The grain is a soft decorative overlay — rendering it at ~900p
            // instead of 1080p cuts ~30% of per-frame fragment work with no
            // perceptible change under mix-blend-screen.
            maxPixelCount={1600 * 900}
          />
        </Suspense>
      )}
    </div>
  );
};
