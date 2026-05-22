const traits = [
  { letter: "I", word: "Invisibility", body: "Progress is not immediately visible. You can't see code progress like a building rising." },
  { letter: "C", word: "Complexity",   body: "More complexity per dollar than other engineered products." },
  { letter: "C", word: "Conformity",   body: "Software must conform to the requirements of human clients (and their inconsistencies)." },
  { letter: "F", word: "Flexibility",  body: "Easy to change — a strength, but also a source of instability." },
];

export default function SoftwareTraits() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">I-C-C-F</div>
        <h3 className="text-lg font-semibold text-white tracking-tight">Four ways software projects differ</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {traits.map((t, i) => (
          <div key={i} className="relative rounded-2xl border border-ink-800 bg-ink-950 p-5 overflow-hidden">
            <div className="absolute -top-4 -right-2 font-display italic text-[110px] leading-none text-white/[.04] pointer-events-none select-none">
              {t.letter}
            </div>
            <div className="relative">
              <div className="text-white font-semibold text-base leading-tight mb-2">{t.word}</div>
              <div className="text-sm text-ink-300 leading-relaxed">{t.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
