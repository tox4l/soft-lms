"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Nav = { slug: string; title: string; week: string } | null;

export default function LessonView({
  slug,
  title,
  subtitle,
  week,
  prev,
  next,
  quizSlug,
  quizCount,
  wide,
  children,
}: {
  slug: string;
  title: string;
  subtitle?: string;
  week: string;
  prev: Nav;
  next: Nav;
  quizSlug?: string;
  quizCount?: number;
  wide?: boolean;
  children: React.ReactNode;
}) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const isDone = !!completed[slug];

  useEffect(() => {
    try {
      const r = localStorage.getItem("soft-lms:completed");
      if (r) setCompleted(JSON.parse(r));
    } catch {}
  }, []);

  function toggleDone() {
    const updated = { ...completed, [slug]: !isDone };
    setCompleted(updated);
    localStorage.setItem("soft-lms:completed", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className="fade-up">
      <div className="mb-10">
        <div className="text-xs font-medium uppercase tracking-wider text-accent-fg mb-3">{week}</div>
        <h1 className={["font-bold tracking-tight text-white leading-[1.05] mb-3", wide ? "text-4xl md:text-5xl" : "text-4xl md:text-5xl"].join(" ")}>
          {title}
        </h1>
        {subtitle && <p className="text-lg text-ink-300 leading-relaxed max-w-3xl">{subtitle}</p>}

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={toggleDone}
            className={[
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all active:translate-y-[1px]",
              isDone
                ? "bg-violet-500/15 text-violet-300 border border-violet-500/40"
                : "bg-ink-800 text-ink-200 border border-ink-700 hover:border-ink-600 hover:bg-ink-700",
            ].join(" ")}
          >
            <span className={isDone ? "text-violet-400" : "text-ink-500"}>{isDone ? "✓" : "○"}</span>
            {isDone ? "Marked as complete" : "Mark as complete"}
          </button>
        </div>
      </div>

      {children}

      {quizSlug && (
        <Link
          href={`/quiz/${quizSlug}`}
          className="group mt-16 block rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/[.06] to-transparent p-6 md:p-8 hover:border-emerald-400/40 transition-colors active:translate-y-[1px]"
        >
          <div className="flex items-center gap-5">
            <div className="hidden sm:grid h-14 w-14 shrink-0 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 place-items-center text-emerald-200 font-semibold text-lg tabular-nums">
              {quizCount}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-300/80 mb-1">Test yourself</div>
              <div className="text-white font-semibold text-lg leading-tight">Take the {week} quiz</div>
              <div className="text-sm text-ink-400 mt-1">{quizCount} multiple-choice questions, randomised order</div>
            </div>
            <span className="text-ink-300 group-hover:text-emerald-200 transition-colors text-lg">→</span>
          </div>
        </Link>
      )}

      <nav className="mt-16 pt-8 border-t border-ink-800 grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/lessons/${prev.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-ink-800 bg-ink-900/40 px-5 py-4 hover:border-ink-700 hover:bg-ink-900 transition-colors"
          >
            <span className="text-xs text-ink-400">← Previous · {prev.week}</span>
            <span className="text-white font-medium group-hover:text-accent-fg transition-colors">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/lessons/${next.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-ink-800 bg-ink-900/40 px-5 py-4 hover:border-ink-700 hover:bg-ink-900 transition-colors text-right"
          >
            <span className="text-xs text-ink-400">Next · {next.week} →</span>
            <span className="text-white font-medium group-hover:text-accent-fg transition-colors">{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
