"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type CPMNode = {
  id: string;
  name: string;
  duration: number;
  preds: string[];
  ES: number;
  EF: number;
  LS: number;
  LF: number;
  float: number;
  critical: boolean;
  col: number;
  row: number;
};

export type CPMNetworkData = {
  title: string;
  unit: "weeks" | "days";
  indexing: "zero" | "one";
  cols: number;
  rows: number;
  duration: number;
  criticalPath: string[];
  nodes: CPMNode[];
};

type Step = 0 | 1 | 2 | 3;
// 0 = empty network (just duration), 1 = forward pass (ES/EF), 2 = backward pass (LS/LF), 3 = critical path

const NODE_W = 140;
const NODE_H = 90;
const CELL_W = 200;
const CELL_H = 150;
const PADDING = 30;

export default function CPMNetwork({ data }: { data: CPMNetworkData }) {
  const [step, setStep] = useState<Step>(0);

  const width = PADDING * 2 + data.cols * CELL_W;
  const height = PADDING * 2 + data.rows * CELL_H;

  const nodeAt = (n: CPMNode) => ({
    x: PADDING + n.col * CELL_W + (CELL_W - NODE_W) / 2,
    y: PADDING + n.row * CELL_H + (CELL_H - NODE_H) / 2,
  });

  // Build edges
  const edges = useMemo(() => {
    const lookup = new Map(data.nodes.map((n) => [n.id, n]));
    const result: { from: CPMNode; to: CPMNode; critical: boolean }[] = [];
    for (const node of data.nodes) {
      for (const p of node.preds) {
        const from = lookup.get(p);
        if (from) {
          const critical = from.critical && node.critical && pathContains(data.criticalPath, p, node.id);
          result.push({ from, to: node, critical });
        }
      }
    }
    return result;
  }, [data]);

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 overflow-hidden">
      <div className="px-5 md:px-6 pt-5 pb-4 border-b border-ink-800/80">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium">
              Interactive network
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">{data.title}</h3>
          </div>
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-right"
            >
              <div className="text-[11px] uppercase tracking-[0.16em] text-amber-300/80">Critical path</div>
              <div className="font-mono text-base text-amber-200 tabular-nums">
                {data.criticalPath.join(" → ")}
                <span className="text-ink-400"> · </span>
                <span className="text-amber-300">{data.duration} {data.unit}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Stepper */}
        <div className="flex flex-wrap gap-1.5 bg-ink-950 border border-ink-800 rounded-xl p-1">
          {[
            { v: 0, label: "Network", sub: "duration only" },
            { v: 1, label: "Forward pass", sub: "ES & EF" },
            { v: 2, label: "Backward pass", sub: "LS & LF" },
            { v: 3, label: "Critical path", sub: "float = 0" },
          ].map((s) => (
            <button
              key={s.v}
              onClick={() => setStep(s.v as Step)}
              className={[
                "relative flex-1 min-w-[120px] rounded-lg px-3 py-2 text-left transition-all active:translate-y-[1px]",
                step === s.v
                  ? "bg-emerald-500/15 text-emerald-100 ring-1 ring-inset ring-emerald-400/30"
                  : "text-ink-300 hover:text-white hover:bg-ink-900",
              ].join(" ")}
            >
              <div className="text-[11px] uppercase tracking-wider opacity-70 mb-0.5">
                Step {s.v + 1}
              </div>
              <div className="text-sm font-medium leading-tight">{s.label}</div>
              <div className="text-[10px] text-ink-400 mt-0.5">{s.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SVG */}
      <div className="px-5 md:px-6 pb-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ minWidth: width * 0.65 }}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#5b6987" />
            </marker>
            <marker id="arrow-critical" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
            </marker>
          </defs>

          {/* Edges */}
          <g>
            {edges.map((e, i) => {
              const a = nodeAt(e.from);
              const b = nodeAt(e.to);
              const x1 = a.x + NODE_W;
              const y1 = a.y + NODE_H / 2;
              const x2 = b.x;
              const y2 = b.y + NODE_H / 2;
              const mx = (x1 + x2) / 2;
              const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
              const showCritical = step === 3 && e.critical;
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={showCritical ? "#f59e0b" : "#39435a"}
                  strokeWidth={showCritical ? 2.5 : 1.5}
                  markerEnd={showCritical ? "url(#arrow-critical)" : "url(#arrow)"}
                  style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {data.nodes.map((n, idx) => {
              const { x, y } = nodeAt(n);
              const showCritical = step === 3 && n.critical;
              return (
                <motion.g
                  key={n.id}
                  initial={{ opacity: 0, y: y + 6 }}
                  animate={{ opacity: 1, y: y }}
                  transition={{ delay: idx * 0.04, type: "spring", stiffness: 240, damping: 22 }}
                  transform={`translate(${x}, 0)`}
                >
                  {showCritical && (
                    <rect
                      x={-2}
                      y={-2}
                      width={NODE_W + 4}
                      height={NODE_H + 4}
                      rx={12}
                      fill="none"
                      stroke="#f59e0b"
                      strokeOpacity={0.35}
                      strokeWidth={6}
                      style={{ filter: "blur(2px)" }}
                    />
                  )}
                  <rect
                    x={0}
                    y={0}
                    width={NODE_W}
                    height={NODE_H}
                    rx={10}
                    fill={showCritical ? "#1c1208" : "#10141f"}
                    stroke={showCritical ? "#f59e0b" : "#2a3146"}
                    strokeWidth={showCritical ? 1.5 : 1}
                  />
                  {/* Top row: ES | dur | EF */}
                  <line x1={NODE_W / 3} y1={0} x2={NODE_W / 3} y2={NODE_H / 3} stroke="#21283a" />
                  <line x1={(NODE_W * 2) / 3} y1={0} x2={(NODE_W * 2) / 3} y2={NODE_H / 3} stroke="#21283a" />
                  {/* Bottom row: LS | float | LF */}
                  <line x1={NODE_W / 3} y1={(NODE_H * 2) / 3} x2={NODE_W / 3} y2={NODE_H} stroke="#21283a" />
                  <line x1={(NODE_W * 2) / 3} y1={(NODE_H * 2) / 3} x2={(NODE_W * 2) / 3} y2={NODE_H} stroke="#21283a" />
                  <line x1={0} y1={NODE_H / 3} x2={NODE_W} y2={NODE_H / 3} stroke="#21283a" />
                  <line x1={0} y1={(NODE_H * 2) / 3} x2={NODE_W} y2={(NODE_H * 2) / 3} stroke="#21283a" />

                  {/* ES */}
                  <Cell
                    cx={NODE_W / 6}
                    cy={NODE_H / 6}
                    label="ES"
                    value={n.ES}
                    visible={step >= 1}
                    accent="emerald"
                  />
                  {/* duration */}
                  <Cell
                    cx={NODE_W / 2}
                    cy={NODE_H / 6}
                    label="dur"
                    value={n.duration}
                    visible={true}
                    accent="slate"
                  />
                  {/* EF */}
                  <Cell
                    cx={(NODE_W * 5) / 6}
                    cy={NODE_H / 6}
                    label="EF"
                    value={n.EF}
                    visible={step >= 1}
                    accent="emerald"
                  />

                  {/* Activity name */}
                  <text
                    x={NODE_W / 2}
                    y={NODE_H / 2 + 5}
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="600"
                    fill={showCritical ? "#fcd34d" : "#fff"}
                  >
                    {n.name}
                  </text>

                  {/* LS */}
                  <Cell
                    cx={NODE_W / 6}
                    cy={(NODE_H * 5) / 6}
                    label="LS"
                    value={n.LS}
                    visible={step >= 2}
                    accent="sky"
                  />
                  {/* float */}
                  <Cell
                    cx={NODE_W / 2}
                    cy={(NODE_H * 5) / 6}
                    label={step >= 3 ? "float" : "—"}
                    value={n.float}
                    visible={step >= 3}
                    accent={n.float === 0 ? "amber" : "slate"}
                  />
                  {/* LF */}
                  <Cell
                    cx={(NODE_W * 5) / 6}
                    cy={(NODE_H * 5) / 6}
                    label="LF"
                    value={n.LF}
                    visible={step >= 2}
                    accent="sky"
                  />
                </motion.g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend / phase hint */}
      <div className="px-5 md:px-6 pb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-ink-800 bg-ink-950 px-4 py-3 text-sm text-ink-200"
          >
            {step === 0 && (
              <>
                <strong className="text-white">Network only.</strong> Activities and their dependencies — durations only. Move left to right; arrows mean <span className="text-ink-100">predecessor must finish first</span>.
              </>
            )}
            {step === 1 && (
              <>
                <strong className="text-emerald-200">Forward pass.</strong>{" "}
                <span className="font-mono">EF = ES + duration</span>; at a merge,{" "}
                <span className="font-mono">ES = max(EF of predecessors)</span>. Start nodes have{" "}
                <span className="font-mono">ES = {data.indexing === "zero" ? "0" : "1"}</span>.
              </>
            )}
            {step === 2 && (
              <>
                <strong className="text-sky-200">Backward pass.</strong>{" "}
                <span className="font-mono">LS = LF − duration</span>; at a burst,{" "}
                <span className="font-mono">LF = min(LS of successors)</span>. End nodes have{" "}
                <span className="font-mono">LF = project duration ({data.duration})</span>.
              </>
            )}
            {step === 3 && (
              <>
                <strong className="text-amber-200">Critical path.</strong> Activities with{" "}
                <span className="font-mono">float = 0</span> form the path that determines the project's duration. Any delay here delays the whole project.
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function pathContains(path: string[], from: string, to: string) {
  for (let i = 0; i < path.length - 1; i++) {
    if (path[i] === from && path[i + 1] === to) return true;
  }
  return false;
}

function Cell({
  cx,
  cy,
  label,
  value,
  visible,
  accent,
}: {
  cx: number;
  cy: number;
  label: string;
  value: number;
  visible: boolean;
  accent: "emerald" | "sky" | "amber" | "slate";
}) {
  const palette = {
    emerald: "#6ee7b7",
    sky: "#7dd3fc",
    amber: "#fcd34d",
    slate: "#cbd5e1",
  } as const;
  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: `${cx}px ${cy}px` } as React.CSSProperties}
        >
          <text x={cx} y={cy - 3} textAnchor="middle" fontSize="8" fill="#7d8aa1" className="font-mono">
            {label}
          </text>
          <text
            x={cx}
            y={cy + 9}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill={palette[accent]}
            className="font-mono tabular-nums"
          >
            {value}
          </text>
        </motion.g>
      )}
    </AnimatePresence>
  );
}
