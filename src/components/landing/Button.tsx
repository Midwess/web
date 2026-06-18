import { cn } from "@/lib/utils";
import React from "react";

type Variant = "primary" | "secondary" | "brand";

type Props<T extends React.ElementType> = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  as?: T;
} & Omit<React.ComponentProps<T>, "children" | "variant" | "className" | "as">;

export const Button = <T extends React.ElementType = "button">({
  children,
  variant = "primary",
  className,
  as,
  ...props
}: Props<T>) => {
  const Component = (as || "button") as React.ElementType;
  return (
    <Component
      {...props}
      className={cn(
        "inline-block rounded-xl px-6 py-2 text-center text-sm font-medium transition duration-150 active:scale-[0.98] sm:text-base",
        variant === "primary"
          ? "bg-olive-50 text-olive-950 hover:bg-olive-100"
          : variant === "brand"
            ? "bg-olive-600 text-olive-50 hover:bg-olive-500"
            : "border border-olive-800 bg-olive-900 text-olive-50 hover:bg-olive-800",
        className,
      )}
    >
      {children}
    </Component>
  );
};
