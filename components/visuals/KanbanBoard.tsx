"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Card = { id: string; title: string; col: 0 | 1 | 2 };

const initial: Card[] = [
  { id: "c1", title: "Draft login spec", col: 0 },
  { id: "c2", title: "Database migration", col: 1 },
  { id: "c3", title: "Set up CI", col: 2 },
  { id: "c4", title: "Wire OAuth provider", col: 0 },
  { id: "c5", title: "Onboarding emails", col: 1 },
];

const COLS = ["To Do", "In Progress", "Done"] as const;

export default function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>(initial);

  // Simulate flow: every 2.5s advance a random in-progress card or pull a to-do
  useEffect(() => {
    const i = setInterval(() => {
      setCards((cs) => {
        const cycle = cs.map((c) => ({ ...c }));
        // First, advance an in-progress card to done
        const inProg = cycle.findIndex((c) => c.col === 1);
        if (inProg !== -1 && Math.random() > 0.4) {
          cycle[inProg].col = 2;
        }
        // Then pull a todo into in-progress
        const todo = cycle.findIndex((c) => c.col === 0);
        if (todo !== -1 && Math.random() > 0.3) {
          cycle[todo].col = 1;
        }
        // If everything's done, reset
        if (cycle.every((c) => c.col === 2)) return initial;
        return cycle;
      });
    }, 2500);
    return () => clearInterval(i);
  }, []);

  function move(id: string, delta: -1 | 1) {
    setCards((cs) => cs.map((c) => {
      if (c.id !== id) return c;
      const next = (c.col + delta) as 0 | 1 | 2;
      if (next < 0 || next > 2) return c;
      return { ...c, col: next };
    }));
  }

  return (
    <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">Live demo</div>
          <h3 className="text-lg font-semibold text-white tracking-tight">A simulated Kanban board</h3>
          <p className="text-sm text-ink-400 mt-1">Watch tasks flow, or nudge them yourself with the arrows.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {COLS.map((label, ci) => (
          <div key={label} className="rounded-2xl border border-ink-800 bg-ink-950 p-3 min-h-[260px]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] uppercase tracking-wider text-ink-300 font-medium">{label}</div>
              <span className="text-[10px] tabular-nums text-ink-500">
                {cards.filter((c) => c.col === ci).length}
              </span>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {cards.filter((c) => c.col === ci).map((c) => (
                  <motion.div
                    key={c.id}
                    layout
                    layoutId={c.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="group rounded-lg border border-ink-800 bg-ink-900 px-2.5 py-2 text-xs text-ink-100 leading-snug"
                  >
                    <div className="font-medium mb-1.5">{c.title}</div>
                    <div className="flex items-center justify-between text-[10px] text-ink-500 font-mono">
                      <button onClick={() => move(c.id, -1)} disabled={ci === 0} className="hover:text-white disabled:opacity-20">←</button>
                      <span className="opacity-50">{["TD", "IP", "DN"][ci]}</span>
                      <button onClick={() => move(c.id, 1)} disabled={ci === 2} className="hover:text-white disabled:opacity-20">→</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
