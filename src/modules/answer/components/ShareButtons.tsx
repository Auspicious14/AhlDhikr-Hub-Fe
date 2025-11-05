import { Share2, Link, Twitter, Facebook } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonsProps {
    question: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ question }) => {
    const handleShare = (platform: 'link' | 'twitter' | 'facebook') => {
        const url = window.location.href;
        const text = `Check out the answer to "${question}" on AhlDhikr Hub:`;

        switch (platform) {
            case 'link':
                navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">Share:</span>
            <button onClick={() => handleShare('link')} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-emerald-600">
                <Link className="h-5 w-5" />
            </button>
            <button onClick={() => handleShare('twitter')} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-emerald-600">
                <Twitter className="h-5 w-5" />
            </button>
            <button onClick={() => handleShare('facebook')} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-emerald-600">
                <Facebook className="h-5 w-5" />
            </button>
        </div>
    );
};

export default ShareButtons;
