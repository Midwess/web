import { cn } from "@/lib/utils";

interface DottedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  showGlow?: boolean;
}

const DottedBackground = ({
  children,
  className,
  showGlow = true,
}: DottedBackgroundProps) => {
  return (
    <div className={cn("relative", className)} style={{ backgroundColor: 'hsl(0 0% 100%)' }}>
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="relative w-full max-w-[1330px] h-full">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'1\' fill=\'rgba(0,0,0,0.15)\'/%3E%3C/svg%3E")',
              backgroundPosition: 'center center',
            }}
          />
          {showGlow && (
            <>
              <div
                className="absolute animate-pulse"
                style={{
                  top: '0',
                  left: '25%',
                  width: '24rem',
                  height: '24rem',
                  backgroundColor: 'hsl(0 0% 0% / 0.03)',
                  borderRadius: '9999px',
                  filter: 'blur(60px)',
                  animation: 'pulse-glow 4s ease-in-out infinite',
                }}
              />
              <div
                className="absolute animate-pulse"
                style={{
                  top: '33%',
                  right: '25%',
                  width: '16rem',
                  height: '16rem',
                  backgroundColor: 'hsl(0 0% 0% / 0.02)',
                  borderRadius: '9999px',
                  filter: 'blur(60px)',
                  animation: 'pulse-glow 4s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DottedBackground;
