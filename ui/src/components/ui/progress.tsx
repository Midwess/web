import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type ProgressBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  value: number
  label: string
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, label, className, ...props },
  ref,
) {
  const normalizedValue = Math.min(100, Math.max(0, value))

  return (
    <div
      ref={ref}
      className={cn('u-progress', className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalizedValue}
      {...props}
    >
      <span><span>{label}</span><b>{normalizedValue}%</b></span>
      <i><i style={{ width: `${normalizedValue}%` }} /></i>
    </div>
  )
})
