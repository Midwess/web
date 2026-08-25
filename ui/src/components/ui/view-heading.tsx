import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ViewHeadingProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  eyebrow: ReactNode
  title: ReactNode
  description: ReactNode
  action?: ReactNode
}

export const ViewHeading = forwardRef<HTMLElement, ViewHeadingProps>(function ViewHeading(
  { eyebrow, title, description, action, className, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cn('u-view-heading', className)} {...props}>
      <div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
      {action}
    </header>
  )
})
