const pros = [
  { title: "Cheaper", text: "Supplier spreads development cost over many customers." },
  { title: "Already exists", text: "Software is available now — no wait while it is built." },
  { title: "Trialable", text: "Can be trialled by the potential customer before buying." },
  { title: "Fewer bugs", text: "Existing users mean bugs are likely already found and fixed." },
];

const cons = [
  { title: "No competitive advantage", text: "Customer has the same application as everyone else." },
  { title: "Forced process change", text: "Customer may need to change how they work to fit the app." },
  { title: "No ownership", text: "Customer does not own the code and cannot change it." },
  { title: "Supplier lock-in", text: "Danger of over-reliance on a single supplier." },
];

export default function OTSCompare() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-emerald-500/[.06] to-transparent p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-300 font-medium">Advantages</div>
        </div>
        <ul className="space-y-3.5">
          {pros.map((p) => (
            <li key={p.title}>
              <div className="text-white font-medium text-[15px]">{p.title}</div>
              <div className="text-sm text-ink-300 leading-relaxed mt-0.5">{p.text}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-rose-400/20 bg-gradient-to-b from-rose-500/[.05] to-transparent p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          <div className="text-[11px] uppercase tracking-[0.16em] text-rose-300 font-medium">Disadvantages</div>
        </div>
        <ul className="space-y-3.5">
          {cons.map((p) => (
            <li key={p.title}>
              <div className="text-white font-medium text-[15px]">{p.title}</div>
              <div className="text-sm text-ink-300 leading-relaxed mt-0.5">{p.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
