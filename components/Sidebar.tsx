"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SidebarLesson = {
  slug: string;
  title: string;
  week: string;
  kind: "cram" | "lecture";
  order: number;
};

export default function Sidebar({ lessons }: { lessons: SidebarLesson[] }) {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("soft-lms:completed");
      if (raw) setCompleted(JSON.parse(raw));
    } catch {}
  }, []);

  const lectures = lessons.filter((l) => l.kind === "lecture");
  const cram = lessons.filter((l) => l.kind === "cram");
  const total = lectures.length;
  const done = lectures.filter((l) => completed[l.slug]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <aside className="w-72 shrink-0 border-r border-ink-800 bg-ink-950 h-screen sticky top-0 overflow-y-auto">
      <div className="px-5 py-6">
        <Link href="/" className="block group">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center text-white font-bold text-sm shadow-lg shadow-violet-900/40">
              S
            </div>
            <div>
              <div className="text-white font-semibold text-sm tracking-tight">SOFT2301</div>
              <div className="text-ink-400 text-xs">Project Management</div>
            </div>
          </div>
        </Link>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-ink-400 mb-2">
            <span>Progress</span>
            <span className="tabular-nums">{done}/{total}</span>
          </div>
          <div className="h-1.5 rounded-full bg-ink-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <nav className="px-3 pb-8 space-y-6">
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
                          ? "border-violet-500 bg-violet-500 text-white"
                          : active
                          ? "border-ink-300 text-ink-300"
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
    </aside>
  );
}
