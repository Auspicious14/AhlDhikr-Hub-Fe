import { useState } from 'react';
import { BookCheck, ChevronUp } from 'lucide-react';
import { Source } from '../model';
import { Disclosure, Transition } from '@headlessui/react';

const EvidenceSidebar = ({ sources }: { sources: Source[] }) => {
  return (
    <div className="sticky top-28">
      {/* Desktop View */}
      <div className="hidden lg:block bg-emerald-500/5 border border-emerald-500/20 rounded-card p-6">
        <h2 className="flex items-center text-2xl font-bold font-heading text-gold-500 mb-6">
          <BookCheck className="mr-3 h-6 w-6" />
          Cited Sources
        </h2>
        <ul className="space-y-4">
          {sources.map((source, index) => (
            <li key={index} className="bg-brand-dark/50 border border-emerald-500/20 p-4 rounded-lg">
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-beige-100 hover:text-gold-500 transition-colors">
                {source.citation}
              </a>
              <p className="mt-1 text-sm text-beige-100/60">{source.type}</p>
            </li>
          ))}
        </ul>
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
                    open ? 'transform rotate-180' : ''
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
                  <ul className="space-y-4">
                    {sources.map((source, index) => (
                      <li key={index} className="bg-brand-dark/50 border border-emerald-500/20 p-4 rounded-lg">
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-beige-100 hover:text-gold-500 transition-colors">
                          {source.citation}
                        </a>
                        <p className="mt-1 text-sm text-beige-100/60">{source.type}</p>
                      </li>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default EvidenceSidebar;
