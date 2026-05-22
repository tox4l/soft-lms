"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ConventionToggle() {
  const [mode, setMode] = useState<"zero" | "one">("zero");

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium">Compare</div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Two indexing conventions</h3>
        </div>
        <div className="flex bg-ink-950 border border-ink-800 rounded-lg p-0.5">
          {[
            { v: "zero" as const, label: "0-indexed" },
            { v: "one" as const, label: "1-indexed (days)" },
          ].map((o) => (
            <button
              key={o.v}
              onClick={() => setMode(o.v)}
              className={[
                "px-3 py-1 text-xs rounded-md transition-colors",
                mode === o.v ? "bg-ink-800 text-white" : "text-ink-400 hover:text-white",
              ].join(" ")}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {mode === "zero" ? (
          <>
            <Rule label="Forward pass — EF" formula="EF = ES + duration" />
            <Rule label="Forward pass — ES at merge" formula="ES = max(EF of predecessors)" />
            <Rule label="Backward pass — LS" formula="LS = LF − duration" />
            <Rule label="Backward pass — LF at burst" formula="LF = min(LS of successors)" />
            <Rule label="Total Float" formula="TF = LS − ES = LF − EF" />
            <Rule label="Critical path" formula="Activities with float = 0" tone="amber" />
          </>
        ) : (
          <>
            <Rule label="Forward pass — EF" formula="EF = ES + time − 1" />
            <Rule label="Successor ES" formula="ES = EF(predecessor) + 1" />
            <Rule label="Backward pass — LS" formula="LS = LF − time + 1" />
            <Rule label="Predecessor LF" formula="LF = LS(successor) − 1" />
            <Rule label="Slack" formula="Slack = LS − ES (= LF − EF)" />
            <Rule label="Critical path" formula="Slack = 0" tone="amber" />
          </>
        )}
      </motion.div>

      {mode === "one" && (
        <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-500/[.05] px-4 py-3 text-sm text-amber-100">
          <span className="font-medium text-amber-200">Watch out:</span> in 1-indexed mode the finish day is{" "}
          <span className="font-mono">START + TIME − 1</span>. A successor starts the day after the predecessor ends.
        </div>
      )}
    </div>
  );
}

function Rule({ label, formula, tone }: { label: string; formula: string; tone?: "amber" }) {
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-950 px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-ink-400 mb-1">{label}</div>
      <div className={["font-mono text-sm", tone === "amber" ? "text-amber-300" : "text-white"].join(" ")}>
        {formula}
      </div>
    </div>
  );
}
