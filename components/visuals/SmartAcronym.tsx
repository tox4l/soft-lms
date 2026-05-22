const letters: { l: string; word: string; body: string }[] = [
  { l: "S", word: "Specific",         body: "Concrete and well-defined." },
  { l: "M", word: "Measurable",       body: "Satisfaction can be objectively judged." },
  { l: "A", word: "Achievable",       body: "Within the power of the team to meet." },
  { l: "R", word: "Relevant",         body: "Relevant to the true purpose of the project." },
  { l: "T", word: "Time-constrained", body: "A defined point in time to achieve it by." },
];

export default function SmartAcronym() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
      {letters.map((x) => (
        <div key={x.l} className="rounded-2xl border border-ink-800 bg-gradient-to-b from-ink-900/60 to-ink-950 p-4 overflow-hidden relative">
          <div className="absolute -top-3 -right-2 font-display italic text-[100px] leading-none text-white/[.05] pointer-events-none select-none">
            {x.l}
          </div>
          <div className="relative">
            <div className="text-white font-semibold text-sm leading-tight mb-1">{x.word}</div>
            <div className="text-xs text-ink-400 leading-snug">{x.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
