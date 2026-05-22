"use client";

import { Callout, FormulaCard, Section } from "@/components/visuals/Section";
import ProcedureStepper from "@/components/visuals/ProcedureStepper";
import ConventionToggle from "@/components/visuals/ConventionToggle";
import CPMNetwork from "@/components/visuals/CPMNetwork";
import ActivityTable from "@/components/visuals/ActivityTable";
import FloatTimeline from "@/components/visuals/FloatTimeline";
import CriticalChainBuffers from "@/components/visuals/CriticalChainBuffers";
import CompressionCompare from "@/components/visuals/CompressionCompare";
import { example1, example2, example3 } from "@/lib/cpm-examples";

export default function Week3BLesson() {
  return (
    <div className="space-y-1">
      {/* The procedure */}
      <Section
        eyebrow="The map"
        title="The CPM procedure"
        lede="Memorise the order. Every variant you'll see on an exam plugs into the same seven-step machine."
      >
        <ProcedureStepper />
      </Section>

      {/* Conventions */}
      <Section
        eyebrow="Read carefully"
        title="Two conventions appear in the slides"
        lede="Same procedure, slightly different arithmetic. Check which one the question uses before you write any numbers."
      >
        <ConventionToggle />
      </Section>

      {/* Worked Example 1 */}
      <Section
        eyebrow="Worked example 1"
        title="Eight activities, zero-indexed weeks"
        lede="Step through the diagram below — forward pass, backward pass, then critical path."
        id="ex1"
      >
        <div className="space-y-5">
          <ActivityTable
            unit="weeks"
            rows={[
              { activity: "A", duration: 7, preds: [],          critical: true },
              { activity: "B", duration: 3, preds: [] },
              { activity: "C", duration: 6, preds: ["A"],       critical: true },
              { activity: "D", duration: 3, preds: ["B"] },
              { activity: "E", duration: 3, preds: ["D", "F"] },
              { activity: "F", duration: 2, preds: ["B"] },
              { activity: "G", duration: 3, preds: ["C"],       critical: true },
              { activity: "H", duration: 2, preds: ["E", "G"],  critical: true },
            ]}
          />
          <CPMNetwork data={example1} />
          <Callout tone="success" title="Answer">
            Critical path: <span className="font-mono text-amber-200">A → C → G → H</span>. Project duration:{" "}
            <span className="font-mono text-amber-200">18 weeks</span> (7 + 6 + 3 + 2).
          </Callout>
        </div>
      </Section>

      {/* Worked Example 2 */}
      <Section
        eyebrow="Worked example 2"
        title="Ten activities, 1-indexed days"
        lede="Notice the indexing — finish day equals start + time − 1, successors start the next day."
        id="ex2"
      >
        <div className="space-y-5">
          <Callout tone="warn" title="Convention warning">
            This example uses <span className="font-mono">FINISH = START + TIME − 1</span>. A successor begins on{" "}
            <span className="font-mono">predecessor EF + 1</span>.
          </Callout>
          <ActivityTable
            unit="days"
            rows={[
              { activity: "A", duration: 12, preds: [] },
              { activity: "B", duration: 3,  preds: [],          critical: true },
              { activity: "C", duration: 14, preds: [] },
              { activity: "D", duration: 4,  preds: ["A", "B"] },
              { activity: "E", duration: 17, preds: ["B"],       critical: true },
              { activity: "F", duration: 3,  preds: ["C"] },
              { activity: "G", duration: 6,  preds: ["D"] },
              { activity: "H", duration: 2,  preds: ["D"] },
              { activity: "I", duration: 5,  preds: ["E", "F"],  critical: true },
              { activity: "J", duration: 1,  preds: ["F"] },
            ]}
          />
          <CPMNetwork data={example2} />
          <Callout tone="success" title="Answer">
            Critical path: <span className="font-mono text-amber-200">B → E → I</span>. Project duration:{" "}
            <span className="font-mono text-amber-200">25 days</span> (3 + 17 + 5).
          </Callout>
        </div>
      </Section>

      {/* Worked Example 3 */}
      <Section
        eyebrow="Worked example 3 · Exercise"
        title="Hardware/software project — 13 weeks"
        lede="The same dataset you saw in Part A slide 18. The critical path is short and surprising — recruit-staff dominates."
        id="ex3"
      >
        <div className="space-y-5">
          <ActivityTable
            unit="weeks"
            showDescription
            rows={[
              { activity: "A", duration: 6,  preds: [],         description: "Hardware selection" },
              { activity: "B", duration: 4,  preds: [],         description: "Software configuration" },
              { activity: "C", duration: 3,  preds: ["A"],      description: "Install hardware" },
              { activity: "D", duration: 4,  preds: ["B"],      description: "Data migration" },
              { activity: "E", duration: 3,  preds: ["B"],      description: "Draft office procedures" },
              { activity: "F", duration: 10, preds: [],         description: "Recruit staff", critical: true },
              { activity: "G", duration: 3,  preds: ["E", "F"], description: "User training", critical: true },
              { activity: "H", duration: 2,  preds: ["C", "D"], description: "Install and test" },
            ]}
          />
          <CPMNetwork data={example3} />
          <Callout tone="success" title="Answer">
            Critical path: <span className="font-mono text-amber-200">F → G</span>. Project duration:{" "}
            <span className="font-mono text-amber-200">13 weeks</span> (10 + 3).
          </Callout>
        </div>
      </Section>

      {/* Float deep dive */}
      <Section
        eyebrow="Float deep dive"
        title="Total float vs Free float, visually"
        lede="Same activity, two ways to measure how much slack it carries."
      >
        <FloatTimeline />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SignBox sign="+" label="Positive" body="Most common — activity has spare time." />
          <SignBox sign="0" label="Zero" body="Activity is on the critical path." />
          <SignBox sign="−" label="Negative" body="Lead time required — already behind schedule." />
        </div>
      </Section>

      {/* Formal restatement */}
      <Section
        eyebrow="Definition"
        title="Critical path, formally"
      >
        <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-6">
          <ul className="space-y-2 text-[15px] text-ink-200">
            <li className="flex gap-3"><Dot /> A path through the network with <span className="font-mono text-amber-300">no slack / float</span>.</li>
            <li className="flex gap-3"><Dot /> Defines the <span className="text-white">earliest time</span> the project can finish.</li>
            <li className="flex gap-3"><Dot /> Any delay on any critical activity <span className="text-rose-300">delays the whole project</span>.</li>
            <li className="flex gap-3"><Dot /> A network can have <span className="text-white">more than one</span> critical path if multiple paths tie for longest.</li>
          </ul>
        </div>
      </Section>

      {/* Critical chain */}
      <Section
        eyebrow="Beyond CPM"
        title="Critical Chain Method"
        lede="CPM assumes unlimited resources and pads every task. Critical Chain shares buffers and accounts for resource constraints."
      >
        <CriticalChainBuffers />
      </Section>

      {/* Resource leveling */}
      <Section
        eyebrow="Smoothing"
        title="Resource leveling"
        lede="Sometimes you can't run two activities at once because they share a person. Leveling reshuffles the schedule until resource demand fits availability — even if that means extending duration."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FactCard label="Applied to" body="A schedule already developed using CPM." />
          <FactCard label="Does what" body="Spreads resources so demand is more even over time." />
          <FactCard label="Side effect" body="May change the critical path or extend duration." />
        </div>
      </Section>

      {/* Compression */}
      <Section
        eyebrow="Shortening the schedule"
        title="Schedule compression"
        lede="Both techniques shrink the timeline without changing scope. Each pays a different price."
      >
        <CompressionCompare />
      </Section>

      {/* Baseline */}
      <Section
        eyebrow="Closing the loop"
        title="Baseline & schedule forms"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FactCard label="Schedule baseline" body="An accepted, approved schedule. Used as the yardstick for comparing planned vs actual." />
          <FactCard label="Tabular form" body="Milestone schedules: dates in a list." />
          <FactCard label="Graphical form" body="Gantt (bar chart) and network diagrams." />
        </div>
      </Section>
    </div>
  );
}

function SignBox({ sign, label, body }: { sign: string; label: string; body: string }) {
  return (
    <div className="rounded-xl border border-ink-800 bg-ink-900/40 p-4">
      <div className="flex items-center gap-3 mb-1">
        <span className="h-8 w-8 rounded-md bg-ink-800 grid place-items-center text-lg font-mono text-emerald-300">{sign}</span>
        <div className="text-white font-medium">{label}</div>
      </div>
      <div className="text-sm text-ink-400">{body}</div>
    </div>
  );
}

function FactCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
      <div className="text-[11px] uppercase tracking-wider text-ink-400 font-medium mb-1.5">{label}</div>
      <div className="text-sm text-ink-200 leading-relaxed">{body}</div>
    </div>
  );
}

function Dot() {
  return <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />;
}
