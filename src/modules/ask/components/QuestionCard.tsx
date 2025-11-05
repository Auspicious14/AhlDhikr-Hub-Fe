import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  slug: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, slug }) => {
  return (
    <Link href={`/ask/${slug}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:border-emerald-500 border border-transparent transition-all group">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-800 group-hover:text-emerald-700">{question}</p>
          <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-emerald-600 transform transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
