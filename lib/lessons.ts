import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Lesson = {
  slug: string;
  filename: string;
  title: string;
  subtitle?: string;
  order: number;
  week: string;
  kind: "cram" | "lecture";
  raw: string;
};

const META: Record<string, { title: string; subtitle: string; week: string; kind: "cram" | "lecture"; order: number }> = {
  "00_Master_Cram_Sheet": {
    title: "Master Cram Sheet",
    subtitle: "Every formula, list, and distinction on one page",
    week: "Review",
    kind: "cram",
    order: 0,
  },
  "Week1_Introduction_to_SPM": {
    title: "Introduction to Software Project Management",
    subtitle: "Projects, stakeholders, SMART objectives, the control loop",
    week: "Week 1",
    kind: "lecture",
    order: 1,
  },
  "Week2_Lecture1_Waterfall_Agile_Scrum": {
    title: "Waterfall, Agile & Scrum",
    subtitle: "Lifecycles, the Agile Manifesto, Scrum roles & events",
    week: "Week 2 · Lecture 1",
    kind: "lecture",
    order: 2,
  },
  "Week2_Lecture2_WBS_Scope_Kanban_XP": {
    title: "WBS, Scope, Kanban & XP",
    subtitle: "Work breakdown, scope management, Kanban flow, XP practices",
    week: "Week 2 · Lecture 2",
    kind: "lecture",
    order: 3,
  },
  Week3A_Planning_and_Estimation: {
    title: "Planning & Estimation",
    subtitle: "Why we plan, Boehm's methods, PERT three-point estimation",
    week: "Week 3 · Part A",
    kind: "lecture",
    order: 4,
  },
  Week3B_Critical_Path_Method_Worked_Examples: {
    title: "Critical Path Method — Worked Examples",
    subtitle: "Forward/backward passes, float, CPM walk-throughs",
    week: "Week 3 · Part B",
    kind: "lecture",
    order: 5,
  },
};

function fileBase(name: string) {
  return name.replace(/\.md$/, "");
}

export function getAllLessons(): Lesson[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const lessons: Lesson[] = files.map((filename) => {
    const base = fileBase(filename);
    const meta = META[base] ?? { title: base, subtitle: "", week: "Other", kind: "lecture" as const, order: 99 };
    return {
      slug: base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      filename,
      title: meta.title,
      subtitle: meta.subtitle,
      week: meta.week,
      kind: meta.kind,
      order: meta.order,
      raw: fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8"),
    };
  });
  return lessons.sort((a, b) => a.order - b.order);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return getAllLessons().find((l) => l.slug === slug);
}
