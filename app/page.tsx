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
      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto px-5 sm:px-7 md:px-10 py-12 md:py-20 fade-up">
          {/* Hero */}
          <div className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-3 py-1 text-[11px] tracking-wider uppercase text-ink-300 mb-7">
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-glow-sm animate-pulse" />
              SOFT2301 · University of Doha for Science &amp; Technology
            </div>
            <h1 className="font-display italic font-normal text-white leading-[0.95] tracking-tight text-[56px] sm:text-7xl md:text-[88px] mb-6 glow-text">
              Software<br />
              <span className="text-ink-300">Project</span><br />
              Management.
            </h1>
            <p className="text-base sm:text-lg text-ink-300 leading-relaxed max-w-2xl">
              A guided walk-through of the lecture material — project fundamentals and the SDLC,
              Agile and Scrum, estimation and the Critical Path Method.
              Mark lessons complete, scrub through worked examples, finish on the cram sheet.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/lessons/${lectures[0]?.slug ?? ""}`}
                className="inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-5 py-2.5 text-sm font-medium hover:bg-ink-100 shadow-glow transition-all active:translate-y-[1px]"
              >
                Start with Week 1 <span>→</span>
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/60 px-5 py-2.5 text-sm font-medium text-ink-100 hover:border-ink-500 hover:bg-ink-800 transition-colors active:translate-y-[1px]"
              >
                Question bank · {totalQuestions} questions
              </Link>
              {cram[0] && (
                <Link
                  href={`/lessons/${cram[0].slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/[.05] px-5 py-2.5 text-sm font-medium text-amber-200 hover:bg-amber-500/10 hover:border-amber-400/40 transition-colors active:translate-y-[1px]"
                >
                  <span>★</span> Cram Sheet
                </Link>
              )}
            </div>

            <HomeProgress total={lectures.length} />
          </div>

          {/* Lessons grid */}
          <div className="mb-14">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-xl font-semibold text-white tracking-tight">Lectures</h2>
              <span className="text-sm text-ink-400 tabular-nums">{lectures.length} modules</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lectures.map((l) => (
                <Link
                  key={l.slug}
                  href={`/lessons/${l.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-ink-800 bg-gradient-to-br from-ink-900/40 to-ink-950 p-6 hover:border-ink-600 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/[.04] blur-3xl group-hover:bg-white/[.08] transition-colors" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">{l.week}</span>
                      <span className="h-7 w-7 rounded-full border border-ink-700 bg-ink-900 grid place-items-center text-xs font-semibold text-ink-300 group-hover:bg-white group-hover:text-ink-950 group-hover:border-white transition-colors tabular-nums">
                        {l.order}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-white transition-colors">
                      {l.title}
                    </h3>
                    <p className="text-sm text-ink-400 leading-relaxed">{l.subtitle}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm text-ink-300 group-hover:text-white transition-colors">
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
                    className="group flex items-center justify-between rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[.04] to-transparent p-6 hover:border-amber-500/40 transition-colors active:translate-y-[1px]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-400/20 grid place-items-center text-amber-400 text-lg">
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

          <footer className="mt-24 pt-8 border-t border-ink-800 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-400">
            <span>
              Built from your lecture notes · <span className="text-ink-300">Progress saved in your browser.</span>
            </span>
            <a
              href="https://velocityai.me"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-ink-500 hover:text-white transition-colors"
            >
              <span>by</span>
              <span className="font-medium text-ink-300 group-hover:text-white">VelocityAI</span>
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity">
                <path d="M3 7L7 3M7 3H4M7 3V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}
