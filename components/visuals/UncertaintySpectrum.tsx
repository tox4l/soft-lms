"use client";

import { motion } from "framer-motion";

export default function UncertaintySpectrum() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Diagram</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">The uncertainty spectrum</h3>
        <p className="text-sm text-ink-400 mt-1">Routine work sits on the left, true exploration on the right. Projects live in the middle.</p>
      </div>

      <svg viewBox="0 0 640 200" className="w-full h-auto">
        <defs>
          <linearGradient id="usp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#fafafa" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#fafafa" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fafafa" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        {/* Spectrum bar */}
        <rect x={40} y={90} width={560} height={28} rx={14} fill="url(#usp-grad)" stroke="#27272c" />

        {/* Endpoint labels */}
        <text x={40} y={70} fontSize="11" fill="#9a9aa6" className="font-mono uppercase tracking-wider">Routine</text>
        <text x={600} y={70} fontSize="11" fill="#fafafa" textAnchor="end" className="font-mono uppercase tracking-wider">Uncertainty</text>

        {/* Pins */}
        {[
          { x: 100, label: "Jobs", caption: "Well-defined tasks", critical: false },
          { x: 320, label: "Projects", caption: "In the middle", critical: true },
          { x: 540, label: "Exploration", caption: "e.g. cure for cancer", critical: false },
        ].map((p, i) => (
          <motion.g
            key={p.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 220, damping: 22 }}
          >
            <line x1={p.x} x2={p.x} y1={86} y2={122} stroke={p.critical ? "#ffffff" : "#6f6f7a"} strokeWidth={p.critical ? 2 : 1} />
            <circle cx={p.x} cy={104} r={p.critical ? 7 : 5} fill={p.critical ? "#ffffff" : "#9a9aa6"}
              stroke="#08080a" strokeWidth={2}
              style={p.critical ? { filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" } : undefined}
            />
            <text x={p.x} y={150} textAnchor="middle" fontSize="13" fontWeight={p.critical ? 600 : 500} fill={p.critical ? "#ffffff" : "#cccccc"}>
              {p.label}
            </text>
            <text x={p.x} y={168} textAnchor="middle" fontSize="10" fill="#6f6f7a">{p.caption}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
