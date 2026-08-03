import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'accent' | 'violet'
export type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', className, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn('u-badge', `u-badge--${tone}`, className)} {...props}>
      {children}
    </span>
  )
})
