"use client";

import { Callout, Section } from "@/components/visuals/Section";
import ScopeVsGold from "@/components/visuals/ScopeVsGold";
import IronTriangle from "@/components/visuals/IronTriangle";
import KanbanBoard from "@/components/visuals/KanbanBoard";
import ScrumKanbanCompare from "@/components/visuals/ScrumKanbanCompare";

export default function Week2Lec2Lesson() {
  return (
    <div className="space-y-1">
      {/* WBS */}
      <Section
        eyebrow="Decomposition"
        title="Work Breakdown Structure"
        lede="A hierarchy of deliverables/tasks — break high-level work into progressively smaller, manageable pieces."
      >
        <div className="rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5 md:p-6">
          <svg viewBox="0 0 640 220" className="w-full h-auto">
            {/* Root */}
            <rect x={250} y={20} width={140} height={36} rx={6} fill="#ffffff15" stroke="#fafafa" strokeOpacity={0.7} />
            <text x={320} y={42} textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="600">Software project</text>

            {/* Level 1 */}
            {["Requirements", "Design", "Build", "Test"].map((n, i) => {
              const x = 40 + i * 150;
              return (
                <g key={n}>
                  <line x1={320} y1={56} x2={x + 60} y2={100} stroke="#fafafa" strokeOpacity={0.25} />
                  <rect x={x} y={100} width={120} height={34} rx={6} fill="#0e0e10" stroke="#27272c" />
                  <text x={x + 60} y={122} textAnchor="middle" fontSize="11" fill="#e6e6ea">{n}</text>
                </g>
              );
            })}

            {/* Level 2 — example branches under "Build" */}
            {["Auth module", "Reports", "Notifications"].map((n, i) => {
              const x = 380 + i * 0;
              const y = 170 + i * 16;
              return (
                <g key={n}>
                  <line x1={400} y1={134} x2={355} y2={y + 12} stroke="#fafafa" strokeOpacity={0.2} />
                  <rect x={210} y={y} width={140} height={24} rx={4} fill="#0e0e10" stroke="#1c1c20" />
                  <text x={280} y={y + 16} textAnchor="middle" fontSize="10" fill="#9a9aa6">{n}</text>
                </g>
              );
            })}
          </svg>
          <p className="text-sm text-ink-400 mt-3">
            Connects forward to Week 3: identifying activities <span className="text-white">is</span> building a WBS — identify high-level tasks, then break each into lower-level tasks.
          </p>
        </div>
      </Section>

      {/* Scope creep vs gold plating */}
      <Section
        eyebrow="Two ways scope expands"
        title="Scope creep vs Gold plating"
        lede="One is initiated by the client, one by your own team. Both ship features no one budgeted for."
      >
        <ScopeVsGold />
        <Callout tone="warn" title="Memory hook">
          Scope creep = the scope <span className="text-white font-semibold">grows on you</span>. Gold plating = the team adds <span className="text-white font-semibold">gold nobody asked for</span>.
        </Callout>
      </Section>

      {/* Scrum artifacts */}
      <Section
        eyebrow="Scrum artifacts"
        title="Backlogs, stand-ups, and burndown"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Artifact
            label="Product Backlog"
            body="The full list of future activities/requirements — everything still to do."
          />
          <Artifact
            label="Sprint Backlog"
            body="Work for the current sprint. Template columns: user story, task, assignee, status."
          />
          <Artifact
            label="Daily Stand-up"
            body="Short daily meeting reporting progress, blockers, and plans for the day."
          />
          <Artifact
            label="Burndown Chart"
            body="Shows how much work remains. Quick overview, but poor at pinpointing specific process gaps."
          />
        </div>
      </Section>

      {/* Iron triangle */}
      <Section
        eyebrow="Constraints"
        title="The Iron Triangle, inverted"
        lede="Traditional PM fixes scope and flexes time/cost. Agile does the opposite — fixed resources/schedule, variable scope."
      >
        <IronTriangle />
      </Section>

      {/* Project vs Product management */}
      <Section
        eyebrow="Two mindsets often confused"
        title="Project vs Product management"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
            <div className="text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-1">Project management</div>
            <div className="text-white font-semibold mb-2">Manage tasks &amp; activities</div>
            <div className="text-sm text-ink-300 leading-relaxed">Finish on schedule and on budget. Associated with traditional PM.</div>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/[.04] p-5">
            <div className="text-[11px] uppercase tracking-wider text-white font-medium mb-1">Product management</div>
            <div className="text-white font-semibold mb-2">Manage the product itself</div>
            <div className="text-sm text-ink-200 leading-relaxed">Associated with the Agile mindset.</div>
          </div>
        </div>
        <Callout tone="warn" title="A common bias">
          Implementing Agile while carrying traditional PM biases often fails. The specific symptom: <span className="text-white">trying to structure a product backlog like a WBS hierarchy</span>.
        </Callout>
      </Section>

      {/* WBS vs backlog */}
      <Section
        eyebrow="Two structures, two mindsets"
        title="WBS vs Product Backlog"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-ink-800 bg-ink-950 p-5">
            <div className="text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-1">WBS</div>
            <div className="text-white font-semibold mb-2">Hierarchical decomposition</div>
            <div className="text-sm text-ink-300 leading-relaxed">Traditional project management. Deliverables decomposed top-down.</div>
          </div>
          <div className="rounded-2xl border border-ink-800 bg-ink-950 p-5">
            <div className="text-[11px] uppercase tracking-wider text-white font-medium mb-1">Product backlog</div>
            <div className="text-white font-semibold mb-2">Prioritised flat list</div>
            <div className="text-sm text-ink-300 leading-relaxed">Agile product management. User stories, prioritised — not a tree.</div>
          </div>
        </div>
      </Section>

      {/* Kanban */}
      <Section
        eyebrow="Visualising flow"
        title="Kanban"
        lede="Real-time capacity communication + full work transparency. Work lives on a board everyone can see at any time."
      >
        <KanbanBoard />
      </Section>

      {/* Scrum vs Kanban */}
      <Section
        eyebrow="The must-know comparison"
        title="Scrum vs Kanban"
      >
        <ScrumKanbanCompare />
        <Callout tone="info" title="Memory hooks">
          <span className="text-white font-medium">Scrum</span> = sprints + velocity + locked-in scope per sprint.{" "}
          <span className="text-white font-medium">Kanban</span> = continuous flow + cycle time + change anytime.
        </Callout>
      </Section>

      {/* XP */}
      <Section
        eyebrow="The third framework"
        title="Extreme Programming"
        lede="Frequent and continuous feedback, collaboration, rapid iterative dev. Emphasises good engineering practices."
      >
        <div className="rounded-2xl border border-ink-800 bg-ink-950 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { l: "Feedback",      b: "Frequent and continuous from the customer and from the running code." },
              { l: "Collaboration", b: "Close working relationship between team, customer, and stakeholders." },
              { l: "Adaptation",    b: "Rapid iterative development and deployment." },
            ].map((x, i) => (
              <div key={i} className="rounded-xl border border-ink-800 bg-ink-900/40 p-3.5">
                <div className="text-white font-medium text-sm mb-1">{x.l}</div>
                <div className="text-xs text-ink-400 leading-snug">{x.b}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Agile vs PM */}
      <Section
        eyebrow="Stop the confusion"
        title="Agile is not the same as project management"
      >
        <div className="rounded-2xl border border-ink-800 bg-gradient-to-br from-ink-900/60 to-ink-950 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/30 bg-white/[.04] p-4">
              <div className="text-[11px] uppercase tracking-wider text-white font-medium mb-1">Agile</div>
              <div className="text-sm text-ink-200">A specific methodology for managing projects.</div>
            </div>
            <div className="rounded-xl border border-ink-800 bg-ink-950 p-4">
              <div className="text-[11px] uppercase tracking-wider text-ink-300 font-medium mb-1">Project management</div>
              <div className="text-sm text-ink-200">The broader umbrella — includes Agile, Waterfall, and others.</div>
            </div>
          </div>
          <p className="text-sm text-ink-400 mt-3 leading-relaxed">
            Agile is <span className="text-white">one of many approaches</span> that can be applied. Project management is the overall process of planning, organising, and managing resources to complete a project.
          </p>
        </div>
      </Section>
    </div>
  );
}

function Artifact({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
      <div className="text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-1">Artifact</div>
      <div className="text-white font-semibold mb-2">{label}</div>
      <div className="text-sm text-ink-300 leading-relaxed">{body}</div>
    </div>
  );
}
