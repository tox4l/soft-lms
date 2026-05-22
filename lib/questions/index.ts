import type { AnyQ, MCQ } from "./types";
import { week1 } from "./week1";
import { week2_1 } from "./week2-1";
import { week2_2 } from "./week2-2";
import { week3a } from "./week3a";
import { week3b } from "./week3b";
import {
  multi_week1, multi_week2_1, multi_week2_2, multi_week3a, multi_week3b,
  fill_week1, fill_week2_1, fill_week2_2, fill_week3a, fill_week3b,
} from "./extra";
import {
  exam_week1, exam_week2_1, exam_week2_2, exam_week3a, exam_week3b,
} from "./exams";

export type QuizMeta = {
  slug: string;
  lessonSlug: string;
  week: string;
  title: string;
  kind: "practice" | "exam";
  questions: AnyQ[];
};

function asAny(arr: MCQ[]): AnyQ[] {
  return arr as unknown as AnyQ[];
}

export const quizzes: QuizMeta[] = [
  // ---- Practice quizzes (mixed: MCQ + fill + multi) ----
  {
    slug: "week1",
    lessonSlug: "week1-introduction-to-spm",
    week: "Week 1",
    title: "Introduction to Software Project Management",
    kind: "practice",
    questions: [...asAny(week1), ...fill_week1, ...multi_week1],
  },
  {
    slug: "week2-lecture1",
    lessonSlug: "week2-lecture1-waterfall-agile-scrum",
    week: "Week 2 · Lecture 1",
    title: "Waterfall, Agile & Scrum",
    kind: "practice",
    questions: [...asAny(week2_1), ...fill_week2_1, ...multi_week2_1],
  },
  {
    slug: "week2-lecture2",
    lessonSlug: "week2-lecture2-wbs-scope-kanban-xp",
    week: "Week 2 · Lecture 2",
    title: "WBS, Scope, Kanban & XP",
    kind: "practice",
    questions: [...asAny(week2_2), ...fill_week2_2, ...multi_week2_2],
  },
  {
    slug: "week3a",
    lessonSlug: "week3a-planning-and-estimation",
    week: "Week 3 · Part A",
    title: "Planning & Estimation",
    kind: "practice",
    questions: [...asAny(week3a), ...fill_week3a, ...multi_week3a],
  },
  {
    slug: "week3b",
    lessonSlug: "week3b-critical-path-method-worked-examples",
    week: "Week 3 · Part B",
    title: "Critical Path Method — Worked Examples",
    kind: "practice",
    questions: [...asAny(week3b), ...fill_week3b, ...multi_week3b],
  },

  // ---- Module exams (recall, mixed types) ----
  {
    slug: "exam-week1",
    lessonSlug: "week1-introduction-to-spm",
    week: "Week 1",
    title: "Module Exam — Week 1",
    kind: "exam",
    questions: exam_week1,
  },
  {
    slug: "exam-week2-lecture1",
    lessonSlug: "week2-lecture1-waterfall-agile-scrum",
    week: "Week 2 · Lecture 1",
    title: "Module Exam — Week 2 Lecture 1",
    kind: "exam",
    questions: exam_week2_1,
  },
  {
    slug: "exam-week2-lecture2",
    lessonSlug: "week2-lecture2-wbs-scope-kanban-xp",
    week: "Week 2 · Lecture 2",
    title: "Module Exam — Week 2 Lecture 2",
    kind: "exam",
    questions: exam_week2_2,
  },
  {
    slug: "exam-week3a",
    lessonSlug: "week3a-planning-and-estimation",
    week: "Week 3 · Part A",
    title: "Module Exam — Week 3 Part A",
    kind: "exam",
    questions: exam_week3a,
  },
  {
    slug: "exam-week3b",
    lessonSlug: "week3b-critical-path-method-worked-examples",
    week: "Week 3 · Part B",
    title: "Module Exam — Week 3 Part B",
    kind: "exam",
    questions: exam_week3b,
  },
];

export function getQuizBySlug(slug: string): QuizMeta | undefined {
  return quizzes.find((q) => q.slug === slug);
}

export function getQuizByLesson(lessonSlug: string): QuizMeta | undefined {
  return quizzes.find((q) => q.lessonSlug === lessonSlug && q.kind === "practice");
}

export function getExamByLesson(lessonSlug: string): QuizMeta | undefined {
  return quizzes.find((q) => q.lessonSlug === lessonSlug && q.kind === "exam");
}

export const totalQuestions = quizzes
  .filter((q) => q.kind === "practice")
  .reduce((sum, q) => sum + q.questions.length, 0);
