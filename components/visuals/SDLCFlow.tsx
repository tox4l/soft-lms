"use client";

import { motion } from "framer-motion";

const stages = [
  { id: "req",  label: "Requirements analysis", detail: "Elicitation + analysis. Covers functions, quality, resource constraints." },
  { id: "spec", label: "Specification",         detail: "Customer-facing requirements → developer-understandable form." },
  { id: "arch", label: "Architecture design",   detail: "Software requirements emerge from this stage." },
  { id: "code", label: "Code & test",           detail: "Of individual components." },
  { id: "int",  label: "Integration",           detail: "Putting components together." },
  { id: "qual", label: "Qualification testing", detail: "Testing the SYSTEM, not just the software." },
  { id: "inst", label: "Installation",          detail: "Standing data, parameters, operational hardware, training." },
  { id: "supp", label: "Acceptance support",    detail: "Maintenance and enhancement." },
];

export default function SDLCFlow() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Diagram</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">ISO 12207 — software development life cycle</h3>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, ease: "easeOut" }}
            className="relative rounded-2xl border border-ink-800 bg-ink-950 p-4"
          >
            <div className="text-[10px] font-mono text-ink-500 mb-2">{String(i + 1).padStart(2, "0")}</div>
            <div className="text-white font-medium text-sm leading-tight mb-1.5">{s.label}</div>
            <div className="text-xs text-ink-400 leading-snug">{s.detail}</div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
