import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import HomeProgress from "@/components/HomeProgress";
import { getAllLessons } from "@/lib/lessons";
import { totalQuestions } from "@/lib/questions";

export default function HomePage() {
  const lessons = getAllLessons();
  const lectures = lessons.filter((l) => l.kind === "lecture");
  const cram = lessons.filter((l) => l.kind === "cram");

  const sidebarLessons = lessons.map(({ slug, title, week, kind, order }) => ({
    slug, title, week, kind, order,
  }));

  return (
    <div className="flex">
      <Sidebar lessons={sidebarLessons} />
      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-8 py-16 fade-up">
          {/* Hero */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/60 px-3 py-1 text-xs text-ink-300 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              SOFT2301 · University of Doha for Science & Technology
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.02] mb-5">
              Software Project<br />Management
            </h1>
            <p className="text-lg text-ink-300 leading-relaxed max-w-2xl">
              A guided walk-through of the lecture material — from project fundamentals and the SDLC,
              through Agile and Scrum, to estimation and the Critical Path Method.
              Mark lessons complete, breeze through worked examples, and finish on the cram sheet.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/lessons/${lectures[0]?.slug ?? ""}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-900/40 hover:scale-[1.02] transition-transform"
              >
                Start with Week 1 <span>→</span>
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/5 px-5 py-2.5 text-sm font-medium text-emerald-200 hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-colors active:translate-y-[1px]"
              >
                Question bank · {totalQuestions} MCQs
              </Link>
              {cram[0] && (
                <Link
                  href={`/lessons/${cram[0].slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-5 py-2.5 text-sm font-medium text-ink-100 hover:bg-ink-800 hover:border-ink-600 transition-colors"
                >
                  <span className="text-amber-400">★</span> Open Cram Sheet
                </Link>
              )}
            </div>

            <HomeProgress total={lectures.length} />
          </div>

          {/* Lessons grid */}
          <div className="mb-12">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xl font-semibold text-white tracking-tight">Lectures</h2>
              <span className="text-sm text-ink-400">{lectures.length} lessons</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lectures.map((l) => (
                <Link
                  key={l.slug}
                  href={`/lessons/${l.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-6 hover:border-ink-700 transition-all hover:-translate-y-0.5"
                >
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl group-hover:bg-violet-500/20 transition-colors" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-violet-300">{l.week}</span>
                      <span className="h-7 w-7 rounded-full bg-ink-800 grid place-items-center text-xs font-semibold text-ink-300 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                        {l.order}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-accent-fg transition-colors">
                      {l.title}
                    </h3>
                    <p className="text-sm text-ink-400 leading-relaxed">{l.subtitle}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm text-ink-300 group-hover:text-violet-300 transition-colors">
                      Open lesson <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {cram.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight mb-6">Review</h2>
              <div className="grid grid-cols-1 gap-4">
                {cram.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/lessons/${l.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[.04] to-transparent p-6 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="h-10 w-10 rounded-xl bg-amber-500/10 grid place-items-center text-amber-400 text-lg">
                        ★
                      </span>
                      <div>
                        <h3 className="text-white font-semibold">{l.title}</h3>
                        <p className="text-sm text-ink-400">{l.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-ink-300 group-hover:text-amber-300 transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <footer className="mt-20 pt-8 border-t border-ink-800 text-sm text-ink-400">
            Built from your lecture notes · Deploy on Vercel ·{" "}
            <span className="text-ink-300">Track progress locally in your browser.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
