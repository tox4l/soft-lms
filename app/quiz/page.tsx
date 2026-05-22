import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { getAllLessons } from "@/lib/lessons";
import { quizzes, totalQuestions } from "@/lib/questions";
import QuizBestBadge from "@/components/QuizBestBadge";

export default function QuizIndex() {
  const lessons = getAllLessons();
  const sidebarLessons = lessons.map(({ slug, title, week, kind, order }) => ({
    slug, title, week, kind, order,
  }));

  const practice = quizzes.filter((q) => q.kind === "practice");
  const exams    = quizzes.filter((q) => q.kind === "exam");

  return (
    <div className="flex">
      <Sidebar lessons={sidebarLessons} />
      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className="max-w-4xl mx-auto px-5 sm:px-7 md:px-10 py-10 md:py-16">
          <div className="mb-12">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-4">Question Bank</div>
            <h1 className="font-display italic font-normal text-white leading-[1.02] tracking-tight text-[48px] sm:text-5xl md:text-6xl mb-4 glow-text-soft">
              Practice &amp; module exams.
            </h1>
            <p className="text-base sm:text-lg text-ink-300 max-w-2xl leading-relaxed">
              {totalQuestions} practice questions plus a recall-focused module exam per lecture. Each quiz scrambles its order and tracks your best score locally. Passing a module exam (80%) marks the lesson as truly done.
            </p>
          </div>

          {/* Practice */}
          <section className="mb-12">
            <h2 className="text-sm uppercase tracking-[0.16em] text-ink-300 font-medium mb-4">Practice quizzes</h2>
            <div className="grid grid-cols-1 gap-3">
              {practice.map((q) => (
                <QuizCard key={q.slug} q={q} accent="white" />
              ))}
            </div>
          </section>

          {/* Module exams */}
          <section>
            <h2 className="text-sm uppercase tracking-[0.16em] text-amber-300/80 font-medium mb-4">Module exams · 80% to pass</h2>
            <div className="grid grid-cols-1 gap-3">
              {exams.map((q) => (
                <QuizCard key={q.slug} q={q} accent="amber" />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function QuizCard({ q, accent }: { q: typeof quizzes[number]; accent: "white" | "amber" }) {
  const accentRing =
    accent === "amber"
      ? "border-amber-400/20 hover:border-amber-400/40"
      : "border-ink-800 hover:border-ink-600";
  const numBox =
    accent === "amber"
      ? "from-amber-500/15 to-amber-500/[.04] border-amber-400/25 text-amber-200"
      : "from-white/[.08] to-white/[.02] border-white/20 text-white";
  return (
    <Link
      href={`/quiz/${q.slug}`}
      className={["group relative rounded-2xl border bg-ink-900/30 hover:bg-ink-900 transition-all p-6 flex items-center gap-6 active:translate-y-[1px]", accentRing].join(" ")}
    >
      <div className={["h-14 w-14 shrink-0 rounded-2xl border bg-gradient-to-br grid place-items-center font-semibold text-lg tabular-nums", numBox].join(" ")}>
        {q.questions.length}
      </div>
      <div className="flex-1 min-w-0">
        <div className={["text-[11px] uppercase tracking-[0.16em] font-medium mb-1", accent === "amber" ? "text-amber-300/80" : "text-ink-400"].join(" ")}>
          {q.week}{q.kind === "exam" ? " · module exam" : ""}
        </div>
        <div className="text-white font-medium text-lg leading-tight">{q.title}</div>
        <div className="mt-1 text-sm text-ink-400">
          {q.questions.length} questions · randomised
        </div>
      </div>
      <QuizBestBadge quizSlug={q.slug} />
      <span className="text-ink-400 group-hover:text-white transition-colors">→</span>
    </Link>
  );
}
