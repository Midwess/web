import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const Dot = ({
  top,
  left,
  right,
  bottom,
}: {
  top?: boolean;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNearMouse, setIsNearMouse] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!dotRef.current) return;
    const rect = dotRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const distance = Math.hypot(mousePosition.x - cx, mousePosition.y - cy);
    setIsNearMouse(distance <= 100);
  }, [mousePosition]);

  return (
    <motion.div
      ref={dotRef}
      className={cn(
        "absolute z-10 h-2 w-2",
        top && "top-0 xl:-top-1",
        left && "left-0 xl:-left-2",
        right && "right-0 xl:-right-2",
        bottom && "bottom-0 xl:-bottom-1",
      )}
      animate={{
        backgroundColor: isNearMouse
          ? "var(--color-brand)"
          : "var(--color-primary)",
        boxShadow: isNearMouse
          ? "0 0 20px var(--color-brand), 0 0 40px var(--color-brand)"
          : "none",
        scale: isNearMouse ? 1.5 : 1,
        borderRadius: isNearMouse ? "50%" : "0%",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
};
