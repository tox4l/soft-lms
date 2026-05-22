const rows: { dim: string; scrum: string; kanban: string }[] = [
  { dim: "Release method",     scrum: "Fixed-length sprints (e.g. 2 weeks)", kanban: "Continuous flow" },
  { dim: "Roles",              scrum: "Product Owner · Scrum Master · Team", kanban: "No prescribed roles" },
  { dim: "Key metric",         scrum: "Velocity",                              kanban: "Cycle time" },
  { dim: "Change philosophy",  scrum: "Don't change the sprint forecast mid-sprint", kanban: "Change can happen any time" },
];

export default function ScrumKanbanCompare() {
  return (
    <div className="rounded-3xl border border-ink-800 bg-ink-950 overflow-hidden">
      <div className="grid grid-cols-[140px_1fr_1fr] sm:grid-cols-[180px_1fr_1fr] gap-px bg-ink-800">
        <Cell head>Dimension</Cell>
        <Cell head accent="white">Scrum</Cell>
        <Cell head accent="white">Kanban</Cell>
        {rows.map((r) => (
          <Row key={r.dim} {...r} />
        ))}
      </div>
    </div>
  );
}

function Row({ dim, scrum, kanban }: { dim: string; scrum: string; kanban: string }) {
  return (
    <>
      <Cell dim>{dim}</Cell>
      <Cell>{scrum}</Cell>
      <Cell>{kanban}</Cell>
    </>
  );
}

function Cell({
  children,
  head,
  dim,
  accent,
}: {
  children: React.ReactNode;
  head?: boolean;
  dim?: boolean;
  accent?: "white";
}) {
  if (head) {
    return (
      <div className={["bg-ink-950 px-4 py-2.5 text-[11px] uppercase tracking-wider font-medium", accent ? "text-white" : "text-ink-400"].join(" ")}>
        {children}
      </div>
    );
  }
  return (
    <div className={["bg-ink-950 px-4 py-3 text-sm leading-snug", dim ? "text-ink-200 font-medium" : "text-ink-300"].join(" ")}>
      {children}
    </div>
  );
}
