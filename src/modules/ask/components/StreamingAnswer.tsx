import React, { useEffect, useRef } from "react";
import { ISource } from "@/lib/mock-data";
import { BookOpen, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/Button";

interface StreamingAnswerProps {
  answer: string;
  sources: ISource[];
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
  const answerEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as answer streams
  useEffect(() => {
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

  if (!answer && sources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Sources Section */}
      {sources.length > 0 && (
        <div className="bg-brand-dark/40 border border-emerald-500/20 rounded-lg p-6">
          <h3 className="flex items-center text-lg font-semibold text-gold-500 mb-4">
            <BookOpen className="mr-2 h-5 w-5" />
            Sources ({sources.length})
          </h3>
          <div className="space-y-2">
            {sources.map((source, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-beige-100/90 text-sm">
                    <span className="font-medium text-gold-500">
                      [{source.type}]
                    </span>{" "}
                    {source.citation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Answer Section */}
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
    </div>
  );
};

export default StreamingAnswer;
