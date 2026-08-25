import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type SectionTitleProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  meta?: ReactNode
  action?: ReactNode
}

export const SectionTitle = forwardRef<HTMLElement, SectionTitleProps>(function SectionTitle(
  { title, meta, action, className, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cn('u-section-title', className)} {...props}>
      <div><h2>{title}</h2>{meta ? <p>{meta}</p> : null}</div>
      {action}
    </header>
  )
})
