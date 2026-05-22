type Row = {
  activity: string;
  description?: string;
  duration: number;
  preds: string[];
  critical?: boolean;
};

export default function ActivityTable({
  rows,
  unit,
  showDescription,
}: {
  rows: Row[];
  unit: string;
  showDescription?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-ink-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ink-900/60">
            <tr className="text-left">
              <th className="px-4 py-2.5 font-medium text-[11px] uppercase tracking-wider text-ink-400">Activity</th>
              {showDescription && (
                <th className="px-4 py-2.5 font-medium text-[11px] uppercase tracking-wider text-ink-400">Description</th>
              )}
              <th className="px-4 py-2.5 font-medium text-[11px] uppercase tracking-wider text-ink-400">
                Duration ({unit})
              </th>
              <th className="px-4 py-2.5 font-medium text-[11px] uppercase tracking-wider text-ink-400">Predecessor(s)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-800">
            {rows.map((r) => (
              <tr key={r.activity} className={r.critical ? "bg-amber-500/[.05]" : "hover:bg-ink-900/40"}>
                <td className="px-4 py-2.5 font-mono font-semibold">
                  <span className={r.critical ? "text-amber-300" : "text-white"}>{r.activity}</span>
                  {r.critical && (
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-amber-300/80">critical</span>
                  )}
                </td>
                {showDescription && <td className="px-4 py-2.5 text-ink-200">{r.description}</td>}
                <td className="px-4 py-2.5 font-mono tabular-nums text-ink-100">{r.duration}</td>
                <td className="px-4 py-2.5 font-mono text-ink-300">{r.preds.length ? r.preds.join(", ") : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
