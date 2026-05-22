import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import LessonView from "@/components/LessonView";
import MarkdownBody from "@/components/MarkdownBody";
import Week1Lesson from "@/components/lessons/Week1Lesson";
import Week2Lec1Lesson from "@/components/lessons/Week2Lec1Lesson";
import Week2Lec2Lesson from "@/components/lessons/Week2Lec2Lesson";
import Week3ALesson from "@/components/lessons/Week3ALesson";
import Week3BLesson from "@/components/lessons/Week3BLesson";
import { getAllLessons, getLessonBySlug } from "@/lib/lessons";
import { getQuizByLesson, getExamByLesson } from "@/lib/questions";

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ slug: l.slug }));
}

const RICH: Record<string, () => JSX.Element> = {
  "week1-introduction-to-spm": Week1Lesson,
  "week2-lecture1-waterfall-agile-scrum": Week2Lec1Lesson,
  "week2-lecture2-wbs-scope-kanban-xp": Week2Lec2Lesson,
  "week3a-planning-and-estimation": Week3ALesson,
  "week3b-critical-path-method-worked-examples": Week3BLesson,
};

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) notFound();
  const quiz = getQuizByLesson(lesson.slug);
  const exam = getExamByLesson(lesson.slug);

  const all = getAllLessons();
  const sidebarLessons = all.map(({ slug, title, week, kind, order }) => ({
    slug, title, week, kind, order,
  }));

  const sequence = all.filter((l) => l.kind === "lecture");
  const idx = sequence.findIndex((l) => l.slug === lesson.slug);
  const prev = idx > 0 ? sequence[idx - 1] : null;
  const next = idx >= 0 && idx < sequence.length - 1 ? sequence[idx + 1] : null;

  const nav = (l: typeof lesson | null) =>
    l ? { slug: l.slug, title: l.title, week: l.week } : null;

  const RichBody = RICH[lesson.slug];
  const isRich = !!RichBody;

  return (
    <div className="flex">
      <Sidebar lessons={sidebarLessons} />
      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className={["mx-auto px-5 sm:px-7 md:px-10 py-10 md:py-16", isRich ? "max-w-5xl" : "max-w-3xl"].join(" ")}>
          <LessonView
            slug={lesson.slug}
            title={lesson.title}
            subtitle={lesson.subtitle}
            week={lesson.week}
            prev={lesson.kind === "lecture" ? nav(prev) : null}
            next={lesson.kind === "lecture" ? nav(next) : nav(sequence[0])}
            quizSlug={quiz?.slug}
            quizCount={quiz?.questions.length}
            examSlug={exam?.slug}
            examCount={exam?.questions.length}
            wide={isRich}
          >
            {isRich ? <RichBody /> : <MarkdownBody raw={lesson.raw} />}
          </LessonView>
        </div>
      </main>
    </div>
  );
}
