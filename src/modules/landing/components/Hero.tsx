import Link from 'next/link';
import { Button } from '@/components/Button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-emerald-50 via-beige to-beige py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-heading text-emerald-800">
          Guidance from Quran & Sunnah
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          AhlDhikr Hub provides answers to your Islamic questions, sourced directly from the Quran and authentic Hadith.
        </p>
        <div className="mt-8">
          <Link href="/ask">
            <Button size="lg">Ask Your Question</Button>
          </Link>
        </div>
        <div className="mt-12 flex justify-center space-x-8 text-sm text-gray-500">
          <span>Authentic Sources</span>
          <span>Verified Answers</span>
          <span>Community Trusted</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
