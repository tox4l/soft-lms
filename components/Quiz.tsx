"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { AnyQ, MCQ, MultiSelectQ, FillBlankQ } from "@/lib/questions/types";
import { isMCQ, isMulti, isFill } from "@/lib/questions/types";

type Props = {
  quizSlug: string;
  title: string;
  week: string;
  kind: "practice" | "exam";
  lessonSlug: string;
  questions: AnyQ[];
};

type Answer = { correct: boolean; payload: unknown };

function shuffle<T>(arr: T[], seed: number): T[] {
  let t = seed >>> 0;
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    const j = (((r >>> 0) / 4294967296) * (i + 1)) | 0;
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const PASS_THRESHOLD = 80;

export default function Quiz({ quizSlug, title, week, kind, lessonSlug, questions }: Props) {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const ordered = useMemo(() => shuffle(questions, seed), [questions, seed]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const current = ordered[idx];
  const locked = !!current && current.id in answers;
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
        const passed = pct >= PASS_THRESHOLD;
        const wasPassed = prev.passed ?? false;
        localStorage.setItem(
          `soft-lms:quiz:${quizSlug}`,
          JSON.stringify({ best, last: pct, passed: passed || wasPassed })
        );
        setBestScore(best);
        // Also mark the lesson as complete on a passing exam
        if (kind === "exam" && passed) {
          try {
            const cRaw = localStorage.getItem("soft-lms:completed");
            const cMap = cRaw ? JSON.parse(cRaw) : {};
            cMap[lessonSlug] = true;
            localStorage.setItem("soft-lms:completed", JSON.stringify(cMap));
            window.dispatchEvent(new Event("storage"));
          } catch {}
        }
      } catch {}
    }
  }, [finished, reviewMode, correctCount, total, quizSlug, kind, lessonSlug]);

  function recordAnswer(id: string, correct: boolean, payload: unknown) {
    setAnswers((a) => ({ ...a, [id]: { correct, payload } }));
  }

  function next() { if (idx < total - 1) setIdx((i) => i + 1); }
  function prev() { if (idx > 0) setIdx((i) => i - 1); }
  function retry() { setSeed(Math.floor(Math.random() * 1e9)); setAnswers({}); setIdx(0); setReviewMode(false); }
  function reviewWrong() {
    const firstWrong = ordered.findIndex((q) => answers[q.id] && !answers[q.id].correct);
    if (firstWrong >= 0) setIdx(firstWrong);
    setReviewMode(true);
  }

  if (!current) return null;

  if (finished && !reviewMode) {
    return (
      <FinishScreen
        ordered={ordered}
        answers={answers}
        bestScore={bestScore}
        kind={kind}
        week={week}
        title={title}
        lessonSlug={lessonSlug}
        onReview={reviewWrong}
        onRetry={retry}
      />
    );
  }

  const pct = Math.round(((idx + (locked ? 1 : 0)) / total) * 100);
  return (
    <div className="fade-up">
      {/* Top bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 text-[11px] uppercase tracking-[0.18em] text-ink-400">
          <span>
            {kind === "exam" ? "Module exam · " : ""}{week} · Question {idx + 1} of {total}
          </span>
          <span className="tabular-nums">{correctCount}/{answeredCount || 0} correct</span>
        </div>
        <div className="h-1 rounded-full bg-ink-900 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${pct}%`, boxShadow: "0 0 12px rgba(255,255,255,0.4)" }}
          />
        </div>
      </div>

      {/* Question by type */}
      <QuestionByType
        q={current}
        locked={locked}
        answer={answers[current.id]}
        onAnswer={(correct, payload) => recordAnswer(current.id, correct, payload)}
      />

      {/* Explanation */}
      {locked && (
        <div className="mt-6 rounded-xl border border-ink-800 bg-ink-900/40 px-5 py-4 fade-up">
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
      <div className="mt-8 flex items-center justify-between border-t border-ink-800 pt-6">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="text-sm text-ink-400 hover:text-white disabled:opacity-30 transition-colors"
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
              {idx === total - 1 ? "Finish" : "Next"} <span>→</span>
            </button>
          ) : (
            <span className="text-xs text-ink-500">Answer to continue</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Question renderers
// ============================================================================

function QuestionByType({
  q,
  locked,
  answer,
  onAnswer,
}: {
  q: AnyQ;
  locked: boolean;
  answer: Answer | undefined;
  onAnswer: (correct: boolean, payload: unknown) => void;
}) {
  return (
    <>
      <TypeBadge q={q} />
      <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight text-white leading-snug mb-7">
        {isFill(q) ? renderFillQuestion(q.q) : q.q}
      </h1>

      {isMCQ(q) && <MCQView q={q} locked={locked} answer={answer} onAnswer={onAnswer} />}
      {isMulti(q) && <MultiView q={q} locked={locked} answer={answer} onAnswer={onAnswer} />}
      {isFill(q) && <FillView q={q} locked={locked} answer={answer} onAnswer={onAnswer} />}
    </>
  );
}

function TypeBadge({ q }: { q: AnyQ }) {
  let label = "Multiple choice";
  let cls = "text-ink-400 border-ink-700 bg-ink-900";
  if (isMulti(q)) { label = "Select all that apply"; cls = "text-amber-200 border-amber-400/30 bg-amber-500/[.06]"; }
  if (isFill(q)) { label = "Fill in the blank"; cls = "text-sky-200 border-sky-400/30 bg-sky-500/[.06]"; }
  return (
    <div className={["inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] font-medium mb-3", cls].join(" ")}>
      <span className="h-1 w-1 rounded-full bg-current opacity-70" /> {label}
    </div>
  );
}

function renderFillQuestion(q: string) {
  // Replace "_____" with a stylised slot marker
  const parts = q.split(/_{3,}/);
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <span className="inline-block align-baseline mx-1 px-3 min-w-[3.5rem] border-b-2 border-dashed border-white/60 text-white">
          ?
        </span>
      )}
    </span>
  ));
}

const LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

function MCQView({ q, locked, answer, onAnswer }: {
  q: MCQ; locked: boolean; answer: Answer | undefined; onAnswer: (c: boolean, p: unknown) => void;
}) {
  const picked = answer?.payload as number | undefined;
  return (
    <div className="grid grid-cols-1 gap-2.5">
      {q.options.map((opt, i) => {
        const isCorrect = i === q.correct;
        const isPicked = picked === i;
        let cls = "group relative w-full text-left rounded-xl border px-5 py-4 transition-all duration-200 ";
        if (!locked) {
          cls += "border-ink-800 bg-ink-900/50 hover:border-ink-500 hover:bg-ink-900 active:translate-y-[1px] cursor-pointer";
        } else if (isCorrect) cls += "border-emerald-400/40 bg-emerald-500/10";
        else if (isPicked) cls += "border-rose-400/40 bg-rose-500/10";
        else cls += "border-ink-800 bg-ink-950 opacity-60";

        return (
          <button
            key={i}
            disabled={locked}
            onClick={() => !locked && onAnswer(i === q.correct, i)}
            className={cls}
          >
            <div className="flex items-start gap-4">
              <span className={[
                "h-7 w-7 shrink-0 rounded-md border grid place-items-center text-xs font-semibold transition-colors",
                !locked
                  ? "border-ink-700 text-ink-300 group-hover:border-ink-400 group-hover:text-white"
                  : isCorrect ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"
                  : isPicked ? "border-rose-400/60 bg-rose-500/20 text-rose-200"
                  : "border-ink-800 text-ink-500",
              ].join(" ")}>
                {LETTERS[i]}
              </span>
              <span className="flex-1 text-ink-100 leading-relaxed pt-0.5">{opt}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MultiView({ q, locked, answer, onAnswer }: {
  q: MultiSelectQ; locked: boolean; answer: Answer | undefined; onAnswer: (c: boolean, p: unknown) => void;
}) {
  const [picks, setPicks] = useState<number[]>([]);
  const final = (answer?.payload as number[] | undefined) ?? null;
  const correctSet = new Set(q.correct);

  function toggle(i: number) {
    if (locked) return;
    setPicks((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i].sort((a, b) => a - b)));
  }
  function submit() {
    if (locked) return;
    const picked = new Set(picks);
    const correct =
      picked.size === correctSet.size && [...correctSet].every((i) => picked.has(i));
    onAnswer(correct, picks);
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {q.options.map((opt, i) => {
          const checked = locked ? final?.includes(i) : picks.includes(i);
          const isCorrect = correctSet.has(i);
          let cls = "group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ";
          if (!locked) {
            cls += checked
              ? "border-white/60 bg-white/[.06] cursor-pointer"
              : "border-ink-800 bg-ink-900/40 hover:border-ink-500 hover:bg-ink-900 cursor-pointer active:translate-y-[1px]";
          } else if (isCorrect && checked) cls += "border-emerald-400/40 bg-emerald-500/10";
          else if (isCorrect && !checked) cls += "border-emerald-400/25 bg-emerald-500/5";
          else if (checked && !isCorrect) cls += "border-rose-400/40 bg-rose-500/10";
          else cls += "border-ink-800 bg-ink-950 opacity-60";

          return (
            <button key={i} disabled={locked} onClick={() => toggle(i)} className={cls}>
              <span className={[
                "h-5 w-5 rounded-md border grid place-items-center shrink-0 transition-colors",
                checked
                  ? "bg-white border-white text-ink-950"
                  : "border-ink-600 group-hover:border-ink-400",
                locked && isCorrect && !checked ? "ring-1 ring-emerald-400/60" : "",
              ].join(" ")}>
                {checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5 L5 9 L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </span>
              <span className="text-sm text-ink-100 leading-snug">{opt}</span>
              {locked && isCorrect && !checked && (
                <span className="ml-auto text-[10px] uppercase tracking-wider text-emerald-300">missed</span>
              )}
            </button>
          );
        })}
      </div>
      {!locked && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-ink-400">{picks.length} selected · pick all that apply</span>
          <button
            onClick={submit}
            disabled={picks.length === 0}
            className="inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-5 py-2 text-sm font-medium hover:bg-ink-100 disabled:opacity-40 transition-all active:translate-y-[1px]"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

function FillView({ q, locked, answer, onAnswer }: {
  q: FillBlankQ; locked: boolean; answer: Answer | undefined; onAnswer: (c: boolean, p: unknown) => void;
}) {
  const [text, setText] = useState("");
  const submitted = (answer?.payload as string | undefined) ?? null;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!locked) ref.current?.focus();
  }, [locked]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (locked) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    const normalized = trimmed.toLowerCase();
    const correct = q.accept.some((a) => a.trim().toLowerCase() === normalized);
    onAnswer(correct, trimmed);
  }

  const wasCorrect = answer?.correct ?? false;

  return (
    <form onSubmit={submit}>
      <div className="rounded-xl border border-ink-800 bg-ink-950 p-4">
        <label className="text-[11px] uppercase tracking-wider text-ink-400 font-medium block mb-2">Your answer</label>
        <input
          ref={ref}
          type="text"
          value={locked ? (submitted ?? "") : text}
          onChange={(e) => setText(e.target.value)}
          disabled={locked}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className={[
            "w-full bg-transparent border-0 outline-none px-0 py-2 text-xl font-mono tracking-tight transition-colors",
            locked
              ? wasCorrect ? "text-emerald-300" : "text-rose-300 line-through decoration-rose-400/50"
              : "text-white",
          ].join(" ")}
          placeholder="Type and press Enter…"
        />
        {!locked && (
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-ink-800">
            <span className="text-xs text-ink-500">Case-insensitive · ignores extra spaces</span>
            <button
              type="submit"
              disabled={!text.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-4 py-1.5 text-xs font-medium hover:bg-ink-100 disabled:opacity-40 transition-all active:translate-y-[1px]"
            >
              Submit
            </button>
          </div>
        )}
        {locked && !wasCorrect && (
          <div className="mt-3 pt-3 border-t border-ink-800">
            <div className="text-[11px] uppercase tracking-wider text-emerald-300 mb-1">Accepted answer</div>
            <div className="font-mono text-emerald-200">{q.accept[0]}</div>
          </div>
        )}
      </div>
    </form>
  );
}

// ============================================================================
// Finish screen
// ============================================================================

function FinishScreen({
  ordered, answers, bestScore, kind, week, title, lessonSlug, onReview, onRetry,
}: {
  ordered: AnyQ[]; answers: Record<string, Answer>; bestScore: number | null;
  kind: "practice" | "exam"; week: string; title: string; lessonSlug: string;
  onReview: () => void; onRetry: () => void;
}) {
  const total = ordered.length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const pct = Math.round((correctCount / total) * 100);
  const wrongIds = ordered.filter((q) => !answers[q.id]?.correct);
  const passed = pct >= PASS_THRESHOLD;
  const isExam = kind === "exam";

  const bucket = pct >= 90 ? "Outstanding" : pct >= 75 ? "Solid" : pct >= 60 ? "Getting there" : "Needs another pass";

  return (
    <div className="fade-up">
      <div className="text-[11px] uppercase tracking-[0.18em] font-medium mb-3 text-ink-400">
        {isExam ? "Module exam" : "Practice"} · {week} · Complete
      </div>
      <h1 className="font-display italic font-normal text-white tracking-tight text-[44px] sm:text-5xl mb-2 glow-text-soft">
        {isExam ? (passed ? "Module passed." : "Not quite yet.") : `${bucket}.`}
      </h1>
      <p className="text-ink-300 text-lg mb-10">
        {isExam
          ? passed
            ? `You scored ${pct}% — above the ${PASS_THRESHOLD}% mark. The lesson is now marked complete.`
            : `You scored ${pct}%. You need ${PASS_THRESHOLD}% to pass the module exam.`
          : `You answered ${correctCount} of ${total} correctly.`}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden bg-ink-800 border border-ink-800 mb-10">
        <Stat label="Score" value={`${pct}%`} highlight={passed ? "good" : pct >= 60 ? "neutral" : "bad"} />
        <Stat label="Correct" value={`${correctCount}/${total}`} />
        <Stat label="Best ever" value={bestScore != null ? `${bestScore}%` : "—"} />
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-ink-400">Result distribution</span>
          <span className="tabular-nums text-ink-300">{correctCount} correct · {total - correctCount} wrong</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden bg-ink-900 border border-ink-800">
          <div className="bg-emerald-400/80 transition-all duration-700" style={{ width: `${(correctCount / total) * 100}%` }} />
          <div className="bg-rose-400/70 transition-all duration-700" style={{ width: `${((total - correctCount) / total) * 100}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {wrongIds.length > 0 && (
          <button onClick={onReview} className="group inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-5 py-2.5 text-sm font-medium hover:bg-ink-100 active:translate-y-[1px] transition-all">
            Review {wrongIds.length} wrong {wrongIds.length === 1 ? "answer" : "answers"}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        )}
        <button onClick={onRetry} className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-5 py-2.5 text-sm font-medium text-ink-100 hover:bg-ink-800 hover:border-ink-500 transition-colors active:translate-y-[1px]">
          Restart with new order
        </button>
        <Link href={`/lessons/${lessonSlug}`} className="inline-flex items-center gap-2 rounded-full border border-ink-800 px-5 py-2.5 text-sm text-ink-300 hover:text-white hover:border-ink-700 transition-colors">
          Back to lesson
        </Link>
      </div>

      {/* Answer log */}
      <div className="border-t border-ink-800 pt-8">
        <h2 className="text-sm uppercase tracking-wider text-ink-400 font-medium mb-4">Answer log</h2>
        <ul className="divide-y divide-ink-800/80">
          {ordered.map((q, i) => {
            const a = answers[q.id];
            return (
              <li key={q.id} className="py-3 flex items-start gap-4">
                <span className={[
                  "mt-0.5 h-6 w-6 shrink-0 rounded-full grid place-items-center text-[11px] font-semibold tabular-nums",
                  a?.correct ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300",
                ].join(" ")}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white leading-snug">{isFill(q) ? q.q.replace(/_+/g, "____") : q.q}</div>
                  <div className="mt-1 text-xs text-ink-400">
                    {a?.correct ? "Correct" : <>Incorrect{q.topic && <> · <span className="text-ink-300">{q.topic}</span></>}</>}
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

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: "good" | "bad" | "neutral" }) {
  return (
    <div className="bg-ink-950 px-6 py-5">
      <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">{label}</div>
      <div className={[
        "text-2xl font-semibold tabular-nums",
        highlight === "good" ? "text-emerald-300" : highlight === "bad" ? "text-rose-300" : "text-white",
      ].join(" ")}>
        {value}
      </div>
    </div>
  );
}
