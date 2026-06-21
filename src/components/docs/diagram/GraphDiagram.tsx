import { useId, useLayoutEffect, useRef, useState } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import "./diagram.css";
import "./graph.css";

/**
 * Auto-laid-out graph diagrams. ELK computes node positions + orthogonal edge
 * routes; we render our own warm cards (absolutely positioned) with an SVG edge
 * layer behind. No React Flow — just our HTML + SVG, so it inherits the page CSS
 * instead of fighting it, and renders at a fixed scale (crisp text; wide graphs
 * scroll horizontally).
 *
 * <GraphDiagram
 *   direction="DOWN"           // or "RIGHT"
 *   label="Run state machine"
 *   title="one-line caption"
 *   nodes={[{ id, kind, title, sub, mono, wide }]}
 *   edges={[{ from, to, label, kind, dashed }]} />
 */

export type Kind =
  | "default"
  | "accent"
  | "success"
  | "warn"
  | "error"
  | "info"
  | "muted";

const EDGE_COLOR: Record<Kind, string> = {
  default: "#8f8a82",
  accent: "#d97757",
  success: "#7ba87b",
  warn: "#d9a24e",
  error: "#c77b6b",
  info: "#8aa6c9",
  muted: "#6b6660",
};
const KINDS = Object.keys(EDGE_COLOR) as Kind[];

type NodeSpec = {
  id: string;
  kind?: Kind;
  title: string;
  sub?: string | string[];
  mono?: boolean;
  wide?: boolean;
};
type EdgeSpec = {
  from: string;
  to: string;
  label?: string;
  kind?: Kind;
  dashed?: boolean;
};

type Pt = { x: number; y: number };
type Laid = {
  pos: Map<string, { x: number; y: number; w: number; h: number }>;
  edges: { id: string; pts: Pt[]; kind: Kind; dashed?: boolean; label?: string }[];
  width: number;
  height: number;
};

const cx = (...p: (string | false | undefined)[]) => p.filter(Boolean).join(" ");
const elk = new ELK();

function roundedPath(pts: Pt[], r = 7): string {
  if (pts.length < 2) return "";
  if (pts.length === 2)
    return `M${pts[0].x},${pts[0].y} L${pts[1].x},${pts[1].y}`;
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const a = pts[i - 1];
    const b = pts[i + 1];
    const v1 = norm(p, a, r);
    const v2 = norm(p, b, r);
    d += ` L${v1.x},${v1.y} Q${p.x},${p.y} ${v2.x},${v2.y}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last.x},${last.y}`;
  return d;
}
function norm(from: Pt, to: Pt, r: number): Pt {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const t = Math.min(r, len / 2);
  return { x: from.x + (dx / len) * t, y: from.y + (dy / len) * t };
}

export function GraphDiagram({
  direction = "DOWN",
  label,
  title,
  nodes,
  edges,
}: {
  direction?: "DOWN" | "RIGHT";
  label?: string;
  title?: string;
  nodes: NodeSpec[];
  edges: EdgeSpec[];
}) {
  const uid = useId().replace(/[:]/g, "");
  const refs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [laid, setLaid] = useState<Laid | null>(null);

  useLayoutEffect(() => {
    const children = nodes.map((n) => {
      const el = refs.current.get(n.id);
      const r = el?.getBoundingClientRect();
      return {
        id: n.id,
        width: Math.ceil(r?.width ?? 160),
        height: Math.ceil(r?.height ?? 52),
      };
    });
    const graph = {
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": direction,
        "elk.edgeRouting": "ORTHOGONAL",
        "elk.layered.spacing.nodeNodeBetweenLayers": "58",
        "elk.spacing.nodeNode": "30",
        "elk.spacing.edgeNode": "20",
        "elk.layered.spacing.edgeNodeBetweenLayers": "20",
      },
      children,
      edges: edges.map((e, i) => ({
        id: `e${i}`,
        sources: [e.from],
        targets: [e.to],
      })),
    };
    let cancelled = false;
    elk.layout(graph).then((g: any) => {
      if (cancelled) return;
      const pos = new Map<string, { x: number; y: number; w: number; h: number }>();
      for (const c of g.children ?? [])
        pos.set(c.id, { x: c.x ?? 0, y: c.y ?? 0, w: c.width ?? 0, h: c.height ?? 0 });
      const laidEdges = (g.edges ?? []).map((e: any, i: number) => {
        const sec = e.sections?.[0];
        let pts: Pt[] = [];
        if (sec) pts = [sec.startPoint, ...(sec.bendPoints ?? []), sec.endPoint];
        else {
          // fallback: border-to-border straight line
          const s = pos.get(edges[i].from);
          const t = pos.get(edges[i].to);
          if (s && t)
            pts = [
              { x: s.x + s.w / 2, y: s.y + s.h / 2 },
              { x: t.x + t.w / 2, y: t.y + t.h / 2 },
            ];
        }
        return {
          id: `e${i}`,
          pts,
          kind: edges[i].kind ?? "default",
          dashed: edges[i].dashed,
          label: edges[i].label,
        };
      });
      setLaid({ pos, edges: laidEdges, width: g.width ?? 0, height: g.height ?? 0 });
    });
    return () => {
      cancelled = true;
    };
    // re-run only when the diagram definition changes
  }, [nodes, edges, direction]);

  return (
    <figure className="mw-diagram g-figure" role="img" aria-label={title ?? label}>
      {label && <div className="g-label">{label}</div>}
      <div className="g-scroll">
        <div
          className="g-canvas"
          style={{
            width: laid?.width || undefined,
            height: laid?.height || undefined,
            opacity: laid ? 1 : 0,
          }}
        >
          <svg
            className="g-edges"
            width={laid?.width || 0}
            height={laid?.height || 0}
          >
            <defs>
              {KINDS.map((k) => (
                <marker
                  key={k}
                  id={`${uid}-a-${k}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill={EDGE_COLOR[k]} />
                </marker>
              ))}
            </defs>
            {laid?.edges.map((e) => {
              const color = EDGE_COLOR[e.kind];
              const mid = e.pts[Math.floor(e.pts.length / 2)] ?? e.pts[0];
              return (
                <g key={e.id}>
                  <path
                    d={roundedPath(e.pts)}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.6}
                    strokeDasharray={e.dashed ? "5 4" : undefined}
                    markerEnd={`url(#${uid}-a-${e.kind})`}
                  />
                  {e.label && mid && (
                    <>
                      <rect
                        x={mid.x - (e.label.length * 6.0) / 2 - 5}
                        y={mid.y - 9}
                        width={e.label.length * 6.0 + 10}
                        height={16}
                        rx={4}
                        fill="var(--dg-bg)"
                      />
                      <text
                        className="g-edge-label"
                        x={mid.x}
                        y={mid.y + 3}
                        textAnchor="middle"
                        fill={color}
                      >
                        {e.label}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {nodes.map((n) => {
            const p = laid?.pos.get(n.id);
            const subs = n.sub == null ? [] : Array.isArray(n.sub) ? n.sub : [n.sub];
            return (
              <div
                key={n.id}
                ref={(el) => {
                  refs.current.set(n.id, el);
                }}
                className={cx("g-box", n.kind, n.mono && "mono", n.wide && "wide")}
                style={p ? { left: p.x, top: p.y } : { left: 0, top: 0 }}
              >
                <div className="g-box-title">{n.title}</div>
                {subs.map((s, i) => (
                  <div key={i} className="g-box-sub">
                    {s}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {title && <figcaption className="g-cap">{title}</figcaption>}
    </figure>
  );
}
