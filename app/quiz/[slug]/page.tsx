import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Quiz from "@/components/Quiz";
import { getAllLessons } from "@/lib/lessons";
import { getQuizBySlug, quizzes } from "@/lib/questions";

export function generateStaticParams() {
  return quizzes.map((q) => ({ slug: q.slug }));
}

export default function QuizPage({ params }: { params: { slug: string } }) {
  const quiz = getQuizBySlug(params.slug);
  if (!quiz) notFound();

  const lessons = getAllLessons();
  const sidebarLessons = lessons.map(({ slug, title, week, kind, order }) => ({
    slug, title, week, kind, order,
  }));

  return (
    <div className="flex">
      <Sidebar lessons={sidebarLessons} />
      <main className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <Quiz
            quizSlug={quiz.slug}
            title={quiz.title}
            week={quiz.week}
            lessonSlug={quiz.lessonSlug}
            questions={quiz.questions}
          />
        </div>
      </main>
    </div>
  );
}
