"use client";

import { motion } from "framer-motion";

export default function ScopeVsGold() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Scope creep */}
      <div className="rounded-3xl border border-rose-400/25 bg-gradient-to-br from-rose-500/[.06] to-transparent p-5">
        <div className="text-[11px] uppercase tracking-[0.16em] text-rose-300 font-medium mb-1">Scope creep</div>
        <h4 className="text-white font-semibold text-lg mb-3">The scope grows on you</h4>
        <svg viewBox="0 0 240 120" className="w-full h-auto mb-3">
          <motion.rect
            x={10}
            y={50}
            height={30}
            rx={4}
            initial={{ width: 120 }}
            animate={{ width: [120, 150, 175, 200, 220] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            fill="#f8717133"
            stroke="#f87171"
          />
          <text x={20} y={70} fontSize="11" fill="#fafafa" fontWeight="600">Original scope</text>
          <text x={20} y={108} fontSize="10" fill="#9a9aa6">→ unauthorised expansion</text>
        </svg>
        <ul className="text-sm text-ink-300 space-y-1.5">
          <li>– Often initiated by the <span className="text-white">client / external</span> requests.</li>
          <li>– Time, cost, resources <span className="text-white">not adjusted</span> to match.</li>
          <li>– Builds little by little; bites in the late stages.</li>
        </ul>
      </div>

      {/* Gold plating */}
      <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[.06] to-transparent p-5">
        <div className="text-[11px] uppercase tracking-[0.16em] text-amber-300 font-medium mb-1">Gold plating</div>
        <h4 className="text-white font-semibold text-lg mb-3">The team adds gold no one asked for</h4>
        <svg viewBox="0 0 240 120" className="w-full h-auto mb-3">
          <rect x={10} y={50} width={140} height={30} rx={4} fill="#fcd34d22" stroke="#fcd34d" />
          <motion.circle
            cx={170}
            cy={65}
            r={10}
            fill="#fcd34d"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0.8, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse" }}
            style={{ filter: "drop-shadow(0 0 8px rgba(252,211,77,0.6))" }}
          />
          <text x={20} y={70} fontSize="11" fill="#fafafa" fontWeight="600">Original scope</text>
          <text x={170} y={104} textAnchor="middle" fontSize="10" fill="#9a9aa6">freebie</text>
        </svg>
        <ul className="text-sm text-ink-300 space-y-1.5">
          <li>– Initiated by the <span className="text-white">project team</span> internally.</li>
          <li>– Extra features <span className="text-white">not in the original scope</span>.</li>
          <li>– Motivations: impress, show off, or distract from defects.</li>
        </ul>
      </div>
    </div>
  );
}
