import { Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

const ShareButtons = ({ question }: { question: string }) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!", {
        style: { background: '#1c1c1c', color: '#f5f0e6', border: '1px solid #1A5F3A' }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-beige-100/70 font-semibold">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(question)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-beige-100/70 hover:text-gold-500 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-6 w-6" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-beige-100/70 hover:text-gold-500 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-6 w-6" />
      </a>
      <button onClick={copyLink} className="text-beige-100/70 hover:text-gold-500 transition-colors" aria-label="Copy link">
        <LinkIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ShareButtons;
