const techniques: { name: string; tagline: string; long: string; emoji?: never }[] = [
  {
    name: "Algorithmic models",
    tagline: "Effort drivers feed a formula",
    long: "Use characteristics of the target system & implementation environment to predict effort.",
  },
  {
    name: "Expert judgement",
    tagline: "Knowledgeable staff advise",
    long: "Based on the experience of people who have built similar things before.",
  },
  {
    name: "Analogy",
    tagline: "Look at a similar past project",
    long: "Use the actual effort of a similar completed project as the basis for the estimate.",
  },
  {
    name: "Parkinson",
    tagline: "Estimate = staff available",
    long: "The staff effort that happens to be available becomes the estimate. (Rarely accurate.)",
  },
  {
    name: "Price to win",
    tagline: "Whatever the contract needs",
    long: "Estimate is a figure low enough to win the contract — a political number, not a technical one.",
  },
  {
    name: "Top-down",
    tagline: "Split a global number",
    long: "An overall estimate is broken down into component-task efforts.",
  },
  {
    name: "Bottom-up",
    tagline: "Size and aggregate",
    long: "Component tasks are identified, sized, and aggregated into a total.",
  },
];

export default function BoehmGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] gap-3">
      {techniques.map((t, i) => (
        <div
          key={t.name}
          className="group relative rounded-2xl border border-ink-800 bg-ink-900/40 p-5 transition-colors hover:border-ink-700"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="h-6 w-6 rounded-md bg-ink-800 border border-ink-700 grid place-items-center text-[11px] font-mono text-ink-300">
              {i + 1}
            </span>
            <span className="text-xs uppercase tracking-wider text-emerald-300/80 font-medium">Method</span>
          </div>
          <h4 className="text-white font-semibold leading-tight mb-1">{t.name}</h4>
          <p className="text-sm text-ink-300 leading-snug mb-3">{t.tagline}</p>
          <p className="text-xs text-ink-400 leading-relaxed">{t.long}</p>
        </div>
      ))}
    </div>
  );
}
