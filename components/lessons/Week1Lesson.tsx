"use client";

import { Callout, Section } from "@/components/visuals/Section";
import UncertaintySpectrum from "@/components/visuals/UncertaintySpectrum";
import FailureStats from "@/components/visuals/FailureStats";
import SoftwareTraits from "@/components/visuals/SoftwareTraits";
import SDLCFlow from "@/components/visuals/SDLCFlow";
import StakeholderMap from "@/components/visuals/StakeholderMap";
import SmartAcronym from "@/components/visuals/SmartAcronym";
import ControlLoop from "@/components/visuals/ControlLoop";
import PMTriangle from "@/components/visuals/PMTriangle";

export default function Week1Lesson() {
  return (
    <div className="space-y-1">
      {/* What is a project */}
      <Section
        eyebrow="Foundations"
        title="What is a project?"
        lede="Two course definitions you'll recite on the exam. Both compress into the same anatomy."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <Def
            num="01"
            body={
              <>
                A project is a <strong className="text-white">temporary effort</strong> to create a{" "}
                <strong className="text-white">unique</strong> product or service. Projects usually include constraints
                and risks regarding cost, schedule, or performance outcome.
              </>
            }
          />
          <Def
            num="02"
            body={
              <>
                A project is a <strong className="text-white">planned set of interrelated tasks</strong> executed over a{" "}
                <strong className="text-white">fixed period</strong> and within certain cost and other limitations.
              </>
            }
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Temporary effort", body: "Defined start and end." },
            { label: "Unique output", body: "Not mass-repetition." },
            { label: "Interrelated tasks", body: "Dependencies chain through." },
            { label: "Constraints", body: "Time, cost, quality." },
          ].map((p) => (
            <div key={p.label} className="rounded-xl border border-ink-800 bg-ink-950 p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-ink-400 mb-1 font-medium">{p.label}</div>
              <div className="text-sm text-ink-200">{p.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why PM */}
      <Section
        eyebrow="The motivation"
        title="Why project management matters"
        lede="Without it, projects fail at staggering rates — especially the big ones."
      >
        <FailureStats />
      </Section>

      {/* Jobs vs projects */}
      <Section
        eyebrow="Categorising work"
        title="Jobs vs projects vs exploration"
        lede="Projects sit in the middle of the uncertainty spectrum — between routine work and pure exploration."
      >
        <UncertaintySpectrum />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { l: "Jobs", body: "Repetition of well-defined, well-understood tasks. Very low uncertainty." },
            { l: "Projects", body: "Non-routine, planned, with a specific target. Moderate uncertainty." },
            { l: "Exploration", body: "e.g. finding a cure for cancer — outcome very uncertain." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-ink-800 bg-ink-950 p-4">
              <div className="text-white font-medium mb-1">{c.l}</div>
              <div className="text-sm text-ink-400 leading-relaxed">{c.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Software project vs others */}
      <Section
        eyebrow="What makes software different"
        title="Software vs everything else"
        lede="Mnemonic I-C-C-F. These four traits drive why software needs its own project management discipline."
      >
        <SoftwareTraits />
      </Section>

      {/* SDLC */}
      <Section
        eyebrow="Lifecycle"
        title="The software development life cycle"
        lede="ISO 12207. The order matters; the boundary between system and software requirements is an exam favourite."
      >
        <SDLCFlow />
        <Callout tone="info" title="Trap to remember">
          <span className="font-mono text-white">System requirements</span> drive architecture design.{" "}
          <span className="font-mono text-white">Software requirements</span> emerge from architecture design.{" "}
          <span className="font-mono text-white">Qualification testing</span> tests the system, not just the software.
        </Callout>
      </Section>

      {/* Phases */}
      <Section
        eyebrow="Phases"
        title="Feasibility → Planning → Execution"
        lede="Three high-level activities. Each answers a different question."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Feasibility study", question: "Is it worth doing?",
              body: "Technically feasible and worthwhile from a business view." },
            { num: "02", title: "Planning", question: "How do we do it?",
              body: "Only done if the project is feasible." },
            { num: "03", title: "Execution", question: "Do it!",
              body: "Implement the plan — but the plan may change as you go." },
          ].map((p) => (
            <div key={p.num} className="rounded-2xl border border-ink-800 bg-gradient-to-b from-ink-900/40 to-ink-950 p-5">
              <div className="text-[11px] font-mono text-ink-500 mb-3">{p.num}</div>
              <div className="text-white font-semibold mb-1">{p.title}</div>
              <div className="text-xs italic text-ink-300 mb-2">"{p.question}"</div>
              <div className="text-sm text-ink-400 leading-relaxed">{p.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stakeholders */}
      <Section
        eyebrow="People"
        title="Stakeholders"
        lede="Anyone with a stake or interest. Three concentric layers — and they rarely agree on the goal."
      >
        <StakeholderMap />
        <Callout tone="warn" title="Why this matters">
          Different stakeholders have different objectives. You must define{" "}
          <span className="text-white">common project objectives</span> to reconcile them.
        </Callout>
      </Section>

      {/* SMART objectives */}
      <Section
        eyebrow="Goal-setting"
        title="Objectives should be SMART"
        lede="Five letters, five qualities. The exam version writes them out — make sure yours are concrete and measurable."
      >
        <SmartAcronym />
      </Section>

      {/* The PM triangle */}
      <Section
        eyebrow="Trade-offs"
        title="Time, cost, quality — pick all three?"
        lede="No. The project triangle says you trade between scope, time, and cost — with quality at the centre."
      >
        <PMTriangle />
      </Section>

      {/* Management control loop */}
      <Section
        eyebrow="Control"
        title="The management control loop"
        lede="The classic data→information→decision loop. Knowing the difference between data and information is a guaranteed exam question."
      >
        <ControlLoop />
        <Callout tone="info" title="Data vs information">
          <span className="text-white font-semibold">Data</span> is raw — &quot;6,000 documents processed at location X.&quot;{" "}
          <span className="text-white font-semibold">Information</span> is data processed into something meaningful —
          &quot;productivity is 100 documents a day.&quot;
        </Callout>
      </Section>

      {/* Eight management functions */}
      <Section
        eyebrow="Functions"
        title="The eight things managers actually do"
        lede="Management is achieving goals while making the best use of resources."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {[
            { f: "Planning",     phrase: "Deciding what to do" },
            { f: "Organizing",   phrase: "Making arrangements" },
            { f: "Staffing",     phrase: "Right people for the job" },
            { f: "Directing",    phrase: "Giving instructions" },
            { f: "Controlling",  phrase: "Conformity with standards" },
            { f: "Monitoring",   phrase: "Checking progress" },
            { f: "Innovating",   phrase: "Solutions when problems emerge" },
            { f: "Representing", phrase: "Liaising with stakeholders" },
          ].map((x) => (
            <div key={x.f} className="rounded-xl border border-ink-800 bg-ink-950 p-3.5">
              <div className="text-white font-medium text-sm">{x.f}</div>
              <div className="text-[11px] italic text-ink-400 mt-0.5">&ldquo;{x.phrase}&rdquo;</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Key takeaways */}
      <Section eyebrow="The lecture's closing slide" title="Five things to remember">
        <ol className="space-y-2.5">
          {[
            "Projects are non-routine — thus uncertain.",
            "Projects have particular problems, e.g. lack of visibility.",
            "Clear objectives that can be objectively assessed are essential.",
            "Stuff happens — you can't keep precisely to plan. You need control.",
            "Communicate, communicate, communicate.",
          ].map((line, i) => (
            <li key={i} className="flex items-start gap-3 rounded-2xl border border-ink-800 bg-ink-900/40 px-5 py-3.5">
              <span className="h-6 w-6 grid place-items-center rounded-md bg-white text-ink-950 text-xs font-mono font-semibold shrink-0">
                {i + 1}
              </span>
              <span className="text-[15px] text-ink-100 leading-relaxed pt-0.5">{line}</span>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

function Def({ num, body }: { num: string; body: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-5">
      <div className="text-[11px] font-mono text-ink-500 mb-3">DEFINITION {num}</div>
      <div className="text-[15px] text-ink-200 leading-relaxed">{body}</div>
    </div>
  );
}
