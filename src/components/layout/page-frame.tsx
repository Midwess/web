import { cn } from "@/lib/utils";

interface PageFrameProps {
  children: React.ReactNode;
  className?: string;
}

const PageFrame = ({ children, className }: PageFrameProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 flex justify-center pointer-events-none z-50">
        <div className="relative w-full max-w-[1330px] h-full">
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: '1px',
              background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 18px, transparent 18px, transparent 36px)',
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0"
            style={{
              width: '1px',
              background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 18px, transparent 18px, transparent 36px)',
            }}
          />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default PageFrame;
