"use client";

import { motion } from "framer-motion";

// Visualises Total Float vs Free Float on a simple Gantt-style activity.
export default function FloatTimeline() {
  // Activity X: ES=4, EF=8 (dur 4), LS=6, LF=10. Successor ES=9.
  const ES = 4, EF = 8, LS = 6, LF = 10, succES = 9;
  const TF = LS - ES;            // 2
  const FF = succES - EF;        // 1

  const W = 600, H = 220, padL = 40, padR = 40, padT = 40, padB = 60;
  const innerW = W - padL - padR;
  const maxAxis = 14;
  const x = (t: number) => padL + (t / maxAxis) * innerW;
  const rowEarly = padT + 20;
  const rowLate = rowEarly + 50;
  const rowSucc = rowLate + 50;

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium">Diagram</div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Free float vs Total float</h3>
        </div>
        <div className="hidden sm:flex gap-4 text-xs font-mono tabular-nums">
          <span className="text-emerald-300">TF = {TF}</span>
          <span className="text-sky-300">FF = {FF}</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* time axis */}
        <line x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} stroke="#39435a" />
        {Array.from({ length: maxAxis + 1 }, (_, t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={H - padB} y2={H - padB + 4} stroke="#39435a" />
            <text x={x(t)} y={H - padB + 18} textAnchor="middle" fontSize="10" fill="#7d8aa1" className="font-mono">
              {t}
            </text>
          </g>
        ))}

        {/* Early bar (ES → EF) */}
        <motion.rect
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          x={x(ES)}
          y={rowEarly - 12}
          width={x(EF) - x(ES)}
          height={20}
          rx={4}
          fill="#34d39933"
          stroke="#34d399"
        />
        <text x={x(ES)} y={rowEarly - 18} fontSize="10" fill="#34d399" className="font-mono">ES</text>
        <text x={x(EF)} y={rowEarly - 18} fontSize="10" fill="#34d399" className="font-mono" textAnchor="end">EF</text>
        <text x={(x(ES) + x(EF)) / 2} y={rowEarly + 3} fontSize="11" textAnchor="middle" fill="#fff">Activity (early)</text>

        {/* Late bar (LS → LF) */}
        <motion.rect
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          x={x(LS)}
          y={rowLate - 12}
          width={x(LF) - x(LS)}
          height={20}
          rx={4}
          fill="#7dd3fc22"
          stroke="#7dd3fc"
        />
        <text x={x(LS)} y={rowLate - 18} fontSize="10" fill="#7dd3fc" className="font-mono">LS</text>
        <text x={x(LF)} y={rowLate - 18} fontSize="10" fill="#7dd3fc" className="font-mono" textAnchor="end">LF</text>
        <text x={(x(LS) + x(LF)) / 2} y={rowLate + 3} fontSize="11" textAnchor="middle" fill="#fff">Activity (late)</text>

        {/* Successor */}
        <rect
          x={x(succES)}
          y={rowSucc - 12}
          width={x(succES + 3) - x(succES)}
          height={20}
          rx={4}
          fill="#ffffff10"
          stroke="#5b6987"
          strokeDasharray="3 3"
        />
        <text x={x(succES) + 4} y={rowSucc + 3} fontSize="10" fill="#cbd5e1">Successor ES</text>

        {/* Total Float bracket (between EF and LF) */}
        <line x1={x(EF)} y1={rowEarly + 14} x2={x(EF)} y2={rowLate - 14} stroke="#34d399" strokeDasharray="2 2" />
        <line x1={x(LF)} y1={rowEarly + 14} x2={x(LF)} y2={rowLate - 14} stroke="#7dd3fc" strokeDasharray="2 2" />

        {/* Free float arrow between EF and succES */}
        <line x1={x(EF)} y1={rowEarly + 10} x2={x(succES)} y2={rowEarly + 10} stroke="#fcd34d" strokeWidth={2} />
        <text x={(x(EF) + x(succES)) / 2} y={rowEarly + 30} textAnchor="middle" fontSize="10" fill="#fcd34d">
          Free float = {FF}
        </text>

        {/* Total float arrow between ES and LS */}
        <line x1={x(ES)} y1={rowLate + 22} x2={x(LS)} y2={rowLate + 22} stroke="#34d399" strokeWidth={2} />
        <text x={(x(ES) + x(LS)) / 2} y={rowLate + 36} textAnchor="middle" fontSize="10" fill="#34d399">
          Total float = {TF}
        </text>
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-sm">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[.04] px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-medium mb-1">Total Float</div>
          <div className="text-ink-200">Time the activity can be delayed without delaying <strong className="text-white">project completion.</strong></div>
          <div className="mt-1 font-mono text-xs text-emerald-200">TF = LS − ES = LF − EF</div>
        </div>
        <div className="rounded-xl border border-amber-400/25 bg-amber-500/[.04] px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-amber-300 font-medium mb-1">Free Float</div>
          <div className="text-ink-200">Time the activity can be delayed without delaying <strong className="text-white">a successor.</strong></div>
          <div className="mt-1 font-mono text-xs text-amber-200">FF = ES(next) − EF(current)</div>
        </div>
      </div>
    </div>
  );
}
