import Link from 'next/link';
import { Clock } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RecentQuestionLink = ({ question, slug }: { question: string; slug: string }) => (
  <Link href={`/ask/${slug}`} className="block py-3 px-4 rounded-lg text-beige-100/80 hover:bg-emerald-500/10 transition-colors duration-300">
    {question}
  </Link>
);

const RecentQuestionsSidebar = () => {
  const { data: recentQuestions, error } = useSWR('/api/recent-questions', fetcher);

  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-6">
      <h2 className="flex items-center text-2xl font-bold font-heading text-gold-500 mb-6">
        <Clock className="mr-3 h-6 w-6" />
        Recent Questions
      </h2>
      <div className="space-y-2">
        {error && <p className="text-red-500">Failed to load recent questions.</p>}
        {!recentQuestions && !error && <p className="text-beige-100/70">Loading...</p>}
        {recentQuestions && recentQuestions.length > 0 ? (
          recentQuestions.map((q: { slug: string; question: string }) => (
            <RecentQuestionLink key={q.slug} question={q.question} slug={q.slug} />
          ))
        ) : (
          <p className="text-beige-100/70">No recent questions to display.</p>
        )}
      </div>
    </div>
  );
};

export default RecentQuestionsSidebar;
