import React from "react";

export function Section({
  eyebrow,
  title,
  lede,
  children,
  id,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="py-10 border-t border-ink-800/80 first:border-t-0 first:pt-0">
      <div className="mb-8">
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80 font-medium mb-2">
            {eyebrow}
          </div>
        )}
        <h2 className="text-[26px] md:text-[30px] font-semibold tracking-tight text-white leading-tight">
          {title}
        </h2>
        {lede && <p className="mt-2 text-ink-300 text-[15px] leading-relaxed max-w-2xl">{lede}</p>}
      </div>
      {children}
    </section>
  );
}

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn" | "success";
  title?: string;
  children: React.ReactNode;
}) {
  const palette: Record<typeof tone, { ring: string; bg: string; text: string; dot: string }> = {
    info: {
      ring: "border-sky-400/25",
      bg: "bg-sky-500/[.06]",
      text: "text-sky-100",
      dot: "bg-sky-300",
    },
    warn: {
      ring: "border-amber-400/30",
      bg: "bg-amber-500/[.07]",
      text: "text-amber-100",
      dot: "bg-amber-300",
    },
    success: {
      ring: "border-emerald-400/25",
      bg: "bg-emerald-500/[.06]",
      text: "text-emerald-100",
      dot: "bg-emerald-300",
    },
  };
  const p = palette[tone];
  return (
    <div className={["rounded-2xl border px-5 py-4", p.ring, p.bg].join(" ")}>
      {title && (
        <div className="flex items-center gap-2 mb-1.5">
          <span className={["h-1.5 w-1.5 rounded-full", p.dot].join(" ")} />
          <div className={["text-[11px] uppercase tracking-[0.16em] font-medium", p.text].join(" ")}>
            {title}
          </div>
        </div>
      )}
      <div className={["text-[15px] leading-relaxed", p.text].join(" ")}>{children}</div>
    </div>
  );
}

export function FormulaCard({
  label,
  formula,
  hint,
  rule,
}: {
  label: string;
  formula: React.ReactNode;
  hint?: string;
  rule?: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
      <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400 mb-2">{label}</div>
      <div className="font-mono text-lg md:text-xl text-white tracking-tight">{formula}</div>
      {hint && <div className="mt-2 text-sm text-ink-400">{hint}</div>}
      {rule && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/25 px-2.5 py-1 text-xs text-emerald-200">
          <span className="h-1 w-1 rounded-full bg-emerald-300" /> {rule}
        </div>
      )}
    </div>
  );
}

export function StatPill({
  label,
  tone,
}: {
  label: string;
  tone: "ahead" | "behind" | "on" | "under" | "over";
}) {
  const palette: Record<typeof tone, string> = {
    ahead: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
    under: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
    on: "bg-ink-700/40 text-ink-100 border-ink-600",
    behind: "bg-rose-500/15 text-rose-200 border-rose-400/30",
    over: "bg-rose-500/15 text-rose-200 border-rose-400/30",
  };
  return (
    <span className={["inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", palette[tone]].join(" ")}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}
