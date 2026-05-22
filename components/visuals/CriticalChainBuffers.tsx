export default function CriticalChainBuffers() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium">Diagram</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">Project buffer vs Feeding buffers</h3>
      </div>

      <svg viewBox="0 0 700 220" className="w-full h-auto">
        {/* Critical chain — bottom row */}
        <g>
          <Bar x={20} y={140} w={100} label="A" critical />
          <Bar x={130} y={140} w={140} label="B" critical />
          <Bar x={280} y={140} w={110} label="C" critical />
          <Bar x={400} y={140} w={120} label="D" critical />
          {/* Project buffer (right of critical chain) */}
          <BufferBar x={530} y={140} w={120} label="Project Buffer" tone="emerald" />
          <Arrow x1={120} x2={130} y={160} />
          <Arrow x1={270} x2={280} y={160} />
          <Arrow x1={390} x2={400} y={160} />
          <Arrow x1={520} x2={530} y={160} />
        </g>

        {/* Feeding branch — top row */}
        <g>
          <Bar x={60} y={60} w={90} label="F1" />
          <Bar x={160} y={60} w={70} label="F2" />
          <BufferBar x={240} y={60} w={50} label="Feeder" tone="amber" small />
          <Arrow x1={150} x2={160} y={80} />
          <Arrow x1={230} x2={240} y={80} />
          {/* Join into critical chain at C */}
          <path d="M 290 90 Q 320 90 320 140" stroke="#fcd34d" strokeWidth={1.5} fill="none" markerEnd="url(#cc-arrow)" />
        </g>

        <defs>
          <marker id="cc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#fcd34d" />
          </marker>
        </defs>

        {/* Labels */}
        <text x={20} y={210} fontSize="11" fill="#7d8aa1" className="font-mono">Critical chain →</text>
        <text x={60} y={45} fontSize="11" fill="#fcd34d" className="font-mono">Feeding path</text>
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[.04] px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-medium mb-1">Project buffer</div>
          <div className="text-sm text-ink-200">A single buffer at the <strong className="text-white">end of the project</strong> protecting overall delivery from variation along the critical chain.</div>
        </div>
        <div className="rounded-xl border border-amber-400/25 bg-amber-500/[.04] px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-amber-300 font-medium mb-1">Feeding buffer</div>
          <div className="text-sm text-ink-200">Sits at the <strong className="text-white">end of a feeding path</strong> where it joins the critical chain, so a slip on the feeder doesn't directly delay it.</div>
        </div>
      </div>
    </div>
  );
}

function Bar({ x, y, w, label, critical }: { x: number; y: number; w: number; label: string; critical?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={36}
        rx={6}
        fill={critical ? "#f59e0b22" : "#94a3b822"}
        stroke={critical ? "#f59e0b" : "#5b6987"}
      />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill={critical ? "#fcd34d" : "#e7ebf3"}>
        {label}
      </text>
    </g>
  );
}

function BufferBar({ x, y, w, label, tone, small }: { x: number; y: number; w: number; label: string; tone: "emerald" | "amber"; small?: boolean }) {
  const color = tone === "emerald" ? "#34d399" : "#fcd34d";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={36}
        rx={6}
        fill={`${color}22`}
        stroke={color}
        strokeDasharray="4 3"
      />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="600" fill={color}>
        {label}
      </text>
    </g>
  );
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return <line x1={x1} x2={x2} y1={y} y2={y} stroke="#5b6987" strokeWidth={1.5} />;
}
