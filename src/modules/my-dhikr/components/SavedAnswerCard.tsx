import Link from 'next/link';
import { BookOpen, Tag, Trash2 } from 'lucide-react';
import { useMyDhikr } from '../context';
import { toast } from 'sonner';

interface SavedAnswerCardProps {
  slug: string;
  question: string;
  answerSnippet: string;
  source: string;
  category: string;
}

const SavedAnswerCard = ({ slug, question, answerSnippet, source, category }: SavedAnswerCardProps) => {
  const { removeAnswer } = useMyDhikr();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the answer page
    removeAnswer(slug);
    toast.error("Removed from My Dhikr.", {
      style: { background: '#1c1c1c', color: '#f5f0e6', border: '1px solid #D4AF37' }
    });
  };

  return (
    <Link href={`/ask/${slug}`}>
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-6 h-full flex flex-col group hover:border-gold-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <h3 className="text-xl font-bold font-heading text-beige-100 group-hover:text-gold-500 transition-colors duration-300">
          {question}
        </h3>
        <p className="mt-3 text-beige-100/70 text-sm flex-grow">
          {answerSnippet}
        </p>
        <div className="mt-6 border-t border-emerald-500/20 pt-4 space-y-3 text-sm">
          <div className="flex items-center text-beige-100/60">
            <BookOpen className="h-4 w-4 mr-3 text-gold-500/80" />
            <span>{source}</span>
          </div>
          <div className="flex items-center text-beige-100/60">
            <Tag className="h-4 w-4 mr-3 text-gold-500/80" />
            <span>{category}</span>
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="absolute top-4 right-4 p-2 rounded-full bg-brand-dark/50 text-beige-100/60 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label="Remove from My Dhikr"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </Link>
  );
};

export default SavedAnswerCard;
