const values = [
  { letter: "C", word: "Courage",     body: "Stand up for the project. Ward off pushback from a culture that clashes with Scrum/Agile values." },
  { letter: "C", word: "Commitment",  body: "The team commits to the goal and has the authority to make decisions to meet it." },
  { letter: "R", word: "Respect",     body: "Trust teammates to do good work. The Scrum Master grows mutual respect over time." },
  { letter: "F", word: "Focus",       body: "Stay focused on the sprint. Switching people across activities wastes time and money." },
  { letter: "O", word: "Openness",    body: "Everyone is aware of what others are working on and how it moves the project forward." },
];

export default function ScrumValues() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {values.map((v) => (
        <div
          key={v.word}
          className="group relative rounded-2xl border border-ink-800 bg-gradient-to-b from-ink-900/60 to-ink-950 p-5 overflow-hidden"
        >
          <div className="absolute -top-4 -right-4 font-display italic text-[120px] leading-none text-white/[.05] select-none pointer-events-none">
            {v.letter}
          </div>
          <div className="relative">
            <div className="text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-1">Scrum value</div>
            <h4 className="text-white font-semibold text-lg leading-tight mb-2">{v.word}</h4>
            <p className="text-sm text-ink-300 leading-relaxed">{v.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
