import React, { useState } from "react";
import { Source } from "@/modules/answer/model";
import {
  BookOpen,
  Copy,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/Button";

interface SourceModalProps {
  source: Source | null;
  isOpen: boolean;
  onClose: () => void;
}

const SourceModal: React.FC<SourceModalProps> = ({
  source,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !source) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-brand-dark border border-emerald-500/30 rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gold-500">
            [{source.type}] {source.citation}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-beige-100 hover:text-white"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-4">
          {source.arabic && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                Arabic Text
              </h4>
              <p className="text-right text-xl leading-relaxed text-beige-100 font-arabic">
                {source.arabic}
              </p>
            </div>
          )}

          {source.transliteration && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                Transliteration
              </h4>
              <p className="text-beige-100/90 italic">
                {source.transliteration}
              </p>
            </div>
          )}

          <div className="bg-emerald-500/10 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">
              Translation
            </h4>
            <p className="text-beige-100 leading-relaxed">{source.text}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-emerald-500/20">
            <div className="flex gap-2">
              {source.url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(source.url, "_blank")}
                  className="text-xs"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  View Source
                </Button>
              )}
              {source.audioUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(source.audioUrl, "_blank")}
                  className="text-xs"
                >
                  <Volume2 className="mr-1 h-3 w-3" />
                  Listen
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StreamingAnswerProps {
  answer: string;
  sources: Source[];
  isStreaming: boolean;
  slug: string | null;
}

const StreamingAnswer: React.FC<StreamingAnswerProps> = ({
  answer,
  sources,
  isStreaming,
  slug,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [showAllSources, setShowAllSources] = useState(false);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const answerEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as answer streams
  React.useEffect(() => {
    if (isStreaming && answerEndRef.current) {
      answerEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [answer, isStreaming]);

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (slug) {
      const url = `${window.location.origin}/ask/${slug}`;
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const handleSourceClick = (source: Source) => {
    setSelectedSource(source);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSource(null);
  };

  if (!answer && sources.length === 0) {
    return null;
  }

  const displayedSources = showAllSources ? sources : sources.slice(0, 3);
  const hasMoreSources = sources.length > 3;

  return (
    <div className="space-y-6">
      {answer && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gold-500">Answer</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="text-xs"
              >
                {copied ? (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </>
                )}
              </Button>
              {slug && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="text-xs"
                >
                  <Share2 className="mr-1 h-3 w-3" />
                  Share
                </Button>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-beige-100 whitespace-pre-wrap leading-relaxed">
              {answer}
              {isStreaming && (
                <span className="inline-block w-2 h-4 bg-gold-500 ml-1 animate-pulse" />
              )}
            </p>
          </div>

          <div ref={answerEndRef} />
        </div>
      )}

      {sources.length > 0 && (
        <div className="bg-brand-dark/40 border border-emerald-500/20 rounded-lg p-6">
          <h3 className="flex items-center text-lg font-semibold text-gold-500 mb-4">
            <BookOpen className="mr-2 h-5 w-5" />
            Sources ({sources.length})
          </h3>
          <div className="space-y-3">
            {displayedSources.map((source, index) => (
              <div
                key={index}
                className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10 hover:border-emerald-500/30 transition-colors cursor-pointer"
                onClick={() => handleSourceClick(source)}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 space-y-2">
                    <p className="text-gold-500 font-semibold text-sm">
                      [{source.type}] {source.citation}
                    </p>
                    <p className="text-beige-100/90 leading-relaxed line-clamp-3">
                      {source.text}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <span>Click to view full text</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMoreSources && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllSources(!showAllSources)}
                className="text-xs"
              >
                {showAllSources ? (
                  <>
                    <ChevronUp className="mr-1 h-3 w-3" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-3 w-3" />
                    Show More ({sources.length - 3} more sources)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}

      <SourceModal
        source={selectedSource}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default StreamingAnswer;
