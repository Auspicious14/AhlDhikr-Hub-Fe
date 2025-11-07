import Link from 'next/link';
import { Button } from '@/components/Button';

const FinalCTA = () => {
  return (
    <section id="cta" className="relative py-20 bg-brand-dark overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('/geometric-pattern.svg')] opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold font-heading text-beige-100">
          Begin Your Journey to Clarity
        </h2>
        <p className="mt-4 text-lg text-beige-100/80 max-w-2xl mx-auto">
          Take the first step towards seeking knowledge. Get your answers from the most authentic sources in Islam.
        </p>
        <div className="mt-8">
          <Link href="/ask">
            <Button size="lg" variant="primary">Ask Your First Question</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
