"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function IronTriangle() {
  const [variant, setVariant] = useState<"traditional" | "agile">("traditional");

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Compare</div>
          <h3 className="text-lg font-semibold text-white tracking-tight">The Iron Triangle</h3>
        </div>
        <div className="flex bg-ink-950 border border-ink-800 rounded-lg p-0.5">
          {[
            { v: "traditional" as const, label: "Traditional" },
            { v: "agile" as const, label: "Agile" },
          ].map((o) => (
            <button
              key={o.v}
              onClick={() => setVariant(o.v)}
              className={[
                "px-3 py-1 text-xs rounded-md transition-colors",
                variant === o.v ? "bg-white text-ink-950 font-medium" : "text-ink-400 hover:text-white",
              ].join(" ")}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-center">
        <svg viewBox="0 0 320 280" className="w-full h-auto max-w-md mx-auto">
          {/* Triangle */}
          <motion.polygon
            points="160,30 30,250 290,250"
            fill={variant === "traditional" ? "#ffffff08" : "#ffffff04"}
            stroke="#fafafa"
            strokeOpacity={0.4}
            strokeWidth={1.5}
            initial={false}
            animate={{ rotate: variant === "agile" ? 180 : 0 }}
            style={{ transformOrigin: "160px 160px" }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
          {/* Quality (centre) */}
          <text x={160} y={155} textAnchor="middle" fontSize="13" fill="#fafafa" fontWeight="600">Quality</text>
          <text x={160} y={170} textAnchor="middle" fontSize="9" fill="#9a9aa6" letterSpacing="0.1em">CENTRE</text>

          {/* Corner labels */}
          <CornerLabel x={160} y={20}  text="Scope" locked={variant === "traditional"} />
          <CornerLabel x={28}  y={262} text="Time" locked={variant === "agile"} />
          <CornerLabel x={292} y={262} text="Cost" locked={variant === "agile"} />
        </svg>

        <div className="space-y-3">
          <div className="rounded-xl border border-ink-800 bg-ink-950 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-ink-400 mb-1">
              {variant === "traditional" ? "Fixed" : "Variable"}
            </div>
            <div className="text-white font-medium">Scope</div>
            <div className="text-xs text-ink-400 mt-1">
              {variant === "traditional"
                ? "Set up front; time and cost flex to deliver it."
                : "Lets you keep resources & schedule fixed — flex what you build."}
            </div>
          </div>
          <div className="rounded-xl border border-ink-800 bg-ink-950 px-4 py-3">
            <div className="text-[11px] uppercase tracking-wider text-ink-400 mb-1">
              {variant === "traditional" ? "Variable" : "Fixed"}
            </div>
            <div className="text-white font-medium">Time &amp; Cost</div>
            <div className="text-xs text-ink-400 mt-1">
              {variant === "traditional"
                ? "Flex to deliver the agreed scope."
                : "Locked. The team commits to deliver within the box."}
            </div>
          </div>
          <p className="text-xs text-ink-400 leading-relaxed pt-1">
            Agile inverts traditional thinking: it makes <span className="text-white">scope variable</span> while{" "}
            <span className="text-white">fixing resources &amp; schedule</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

function CornerLabel({ x, y, text, locked }: { x: number; y: number; text: string; locked: boolean }) {
  return (
    <g>
      <rect x={x - 32} y={y - 11} width={64} height={22} rx={11} fill="#0e0e10" stroke={locked ? "#fafafa" : "#27272c"} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill={locked ? "#ffffff" : "#9a9aa6"} fontWeight="600">
        {text}
      </text>
      {locked && (
        <circle cx={x + 26} cy={y} r={3} fill="#ffffff" />
      )}
    </g>
  );
}
