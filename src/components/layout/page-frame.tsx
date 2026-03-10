import { cn } from '@/lib/utils';

interface PageFrameProps {
  children: React.ReactNode;
  className?: string;
}

const PageFrame = ({ children, className }: PageFrameProps) => {
  return (
    <div className={cn('relative', className)}>
      <div className="pointer-events-none absolute inset-0 z-50 flex justify-center">
        <div className="relative h-full w-full max-w-[1330px]">
          <div
            className="absolute top-0 bottom-0 left-0"
            style={{
              width: '1px',
              background:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 18px, transparent 18px, transparent 36px)',
            }}
          />
          <div
            className="absolute top-0 right-0 bottom-0"
            style={{
              width: '1px',
              background:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 18px, transparent 18px, transparent 36px)',
            }}
          />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default PageFrame;
