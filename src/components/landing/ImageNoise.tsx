import { lazy, Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Renders an image through the dither shader (the @paper-design "ImageDithering"
// algorithm — same shader family fumadocs uses, applied to our own photo).
const ImageDithering = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({
    default: m.ImageDithering,
  })),
);

export const ImageNoise = ({
  image,
  className,
  size = 3,
}: {
  image: string;
  /** pixel cell size — bigger = chunkier pixels */
  size?: number;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <Suspense fallback={null}>
      <ImageDithering
        className={cn("pointer-events-none", className)}
        image={image}
        fit="cover"
        originalColors
        type="4x4"
        size={size}
        speed={0}
      />
    </Suspense>
  );
};
