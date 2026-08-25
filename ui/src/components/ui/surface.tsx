import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type SurfaceTone = 'base' | 'coral' | 'violet' | 'cyan' | 'sage' | 'yellow'
export type SurfaceProps = HTMLAttributes<HTMLElement> & { tone?: SurfaceTone }

export const Surface = forwardRef<HTMLElement, SurfaceProps>(function Surface(
  { tone = 'base', className, children, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cn('u-surface', `u-surface--${tone}`, className)} {...props}>
      {children}
    </section>
  )
})
