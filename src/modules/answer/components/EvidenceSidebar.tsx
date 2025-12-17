import React, { useState } from "react";
import {
  BookCheck,
  ChevronUp,
  Eye,
  ExternalLink,
  Volume2,
  X,
  ChevronDown,
} from "lucide-react";
import { Source } from "../model";
import { Disclosure, Transition } from "@headlessui/react";
import { Button } from "@/components/Button";

const EvidenceSidebar = ({ sources }: { sources: Source[] }) => {
  const [showAllSources, setShowAllSources] = useState(false);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedSources = showAllSources ? sources : sources.slice(0, 3);
  const hasMoreSources = sources.length > 3;

  const handleSourceClick = (source: Source) => {
    setSelectedSource(source);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSource(null);
  };

  return (
    <div className="sticky top-28">
      {/* Desktop View */}
      <div className="hidden lg:block bg-emerald-500/5 border border-emerald-500/20 rounded-card p-6">
        <h2 className="flex items-center text-2xl font-bold font-heading text-gold-500 mb-6">
          <BookCheck className="mr-3 h-6 w-6" />
          Cited Sources
        </h2>
        <div className="space-y-4">
          {displayedSources.map((source, index) => (
            <div
              key={index}
              className="bg-brand-dark/50 border border-emerald-500/20 p-4 rounded-lg group hover:border-gold-500/40 transition-all duration-200 cursor-pointer"
              onClick={() => handleSourceClick(source)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-beige-100 hover:text-gold-500 transition-colors line-clamp-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {source.citation}
                    </a>
                  </div>
                  <p className="mt-1 text-sm text-beige-100/60 ml-8">
                    {source.type}
                  </p>
                  {source.text && (
                    <p className="mt-2 text-sm text-beige-100/80 leading-relaxed line-clamp-3 ml-8">
                      {source.text}
                    </p>
                  )}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-beige-100/60 hover:text-gold-500 hover:bg-gold-500/10 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSourceClick(source);
                    }}
                    title="Preview source"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

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
      </div>

      {/* Mobile View (Collapsible) */}
      <div className="lg:hidden w-full mx-auto">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-left text-xl font-bold font-heading text-gold-500 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 focus:outline-none focus-visible:ring focus-visible:ring-gold-500 focus-visible:ring-opacity-75">
                <div className="flex items-center">
                  <BookCheck className="mr-3 h-6 w-6" />
                  <span>Cited Sources & Evidence</span>
                </div>
                <ChevronUp
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-6 h-6 text-gold-500 transition-transform duration-300`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-emerald-500/5 rounded-b-lg">
                  <div className="space-y-4">
                    {displayedSources.map((source, index) => (
                      <div
                        key={index}
                        className="bg-brand-dark/50 border border-emerald-500/20 p-4 rounded-lg group hover:border-gold-500/40 transition-all duration-200 cursor-pointer"
                        onClick={() => handleSourceClick(source)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-beige-100 hover:text-gold-500 transition-colors text-sm line-clamp-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {source.citation}
                              </a>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 text-beige-100/60 hover:text-gold-500 hover:bg-gold-500/10 rounded flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSourceClick(source);
                                }}
                                title="Preview source"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-beige-100/60">
                              {source.type}
                            </p>
                            {source.text && (
                              <p className="text-sm text-beige-100/80 leading-relaxed line-clamp-3">
                                {source.text}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

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
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>

      {/* Source Preview Modal */}
      {selectedSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-brand-dark border border-emerald-500/30 rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gold-500">
                [{selectedSource.type}] {selectedSource.citation}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="text-beige-100 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {selectedSource.arabic && (
                <div className="bg-emerald-500/10 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                    Arabic Text
                  </h4>
                  <p className="text-right text-xl leading-relaxed text-beige-100 font-arabic">
                    {selectedSource.arabic}
                  </p>
                </div>
              )}

              {selectedSource.transliteration && (
                <div className="bg-emerald-500/10 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                    Transliteration
                  </h4>
                  <p className="text-beige-100/90 italic">
                    {selectedSource.transliteration}
                  </p>
                </div>
              )}

              <div className="bg-emerald-500/10 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                  Translation
                </h4>
                <p className="text-beige-100 leading-relaxed">
                  {selectedSource.text}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-emerald-500/20">
                <div className="flex gap-2">
                  {selectedSource.url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedSource.url, "_blank")}
                      className="text-xs"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      View Source
                    </Button>
                  )}
                  {selectedSource.audioUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(selectedSource.audioUrl, "_blank")
                      }
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
      )}
    </div>
  );
};

export default EvidenceSidebar;
