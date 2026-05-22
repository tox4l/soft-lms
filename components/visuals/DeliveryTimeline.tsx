"use client";

import { motion } from "framer-motion";

export default function DeliveryTimeline() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Diagram</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">When does value reach the customer?</h3>
        <p className="text-sm text-ink-400 mt-1">Waterfall delivers once at the end. Agile delivers in increments throughout.</p>
      </div>

      {/* Waterfall */}
      <div className="mb-5">
        <div className="text-xs uppercase tracking-wider text-ink-400 mb-2 font-medium">Waterfall</div>
        <div className="relative h-12 rounded-xl border border-ink-800 bg-ink-950 overflow-hidden">
          {/* phases */}
          {["Reqs", "Design", "Build", "Test"].map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, ease: "easeOut" }}
              className="absolute top-0 bottom-0 flex items-center justify-center text-[11px] text-ink-300 border-r border-ink-800/80"
              style={{ left: `${i * 20}%`, width: "20%" }}
            >
              {p}
            </motion.div>
          ))}
          {/* single delivery */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 18 }}
            className="absolute top-1/2 -translate-y-1/2 right-2 px-2.5 py-1 rounded-md bg-white text-ink-950 text-[11px] font-semibold shadow-glow-sm"
          >
            DELIVERY
          </motion.div>
        </div>
      </div>

      {/* Agile */}
      <div>
        <div className="text-xs uppercase tracking-wider text-ink-400 mb-2 font-medium">Agile</div>
        <div className="relative h-12 rounded-xl border border-ink-800 bg-ink-950 overflow-hidden">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 240, damping: 22 }}
              className="absolute top-0 bottom-0 flex items-center justify-center"
              style={{ left: `${i * 16.5 + 2}%`, width: "12%" }}
            >
              <div className="rounded-md border border-white/30 bg-white/[.06] px-2 py-0.5 text-[10px] text-white font-semibold w-full text-center">
                v{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-ink-800 bg-ink-950 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-400 mb-1">Waterfall</div>
          <div className="text-sm text-ink-200">Single big-bang delivery at the end.</div>
        </div>
        <div className="rounded-xl border border-ink-800 bg-ink-950 p-3">
          <div className="text-[11px] uppercase tracking-wider text-white mb-1">Agile</div>
          <div className="text-sm text-ink-200">Six small increments, customer sees value early.</div>
        </div>
      </div>
    </div>
  );
}
