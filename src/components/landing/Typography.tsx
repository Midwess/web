import { cn } from "@/lib/utils";
import React from "react";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h1
    className={cn(
      "font-display text-center text-3xl font-medium tracking-tight text-olive-50 md:text-4xl lg:text-6xl",
      className,
    )}
  >
    {children}
  </h1>
);

export const SectionHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={cn(
      "font-display text-center text-2xl font-medium tracking-tight text-olive-100 md:text-3xl lg:text-4xl",
      className,
    )}
  >
    {children}
  </h2>
);

export const SubHeading = ({
  children,
  className,
  as: Component = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) => (
  <Component
    className={cn(
      "text-center text-sm font-medium tracking-tight text-olive-400 md:text-sm lg:text-base",
      className,
    )}
  >
    {children}
  </Component>
);

export const Badge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-full border border-olive-700 bg-olive-900/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-olive-400">
    {text}
  </span>
);
