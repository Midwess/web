import { lazy, Suspense, useEffect, useState } from "react";

// WebGL shader — lazy + client-only (mirrors fumadocs' dynamic ssr:false).
const GrainGradient = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({
    default: m.GrainGradient,
  })),
);

/** Grainy gradient overlay for the hero, colored to match the mountain photo's
 *  own theme (cool teal / slate) so it reads as one image. */
export const HeroNoise = () => {
  const [show, setShow] = useState(false);

  // Delay mount: shader uniforms can error before the canvas is ready.
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <Suspense fallback={null}>
      <GrainGradient
        className="absolute inset-0 z-[1] mix-blend-screen opacity-90 animate-in fade-in duration-1000"
        colors={["#5aa0bb", "#225267", "#14253300"]}
        colorBack="#00000000"
        softness={1}
        intensity={0.9}
        noise={0.5}
        speed={1}
        shape="corners"
        minPixelRatio={1}
        maxPixelCount={1920 * 1080}
      />
    </Suspense>
  );
};
