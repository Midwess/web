import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GridSectionProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  contentClassName?: string;
  id?: string;
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
}

const GridSection = ({
  children,
  className,
  innerClassName,
  contentClassName,
  id,
  showTopBorder = false,
  showBottomBorder = false,
}: GridSectionProps) => {
  return (
    <section
      id={id}
      className={cn("relative my-12 first:mt-0 last:mb-0", className)}
    >
      {showTopBorder && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div
            className="w-full max-w-[1330px]"
            style={{
              height: '1px',
              background: 'repeating-linear-gradient(90deg, hsl(0 0% 89.8% / 0.8) 0, hsl(0 0% 89.8% / 0.8) 12px, transparent 12px, transparent 24px)',
            }}
          />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("relative", innerClassName)}>
          <div
            className="absolute -top-1 -left-1 w-3 h-3"
            style={{ borderLeft: '1px solid hsl(0 0% 89.8% / 0.8)', borderTop: '1px solid hsl(0 0% 89.8% / 0.8)' }}
          />
          <div
            className="absolute -top-1 -right-1 w-3 h-3"
            style={{ borderRight: '1px solid hsl(0 0% 89.8% / 0.8)', borderTop: '1px solid hsl(0 0% 89.8% / 0.8)' }}
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3"
            style={{ borderLeft: '1px solid hsl(0 0% 89.8% / 0.8)', borderBottom: '1px solid hsl(0 0% 89.8% / 0.8)' }}
          />
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3"
            style={{ borderRight: '1px solid hsl(0 0% 89.8% / 0.8)', borderBottom: '1px solid hsl(0 0% 89.8% / 0.8)' }}
          />
          <div className={cn("flex-1", contentClassName)}>{children}</div>
        </div>
      </div>
      {showBottomBorder && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div
            className="w-full max-w-[1330px]"
            style={{
              height: '1px',
              background: 'repeating-linear-gradient(90deg, hsl(0 0% 89.8% / 0.8) 0, hsl(0 0% 89.8% / 0.8) 12px, transparent 12px, transparent 24px)',
            }}
          />
        </div>
      )}
    </section>
  );
};

export default GridSection;
