import { createContext, useContext, useId, type ReactNode } from "react";
import "./diagram.css";

/**
 * Midwess docs diagram primitives.
 *
 * Coordinate-based SVG components with a shared Claude-warm token palette
 * (see diagram.css) and a hard text-size floor (12px). Authored in MDX with no
 * imports — the components are registered in ProjectDocs' `mdxComponents`.
 *
 * Each <Diagram> mints a unique id (useId) and shares it via context so its
 * arrow markers / shadow filter / card gradient never collide across the many
 * diagrams on one page.
 */

export type Kind =
  | "default"
  | "accent"
  | "success"
  | "warn"
  | "error"
  | "info"
  | "muted";

const KIND_VAR: Record<Kind, string> = {
  default: "--dg-muted",
  accent: "--dg-accent",
  success: "--dg-success",
  warn: "--dg-warn",
  error: "--dg-error",
  info: "--dg-info",
  muted: "--dg-border",
};

const KINDS = Object.keys(KIND_VAR) as Kind[];
const color = (k: Kind = "default") => `var(${KIND_VAR[k]})`;

const SANS = "ui-sans-serif, system-ui, -apple-system, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const DiagramCtx = createContext<string>("mwd");

export function Diagram({
  width = 760,
  height,
  title,
  label,
  children,
}: {
  width?: number;
  height: number;
  title?: string;
  /** small uppercase section label, drawn top-left inside the panel */
  label?: string;
  children: ReactNode;
}) {
  const id = useId().replace(/[:]/g, "");
  return (
    <figure className="mw-diagram">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title ?? label ?? "diagram"}
        fontFamily={SANS}
      >
        <defs>
          <filter
            id={`${id}-shadow`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#000000"
              floodOpacity="0.38"
            />
          </filter>
          <linearGradient id={`${id}-card`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--dg-card)" />
            <stop offset="1" stopColor="var(--dg-card-2)" />
          </linearGradient>
          {KINDS.map((k) => (
            <marker
              key={k}
              id={`${id}-arrow-${k}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill={color(k)} />
            </marker>
          ))}
        </defs>

        <rect
          x="0.5"
          y="0.5"
          width={width - 1}
          height={height - 1}
          rx="16"
          fill="var(--dg-bg)"
          stroke="var(--dg-border)"
          strokeWidth="1"
        />
        {label && (
          <text
            x="22"
            y="30"
            fontSize="11"
            fontWeight="700"
            letterSpacing="1.4"
            fill="var(--dg-muted)"
          >
            {label.toUpperCase()}
          </text>
        )}

        <DiagramCtx.Provider value={id}>{children}</DiagramCtx.Provider>
      </svg>
    </figure>
  );
}

export function DNode({
  x,
  y,
  w,
  h,
  kind = "default",
  title,
  sub,
  mono,
  badge,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  kind?: Kind;
  title: string;
  /** one line, or several lines */
  sub?: string | string[];
  mono?: boolean;
  /** numbered step badge in the top-left */
  badge?: number;
}) {
  const id = useContext(DiagramCtx);
  const lines = sub == null ? [] : Array.isArray(sub) ? sub : [sub];
  const tx = x + (badge != null ? 44 : 16);
  return (
    <g>
      <g filter={`url(#${id}-shadow)`}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="12"
          fill={`url(#${id}-card)`}
          stroke="var(--dg-border)"
          strokeWidth="1"
        />
      </g>
      <rect x={x} y={y} width="4" height={h} rx="2" fill={color(kind)} />
      {badge != null && (
        <>
          <circle cx={x + 24} cy={y + 24} r="12" fill={color(kind)} />
          <text
            x={x + 24}
            y={y + 28}
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            fill="var(--dg-bg)"
          >
            {badge}
          </text>
        </>
      )}
      <text
        x={tx}
        y={y + 27}
        fontSize="15"
        fontWeight="700"
        fill="var(--dg-text)"
        fontFamily={mono ? MONO : SANS}
      >
        {title}
      </text>
      {lines.map((s, i) => (
        <text
          key={i}
          x={tx}
          y={y + 48 + i * 17}
          fontSize="12.5"
          fontWeight="400"
          fill="var(--dg-muted)"
          fontFamily={mono ? MONO : SANS}
        >
          {s}
        </text>
      ))}
    </g>
  );
}

export function DLane({
  x,
  y,
  w,
  h,
  label,
  kind = "default",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  kind?: Kind;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill="none"
        stroke={kind === "default" ? "var(--dg-border)" : color(kind)}
        strokeOpacity={kind === "default" ? 1 : 0.5}
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      {label && (
        <text
          x={x + 16}
          y={y - 9}
          fontSize="11"
          fontWeight="700"
          letterSpacing="1.2"
          fill="var(--dg-muted)"
        >
          {label.toUpperCase()}
        </text>
      )}
    </g>
  );
}

export function DEdge({
  x1,
  y1,
  x2,
  y2,
  kind = "default",
  dashed,
  label,
  labelDy = -7,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kind?: Kind;
  dashed?: boolean;
  label?: string;
  labelDy?: number;
}) {
  const id = useContext(DiagramCtx);
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color(kind)}
        strokeWidth="2"
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#${id}-arrow-${kind})`}
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 + labelDy}
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
          fill={color(kind)}
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function DBadge({
  cx,
  cy,
  n,
  kind = "accent",
}: {
  cx: number;
  cy: number;
  n: number | string;
  kind?: Kind;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="12" fill={color(kind)} />
      <text
        x={cx}
        y={cy + 4}
        fontSize="13"
        fontWeight="700"
        textAnchor="middle"
        fill="var(--dg-bg)"
      >
        {n}
      </text>
    </g>
  );
}

const VARIANT = {
  title: { fs: 16, fw: 700, fill: "var(--dg-text)" },
  body: { fs: 13, fw: 500, fill: "var(--dg-text)" },
  caption: { fs: 12, fw: 400, fill: "var(--dg-muted)" },
  section: { fs: 11, fw: 700, fill: "var(--dg-muted)" },
} as const;

export function DLabel({
  x,
  y,
  variant = "body",
  kind,
  anchor,
  mono,
  children,
}: {
  x: number;
  y: number;
  variant?: keyof typeof VARIANT;
  kind?: Kind;
  anchor?: "start" | "middle" | "end";
  mono?: boolean;
  children: ReactNode;
}) {
  const s = VARIANT[variant];
  const text =
    variant === "section" ? String(children).toUpperCase() : children;
  return (
    <text
      x={x}
      y={y}
      fontSize={s.fs}
      fontWeight={s.fw}
      fill={kind ? color(kind) : s.fill}
      textAnchor={anchor}
      letterSpacing={variant === "section" ? 1.4 : undefined}
      fontFamily={mono ? MONO : SANS}
    >
      {text}
    </text>
  );
}
