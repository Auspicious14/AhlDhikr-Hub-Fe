import Link from 'next/link';
import { Button } from '@/components/Button';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-beige">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-heading text-emerald-800">
          Have a Question?
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Seek knowledge and find clarity. Get your answers from the most authentic sources in Islam.
        </p>
        <div className="mt-8">
          <Link href="/ask">
            <Button size="lg">Ask Your Question Now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
