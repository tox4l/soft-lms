"use client";

import { motion } from "framer-motion";

const stages = [
  { id: "data",    label: "Data",                example: "6,000 docs processed at X" },
  { id: "process", label: "Data processing",     example: "" },
  { id: "info",    label: "Information",         example: "Productivity = 100 docs/day" },
  { id: "decide",  label: "Decisions / plans",   example: "Compare with target" },
  { id: "model",   label: "Modelling",           example: "What if we add 2 staff?" },
  { id: "impl",    label: "Implementation",      example: "Hire the staff" },
];

export default function ControlLoop() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Diagram</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">The management control loop</h3>
        <p className="text-sm text-ink-400 mt-1">
          Real-world data feeds processing and modelling, which leads to decisions and the next action.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-center">
        <svg viewBox="0 0 240 240" className="w-full max-w-[280px] mx-auto h-auto">
          <defs>
            <marker id="cl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#fafafa" />
            </marker>
          </defs>
          {/* Circular flow */}
          <motion.circle
            cx={120}
            cy={120}
            r={86}
            fill="none"
            stroke="#fafafa"
            strokeOpacity={0.18}
            strokeWidth={1.5}
            strokeDasharray="5 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {/* Real-world cloud at top */}
          <ellipse cx={120} cy={26} rx={50} ry={18} fill="#0e0e10" stroke="#27272c" />
          <text x={120} y={31} textAnchor="middle" fontSize="11" fill="#fafafa" fontWeight="600">Real world</text>

          {/* Inner nodes */}
          {[
            { id: 1, x: 200, y: 70,  label: "Data" },
            { id: 2, x: 215, y: 165, label: "Info" },
            { id: 3, x: 145, y: 215, label: "Decide" },
            { id: 4, x: 60,  y: 200, label: "Model" },
            { id: 5, x: 32,  y: 110, label: "Implement" },
          ].map((n, i) => (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 240, damping: 22 }}
            >
              <circle cx={n.x} cy={n.y} r={22} fill="#0e0e10" stroke="#fafafa" strokeOpacity={0.5} />
              <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="9" fill="#fafafa" className="font-mono">{n.label}</text>
            </motion.g>
          ))}
          {/* Implementation → back to real world arrow */}
          <path d="M 32 90 Q 32 26 80 22" fill="none" stroke="#fafafa" strokeOpacity={0.4} strokeWidth={1.5} markerEnd="url(#cl-arrow)" />
        </svg>

        <ul className="space-y-2.5">
          {stages.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08, ease: "easeOut" }}
              className="flex items-start gap-3 rounded-xl border border-ink-800 bg-ink-950 px-4 py-2.5"
            >
              <span className="h-5 w-5 rounded-md bg-ink-800 grid place-items-center text-[10px] font-mono text-ink-300 shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium">{s.label}</div>
                {s.example && <div className="text-xs text-ink-400 leading-snug mt-0.5">{s.example}</div>}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
