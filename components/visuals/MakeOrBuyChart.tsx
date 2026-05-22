"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Params = { purchase: number; operating: number; lease: number };

export default function MakeOrBuyChart() {
  const [p, setP] = useState<Params>({ purchase: 12000, operating: 400, lease: 800 });

  // Break-even: purchase + operating·d = lease·d  →  d = purchase / (lease − operating)
  const breakeven = useMemo(() => {
    const denom = p.lease - p.operating;
    if (denom <= 0) return null;
    return p.purchase / denom;
  }, [p]);

  // Chart domain
  const maxDays = useMemo(() => {
    const target = breakeven ? Math.ceil(breakeven * 1.6) : 50;
    return Math.max(20, Math.min(120, target));
  }, [breakeven]);

  const maxCost = useMemo(() => {
    const a = p.purchase + p.operating * maxDays;
    const b = p.lease * maxDays;
    return Math.max(a, b) * 1.05;
  }, [p, maxDays]);

  // Map data to viewBox 600×340 with padding
  const W = 600,
    H = 340,
    padL = 56,
    padR = 24,
    padT = 24,
    padB = 40;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const xFor = (d: number) => padL + (d / maxDays) * innerW;
  const yFor = (c: number) => padT + innerH - (c / maxCost) * innerH;

  const purchasePath = `M ${xFor(0)} ${yFor(p.purchase)} L ${xFor(maxDays)} ${yFor(p.purchase + p.operating * maxDays)}`;
  const leasePath = `M ${xFor(0)} ${yFor(0)} L ${xFor(maxDays)} ${yFor(p.lease * maxDays)}`;

  const beX = breakeven != null ? xFor(breakeven) : null;
  const beY = breakeven != null ? yFor(p.lease * breakeven) : null;

  // Axis ticks
  const xTicks = Array.from({ length: 6 }, (_, i) => Math.round((maxDays / 5) * i));
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((maxCost / 4) * i));

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium">
            Interactive
          </div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Make-or-buy break-even</h3>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">Break-even</div>
          <div className="font-mono text-2xl text-emerald-300 tabular-nums">
            {breakeven != null ? `${breakeven.toFixed(1)} days` : "—"}
          </div>
        </div>
      </div>

      <p className="text-sm text-ink-400 mb-5 max-w-xl">
        Adjust the three parameters. The break-even is where the two lines intersect —{" "}
        <span className="text-ink-200">below it, lease</span>;{" "}
        <span className="text-ink-200">above it, buy</span>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-center">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Grid */}
          {yTicks.map((t, i) => (
            <g key={`y-${i}`}>
              <line
                x1={padL}
                x2={W - padR}
                y1={yFor(t)}
                y2={yFor(t)}
                stroke="#21283a"
                strokeDasharray="2 3"
              />
              <text x={padL - 10} y={yFor(t) + 4} fontSize="10" textAnchor="end" fill="#7d8aa1" className="font-mono">
                ${t >= 1000 ? `${(t / 1000).toFixed(t >= 10000 ? 0 : 1)}k` : t}
              </text>
            </g>
          ))}
          {xTicks.map((t, i) => (
            <g key={`x-${i}`}>
              <line x1={xFor(t)} x2={xFor(t)} y1={padT} y2={H - padB} stroke="#1a2031" strokeDasharray="2 3" />
              <text x={xFor(t)} y={H - padB + 18} fontSize="10" textAnchor="middle" fill="#7d8aa1" className="font-mono">
                {t}d
              </text>
            </g>
          ))}

          {/* Axes */}
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#39435a" />
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#39435a" />

          {/* Region shading */}
          {beX != null && (
            <>
              <rect x={padL} y={padT} width={beX - padL} height={innerH} fill="#10b98110" />
              <rect x={beX} y={padT} width={W - padR - beX} height={innerH} fill="#f59e0b10" />
            </>
          )}

          {/* Purchase line */}
          <motion.path
            key={`p-${p.purchase}-${p.operating}-${maxDays}`}
            d={purchasePath}
            stroke="#f59e0b"
            strokeWidth={2.5}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Lease line */}
          <motion.path
            key={`l-${p.lease}-${maxDays}`}
            d={leasePath}
            stroke="#34d399"
            strokeWidth={2.5}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Break-even crosshair + dot */}
          {beX != null && beY != null && (
            <>
              <line x1={beX} y1={padT} x2={beX} y2={H - padB} stroke="#cbd5e1" strokeDasharray="3 3" strokeOpacity={0.45} />
              <line x1={padL} y1={beY} x2={W - padR} y2={beY} stroke="#cbd5e1" strokeDasharray="3 3" strokeOpacity={0.45} />
              <motion.circle
                cx={beX}
                cy={beY}
                r={6}
                fill="#fff"
                stroke="#0b0e18"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              />
              <g transform={`translate(${beX + 12}, ${beY - 18})`}>
                <rect x={0} y={-12} width={88} height={22} rx={6} fill="#0b0e18" stroke="#39435a" />
                <text x={8} y={3} fontSize="11" fill="#fff" className="font-mono">
                  d = {breakeven!.toFixed(1)}
                </text>
              </g>
            </>
          )}

          {/* Legend */}
          <g transform={`translate(${padL + 8}, ${padT + 8})`}>
            <rect width={148} height={42} rx={8} fill="#0b0e18cc" stroke="#21283a" />
            <line x1={10} y1={15} x2={28} y2={15} stroke="#f59e0b" strokeWidth={2.5} />
            <text x={34} y={18} fontSize="11" fill="#e7ebf3">Purchase + ops</text>
            <line x1={10} y1={31} x2={28} y2={31} stroke="#34d399" strokeWidth={2.5} />
            <text x={34} y={34} fontSize="11" fill="#e7ebf3">Lease</text>
          </g>
        </svg>

        {/* Controls */}
        <div className="space-y-4">
          <Slider
            label="Purchase price"
            unit="$"
            min={2000}
            max={30000}
            step={500}
            value={p.purchase}
            onChange={(v) => setP({ ...p, purchase: v })}
            display={`$${p.purchase.toLocaleString()}`}
          />
          <Slider
            label="Daily operating"
            unit="$/d"
            min={100}
            max={1000}
            step={50}
            value={p.operating}
            onChange={(v) => setP({ ...p, operating: v })}
            display={`$${p.operating}/d`}
          />
          <Slider
            label="Daily lease"
            unit="$/d"
            min={100}
            max={2000}
            step={50}
            value={p.lease}
            onChange={(v) => setP({ ...p, lease: v })}
            display={`$${p.lease}/d`}
          />
          <button
            onClick={() => setP({ purchase: 12000, operating: 400, lease: 800 })}
            className="w-full text-xs text-ink-400 hover:text-white border border-ink-800 hover:border-ink-700 rounded-md py-1.5 transition-colors"
          >
            Reset to slide example
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/[.04] px-4 py-3 text-sm text-emerald-100">
        <span className="font-medium text-emerald-200">Decision rule:</span>{" "}
        {breakeven != null
          ? `If you need the item for more than ${breakeven.toFixed(1)} days, purchase. Below that, lease.`
          : "Lease rate must exceed daily operating cost for a break-even to exist."}
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  display,
}: {
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs text-ink-300">{label}</span>
        <span className="text-xs font-mono text-emerald-300 tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-400"
      />
    </label>
  );
}
