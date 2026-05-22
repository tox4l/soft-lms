"use client";

import { motion } from "framer-motion";

const values = [
  { left: "Individuals & interactions", right: "Processes & tools" },
  { left: "Working software",           right: "Comprehensive documentation" },
  { left: "Customer collaboration",     right: "Contract negotiation" },
  { left: "Responding to change",       right: "Following a plan" },
];

export default function AgileManifesto() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-ink-800 bg-ink-900/30 px-4 py-3 text-sm text-ink-300">
        We value the items on the left <span className="text-white font-medium">more than</span> the items on the right — but both sides have value.
      </div>
      {values.map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, ease: "easeOut" }}
          className="rounded-2xl border border-ink-800 bg-gradient-to-r from-ink-900/40 to-ink-950 p-5"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="h-5 w-5 grid place-items-center rounded-md bg-ink-800 text-[10px] font-mono text-ink-300">{i + 1}</span>
            <span className="text-[11px] uppercase tracking-wider text-ink-400">Value</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
            <span className="text-white font-semibold text-lg leading-tight">{v.left}</span>
            <span className="text-ink-500 text-xs font-mono uppercase tracking-wider">over</span>
            <span className="text-ink-400 text-base sm:text-lg leading-tight line-through decoration-ink-700 decoration-1">
              {v.right}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
