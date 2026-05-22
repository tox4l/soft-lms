"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Side = "scope" | "time" | "cost";

export default function PMTriangle() {
  const [hover, setHover] = useState<Side | null>(null);

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-3">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Diagram</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">The project triangle</h3>
        <p className="text-sm text-ink-400 mt-1">Hover a corner to read the trade-off rule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-center">
        <svg viewBox="0 0 320 280" className="w-full max-w-md mx-auto h-auto">
          <polygon
            points="160,30 30,250 290,250"
            fill="#ffffff05"
            stroke="#fafafa"
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
          {/* Centre quality */}
          <circle cx={160} cy={170} r={32} fill="#ffffff15" stroke="#fafafa" strokeOpacity={0.4} />
          <text x={160} y={168} textAnchor="middle" fontSize="11" fill="#fafafa" fontWeight="600">Quality</text>
          <text x={160} y={182} textAnchor="middle" fontSize="9" fill="#9a9aa6">centre</text>

          {/* Corner labels */}
          <Corner x={160} y={22}  text="Scope"  hovered={hover === "scope"} onHover={() => setHover("scope")} onLeave={() => setHover(null)} />
          <Corner x={28}  y={262} text="Time"   hovered={hover === "time"}  onHover={() => setHover("time")}  onLeave={() => setHover(null)} />
          <Corner x={292} y={262} text="Cost"   hovered={hover === "cost"}  onHover={() => setHover("cost")}  onLeave={() => setHover(null)} />
        </svg>

        <div className="space-y-2.5">
          {[
            { id: "scope", label: "Scope", body: "What must be done. Cut scope to recover time or cost." },
            { id: "time",  label: "Time",  body: "How long it takes. Running late? Reduce scope or increase cost." },
            { id: "cost",  label: "Cost",  body: "Budget available. Over budget? Reduce scope or extend schedule." },
          ].map((c) => (
            <motion.div
              key={c.id}
              animate={{
                borderColor: hover === c.id ? "#fafafa" : "#27272c",
                backgroundColor: hover === c.id ? "#0e0e10" : "#08080a",
              }}
              className="rounded-xl border px-3.5 py-2.5"
            >
              <div className="text-[11px] uppercase tracking-wider text-ink-300 font-medium">{c.label}</div>
              <div className="text-sm text-ink-200 mt-0.5 leading-snug">{c.body}</div>
            </motion.div>
          ))}
          <div className="text-xs text-ink-400 pt-1 leading-relaxed">
            <span className="text-white font-medium">Rule:</span> you can't fix all three independently. Protect one corner by adjusting the other two.
          </div>
        </div>
      </div>
    </div>
  );
}

function Corner({ x, y, text, hovered, onHover, onLeave }: {
  x: number; y: number; text: string; hovered: boolean; onHover: () => void; onLeave: () => void;
}) {
  return (
    <g onMouseEnter={onHover} onMouseLeave={onLeave} className="cursor-pointer">
      <rect
        x={x - 36}
        y={y - 12}
        width={72}
        height={24}
        rx={12}
        fill={hovered ? "#ffffff" : "#0e0e10"}
        stroke="#fafafa"
        strokeOpacity={hovered ? 1 : 0.4}
        style={hovered ? { filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))" } : undefined}
      />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill={hovered ? "#08080a" : "#fafafa"} fontWeight="600">
        {text}
      </text>
    </g>
  );
}
