"use client";

import { useEffect, useState } from "react";

export default function QuizBestBadge({ quizSlug }: { quizSlug: string }) {
  const [best, setBest] = useState<number | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`soft-lms:quiz:${quizSlug}`);
      if (raw) setBest(JSON.parse(raw).best ?? null);
    } catch {}
  }, [quizSlug]);

  if (best == null) {
    return (
      <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-ink-500 tabular-nums">
        not attempted
      </span>
    );
  }
  return (
    <span
      className={[
        "hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tabular-nums border",
        best >= 90
          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
          : best >= 75
          ? "border-teal-400/25 bg-teal-500/10 text-teal-200"
          : best >= 60
          ? "border-amber-400/25 bg-amber-500/10 text-amber-200"
          : "border-rose-400/25 bg-rose-500/10 text-rose-200",
      ].join(" ")}
    >
      Best {best}%
    </span>
  );
}
