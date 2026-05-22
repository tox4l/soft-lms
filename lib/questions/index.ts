import type { MCQ } from "./types";
import { week1 } from "./week1";
import { week2_1 } from "./week2-1";
import { week2_2 } from "./week2-2";
import { week3a } from "./week3a";
import { week3b } from "./week3b";

export type QuizMeta = {
  slug: string;
  lessonSlug: string;
  week: string;
  title: string;
  questions: MCQ[];
};

export const quizzes: QuizMeta[] = [
  {
    slug: "week1",
    lessonSlug: "week1-introduction-to-spm",
    week: "Week 1",
    title: "Introduction to Software Project Management",
    questions: week1,
  },
  {
    slug: "week2-lecture1",
    lessonSlug: "week2-lecture1-waterfall-agile-scrum",
    week: "Week 2 · Lecture 1",
    title: "Waterfall, Agile & Scrum",
    questions: week2_1,
  },
  {
    slug: "week2-lecture2",
    lessonSlug: "week2-lecture2-wbs-scope-kanban-xp",
    week: "Week 2 · Lecture 2",
    title: "WBS, Scope, Kanban & XP",
    questions: week2_2,
  },
  {
    slug: "week3a",
    lessonSlug: "week3a-planning-and-estimation",
    week: "Week 3 · Part A",
    title: "Planning & Estimation",
    questions: week3a,
  },
  {
    slug: "week3b",
    lessonSlug: "week3b-critical-path-method-worked-examples",
    week: "Week 3 · Part B",
    title: "Critical Path Method — Worked Examples",
    questions: week3b,
  },
];

export function getQuizBySlug(slug: string): QuizMeta | undefined {
  return quizzes.find((q) => q.slug === slug);
}

export function getQuizByLesson(lessonSlug: string): QuizMeta | undefined {
  return quizzes.find((q) => q.lessonSlug === lessonSlug);
}

export const totalQuestions = quizzes.reduce((sum, q) => sum + q.questions.length, 0);
