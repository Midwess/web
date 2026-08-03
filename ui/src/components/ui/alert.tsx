import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type AlertTone = 'neutral' | 'success' | 'warning' | 'danger' | 'accent'
export type AlertAppearance = 'subtle' | 'prominent'

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone
  appearance?: AlertAppearance
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    tone = 'neutral',
    appearance = 'subtle',
    className,
    children,
    role = 'status',
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      className={cn(
        'u-alert',
        `u-alert--${tone}`,
        `u-alert--${appearance}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})

export const AlertIcon = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function AlertIcon({ className, children, ...props }, ref) {
    return (
      <span ref={ref} className={cn('u-alert__icon', className)} {...props}>
        {children}
      </span>
    )
  },
)

export const AlertContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertContent({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn('u-alert__content', className)} {...props}>
        {children}
      </div>
    )
  },
)

export const AlertTitle = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function AlertTitle({ className, children, ...props }, ref) {
    return (
      <strong ref={ref} className={cn('u-alert__title', className)} {...props}>
        {children}
      </strong>
    )
  },
)

export const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function AlertDescription({ className, children, ...props }, ref) {
    return (
      <p ref={ref} className={cn('u-alert__description', className)} {...props}>
        {children}
      </p>
    )
  },
)

export const AlertAction = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AlertAction({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn('u-alert__action', className)} {...props}>
        {children}
      </div>
    )
  },
)
