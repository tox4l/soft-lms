const rows: { dim: string; waterfall: string; agile: string }[] = [
  { dim: "Structure",                waterfall: "Sequential, phase-by-phase",       agile: "Iterative / incremental" },
  { dim: "Requirements",             waterfall: "Fixed up-front",                    agile: "Can change at any time" },
  { dim: "Delivery",                 waterfall: "Once, at the end",                  agile: "Early & continuous, in increments" },
  { dim: "Customer involvement",     waterfall: "Only at the start (requirements)",  agile: "Throughout the project" },
  { dim: "Primary progress measure", waterfall: "Documentation produced",            agile: "Working software" },
  { dim: "Handling change",          waterfall: "Resisted / impossible after reqs",  agile: "Embraced" },
  { dim: "Documentation",            waterfall: "Heavy",                              agile: "Just enough" },
];

export default function WaterfallVsAgile() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-ink-950 overflow-hidden">
      <div className="grid grid-cols-[160px_1fr_1fr] sm:grid-cols-[200px_1fr_1fr] gap-px bg-ink-800">
        <div className="bg-ink-950 px-4 py-2.5 text-[11px] uppercase tracking-wider text-ink-400 font-medium">Dimension</div>
        <div className="bg-ink-950 px-4 py-2.5 text-[11px] uppercase tracking-wider text-ink-300 font-medium">Waterfall</div>
        <div className="bg-ink-950 px-4 py-2.5 text-[11px] uppercase tracking-wider text-white font-medium flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-glow-sm" /> Agile
        </div>
        {rows.map((r) => (
          <RowItems key={r.dim} {...r} />
        ))}
      </div>
    </div>
  );
}

function RowItems({ dim, waterfall, agile }: { dim: string; waterfall: string; agile: string }) {
  return (
    <>
      <div className="bg-ink-950 px-4 py-3 text-sm text-ink-200 font-medium">{dim}</div>
      <div className="bg-ink-950 px-4 py-3 text-sm text-ink-300 leading-snug">{waterfall}</div>
      <div className="bg-ink-950 px-4 py-3 text-sm text-white leading-snug">{agile}</div>
    </>
  );
}
