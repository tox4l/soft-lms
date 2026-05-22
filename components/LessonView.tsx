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
  examSlug,
  examCount,
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
  examSlug?: string;
  examCount?: number;
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
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400 mb-4">{week}</div>
        <h1 className="font-display italic font-normal text-white tracking-tight leading-[1.02] text-[44px] sm:text-5xl md:text-6xl mb-4 glow-text-soft">
          {title}
        </h1>
        {subtitle && <p className="text-base sm:text-lg text-ink-300 leading-relaxed max-w-3xl">{subtitle}</p>}

        <div className="mt-7 flex items-center gap-3">
          <button
            onClick={toggleDone}
            className={[
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all active:translate-y-[1px]",
              isDone
                ? "bg-white text-ink-950 border border-white shadow-glow-sm"
                : "bg-ink-900 text-ink-200 border border-ink-700 hover:border-ink-500 hover:bg-ink-800",
            ].join(" ")}
          >
            <span className={isDone ? "text-ink-950" : "text-ink-500"}>{isDone ? "✓" : "○"}</span>
            {isDone ? "Marked as complete" : "Mark as complete"}
          </button>
        </div>
      </div>

      {children}

      {(quizSlug || examSlug) && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-3">
          {quizSlug && (
            <Link
              href={`/quiz/${quizSlug}`}
              className="group block rounded-2xl border border-ink-800 bg-gradient-to-br from-ink-900/40 to-ink-950 p-6 hover:border-ink-600 transition-colors active:translate-y-[1px]"
            >
              <div className="flex items-center gap-4">
                <div className="hidden sm:grid h-12 w-12 shrink-0 rounded-xl bg-white/[.05] border border-white/15 place-items-center text-white font-semibold tabular-nums">
                  {quizCount}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400 mb-1">Practice quiz</div>
                  <div className="text-white font-semibold text-lg leading-tight">Mixed-format practice</div>
                  <div className="text-sm text-ink-400 mt-0.5">{quizCount} questions · MCQ + fill + multi-select</div>
                </div>
                <span className="text-ink-300 group-hover:text-white transition-colors text-lg">→</span>
              </div>
            </Link>
          )}
          {examSlug && (
            <Link
              href={`/quiz/${examSlug}`}
              className="group block rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[.07] to-transparent p-6 hover:border-amber-400/40 transition-colors active:translate-y-[1px]"
            >
              <div className="flex items-center gap-4">
                <div className="hidden sm:grid h-12 w-12 shrink-0 rounded-xl bg-amber-500/10 border border-amber-400/25 place-items-center text-amber-200 font-semibold tabular-nums">
                  {examCount}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-amber-300/80 mb-1">Module exam · 80% to pass</div>
                  <div className="text-white font-semibold text-lg leading-tight">Prove you remember it</div>
                  <div className="text-sm text-ink-400 mt-0.5">{examCount} recall questions — passing marks the lesson done</div>
                </div>
                <span className="text-amber-300 group-hover:translate-x-0.5 transition-transform text-lg">→</span>
              </div>
            </Link>
          )}
        </div>
      )}

      <nav className="mt-16 pt-8 border-t border-ink-800 grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/lessons/${prev.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-ink-800 bg-ink-900/40 px-5 py-4 hover:border-ink-700 hover:bg-ink-900 transition-colors"
          >
            <span className="text-xs text-ink-400">← Previous · {prev.week}</span>
            <span className="text-white font-medium group-hover:text-white transition-colors">{prev.title}</span>
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
            <span className="text-white font-medium group-hover:text-white transition-colors">{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
