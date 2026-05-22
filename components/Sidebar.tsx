"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SidebarLesson = {
  slug: string;
  title: string;
  week: string;
  kind: "cram" | "lecture";
  order: number;
};

export default function Sidebar({ lessons }: { lessons: SidebarLesson[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("soft-lms:completed");
      if (raw) setCompleted(JSON.parse(raw));
    } catch {}
    const sync = () => {
      try {
        const raw = localStorage.getItem("soft-lms:completed");
        setCompleted(raw ? JSON.parse(raw) : {});
      } catch {}
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // Close drawer on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile top bar — fixed at top, only on small screens */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-3 px-4 h-14 bg-ink-950/90 backdrop-blur-md border-b border-ink-800/80">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="h-9 w-9 grid place-items-center rounded-md border border-ink-800 bg-ink-900 text-ink-200 hover:text-white active:translate-y-[1px] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-white grid place-items-center text-ink-950 font-bold text-xs shadow-glow-sm">
            S
          </span>
          <span className="text-sm font-semibold text-white tracking-tight">SOFT2301</span>
        </Link>
        <a
          href="https://velocityai.me"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 rounded-md border border-ink-800 bg-ink-900 px-2 h-9 text-[10px] uppercase tracking-[0.14em] text-ink-300 hover:text-white hover:border-ink-600 transition-colors"
        >
          <span className="text-ink-500 group-hover:text-ink-300">by</span>
          <span className="font-medium">Velocity<span className="text-ink-400 group-hover:text-white">AI</span></span>
        </a>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-72 shrink-0 border-r border-ink-800 bg-ink-950 h-screen sticky top-0 overflow-y-auto">
        <SidebarContent lessons={lessons} pathname={pathname} completed={completed} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="md:hidden fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] bg-ink-950 border-r border-ink-800 flex flex-col overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-md border border-ink-800 bg-ink-900 text-ink-300 hover:text-white active:translate-y-[1px] z-10"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <SidebarContent lessons={lessons} pathname={pathname} completed={completed} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({
  lessons,
  pathname,
  completed,
}: {
  lessons: SidebarLesson[];
  pathname: string;
  completed: Record<string, boolean>;
}) {
  const lectures = lessons.filter((l) => l.kind === "lecture");
  const cram = lessons.filter((l) => l.kind === "cram");
  const total = lectures.length;
  const done = lectures.filter((l) => completed[l.slug]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-5 py-6">
        <div className="flex items-start justify-between gap-2">
          <Link href="/" className="block group flex-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-lg bg-white grid place-items-center text-ink-950 font-bold text-sm shadow-glow halo-pulse">
                S
              </div>
              <div className="min-w-0">
                <div className="text-white font-semibold text-sm tracking-tight">SOFT2301</div>
                <div className="text-ink-400 text-xs">Project Management</div>
              </div>
            </div>
          </Link>
          <a
            href="https://velocityai.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 inline-flex items-center gap-1 rounded-md border border-ink-800 bg-ink-900 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-ink-300 hover:text-white hover:border-ink-600 transition-colors"
            title="by VelocityAI"
          >
            <span className="text-ink-500 group-hover:text-ink-300">by</span>
            <span className="font-medium">Velocity<span className="text-ink-400 group-hover:text-white">AI</span></span>
          </a>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-ink-400 mb-2">
            <span>Progress</span>
            <span className="tabular-nums">{done}/{total}</span>
          </div>
          <div className="h-1 rounded-full bg-ink-800 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${pct}%`, boxShadow: "0 0 12px rgba(255,255,255,0.4)" }}
            />
          </div>
        </div>
      </div>

      <nav className="px-3 pb-4 space-y-6 flex-1">
        <div>
          <Link
            href="/quiz"
            className={[
              "flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors",
              pathname === "/quiz" || pathname.startsWith("/quiz/")
                ? "bg-emerald-500/10 text-emerald-200 border border-emerald-400/25"
                : "border border-transparent text-ink-200 hover:bg-ink-900 hover:text-white",
            ].join(" ")}
          >
            <span className="flex items-center gap-2.5">
              <span className="h-4 w-4 rounded-sm border border-current grid place-items-center text-[10px] font-semibold">Q</span>
              Question bank
            </span>
            <span className="text-[10px] tabular-nums opacity-60">MCQ</span>
          </Link>
        </div>

        <div>
          <div className="px-2 text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-2">Lectures</div>
          <ul className="space-y-0.5">
            {lectures.map((l) => {
              const href = `/lessons/${l.slug}`;
              const active = pathname === href;
              const isDone = !!completed[l.slug];
              return (
                <li key={l.slug}>
                  <Link
                    href={href}
                    className={[
                      "flex items-start gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                      active ? "bg-ink-800 text-white" : "text-ink-300 hover:bg-ink-900 hover:text-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "mt-0.5 h-4 w-4 shrink-0 rounded-full border grid place-items-center text-[10px] font-medium",
                        isDone
                          ? "border-white bg-white text-ink-950 shadow-glow-sm"
                          : active
                          ? "border-ink-200 text-ink-100"
                          : "border-ink-600 text-ink-500",
                      ].join(" ")}
                    >
                      {isDone ? "✓" : l.order}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[11px] text-ink-400 leading-tight">{l.week}</span>
                      <span className="block leading-snug">{l.title}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {cram.length > 0 && (
          <div>
            <div className="px-2 text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-2">Review</div>
            <ul className="space-y-0.5">
              {cram.map((l) => {
                const href = `/lessons/${l.slug}`;
                const active = pathname === href;
                return (
                  <li key={l.slug}>
                    <Link
                      href={href}
                      className={[
                        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                        active ? "bg-ink-800 text-white" : "text-ink-300 hover:bg-ink-900 hover:text-white",
                      ].join(" ")}
                    >
                      <span className="h-4 w-4 shrink-0 grid place-items-center text-amber-400">★</span>
                      <span>{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

      {/* VelocityAI byline */}
      <div className="px-5 pt-4 pb-6 border-t border-ink-900">
        <a
          href="https://velocityai.me"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-white transition-colors"
        >
          <span>by</span>
          <span className="font-medium text-ink-300 group-hover:text-white">VelocityAI</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity">
            <path d="M3 7L7 3M7 3H4M7 3V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
