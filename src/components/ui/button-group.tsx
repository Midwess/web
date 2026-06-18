import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    />
  )
);
ButtonGroup.displayName = "ButtonGroup";

export interface ButtonGroupTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ButtonGroupText = React.forwardRef<HTMLSpanElement, ButtonGroupTextProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("flex items-center px-2 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
ButtonGroupText.displayName = "ButtonGroupText";

export { ButtonGroup, ButtonGroupText };
