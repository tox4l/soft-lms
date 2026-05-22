const steps = [
  { title: "Identify the activities", body: "List every activity the project involves." },
  { title: "Determine the sequence", body: "Define predecessors and successors." },
  { title: "Create the network", body: "Connect activities by their dependencies." },
  { title: "Enter durations", body: "Write the completion time on every node." },
  { title: "Forward pass", body: "Compute Early Start (ES) and Early Finish (EF)." },
  { title: "Backward pass", body: "Compute Late Start (LS) and Late Finish (LF)." },
  { title: "Float & critical path", body: "Chain of activities with float = 0." },
];

export default function ProcedureStepper() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(7,minmax(0,1fr))] gap-2.5">
      {steps.map((s, i) => (
        <li key={i} className="relative rounded-2xl border border-ink-800 bg-ink-900/40 p-4">
          <div
            className={[
              "h-7 w-7 rounded-md grid place-items-center text-xs font-semibold tabular-nums mb-3",
              i === 6 ? "bg-amber-500/20 text-amber-200 border border-amber-400/30" : "bg-ink-800 text-ink-200 border border-ink-700",
            ].join(" ")}
          >
            {i + 1}
          </div>
          <h4 className="text-white font-medium text-sm leading-tight mb-1.5">{s.title}</h4>
          <p className="text-xs text-ink-400 leading-snug">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
