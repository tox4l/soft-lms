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

  return (
    <div className="flex">
      <Sidebar lessons={sidebarLessons} />
      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className="max-w-4xl mx-auto px-5 sm:px-7 md:px-10 py-10 md:py-16">
          <div className="mb-12">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-4">
              Question Bank
            </div>
            <h1 className="font-display italic font-normal text-white leading-[1.02] tracking-tight text-[48px] sm:text-5xl md:text-6xl mb-4 glow-text-soft">
              Practice quizzes.
            </h1>
            <p className="text-base sm:text-lg text-ink-300 max-w-2xl leading-relaxed">
              {totalQuestions} questions, divided by lecture. Each quiz scrambles its order and tracks your best score locally.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {quizzes.map((q) => (
              <Link
                key={q.slug}
                href={`/quiz/${q.slug}`}
                className="group relative rounded-2xl border border-ink-800 bg-ink-900/40 hover:bg-ink-900 hover:border-ink-700 transition-all p-6 flex items-center gap-6 active:translate-y-[1px]"
              >
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-400/15 to-teal-300/5 border border-emerald-400/25 grid place-items-center text-emerald-200 font-semibold text-lg tabular-nums">
                  {q.questions.length}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider text-emerald-300/80 font-medium mb-1">
                    {q.week}
                  </div>
                  <div className="text-white font-medium text-lg leading-tight group-hover:text-emerald-100 transition-colors">
                    {q.title}
                  </div>
                  <div className="mt-1 text-sm text-ink-400">
                    {q.questions.length} questions · randomised order
                  </div>
                </div>
                <QuizBestBadge quizSlug={q.slug} />
                <span className="text-ink-400 group-hover:text-emerald-200 transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
