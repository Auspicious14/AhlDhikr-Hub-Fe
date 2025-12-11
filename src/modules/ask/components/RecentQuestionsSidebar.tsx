import Link from "next/link";
import { Clock } from "lucide-react";
import { useAsk } from "../context";
import { useEffect, useState } from "react";

const RecentQuestionLink = ({
  question,
  slug,
}: {
  question: string;
  slug: string;
}) => (
  <Link
    href={`/ask/${slug}`}
    className="block py-3 px-4 rounded-lg text-beige-100/80 hover:bg-emerald-500/10 transition-colors duration-300"
  >
    {question}
  </Link>
);

const RecentQuestionsSidebar = () => {
  const { getRecentQuestions } = useAsk();
  const [questions, setQuestions] = useState<
    { question: string; slug: string }[]
  >([]);

  useEffect(() => {
    getRecentQuestions(5).then(setQuestions);
  }, [getRecentQuestions]);

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-6">
      <h2 className="flex items-center text-2xl font-bold font-heading text-gold-500 mb-6">
        <Clock className="mr-3 h-6 w-6" />
        Recent Questions
      </h2>
      <div className="space-y-2">
        {questions.length > 0 ? (
          questions.map((q) => (
            <RecentQuestionLink
              key={q.slug}
              question={q.question}
              slug={q.slug}
            />
          ))
        ) : (
          <p className="text-beige-100/60 px-4">No recent questions yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecentQuestionsSidebar;
