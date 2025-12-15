import React from "react";
import { Source } from "@/modules/answer/model";
import { ExternalLink, Volume2, X } from "lucide-react";
import { Button } from "@/components/Button";

interface SourceModalProps {
  source: Source | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SourceModal: React.FC<SourceModalProps> = ({ source, isOpen, onClose }) => {
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
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {source.arabic && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">Arabic Text</h4>
              <p className="text-right text-xl leading-relaxed text-beige-100 font-arabic">
                {source.arabic}
              </p>
            </div>
          )}
          
          {source.transliteration && (
            <div className="bg-emerald-500/10 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">Transliteration</h4>
              <p className="text-beige-100/90 italic">
                {source.transliteration}
              </p>
            </div>
          )}
          
          <div className="bg-emerald-500/10 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">Translation</h4>
            <p className="text-beige-100 leading-relaxed">
              {source.text}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-emerald-500/20">
            <div className="flex gap-2">
              {source.url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(source.url, '_blank')}
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
                  onClick={() => window.open(source.audioUrl, '_blank')}
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