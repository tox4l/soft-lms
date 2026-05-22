"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PERTCalculator() {
  const [o, setO] = useState(4);
  const [m, setM] = useState(6);
  const [pp, setPp] = useState(14);

  // Enforce o ≤ m ≤ p
  useEffect(() => {
    if (m < o) setM(o);
    if (pp < m) setPp(m);
  }, [o, m, pp]);

  const te = (o + 4 * m + pp) / 6;

  const W = 600,
    H = 80,
    padX = 24;
  const innerW = W - padX * 2;
  const maxAxis = Math.max(20, Math.ceil(pp * 1.1));
  const xFor = (v: number) => padX + (v / maxAxis) * innerW;

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium">
            Interactive
          </div>
          <h3 className="text-lg font-semibold text-white tracking-tight">PERT three-point estimate</h3>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">Expected duration</div>
          <motion.div
            key={te.toFixed(2)}
            initial={{ opacity: 0.4, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="font-mono text-3xl text-emerald-300 tabular-nums"
          >
            {te.toFixed(2)}
          </motion.div>
        </div>
      </div>

      <p className="text-sm text-ink-400 mb-5 max-w-xl">
        Drag the markers. The <span className="text-ink-200">most-likely</span> estimate is weighted{" "}
        <span className="font-mono text-amber-300">4×</span>; the whole sum is divided by{" "}
        <span className="font-mono text-amber-300">6</span>.
      </p>

      {/* Number track */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto mb-2">
        {/* Axis line */}
        <line x1={padX} x2={W - padX} y1={50} y2={50} stroke="#39435a" strokeWidth={1.5} />
        {/* Ticks */}
        {Array.from({ length: 11 }, (_, i) => Math.round((maxAxis / 10) * i)).map((t) => (
          <g key={t}>
            <line x1={xFor(t)} x2={xFor(t)} y1={46} y2={54} stroke="#39435a" />
            <text x={xFor(t)} y={70} textAnchor="middle" fontSize="10" fill="#7d8aa1" className="font-mono">
              {t}
            </text>
          </g>
        ))}
        {/* Range bar */}
        <rect x={xFor(o)} y={42} width={xFor(pp) - xFor(o)} height={16} rx={8} fill="#34d39922" stroke="#34d399" strokeOpacity={0.4} />
        {/* Expected duration marker */}
        <motion.line
          x1={xFor(te)}
          x2={xFor(te)}
          y1={20}
          y2={80}
          stroke="#34d399"
          strokeWidth={2}
          strokeDasharray="3 3"
          initial={false}
          animate={{ x1: xFor(te), x2: xFor(te) }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        />
        {/* Three markers */}
        {[
          { v: o, color: "#60a5fa", label: "o" },
          { v: m, color: "#fbbf24", label: "m (×4)" },
          { v: pp, color: "#f87171", label: "p" },
        ].map(({ v, color, label }) => (
          <motion.g
            key={label + v}
            initial={false}
            animate={{ x: xFor(v) }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            transform={`translate(${xFor(v)}, 0)`}
          >
            <circle cx={0} cy={50} r={7} fill={color} stroke="#0b0e18" strokeWidth={2} />
            <text x={0} y={28} textAnchor="middle" fontSize="10" fill="#cbd5e1" className="font-mono">
              {label} = {v}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        <NumInput label="Optimistic (t_o)" tone="sky" value={o} onChange={setO} min={1} max={30} />
        <NumInput label="Most likely (t_m)" tone="amber" value={m} onChange={setM} min={o} max={30} weight="×4" />
        <NumInput label="Pessimistic (t_p)" tone="rose" value={pp} onChange={setPp} min={m} max={40} />
      </div>

      <div className="mt-5 rounded-xl border border-ink-800 bg-ink-950 px-4 py-3 font-mono text-sm">
        <div className="text-ink-400 text-[11px] uppercase tracking-wider mb-1">Working</div>
        <span className="text-ink-200">t_e = </span>
        <span className="text-sky-300">({o}</span>
        <span className="text-ink-400"> + </span>
        <span className="text-amber-300">4·{m}</span>
        <span className="text-ink-400"> + </span>
        <span className="text-rose-300">{pp})</span>
        <span className="text-ink-400"> / 6 = </span>
        <span className="text-ink-200">({o + 4 * m + pp})</span>
        <span className="text-ink-400"> / 6 = </span>
        <span className="text-emerald-300 font-semibold">{te.toFixed(2)}</span>
      </div>
    </div>
  );
}

function NumInput({
  label,
  value,
  onChange,
  min,
  max,
  tone,
  weight,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  tone: "sky" | "amber" | "rose";
  weight?: string;
}) {
  const palette = {
    sky: "accent-sky-400",
    amber: "accent-amber-400",
    rose: "accent-rose-400",
  } as const;
  const textPalette = {
    sky: "text-sky-300",
    amber: "text-amber-300",
    rose: "text-rose-300",
  } as const;
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-950 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] uppercase tracking-wider text-ink-400">{label}</div>
        {weight && <span className="text-[10px] font-mono text-amber-300">{weight}</span>}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={["flex-1", palette[tone]].join(" ")}
        />
        <span className={["font-mono text-xl tabular-nums w-10 text-right", textPalette[tone]].join(" ")}>
          {value}
        </span>
      </div>
    </div>
  );
}
