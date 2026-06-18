import { cn } from "@/lib/utils";

export const DivideX = ({ className }: { className?: string }) => (
  <div className={cn("h-px w-full bg-divide", className)} />
);
