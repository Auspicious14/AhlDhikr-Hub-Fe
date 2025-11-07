import Link from 'next/link';
import { Clock } from 'lucide-react';
import { answers } from '@/lib/mock-data';

const RecentQuestionLink = ({ question, slug }: { question: string; slug: string }) => (
  <Link href={`/ask/${slug}`} className="block py-3 px-4 rounded-lg text-beige-100/80 hover:bg-emerald-500/10 transition-colors duration-300">
    {question}
  </Link>
);

const RecentQuestionsSidebar = () => {
  const recentQuestions = answers.slice(0, 5); // Get the 5 most recent questions

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-6">
      <h2 className="flex items-center text-2xl font-bold font-heading text-gold-500 mb-6">
        <Clock className="mr-3 h-6 w-6" />
        Recent Questions
      </h2>
      <div className="space-y-2">
        {recentQuestions.map((q) => (
          <RecentQuestionLink key={q.slug} question={q.question} slug={q.slug} />
        ))}
      </div>
    </div>
  );
};

export default RecentQuestionsSidebar;
