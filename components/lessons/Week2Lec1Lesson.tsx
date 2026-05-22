"use client";

import { Callout, Section } from "@/components/visuals/Section";
import WaterfallVsAgile from "@/components/visuals/WaterfallVsAgile";
import AgileManifesto from "@/components/visuals/AgileManifesto";
import ScrumValues from "@/components/visuals/ScrumValues";
import DeliveryTimeline from "@/components/visuals/DeliveryTimeline";

export default function Week2Lec1Lesson() {
  return (
    <div className="space-y-1">
      {/* SDLC intro */}
      <Section
        eyebrow="The question this lecture answers"
        title="How should the team organise the work?"
        lede="Collect requirements → design the system → develop → test → deliver. Several lifecycle models exist; the course focuses on Waterfall and Agile."
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {[
            { name: "Waterfall", focus: true },
            { name: "Agile",     focus: true },
            { name: "Spiral" },
            { name: "V-Model" },
            { name: "Incremental" },
          ].map((m) => (
            <div
              key={m.name}
              className={[
                "rounded-2xl border p-4",
                m.focus ? "border-white/30 bg-white/[.04] text-white" : "border-ink-800 bg-ink-950 text-ink-400",
              ].join(" ")}
            >
              <div className="font-medium text-sm leading-tight">{m.name}</div>
              <div className={["text-[10px] uppercase tracking-wider mt-1", m.focus ? "text-white/70" : "text-ink-500"].join(" ")}>
                {m.focus ? "Focus" : "Mentioned"}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Waterfall */}
      <Section
        eyebrow="The classical approach"
        title="Waterfall"
        lede="Phases are separated, staff dedicated to each phase, and progress is measured by documentation produced."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <Trait label="Phase separation" body="Each phase is separated from the others." />
          <Trait label="Dedicated staffing" body="Staff are dedicated to each phase." />
          <Trait label="Document-driven" body="Guided by the production of documents." />
          <Trait label="Personnel continuity" body="Documents support handovers when staff change." />
        </div>

        <Callout tone="warn" title="Waterfall's negative aspects">
          <ul className="space-y-1 mt-1">
            <li>– Over-documentation: more focus on docs than the product.</li>
            <li>– Late delivery: software released only at the end.</li>
            <li>– Limited customer contact: client only at requirements phase.</li>
            <li>– Rigidity: requirements changes are not possible afterward.</li>
          </ul>
          <div className="mt-2 text-white font-medium">The big issue → &quot;Requirements up-front.&quot;</div>
        </Callout>
      </Section>

      {/* Delivery comparison */}
      <Section
        eyebrow="The headline contrast"
        title="When does the customer see value?"
      >
        <DeliveryTimeline />
      </Section>

      {/* Agile origin */}
      <Section
        eyebrow="The reframing"
        title="What is Agile?"
        lede="Iterative and incremental. Software is delivered in increments, the customer specifies requirements per increment, and changes are unavoidable."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {[
            { t: "No single recipe", b: "Agile teams use values and ground rules to make good choices in the face of uncertainty." },
            { t: "Changes are unavoidable", b: "Treat change as a constant, not a defect." },
            { t: "Software is high-value", b: "Quality is strongly dependent on the people building it." },
            { t: "Developers have opinions", b: "Good developers have views on the whole direction of the project." },
          ].map((x, i) => (
            <div key={i} className="rounded-2xl border border-ink-800 bg-ink-900/40 p-4">
              <div className="text-white font-medium mb-1">{x.t}</div>
              <div className="text-sm text-ink-400 leading-relaxed">{x.b}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-ink-800 bg-ink-950 p-5">
          <div className="text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-2">Highest priority</div>
          <div className="text-white text-lg leading-snug">
            Satisfy the customer through <span className="font-display italic glow-text-soft">early and continuous</span> delivery of valuable software.
          </div>
        </div>
      </Section>

      {/* Agile manifesto values */}
      <Section
        eyebrow="The Agile Manifesto"
        title="Four values, in their exact wording"
        lede="The 'X over Y' phrasing matters. The right side still has value — the left side has more."
      >
        <AgileManifesto />
      </Section>

      {/* 12 principles */}
      <Section
        eyebrow="Following from the values"
        title="The twelve Agile principles"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            "Customer satisfaction through early and continuous delivery",
            "Accommodate changing requirements throughout development",
            "Frequent delivery of working software",
            "Collaboration between business and developers throughout",
            "Support, trust, and motivate the people involved",
            "Enable face-to-face interactions",
            "Working software is the primary measure of progress",
            "Sustainable (consistent) development pace",
            "Attention to technical detail and design enhances agility",
            "Simplicity — just enough to get the job done for right now",
            "Self-organizing teams encourage great architectures",
            "Regular reflections on how to become more effective",
          ].map((line, i) => (
            <div key={i} className="rounded-xl border border-ink-800 bg-ink-950 p-3.5 flex items-start gap-3">
              <span className="h-6 w-6 shrink-0 rounded-md bg-ink-800 grid place-items-center text-[10px] font-mono text-ink-300 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-ink-200 leading-snug">{line}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Waterfall vs Agile table */}
      <Section
        eyebrow="The core comparison"
        title="Waterfall vs Agile, side by side"
      >
        <WaterfallVsAgile />
        <Callout tone="info" title="PM insight">
          For a waterfall team, the hardest issue is <span className="text-white">transitioning to an Agile mindset</span> — it's a cultural shift, not just a process swap.
        </Callout>
      </Section>

      {/* Agile frameworks */}
      <Section
        eyebrow="One mindset, several recipes"
        title="Three Agile frameworks"
        lede="Agile is not a single methodology. Several frameworks apply Agile principles differently."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: "Scrum", focus: true, body: "Sprints, three roles, ceremonies. Covered in detail next." },
            { name: "Kanban", focus: true, body: "Continuous flow, no prescribed roles. Lecture 2." },
            { name: "Extreme Programming", focus: false, body: "Frequent feedback, technical excellence." },
          ].map((f) => (
            <div
              key={f.name}
              className={[
                "rounded-2xl border p-5",
                f.focus ? "border-white/30 bg-white/[.04]" : "border-ink-800 bg-ink-950",
              ].join(" ")}
            >
              <div className="text-white font-semibold mb-1.5">{f.name}</div>
              <div className="text-sm text-ink-400 leading-relaxed">{f.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Scrum values */}
      <Section
        eyebrow="Scrum"
        title="Five values — C·C·R·F·O"
        lede="Courage, Commitment, Respect, Focus, Openness. The exam loves the mnemonic."
      >
        <ScrumValues />
      </Section>

      {/* Scrum roles */}
      <Section
        eyebrow="Scrum continued"
        title="Three roles, no more"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { abbr: "PO", name: "Product Owner",  body: "Owns the product backlog. Decides what to build next." },
            { abbr: "SM", name: "Scrum Master",   body: "Coaches the team on Scrum, removes blockers, grows respect." },
            { abbr: "TM", name: "Team Member",    body: "Cross-functional developer. Delivers the increment." },
          ].map((r) => (
            <div key={r.abbr} className="rounded-2xl border border-ink-800 bg-gradient-to-b from-ink-900/60 to-ink-950 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-7 w-7 rounded-md bg-white text-ink-950 grid place-items-center text-[11px] font-bold font-mono">{r.abbr}</span>
                <div className="text-white font-semibold">{r.name}</div>
              </div>
              <div className="text-sm text-ink-300 leading-relaxed">{r.body}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Trait({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-4">
      <div className="text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-1">{label}</div>
      <div className="text-[15px] text-ink-200">{body}</div>
    </div>
  );
}
