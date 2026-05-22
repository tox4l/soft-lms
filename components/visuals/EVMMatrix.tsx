"use client";

const rows: { pv: number; ev: number; ac: number; sched: "ahead" | "behind" | "on"; budget: "under" | "over" | "on" }[] = [
  { pv: 100, ev: 100, ac: 100, sched: "on", budget: "on" },
  { pv: 100, ev: 100, ac: 75, sched: "on", budget: "under" },
  { pv: 100, ev: 100, ac: 150, sched: "on", budget: "over" },
  { pv: 75, ev: 100, ac: 100, sched: "ahead", budget: "on" },
  { pv: 75, ev: 100, ac: 150, sched: "ahead", budget: "over" },
  { pv: 100, ev: 150, ac: 100, sched: "ahead", budget: "under" },
  { pv: 150, ev: 100, ac: 75, sched: "behind", budget: "under" },
  { pv: 100, ev: 75, ac: 100, sched: "behind", budget: "over" },
  { pv: 150, ev: 100, ac: 100, sched: "behind", budget: "on" },
];

const tonePill = {
  ahead: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
  behind: "bg-rose-500/15 text-rose-200 border-rose-400/30",
  on: "bg-ink-700/40 text-ink-100 border-ink-600",
  under: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
  over: "bg-rose-500/15 text-rose-200 border-rose-400/30",
} as const;

const toneLabel = {
  ahead: "Ahead",
  behind: "Behind",
  on: "On",
  under: "Under",
  over: "Over",
} as const;

export default function EVMMatrix() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-ink-950 overflow-hidden">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-px bg-ink-800">
        {/* Header */}
        {["PV", "EV", "AC", "Schedule", "Budget"].map((h) => (
          <div key={h} className="bg-ink-950 px-4 py-2.5 text-[11px] uppercase tracking-wider text-ink-400 font-medium">
            {h}
          </div>
        ))}
        {/* Body */}
        {rows.map((r, i) => (
          <Row key={i} row={r} />
        ))}
      </div>
      <div className="px-4 py-3 border-t border-ink-800 bg-ink-900/40 text-xs text-ink-400 flex flex-wrap gap-x-6 gap-y-1">
        <span><span className="text-ink-200 font-medium">EV vs PV →</span> schedule</span>
        <span><span className="text-ink-200 font-medium">EV vs AC →</span> budget</span>
      </div>
    </div>
  );
}

function Row({ row: r }: { row: typeof rows[number] }) {
  return (
    <>
      <Cell value={r.pv} />
      <Cell value={r.ev} accent="emerald" />
      <Cell value={r.ac} accent="amber" />
      <div className="bg-ink-950 px-4 py-3">
        <span className={["inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs", tonePill[r.sched]].join(" ")}>
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
          {toneLabel[r.sched]} schedule
        </span>
      </div>
      <div className="bg-ink-950 px-4 py-3">
        <span className={["inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs", tonePill[r.budget]].join(" ")}>
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
          {toneLabel[r.budget]} budget
        </span>
      </div>
    </>
  );
}

function Cell({ value, accent }: { value: number; accent?: "emerald" | "amber" }) {
  return (
    <div className="bg-ink-950 px-4 py-3 font-mono tabular-nums">
      <span
        className={[
          "text-base",
          accent === "emerald" ? "text-emerald-300" : accent === "amber" ? "text-amber-300" : "text-ink-100",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
