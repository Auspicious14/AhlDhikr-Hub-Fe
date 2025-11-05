import { ShieldCheck, BookOpen, BrainCircuit, Users } from 'lucide-react';

const TrustPillars = () => {
  return (
    <section className="py-20 bg-beige">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-heading">Why Trust AhlDhikr Hub?</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white rounded-full shadow">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-heading">Authentic Sources</h3>
            <p className="mt-2 text-gray-600">All answers are derived from the Holy Quran and Sahih (authentic) Hadith collections.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white rounded-full shadow">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-heading">Verifiable Citations</h3>
            <p className="mt-2 text-gray-600">Every answer includes precise source citations, so you can verify the information yourself.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white rounded-full shadow">
                <BrainCircuit className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-heading">Advanced AI</h3>
            <p className="mt-2 text-gray-600">We use state-of-the-art AI to ensure accuracy and relevance in our search results.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white rounded-full shadow">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold font-heading">Community Reviewed</h3>
            <p className="mt-2 text-gray-600">Our content is reviewed by a team of knowledgeable individuals to maintain quality and correctness.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustPillars;
