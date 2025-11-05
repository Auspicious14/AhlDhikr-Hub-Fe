import { Share2, Bookmark } from 'lucide-react';

interface SavedAnswerCardProps {
  question: string;
  answerSnippet: string;
  source: string;
}

const SavedAnswerCard: React.FC<SavedAnswerCardProps> = ({ question, answerSnippet, source }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold font-heading mb-2">{question}</h3>
      <p className="text-gray-600 mb-4">{answerSnippet}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{source}</span>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bookmark className="h-5 w-5 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedAnswerCard;
