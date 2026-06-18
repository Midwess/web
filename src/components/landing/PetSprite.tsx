import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** petdex spritesheets are a fixed 8 cols × 9 rows grid (192×208 px frames).
 *  Row 0 is the `idle` animation. Only the first 6 columns hold real idle
 *  frames — cols 6–7 are blank padding — so we sweep exactly 6 frames to keep
 *  the loop seamless (stepping into the blanks caused a visible blink). */
const GRID_COLS = 8;
const ROWS = 9;
const IDLE_FRAMES = 6;
const FRAME_W = 192;
const FRAME_H = 208;
const ASPECT = FRAME_H / FRAME_W;

type PetSpriteProps = {
  /** Public path to the spritesheet, e.g. "/pets/capvolt.webp". */
  src: string;
  /** Displayed frame width in px (height follows the native aspect ratio). */
  size?: number;
  /** Number of real frames to play from row 0 (idle is 6 in petdex sheets). */
  frames?: number;
  /** Seconds for one full idle loop. */
  duration?: number;
  className?: string;
};

export const PetSprite = ({
  src,
  size = 44,
  frames = IDLE_FRAMES,
  duration = 1,
  className,
}: PetSpriteProps) => {
  const w = size;
  const h = Math.round(size * ASPECT);
  const style = {
    width: w,
    height: h,
    backgroundImage: `url(${src})`,
    backgroundSize: `${w * GRID_COLS}px ${h * ROWS}px`,
    animation: `pet-idle ${duration}s steps(${frames}) infinite`,
    "--pet-span": `-${w * frames}px`,
  } as CSSProperties;

  return (
    <span className={cn("pet-sprite block shrink-0", className)} style={style} aria-hidden="true" />
  );
};
