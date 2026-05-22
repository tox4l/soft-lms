"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CompressionCompare() {
  const [mode, setMode] = useState<"normal" | "crash" | "fasttrack">("normal");

  // Baseline schedule
  const baseline = [
    { name: "Design",  start: 0, length: 4 },
    { name: "Develop", start: 4, length: 6 },
    { name: "Test",    start: 10, length: 3 },
  ];
  const crashed = [
    { name: "Design",  start: 0, length: 3 },
    { name: "Develop", start: 3, length: 5 },
    { name: "Test",    start: 8, length: 2 },
  ];
  const fasttracked = [
    { name: "Design",  start: 0, length: 4 },
    { name: "Develop", start: 3, length: 6 },
    { name: "Test",    start: 7, length: 3 },
  ];

  const data = mode === "normal" ? baseline : mode === "crash" ? crashed : fasttracked;
  const totalDays = data.reduce((m, b) => Math.max(m, b.start + b.length), 0);

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium">Interactive</div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Crashing vs Fast-tracking</h3>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">Project duration</div>
          <motion.div
            key={totalDays}
            initial={{ opacity: 0.4, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            className="font-mono text-2xl text-amber-300 tabular-nums"
          >
            {totalDays} weeks
          </motion.div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 bg-ink-950 border border-ink-800 rounded-xl p-1 mb-4">
        {[
          { v: "normal" as const, label: "Baseline", caption: "13 weeks" },
          { v: "crash" as const, label: "Crashing", caption: "Pay for time" },
          { v: "fasttrack" as const, label: "Fast-tracking", caption: "Run in parallel" },
        ].map((s) => (
          <button
            key={s.v}
            onClick={() => setMode(s.v)}
            className={[
              "flex-1 min-w-[120px] rounded-lg px-3 py-2 text-left transition-all active:translate-y-[1px]",
              mode === s.v
                ? "bg-amber-500/15 text-amber-100 ring-1 ring-inset ring-amber-400/30"
                : "text-ink-300 hover:text-white hover:bg-ink-900",
            ].join(" ")}
          >
            <div className="text-sm font-medium">{s.label}</div>
            <div className="text-[10px] text-ink-400 mt-0.5">{s.caption}</div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-ink-800 bg-ink-950 p-4">
        {/* Time axis */}
        <div className="relative h-6 mb-2">
          {Array.from({ length: 14 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full border-l border-ink-800 text-[10px] text-ink-500 font-mono px-1"
              style={{ left: `${(i / 13) * 100}%` }}
            >
              {i}
            </div>
          ))}
        </div>
        {/* Bars */}
        <div className="space-y-2">
          {data.map((b, i) => {
            const palette = ["bg-sky-400", "bg-emerald-400", "bg-amber-400"][i % 3];
            return (
              <div key={b.name} className="relative h-8">
                <motion.div
                  layout
                  initial={false}
                  animate={{
                    left: `${(b.start / 13) * 100}%`,
                    width: `${(b.length / 13) * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  className={["absolute h-full rounded-md flex items-center px-3 text-xs font-medium text-ink-950", palette].join(" ")}
                >
                  {b.name} · {b.length}w
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[.04] px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-medium mb-1">Crashing</div>
          <div className="text-sm text-ink-200">Shorten activity duration for the <strong className="text-white">least incremental cost</strong> — overtime, more people, paid expediting.</div>
          <div className="mt-1.5 text-xs text-ink-400">Risk: <span className="text-rose-300">increased cost</span></div>
        </div>
        <div className="rounded-xl border border-sky-400/20 bg-sky-500/[.04] px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-sky-300 font-medium mb-1">Fast-tracking</div>
          <div className="text-sm text-ink-200">Run activities <strong className="text-white">in parallel</strong> rather than sequentially. Only works if activities can overlap.</div>
          <div className="mt-1.5 text-xs text-ink-400">Risk: <span className="text-rose-300">rework / coordination overhead</span></div>
        </div>
      </div>
    </div>
  );
}
