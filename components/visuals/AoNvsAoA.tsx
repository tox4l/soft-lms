export default function AoNvsAoA() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* AoN */}
      <div className="rounded-3xl border border-ink-800 bg-ink-900/40 p-5">
        <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-300/80 font-medium mb-1">Activity-on-Node</div>
        <h4 className="text-white font-semibold mb-3">Nodes carry duration</h4>
        <svg viewBox="0 0 320 130" className="w-full h-auto mb-3">
          <NodeBox x={20} y={40} label="A" dur={4} />
          <NodeBox x={130} y={40} label="B" dur={3} />
          <NodeBox x={240} y={40} label="C" dur={5} />
          <Arrow x1={90} x2={130} y={70} />
          <Arrow x1={200} x2={240} y={70} />
          <defs>
            <marker id="aon-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#5b6987" />
            </marker>
          </defs>
        </svg>
        <ul className="text-sm text-ink-300 space-y-1.5">
          <li>– Activities are <span className="text-white">boxes</span>; arrows = dependencies.</li>
          <li>– Nodes have duration; <span className="text-ink-400">links carry none</span>.</li>
          <li>– One start, one end. Time flows left → right. No loops.</li>
        </ul>
      </div>

      {/* AoA */}
      <div className="rounded-3xl border border-ink-800 bg-ink-900/40 p-5">
        <div className="text-[11px] uppercase tracking-[0.16em] text-sky-300/80 font-medium mb-1">Activity-on-Arrow</div>
        <h4 className="text-white font-semibold mb-3">Arrows carry duration; nodes are events</h4>
        <svg viewBox="0 0 320 130" className="w-full h-auto mb-3">
          <Event x={30} y={60} num={1} />
          <Event x={160} y={60} num={2} />
          <Event x={290} y={60} num={3} />
          <ArcArrow x1={45} y1={60} x2={145} y2={60} label="A · 4" />
          <ArcArrow x1={175} y1={60} x2={275} y2={60} label="B · 3" />
        </svg>
        <ul className="text-sm text-ink-300 space-y-1.5">
          <li>– <span className="text-white">Arrows</span> = activities (with duration). Nodes = events.</li>
          <li>– Nodes are <span className="text-white">numbered</span> sequentially.</li>
          <li>– Each event has earliest & latest dates → slack = late − early.</li>
        </ul>
      </div>
    </div>
  );
}

function NodeBox({ x, y, label, dur }: { x: number; y: number; label: string; dur: number }) {
  return (
    <g>
      <rect x={x} y={y} width={70} height={60} rx={6} fill="#10141f" stroke="#39435a" />
      <text x={x + 35} y={y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">
        {label}
      </text>
      <text x={x + 35} y={y + 44} textAnchor="middle" fontSize="11" fill="#7d8aa1" className="font-mono">
        dur {dur}
      </text>
    </g>
  );
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return <line x1={x1} x2={x2} y1={y} y2={y} stroke="#5b6987" strokeWidth={1.5} markerEnd="url(#aon-arrow)" />;
}

function Event({ x, y, num }: { x: number; y: number; num: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={16} fill="#10141f" stroke="#7dd3fc" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#7dd3fc" className="font-mono">
        {num}
      </text>
    </g>
  );
}

function ArcArrow({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  return (
    <g>
      <defs>
        <marker id="aoa-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#7dd3fc" />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7dd3fc" strokeWidth={1.5} markerEnd="url(#aoa-arrow)" />
      <text x={(x1 + x2) / 2} y={y1 - 8} textAnchor="middle" fontSize="11" fill="#7dd3fc" className="font-mono">
        {label}
      </text>
    </g>
  );
}
