"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { MCQ } from "@/lib/questions/types";

type Props = {
  quizSlug: string;
  title: string;
  week: string;
  lessonSlug: string;
  questions: MCQ[];
};

type Answer = { picked: number; correct: boolean };

function shuffle<T>(arr: T[], seed: number): T[] {
  // Mulberry32 deterministic shuffle so a "retry" actually changes order.
  let t = seed >>> 0;
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    const j = ((r >>> 0) / 4294967296) * (i + 1) | 0;
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const LETTERS = ["A", "B", "C", "D"] as const;

export default function Quiz({ quizSlug, title, week, lessonSlug, questions }: Props) {
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1e9));
  const ordered = useMemo(() => shuffle(questions, seed), [questions, seed]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const current = ordered[idx];
  const picked = answers[current?.id]?.picked;
  const locked = picked !== undefined;
  const total = ordered.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const finished = answeredCount === total;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`soft-lms:quiz:${quizSlug}`);
      if (raw) setBestScore(JSON.parse(raw).best ?? null);
    } catch {}
  }, [quizSlug]);

  useEffect(() => {
    if (finished && !reviewMode) {
      const pct = Math.round((correctCount / total) * 100);
      try {
        const raw = localStorage.getItem(`soft-lms:quiz:${quizSlug}`);
        const prev = raw ? JSON.parse(raw) : {};
        const best = Math.max(prev.best ?? 0, pct);
        localStorage.setItem(`soft-lms:quiz:${quizSlug}`, JSON.stringify({ best, last: pct }));
        setBestScore(best);
      } catch {}
    }
  }, [finished, reviewMode, correctCount, total, quizSlug]);

  function pick(i: number) {
    if (locked) return;
    const correct = i === current.correct;
    setAnswers((a) => ({ ...a, [current.id]: { picked: i, correct } }));
  }

  function next() {
    if (idx < total - 1) setIdx((i) => i + 1);
  }
  function prev() {
    if (idx > 0) setIdx((i) => i - 1);
  }
  function retry() {
    setSeed(Math.floor(Math.random() * 1e9));
    setAnswers({});
    setIdx(0);
    setReviewMode(false);
  }
  function reviewWrong() {
    const firstWrongIdx = ordered.findIndex((q) => answers[q.id] && !answers[q.id].correct);
    if (firstWrongIdx >= 0) setIdx(firstWrongIdx);
    setReviewMode(true);
  }

  if (!current) return null;

  // -------------- Finished screen --------------
  if (finished && !reviewMode) {
    const pct = Math.round((correctCount / total) * 100);
    const wrongIds = ordered.filter((q) => !answers[q.id]?.correct).map((q) => q.id);
    const bucket =
      pct >= 90 ? "Outstanding" : pct >= 75 ? "Solid" : pct >= 60 ? "Getting there" : "Needs another pass";
    return (
      <div className="fade-up">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-300/80 font-medium mb-3">{week} · Quiz complete</div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2">{bucket}.</h1>
        <p className="text-ink-300 text-lg mb-10">You answered {correctCount} of {total} correctly.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden bg-ink-800 border border-ink-800 mb-10">
          <Stat label="Score" value={`${pct}%`} accent="emerald" />
          <Stat label="Correct" value={`${correctCount}/${total}`} />
          <Stat label="Best ever" value={bestScore != null ? `${bestScore}%` : "—"} />
        </div>

        {/* Diffuse progress ring */}
        <div className="mb-12">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-ink-400">Result distribution</span>
            <span className="tabular-nums text-ink-300">{correctCount} correct · {total - correctCount} wrong</span>
          </div>
          <div className="flex h-2 rounded-full overflow-hidden bg-ink-900 border border-ink-800">
            <div
              className="bg-emerald-400/80 transition-all duration-700"
              style={{ width: `${(correctCount / total) * 100}%` }}
            />
            <div
              className="bg-rose-400/70 transition-all duration-700"
              style={{ width: `${((total - correctCount) / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {wrongIds.length > 0 && (
            <button
              onClick={reviewWrong}
              className="group inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-5 py-2.5 text-sm font-medium transition-all hover:bg-ink-100 active:translate-y-[1px]"
            >
              Review {wrongIds.length} wrong {wrongIds.length === 1 ? "answer" : "answers"}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          )}
          <button
            onClick={retry}
            className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-5 py-2.5 text-sm font-medium text-ink-100 hover:bg-ink-800 hover:border-ink-600 transition-colors active:translate-y-[1px]"
          >
            Restart with new order
          </button>
          <Link
            href={`/lessons/${lessonSlug}`}
            className="inline-flex items-center gap-2 rounded-full border border-ink-800 px-5 py-2.5 text-sm text-ink-300 hover:text-white hover:border-ink-700 transition-colors"
          >
            Back to lesson
          </Link>
        </div>

        {/* Question-by-question summary */}
        <div className="border-t border-ink-800 pt-8">
          <h2 className="text-sm uppercase tracking-wider text-ink-400 font-medium mb-4">Answer log</h2>
          <ul className="divide-y divide-ink-800/80">
            {ordered.map((q, i) => {
              const a = answers[q.id];
              return (
                <li key={q.id} className="py-3 flex items-start gap-4">
                  <span
                    className={[
                      "mt-0.5 h-6 w-6 shrink-0 rounded-full grid place-items-center text-[11px] font-semibold tabular-nums",
                      a?.correct ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300",
                    ].join(" ")}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white leading-snug">{q.q}</div>
                    <div className="mt-1 text-xs text-ink-400">
                      {a?.correct ? "Correct" : (
                        <>
                          You picked <span className="text-rose-300">{LETTERS[a.picked]}</span> ·
                          correct answer <span className="text-emerald-300">{LETTERS[q.correct]}</span>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  // -------------- Question screen --------------
  const pct = Math.round(((idx + (locked ? 1 : 0)) / total) * 100);
  return (
    <div className="fade-up">
      {/* Top bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-[0.18em] text-ink-400">
          <span>{week} · Question {idx + 1} of {total}</span>
          <span className="tabular-nums">{correctCount}/{answeredCount || 0} correct</span>
        </div>
        <div className="h-1 rounded-full bg-ink-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight text-white leading-snug mb-8">
        {current.q}
      </h1>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2.5 mb-8">
        {current.options.map((opt, i) => {
          const isCorrect = i === current.correct;
          const isPicked = picked === i;
          let cls =
            "group relative w-full text-left rounded-xl border px-5 py-4 transition-all duration-200 ";
          if (!locked) {
            cls +=
              "border-ink-800 bg-ink-900/50 hover:border-ink-600 hover:bg-ink-900 active:translate-y-[1px] cursor-pointer";
          } else if (isCorrect) {
            cls += "border-emerald-400/40 bg-emerald-500/10";
          } else if (isPicked) {
            cls += "border-rose-400/40 bg-rose-500/10";
          } else {
            cls += "border-ink-800 bg-ink-950 opacity-60";
          }
          return (
            <button key={i} disabled={locked} onClick={() => pick(i)} className={cls}>
              <div className="flex items-start gap-4">
                <span
                  className={[
                    "h-7 w-7 shrink-0 rounded-md border grid place-items-center text-xs font-semibold transition-colors",
                    !locked
                      ? "border-ink-700 text-ink-300 group-hover:border-ink-500 group-hover:text-white"
                      : isCorrect
                      ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"
                      : isPicked
                      ? "border-rose-400/60 bg-rose-500/20 text-rose-200"
                      : "border-ink-800 text-ink-500",
                  ].join(" ")}
                >
                  {LETTERS[i]}
                </span>
                <span className="flex-1 text-ink-100 leading-relaxed pt-0.5">{opt}</span>
                {locked && isCorrect && (
                  <span className="text-emerald-300 text-xs font-medium uppercase tracking-wider pt-1.5">
                    Correct
                  </span>
                )}
                {locked && isPicked && !isCorrect && (
                  <span className="text-rose-300 text-xs font-medium uppercase tracking-wider pt-1.5">
                    Your pick
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {locked && (
        <div className="rounded-xl border border-ink-800 bg-ink-900/50 px-5 py-4 mb-8 fade-up">
          <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400 mb-1.5">Explanation</div>
          <p className="text-ink-100 leading-relaxed text-[15px]">{current.explain}</p>
          {current.topic && (
            <div className="mt-2 inline-flex items-center gap-2 text-xs text-ink-400">
              <span className="h-1 w-1 rounded-full bg-ink-500" />
              Topic: <span className="text-ink-200">{current.topic}</span>
            </div>
          )}
        </div>
      )}

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t border-ink-800 pt-6">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="text-sm text-ink-400 hover:text-white disabled:opacity-30 disabled:hover:text-ink-400 transition-colors"
        >
          ← Previous
        </button>
        <div className="flex items-center gap-3">
          <Link
            href={`/lessons/${lessonSlug}`}
            className="text-sm text-ink-400 hover:text-white transition-colors"
          >
            Exit
          </Link>
          {locked ? (
            <button
              onClick={next}
              disabled={idx === total - 1}
              className="inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-5 py-2 text-sm font-medium hover:bg-ink-100 disabled:opacity-50 transition-all active:translate-y-[1px]"
            >
              {idx === total - 1 ? "Finish" : "Next question"}
              <span>→</span>
            </button>
          ) : (
            <span className="text-xs text-ink-500">Pick an answer to continue</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "emerald" }) {
  return (
    <div className="bg-ink-950 px-6 py-5">
      <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">{label}</div>
      <div className={["text-2xl font-semibold tabular-nums", accent === "emerald" ? "text-emerald-300" : "text-white"].join(" ")}>
        {value}
      </div>
    </div>
  );
}
