import { type ReactNode, type SVGProps } from 'react'

export type IconName = 'home' | 'chart' | 'bag' | 'calendar' | 'map' | 'settings' | 'search' | 'bell' | 'arrow' | 'plus' | 'warning' | 'chevron' | 'users' | 'clock' | 'sparkles' | 'sun' | 'moon' | 'close' | 'mic' | 'check' | 'layers'

const paths: Record<IconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z" /><path d="M9 21v-6h6v6" /></>,
  chart: <><path d="M3 20.5h18" /><path d="m4 17 5-5 3.5 2.8L20 6" /></>,
  bag: <><path d="M5 8.5h14l1 12H4l1-12Z" /><path d="M8.5 9V6.5a3.5 3.5 0 0 1 7 0V9" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
  map: <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.9l.06.06-2.1 2.1-.06-.06a1.7 1.7 0 0 0-1.9-.34 1.7 1.7 0 0 0-1 1.55V20.3h-3v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.9.34l-.06.06-2.1-2.1.06-.06A1.7 1.7 0 0 0 7.1 15a1.7 1.7 0 0 0-1.55-1H5.5v-3h.05a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.9L6.7 8l2.1-2.1.06.06a1.7 1.7 0 0 0 1.9.34 1.7 1.7 0 0 0 1-1.55V4.7h3v.05a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.9-.34l.06-.06 2.1 2.1-.06.06a1.7 1.7 0 0 0-.34 1.9 1.7 1.7 0 0 0 1.55 1h.05v3h-.05a1.7 1.7 0 0 0-1.55 1Z" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></>, bell: <><path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /><circle cx="19.2" cy="5" r="1.7" fill="currentColor" stroke="none" /></>,
  arrow: <><path d="M6 18 18 6" /><path d="M9 6h9v9" /></>, plus: <path d="M12 5v14M5 12h14" />, warning: <><path d="M12 3 21 19a2 2 0 0 1-1.75 3H4.75A2 2 0 0 1 3 19L12 3Z" /><path d="M12 9v5M12 18v.1" /></>, chevron: <path d="m7 10 5 5 5-5" />,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>, clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>, sparkles: <><path d="m12 3-1.6 5.4L5 10l5.4 1.6L12 17l1.6-5.4L19 10l-5.4-1.6L12 3Z" /><path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7L19 16Z" /></>, sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>, moon: <path d="M20.5 15.5A8.7 8.7 0 0 1 8.5 3.5a8.7 8.7 0 1 0 12 12Z" />, close: <path d="m6 6 12 12M18 6 6 18" />, mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
}
export type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20, className = 'icon', ...props }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
