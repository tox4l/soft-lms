export default function StakeholderMap() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Diagram</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">Stakeholder map</h3>
        <p className="text-sm text-ink-400 mt-1">Three concentric circles: team → organisation → world.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5 items-center">
        <svg viewBox="0 0 320 280" className="w-full max-w-md mx-auto h-auto">
          {/* Outermost circle — outside the org */}
          <circle cx={160} cy={140} r={130} fill="#0e0e10" stroke="#27272c" />
          <text x={160} y={28} textAnchor="middle" fontSize="9" fill="#9a9aa6" letterSpacing="0.14em">OUTSIDE THE ORG</text>
          <text x={160} y={50} textAnchor="middle" fontSize="10" fill="#cccccc">Customers · Government</text>

          {/* Middle circle — same org */}
          <circle cx={160} cy={150} r={90} fill="#131316" stroke="#3a3a3f" />
          <text x={160} y={80} textAnchor="middle" fontSize="9" fill="#9a9aa6" letterSpacing="0.14em">SAME ORG</text>
          <text x={160} y={100} textAnchor="middle" fontSize="10" fill="#cccccc">Operations · Functional managers · Partners</text>

          {/* Inner — project team */}
          <circle cx={160} cy={160} r={56} fill="#ffffff10" stroke="#fafafa" strokeOpacity={0.7} />
          <text x={160} y={140} textAnchor="middle" fontSize="9" fill="#fafafa" letterSpacing="0.14em">PROJECT TEAM</text>
          <text x={160} y={158} textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="600">Sponsor</text>
          <text x={160} y={174} textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="600">PM · Team</text>
        </svg>

        <div className="space-y-3">
          <Layer label="Project team" body="Sponsor, Project Manager, Team Members." accent />
          <Layer label="Same organisation" body="Operation managers, functional managers, business partners." />
          <Layer label="Outside the organisation" body="Customers, government, regulators." />
        </div>
      </div>
    </div>
  );
}

function Layer({ label, body, accent }: { label: string; body: string; accent?: boolean }) {
  return (
    <div className={["rounded-xl border bg-ink-950 px-3.5 py-2.5", accent ? "border-white/30" : "border-ink-800"].join(" ")}>
      <div className={["text-[11px] uppercase tracking-wider font-medium mb-0.5", accent ? "text-white" : "text-ink-400"].join(" ")}>
        {label}
      </div>
      <div className="text-sm text-ink-300 leading-snug">{body}</div>
    </div>
  );
}
