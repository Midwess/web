import { forwardRef, useId, type SVGProps } from 'react'
import { cn } from '@/lib/cn'

export type LogoMotion = 'static' | 'trace'
export type LogoProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  label?: string
  motion?: LogoMotion
}

export const Logo = forwardRef<SVGSVGElement, LogoProps>(function Logo(
  { label = 'Midwess', motion = 'static', className, width = 160, ...props },
  ref,
) {
  const instanceId = useId().replaceAll(':', '')
  const signalId = `${instanceId}-signal`
  const faceId = `${instanceId}-face`
  const titleId = `${instanceId}-title`
  const descriptionId = `${instanceId}-description`

  return (
    <svg
      ref={ref}
      className={cn('u-logo', `u-logo--${motion}`, className)}
      width={width}
      viewBox="0 0 640 560"
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      focusable="false"
      {...props}
    >
      <title id={titleId}>{label}</title>
      <desc id={descriptionId}>The golden-ratio circular-boundary Midwess signal with dimensional depth.</desc>
      <metadata>phi=1.61803398875; r=44; centerline radii=r*phi^5,r*phi^6,r*phi^7; extrusion dx=r/phi^2; extrusion dy=r/phi; slices=13.</metadata>
      <defs>
        <g id={signalId} fill="none" strokeWidth="88" strokeLinecap="round" strokeLinejoin="round">
          <path d="M72.806504 77.904805 A1277.515442 1277.515442 0 0 0 72.806504 482.095195" />
          <path d="M191.209757 172.763348 A789.547964 789.547964 0 0 0 218.403252 387.236652" />
          <path d="M320 230 A487.967478 487.967478 0 0 0 320 280 A487.967478 487.967478 0 0 1 320 330" />
          <path d="M448.790243 172.763348 A789.547964 789.547964 0 0 1 421.596748 387.236652" />
          <path d="M567.193496 77.904805 A1277.515442 1277.515442 0 0 1 567.193496 482.095195" />
        </g>
        <linearGradient id={faceId} x1="42" y1="28" x2="610" y2="548" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffb46f" />
          <stop offset=".382" stopColor="#ff9d52" />
          <stop offset=".618" stopColor="#ff8a3d" />
          <stop offset="1" stopColor="#f66e24" />
        </linearGradient>
      </defs>
      <ellipse className="u-logo__shadow" cx="320" cy="536" rx="164" ry="15" fill="#44180c" />
      <ellipse className="u-logo__impact" cx="320" cy="520" rx="118" ry="14" fill="none" stroke="#ff9d52" strokeWidth="4" />
      <g className="u-logo__actor">
        <g className="u-logo__depth">
          <use href={`#${signalId}`} transform="translate(16.806504 27.193496)" stroke="#76200e" />
          <use href={`#${signalId}`} transform="translate(15.513696 25.101688)" stroke="#7f230f" />
          <use href={`#${signalId}`} transform="translate(14.220888 23.009881)" stroke="#882610" />
          <use href={`#${signalId}`} transform="translate(12.928080 20.918073)" stroke="#912911" />
          <use href={`#${signalId}`} transform="translate(11.635272 18.826266)" stroke="#9a2c12" />
          <use href={`#${signalId}`} transform="translate(10.342464 16.734459)" stroke="#a33013" />
          <use href={`#${signalId}`} transform="translate(9.049656 14.642651)" stroke="#ac3314" />
          <use href={`#${signalId}`} transform="translate(7.756848 12.550844)" stroke="#b53715" />
          <use href={`#${signalId}`} transform="translate(6.464040 10.459037)" stroke="#be3a16" />
          <use href={`#${signalId}`} transform="translate(5.171232 8.367229)" stroke="#c73e17" />
          <use href={`#${signalId}`} transform="translate(3.878424 6.275422)" stroke="#d04118" />
          <use href={`#${signalId}`} transform="translate(2.585616 4.183615)" stroke="#d94519" />
          <use href={`#${signalId}`} transform="translate(1.292808 2.091807)" stroke="#e2491a" />
        </g>
        <g className="u-logo__face" fill="none" stroke={`url(#${faceId})`} strokeWidth="88" strokeLinecap="round" strokeLinejoin="round">
          <g className="u-logo__piece u-logo__piece--outer-left">
            <path className="u-logo__arc u-logo__arc--outer" pathLength="1" d="M72.806504 77.904805 A1277.515442 1277.515442 0 0 0 72.806504 482.095195" />
          </g>
          <g className="u-logo__piece u-logo__piece--inner-left">
            <path className="u-logo__arc u-logo__arc--inner" pathLength="1" d="M191.209757 172.763348 A789.547964 789.547964 0 0 0 218.403252 387.236652" />
          </g>
          <g className="u-logo__piece u-logo__piece--center">
            <path className="u-logo__arc u-logo__arc--center" pathLength="1" d="M320 230 A487.967478 487.967478 0 0 0 320 280 A487.967478 487.967478 0 0 1 320 330" />
          </g>
          <g className="u-logo__piece u-logo__piece--inner-right">
            <path className="u-logo__arc u-logo__arc--inner" pathLength="1" d="M448.790243 172.763348 A789.547964 789.547964 0 0 1 421.596748 387.236652" />
          </g>
          <g className="u-logo__piece u-logo__piece--outer-right">
            <path className="u-logo__arc u-logo__arc--outer" pathLength="1" d="M567.193496 77.904805 A1277.515442 1277.515442 0 0 1 567.193496 482.095195" />
          </g>
        </g>
      </g>
    </svg>
  )
})
