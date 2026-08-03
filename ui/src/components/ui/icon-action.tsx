import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Icon, type IconName } from './icon'

export type IconActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  icon: IconName
}

export const IconAction = forwardRef<HTMLButtonElement, IconActionProps>(function IconAction(
  { label, icon, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn('u-icon-action', className)}
      aria-label={label}
      title={label}
      {...props}
    >
      <Icon name={icon} size={19} />
    </button>
  )
})
