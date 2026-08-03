import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type ButtonTone = 'accent' | 'neutral' | 'quiet' | 'danger'
export type ButtonSize = 'default' | 'compact'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { tone = 'neutral', size = 'default', children, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn('u-button', `u-button--${tone}`, `u-button--${size}`, className)}
      {...props}
    >
      {children}
    </button>
  )
})
