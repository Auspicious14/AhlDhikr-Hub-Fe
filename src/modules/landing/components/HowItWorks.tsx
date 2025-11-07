import { HelpCircle, Search, BookOpenCheck } from 'lucide-react';
import React from 'react';

const Step = ({ icon, title, description, stepNumber }: { icon: React.ReactNode; title: string; description: string; stepNumber: number }) => (
  <div className="relative text-center md:text-left">
    <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
      <div className="flex-shrink-0 bg-brand-dark border-2 border-emerald-500/30 w-24 h-24 rounded-full flex items-center justify-center relative z-10">
        <span className="absolute -top-3 -left-3 bg-gold-500 text-brand-dark w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl border-4 border-brand-dark">{stepNumber}</span>
        <div className="text-gold-500">{icon}</div>
      </div>
      <div className="mt-4 md:mt-0">
        <h3 className="text-2xl font-bold font-heading text-beige-100">{title}</h3>
        <p className="mt-2 text-beige-100/70 max-w-sm">{description}</p>
      </div>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-brand-dark border-t border-b border-emerald-500/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading text-beige-100">How It Works</h2>
          <p className="mt-4 text-lg text-beige-100/80 max-w-2xl mx-auto">Get answers in three simple steps.</p>
        </div>

        <div className="relative">
          {/* Dotted line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 border-t-2 border-dashed border-emerald-500/30"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <Step
              stepNumber={1}
              icon={<HelpCircle size={40} />}
              title="Ask a Question"
              description="Type any Islamic question you have into the search bar."
            />
            <Step
              stepNumber={2}
              icon={<Search size={40} />}
              title="AI-Powered Search"
              description="Our AI searches through the Quran and authentic Hadith to find the most relevant information."
            />
            <Step
              stepNumber={3}
              icon={<BookOpenCheck size={40} />}
              title="Get Your Answer"
              description="Receive a clear, concise answer with direct citations from the sources."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
