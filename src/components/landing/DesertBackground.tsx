import desertDunes from "@/assets/desert-dunes.jpg";
import desertNight from "@/assets/desert-night.jpg";
import mountain from "@/assets/mountain.jpg";
import { cn } from "@/lib/utils";
import { MeshGradient } from "./MeshGradient";

type Variant = "dunes" | "night" | "mountain";

const SOURCES: Record<Variant, string> = {
  dunes: desertDunes,
  night: desertNight,
  mountain,
};

/**
 * Layered "company-signature" header background combining:
 *   1. Photograph (cover/center) — bit-bridge product family signature
 *   2. Olive-950 darkening wash for contrast
 *   3. Bottom-anchored vertical gradient fade
 *   4. WebGL mesh-gradient glow (top half, blurred) — nodus-template signature
 *   5. Procedural film-grain noise (mix-blend overlay)
 *
 * Drop-in usage: place inside a `relative overflow-hidden` parent; render the
 * page content as a sibling with `relative z-10`.
 */
export const DesertBackground = ({
  variant = "dunes",
  className,
  fadeFrom = "olive-950",
  withMesh = true,
  effectExtent = "full",
}: {
  variant?: Variant;
  className?: string;
  fadeFrom?: "olive-950" | "black";
  withMesh?: boolean;
  /**
   * "full" — mesh fades across the whole surface (used by AuthIllustration thumbnail).
   * "half" — mesh is clipped to the top half of the surface; the bottom half stays clean.
   */
  effectExtent?: "full" | "half";
}) => {
  const meshMask =
    effectExtent === "half"
      ? "linear-gradient(to bottom, black 0%, black 20%, transparent 50%)"
      : "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${SOURCES[variant]})` }}
      />
      <div className="absolute inset-0 bg-olive-950/30" />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-45",
          fadeFrom === "olive-950" ? "from-olive-950" : "from-black",
        )}
      />

      {withMesh && (
        <div
          className="absolute inset-0 opacity-60 blur-3xl"
          style={{ maskImage: meshMask }}
        >
          <MeshGradient />
        </div>
      )}

      <div className="noise-overlay" />
    </div>
  );
};
