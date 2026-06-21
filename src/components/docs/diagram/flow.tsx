import type { CSSProperties, ReactNode } from "react";
import "./diagram.css";
import "./flow.css";

/**
 * Auto-layout flow-diagram primitives.
 *
 * Rendered as HTML/flexbox, NOT hand-placed SVG — the browser computes every
 * position, so overlap is structurally impossible and text wraps instead of
 * colliding. Authors describe structure (rows, columns, groups), never
 * coordinates. Same Claude-warm token palette as the SVG primitives.
 *
 * Registered globally in mdxComponents — use in MDX with no import.
 */

export type Kind =
  | "default"
  | "accent"
  | "success"
  | "warn"
  | "error"
  | "info"
  | "muted";

const cx = (...parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join(" ");

/** Panel wrapper. `title` renders as a caption, `label` as a small section tag. */
export function DChart({
  title,
  label,
  children,
}: {
  title?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <figure className="mw-diagram mw-chart" role="img" aria-label={title ?? label}>
      {label && <div className="mw-chart-label">{label}</div>}
      <div className="mw-col">{children}</div>
      {title && <figcaption className="mw-chart-cap">{title}</figcaption>}
    </figure>
  );
}

export function DRow({
  gap,
  align = "stretch",
  wrap,
  children,
}: {
  gap?: number;
  align?: CSSProperties["alignItems"];
  wrap?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="mw-row"
      style={{ gap, alignItems: align, flexWrap: wrap ? "wrap" : undefined }}
    >
      {children}
    </div>
  );
}

export function DCol({
  gap,
  align = "stretch",
  children,
}: {
  gap?: number;
  align?: CSSProperties["alignItems"];
  children: ReactNode;
}) {
  return (
    <div className="mw-col" style={{ gap, alignItems: align }}>
      {children}
    </div>
  );
}

/** A node card. Auto-sizes to its (wrapping) content. */
export function DBox({
  kind = "default",
  title,
  sub,
  mono,
  badge,
  grow,
  children,
}: {
  kind?: Kind;
  title?: string;
  sub?: string | string[];
  mono?: boolean;
  badge?: number | string;
  /** flex-grow weight inside a row (default 1) */
  grow?: number;
  children?: ReactNode;
}) {
  const subs = sub == null ? [] : Array.isArray(sub) ? sub : [sub];
  return (
    <div
      className={cx("mw-box", kind, mono && "mono")}
      style={grow != null ? { flex: `${grow} 1 0` } : undefined}
    >
      {(badge != null || title) && (
        <div className="mw-box-head">
          {badge != null && <span className={cx("mw-badge", kind)}>{badge}</span>}
          {title && <span className="mw-box-title">{title}</span>}
        </div>
      )}
      {subs.map((s, i) => (
        <span key={i} className="mw-box-sub">
          {s}
        </span>
      ))}
      {children}
    </div>
  );
}

const CHEVRON: Record<string, string> = {
  right: "M5 12h12M12 6l6 6-6 6",
  left: "M19 12H7M12 6l-6 6 6 6",
  down: "M12 5v12M6 12l6 6 6-6",
  up: "M12 19V7M6 12l6-6 6 6",
};

/** A connector. `dir` controls the chevron; `label` sits next to it. */
export function DArrow({
  dir = "right",
  kind = "default",
  dashed,
  label,
}: {
  dir?: "right" | "left" | "down" | "up";
  kind?: Kind;
  dashed?: boolean;
  label?: string;
}) {
  return (
    <div className={cx("mw-arrow", kind !== "default" && kind)}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={CHEVRON[dir]}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashed ? "3 3" : undefined}
        />
      </svg>
      {label && <span className="mw-arrow-label">{label}</span>}
    </div>
  );
}

/** A bordered container (lane/region). `row` lays children horizontally. */
export function DGroup({
  label,
  kind = "default",
  row,
  gap,
  children,
}: {
  label?: string;
  kind?: Kind;
  row?: boolean;
  gap?: number;
  children: ReactNode;
}) {
  return (
    <div className={cx("mw-group", kind !== "default" && kind)}>
      {label && <div className="mw-group-label">{label}</div>}
      <div className={row ? "mw-row" : "mw-col"} style={{ gap }}>
        {children}
      </div>
    </div>
  );
}

/** A caption / footnote line. */
export function DNote({
  kind,
  center,
  children,
}: {
  kind?: Kind;
  center?: boolean;
  children: ReactNode;
}) {
  return (
    <p className={cx("mw-note", center && "center", kind && kind)}>{children}</p>
  );
}
