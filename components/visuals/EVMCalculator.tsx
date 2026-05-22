"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StatPill } from "./Section";

export default function EVMCalculator() {
  const [pv, setPv] = useState(100);
  const [ev, setEv] = useState(110);
  const [ac, setAc] = useState(90);

  const cpi = ac === 0 ? 1 : ev / ac;
  const spi = pv === 0 ? 1 : ev / pv;

  const scheduleTone: "ahead" | "behind" | "on" = ev > pv ? "ahead" : ev < pv ? "behind" : "on";
  const budgetTone: "under" | "over" | "on" = ev > ac ? "under" : ev < ac ? "over" : "on";

  const scheduleLabel = scheduleTone === "ahead" ? "Ahead of schedule" : scheduleTone === "behind" ? "Behind schedule" : "On schedule";
  const budgetLabel = budgetTone === "under" ? "Under budget" : budgetTone === "over" ? "Over budget" : "On budget";

  const maxBar = Math.max(pv, ev, ac, 1);

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium">
            Interactive
          </div>
          <h3 className="text-lg font-semibold text-white tracking-tight">EVM — CPI &amp; SPI</h3>
        </div>
        <div className="flex gap-2">
          <StatPill label={scheduleLabel} tone={scheduleTone} />
          <StatPill label={budgetLabel} tone={budgetTone} />
        </div>
      </div>
      <p className="text-sm text-ink-400 mb-5 max-w-xl">
        Drag the bars. <span className="text-ink-200">Schedule</span> is judged by EV vs PV;{" "}
        <span className="text-ink-200">budget</span> by EV vs AC.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-stretch">
        {/* Bars */}
        <div className="relative rounded-2xl border border-ink-800 bg-ink-950 p-5 flex items-end gap-6 min-h-[260px]">
          {[
            { key: "PV", value: pv, color: "#94a3b8", caption: "Planned Value" },
            { key: "EV", value: ev, color: "#34d399", caption: "Earned Value" },
            { key: "AC", value: ac, color: "#fbbf24", caption: "Actual Cost" },
          ].map((b) => {
            const h = (b.value / maxBar) * 180;
            return (
              <div key={b.key} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs text-ink-300 font-mono tabular-nums">{b.value}</div>
                <div className="relative w-full max-w-[64px] h-[180px] flex items-end">
                  <motion.div
                    layout
                    initial={false}
                    animate={{ height: h }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="w-full rounded-t-md"
                    style={{
                      background: `linear-gradient(to top, ${b.color}, ${b.color}AA)`,
                      boxShadow: `0 0 24px ${b.color}33`,
                    }}
                  />
                </div>
                <div className="text-[11px] uppercase tracking-wider text-ink-400 mt-1">{b.key}</div>
                <div className="text-[10px] text-ink-500 text-center">{b.caption}</div>
              </div>
            );
          })}
        </div>

        {/* Inputs + indices */}
        <div className="space-y-3.5">
          <NumberInput label="PV — Planned Value" hint="Should be done by now" value={pv} onChange={setPv} tone="slate" />
          <NumberInput label="EV — Earned Value" hint="Actually completed" value={ev} onChange={setEv} tone="emerald" />
          <NumberInput label="AC — Actual Cost" hint="Money spent so far" value={ac} onChange={setAc} tone="amber" />

          <div className="grid grid-cols-2 gap-2 pt-2">
            <IndexBox label="CPI" value={cpi} formula="EV / AC" />
            <IndexBox label="SPI" value={spi} formula="EV / PV" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberInput({
  label,
  hint,
  value,
  onChange,
  tone,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  tone: "slate" | "emerald" | "amber";
}) {
  const accent = { slate: "accent-slate-300", emerald: "accent-emerald-400", amber: "accent-amber-400" }[tone];
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-950 px-3.5 py-3">
      <div className="flex items-baseline justify-between mb-1.5">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-ink-300">{label}</div>
          {hint && <div className="text-[10px] text-ink-500">{hint}</div>}
        </div>
        <span className="font-mono text-base text-white tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={200}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={["w-full", accent].join(" ")}
      />
    </div>
  );
}

function IndexBox({ label, value, formula }: { label: string; value: number; formula: string }) {
  const good = value >= 1;
  return (
    <div
      className={[
        "rounded-xl border px-3 py-2.5",
        good ? "border-emerald-400/30 bg-emerald-500/10" : "border-rose-400/30 bg-rose-500/10",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between">
        <div className="text-[11px] uppercase tracking-wider text-ink-200">{label}</div>
        <span
          className={[
            "font-mono text-lg tabular-nums",
            good ? "text-emerald-200" : "text-rose-200",
          ].join(" ")}
        >
          {isFinite(value) ? value.toFixed(2) : "—"}
        </span>
      </div>
      <div className="text-[10px] font-mono text-ink-400 mt-0.5">{formula}</div>
    </div>
  );
}
