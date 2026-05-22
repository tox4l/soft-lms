"use client";

import { motion } from "framer-motion";

const data = [
  { label: "All projects",   success: 29, fail: 71 },
  { label: "Medium projects", success: 9, fail: 91 },
  { label: "Large projects",  success: 6, fail: 94 },
];

export default function FailureStats() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Diagram</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">Why this lecture exists</h3>
        <p className="text-sm text-ink-400 mt-1">
          Standish Group survey of ICT projects. As projects get bigger, success gets rarer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {data.map((d, i) => (
          <Ring key={d.label} item={d} delay={i * 0.15} />
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-ink-800 bg-ink-950 px-4 py-3 text-sm text-ink-200 leading-relaxed">
        Companion stats from the lecture: UK government ICT spend{" "}
        <span className="font-mono text-white">£2.3bn</span> vs roads{" "}
        <span className="font-mono text-white">£1.4bn</span>. Standish: only ~⅓ of ICT projects
        succeed; <span className="font-mono text-white">82%</span> were late and{" "}
        <span className="font-mono text-white">43%</span> over budget.
      </div>
    </div>
  );
}

function Ring({ item, delay }: { item: typeof data[number]; delay: number }) {
  const r = 56;
  const C = 2 * Math.PI * r;
  const failOffset = C - (item.fail / 100) * C;
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-950 p-4 flex flex-col items-center">
      <svg viewBox="0 0 140 140" className="w-40 h-40">
        <circle cx={70} cy={70} r={r} fill="none" stroke="#1c1c20" strokeWidth={14} />
        <motion.circle
          cx={70}
          cy={70}
          r={r}
          fill="none"
          stroke="#f87171"
          strokeWidth={14}
          strokeDasharray={C}
          strokeLinecap="round"
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: failOffset }}
          transition={{ delay, duration: 1, ease: "easeOut" }}
          transform="rotate(-90 70 70)"
          style={{ filter: "drop-shadow(0 0 4px rgba(248,113,113,0.5))" }}
        />
        <text x={70} y={68} textAnchor="middle" fontSize="26" fontWeight="700" fill="#ffffff" className="font-mono tabular-nums">
          {item.fail}%
        </text>
        <text x={70} y={86} textAnchor="middle" fontSize="9" fill="#9a9aa6" letterSpacing="0.14em">FAIL RATE</text>
      </svg>
      <div className="text-sm font-medium text-white mt-1">{item.label}</div>
      <div className="text-xs text-ink-400 mt-0.5 font-mono">success {item.success}%</div>
    </div>
  );
}
