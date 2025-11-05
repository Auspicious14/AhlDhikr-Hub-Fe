import { Card } from '@/components/Card';
import { Search, HelpCircle, BookOpenCheck } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-heading">How It Works</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-100 rounded-full">
                <HelpCircle className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-heading">1. Ask a Question</h3>
            <p className="mt-2 text-gray-600">Type any Islamic question you have into the search bar.</p>
          </Card>
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-100 rounded-full">
                <Search className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-heading">2. AI-Powered Search</h3>
            <p className="mt-2 text-gray-600">Our AI searches through the Quran and authentic Hadith to find the most relevant information.</p>
          </Card>
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-100 rounded-full">
                <BookOpenCheck className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-heading">3. Get Your Answer</h3>
            <p className="mt-2 text-gray-600">Receive a clear, concise answer with direct citations from the sources.</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
