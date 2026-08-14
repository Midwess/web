import { useId } from "react";
import type { SVGAttributes } from "react";

const Logo = (props: SVGAttributes<SVGElement>) => {
  const id = useId().replace(/:/g, "");
  const signalId = `midwess-circular-signal-${id}`;
  const faceId = `midwess-circular-face-${id}`;

  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 640 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Midwess"
      {...props}
    >
      <defs>
        <g
          id={signalId}
          strokeWidth="88"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M72.806504 77.904805 A1277.515442 1277.515442 0 0 0 72.806504 482.095195" />
          <path d="M191.209757 172.763348 A789.547964 789.547964 0 0 0 218.403252 387.236652" />
          <path d="M320 230 A487.967478 487.967478 0 0 0 320 280 A487.967478 487.967478 0 0 1 320 330" />
          <path d="M448.790243 172.763348 A789.547964 789.547964 0 0 1 421.596748 387.236652" />
          <path d="M567.193496 77.904805 A1277.515442 1277.515442 0 0 1 567.193496 482.095195" />
        </g>
        <linearGradient
          id={faceId}
          x1="42"
          y1="28"
          x2="610"
          y2="548"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffb46f" />
          <stop offset=".382" stopColor="#ff9d52" />
          <stop offset=".618" stopColor="#ff8a3d" />
          <stop offset="1" stopColor="#f66e24" />
        </linearGradient>
      </defs>
      <g fill="none">
        <use
          href={`#${signalId}`}
          transform="translate(16.806504 27.193496)"
          stroke="#76200e"
        />
        <use
          href={`#${signalId}`}
          transform="translate(14.220888 23.009881)"
          stroke="#882610"
        />
        <use
          href={`#${signalId}`}
          transform="translate(11.635272 18.826266)"
          stroke="#9a2c12"
        />
        <use
          href={`#${signalId}`}
          transform="translate(9.049656 14.642651)"
          stroke="#ac3314"
        />
        <use
          href={`#${signalId}`}
          transform="translate(6.46404 10.459037)"
          stroke="#be3a16"
        />
        <use
          href={`#${signalId}`}
          transform="translate(3.878424 6.275422)"
          stroke="#d04118"
        />
        <use
          href={`#${signalId}`}
          transform="translate(1.292808 2.091807)"
          stroke="#e2491a"
        />
        <use href={`#${signalId}`} stroke={`url(#${faceId})`} />
      </g>
    </svg>
  );
};

export default Logo;
