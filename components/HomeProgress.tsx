"use client";
import { useEffect, useState } from "react";

export default function HomeProgress({ total }: { total: number }) {
  const [done, setDone] = useState(0);
  useEffect(() => {
    try {
      const r = localStorage.getItem("soft-lms:completed");
      if (r) {
        const map: Record<string, boolean> = JSON.parse(r);
        setDone(Object.values(map).filter(Boolean).length);
      }
    } catch {}
  }, []);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="mt-8 max-w-md">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-ink-300">Your progress</span>
        <span className="text-white tabular-nums font-medium">{done} of {total} complete · {pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
