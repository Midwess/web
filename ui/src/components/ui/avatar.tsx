import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type AvatarSize = 'small' | 'default' | 'large'
export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  name: string
  color?: string
  size?: AvatarSize
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, color = 'var(--u-violet)', size = 'default', className, style, ...props },
  ref,
) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <span
      ref={ref}
      className={cn('u-avatar', `u-avatar--${size}`, className)}
      style={{ '--avatar-color': color, ...style } as CSSProperties}
      aria-label={name}
      {...props}
    >
      {initials}
    </span>
  )
})

export type AvatarGroupProps = HTMLAttributes<HTMLSpanElement>

export const AvatarGroup = forwardRef<HTMLSpanElement, AvatarGroupProps>(function AvatarGroup(
  { className, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn('u-avatar-group', className)} {...props}>
      {children}
    </span>
  )
})
