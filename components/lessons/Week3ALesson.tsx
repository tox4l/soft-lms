"use client";

import Link from "next/link";
import { Callout, FormulaCard, Section } from "@/components/visuals/Section";
import MakeOrBuyChart from "@/components/visuals/MakeOrBuyChart";
import EVMCalculator from "@/components/visuals/EVMCalculator";
import EVMMatrix from "@/components/visuals/EVMMatrix";
import PERTCalculator from "@/components/visuals/PERTCalculator";
import BoehmGallery from "@/components/visuals/BoehmGallery";
import OTSCompare from "@/components/visuals/OTSCompare";
import AoNvsAoA from "@/components/visuals/AoNvsAoA";

export default function Week3ALesson() {
  return (
    <div className="space-y-1">
      {/* Objectives */}
      <Section
        eyebrow="By the end of this lecture"
        title="Three things you should be able to do"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Produce an activity plan", body: "Identify every activity, its predecessors, and its duration." },
            { num: "02", title: "Estimate overall duration", body: "Combine activity-level estimates into a project total." },
            { num: "03", title: "Build a critical path", body: "Create a precedence network and find the chain that drives the schedule." },
          ].map((o) => (
            <div key={o.num} className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
              <div className="text-[11px] font-mono text-emerald-300/80 mb-3">{o.num}</div>
              <div className="text-white font-medium mb-1">{o.title}</div>
              <div className="text-sm text-ink-400 leading-relaxed">{o.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Build or Buy */}
      <Section
        eyebrow="Decision"
        title="Build or buy?"
        lede="Software can be made in-house or sourced from a supplier. The choice depends on risk, application type, and the client's own constraints."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <Pill title="Build" caption="In-house development" />
          <Pill title="Buy" caption="Outsource / off-the-shelf" />
          <Pill title="Either" caption="Depends on the analysis" />
        </div>
        <OTSCompare />
      </Section>

      {/* Make or Buy */}
      <Section
        eyebrow="Worked example"
        title="Make-or-buy break-even"
        lede="Set lease cost equal to purchase cost; solve for the break-even number of days."
      >
        <div className="mb-5">
          <Callout title="The slide example">
            Lease at <span className="font-mono">$800/day</span>. Purchase at{" "}
            <span className="font-mono">$12,000</span> plus <span className="font-mono">$400/day</span> operating. Solving{" "}
            <span className="font-mono">12,000 + 400d = 800d</span> gives{" "}
            <span className="text-emerald-300 font-semibold">d = 30 days</span>. Above 30 days, purchase wins.
          </Callout>
        </div>
        <MakeOrBuyChart />
      </Section>

      {/* EVM */}
      <Section
        eyebrow="Earned Value Management"
        title="Are we ahead or behind? Under or over?"
        lede="Three numbers tell you the truth: Planned Value, Earned Value, and Actual Cost."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <DefBox term="PV" subtitle="Planned Value" body="How much work should be done by now." accent="slate" />
          <DefBox term="EV" subtitle="Earned Value" body="How much work has actually been completed (in value terms)." accent="emerald" />
          <DefBox term="AC" subtitle="Actual Cost" body="How much money has been spent so far." accent="amber" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <FormulaCard
            label="Cost Performance Index"
            formula={<><span className="text-emerald-300">CPI</span> = EV / AC</>}
            hint="Cost efficiency: value earned per dollar spent."
            rule="> 1 is good · under budget"
          />
          <FormulaCard
            label="Schedule Performance Index"
            formula={<><span className="text-emerald-300">SPI</span> = EV / PV</>}
            hint="Schedule efficiency: value earned vs planned."
            rule="> 1 is good · ahead of schedule"
          />
        </div>

        <EVMCalculator />

        <div className="mt-6">
          <h4 className="text-sm uppercase tracking-wider text-ink-300 font-medium mb-3">Read any row at a glance</h4>
          <EVMMatrix />
        </div>
      </Section>

      {/* Why plan */}
      <Section
        eyebrow="Foundations"
        title="Why do we plan activities?"
        lede="Five reasons — each is a different conversation you can have because you have a plan."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { title: "Feasibility", body: "Is the schedule achievable?" },
            { title: "Resource allocation", body: "Who and what is needed, when." },
            { title: "Detailed costing", body: "Build accurate cost estimates." },
            { title: "Motivation", body: "Targets motivate the team." },
            { title: "Coordination", body: "Align activities and people." },
          ].map((r) => (
            <div key={r.title} className="rounded-xl border border-ink-800 bg-ink-900/40 p-4">
              <div className="text-white font-medium text-sm">{r.title}</div>
              <div className="text-xs text-ink-400 mt-1 leading-snug">{r.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Activity rules */}
      <Section
        eyebrow="Activity rules"
        title="What counts as an activity"
      >
        <ul className="space-y-2 text-[15px] text-ink-200">
          <li className="flex gap-3"><Tick /> A project may start when at least one of its activities is ready to start.</li>
          <li className="flex gap-3"><Tick /> A project is completed when all of its activities are completed.</li>
          <li className="flex gap-3"><Tick /> Each activity must have a clear start and endpoint — usually a tangible deliverable.</li>
          <li className="flex gap-3"><Tick /> If an activity needs a resource, that requirement must be forecastable.</li>
        </ul>
      </Section>

      {/* AoN vs AoA */}
      <Section
        eyebrow="Network notation"
        title="Activity-on-Node vs Activity-on-Arrow"
        lede="Two ways to draw the same dependency graph. The course uses AoN throughout the worked examples in Part B."
      >
        <AoNvsAoA />
      </Section>

      {/* Float */}
      <Section
        eyebrow="Float"
        title="Slack — the room to slip without consequences"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FormulaCard label="Total Float" formula={<>TF = LS − ES</>} hint="Without delaying project completion." />
          <FormulaCard label="Free Float" formula={<>FF = ES(next) − EF(current)</>} hint="Without delaying a successor." />
          <FormulaCard label="Float (residual)" formula={<>F = TF − FF</>} hint="Often shown separately on the slide layout." />
        </div>
        <p className="mt-4 text-sm text-ink-400">
          Deep diagram and worked numbers live in <Link href="/lessons/week3b-critical-path-method-worked-examples" className="text-emerald-300 hover:underline">Part B</Link>.
        </p>
      </Section>

      {/* Boehm */}
      <Section
        eyebrow="Estimation"
        title="Boehm's seven techniques"
        lede="From the 1981 Software Engineering Economics. Each technique trades accuracy, cost, and political defensibility."
      >
        <BoehmGallery />
      </Section>

      {/* Three methods emphasised */}
      <Section
        eyebrow="The three you must know"
        title="Analogous, Parametric, and PERT"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
          <MethodCard
            title="Analogous (Top-down)"
            body="Use actual time/cost from a previous, similar project. Fast and cheap, less accurate. Used early."
          />
          <MethodCard
            title="Parametric"
            body="Find a duration per unit of work, multiply by the number of units. Trap: separate fixed setup time from the per-unit rate."
            example={<>4 hrs / 2 acres = <span className="text-emerald-300">2 hrs/acre</span> × 8 acres = <span className="text-emerald-300">16 hrs</span></>}
          />
          <MethodCard
            title="Three-point (PERT)"
            body="Combine optimistic, most-likely, and pessimistic into a weighted expected duration."
            example={<>Formula below ↓</>}
          />
        </div>
      </Section>

      {/* PERT calculator */}
      <Section
        eyebrow="Formula"
        title="PERT three-point estimate"
        lede="The 'most likely' estimate is weighted 4×, then the whole sum divided by 6."
      >
        <PERTCalculator />
      </Section>

      {/* Contingency */}
      <Section
        eyebrow="Reserves"
        title="Contingency reserves"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
            <div className="text-white font-medium mb-1">Schedule buffers</div>
            <div className="text-sm text-ink-400">Account for schedule uncertainty up front, before it bites.</div>
          </div>
          <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
            <div className="text-white font-medium mb-1">Two formats</div>
            <div className="text-sm text-ink-400">% of estimated duration, or a fixed number of work periods.</div>
          </div>
          <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
            <div className="text-white font-medium mb-1">Living number</div>
            <div className="text-sm text-ink-400">Can be used, reduced, or eliminated as you learn more.</div>
          </div>
        </div>
      </Section>

      {/* Schedule tools */}
      <Section
        eyebrow="Tools"
        title="Schedule Network Analysis"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {[
            { title: "Critical Path Method", body: "Longest path → project duration." },
            { title: "Critical Chain Method", body: "Resource-aware, uses buffers." },
            { title: "Resource leveling", body: "Even out resource demand." },
            { title: "What-if analysis", body: "Test alternative scenarios." },
            { title: "Scheduling tools", body: "Software support for everything above." },
          ].map((t) => (
            <div key={t.title} className="rounded-xl border border-ink-800 bg-ink-900/40 p-4">
              <div className="text-white font-medium text-sm mb-1">{t.title}</div>
              <div className="text-xs text-ink-400 leading-snug">{t.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CPM intro → link to Part B */}
      <Section
        eyebrow="Coming next"
        title="Critical Path Method"
        lede="The longest path through the network defines how long the project takes. Any delay on a critical-path activity delays everything."
      >
        <Link
          href="/lessons/week3b-critical-path-method-worked-examples"
          className="group block rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[.07] to-transparent p-6 hover:border-amber-400/40 transition-colors"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-amber-300/80 font-medium mb-1">Continue to Part B</div>
              <div className="text-white font-semibold text-lg">Three interactive worked examples</div>
              <div className="text-sm text-ink-400 mt-1">Forward pass, backward pass, and the critical-path reveal.</div>
            </div>
            <span className="text-amber-300 group-hover:translate-x-0.5 transition-transform text-xl">→</span>
          </div>
        </Link>
      </Section>
    </div>
  );
}

function Pill({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5 flex flex-col">
      <div className="text-white font-semibold text-lg">{title}</div>
      <div className="text-sm text-ink-400 mt-1">{caption}</div>
    </div>
  );
}

function DefBox({ term, subtitle, body, accent }: { term: string; subtitle: string; body: string; accent: "slate" | "emerald" | "amber" }) {
  const palette = {
    slate: { ring: "border-ink-700", tag: "text-ink-200" },
    emerald: { ring: "border-emerald-400/30", tag: "text-emerald-200" },
    amber: { ring: "border-amber-400/30", tag: "text-amber-200" },
  }[accent];
  return (
    <div className={["rounded-2xl border bg-ink-900/40 p-5", palette.ring].join(" ")}>
      <div className={["text-[11px] uppercase tracking-wider font-medium mb-1", palette.tag].join(" ")}>{subtitle}</div>
      <div className="font-mono text-3xl text-white tracking-tight mb-2">{term}</div>
      <div className="text-sm text-ink-300 leading-relaxed">{body}</div>
    </div>
  );
}

function MethodCard({ title, body, example }: { title: string; body: string; example?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
      <div className="text-white font-semibold mb-2">{title}</div>
      <p className="text-sm text-ink-300 leading-relaxed">{body}</p>
      {example && (
        <div className="mt-3 rounded-md border border-ink-800 bg-ink-950 px-3 py-2 text-xs font-mono text-ink-200">
          {example}
        </div>
      )}
    </div>
  );
}

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" className="mt-0.5 shrink-0 text-emerald-400">
      <path d="M5 10.5 L8.5 14 L15 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
