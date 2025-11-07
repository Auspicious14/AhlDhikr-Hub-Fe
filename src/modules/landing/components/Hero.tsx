import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import { Search, ShieldCheck, BookCheck, Users } from 'lucide-react';
import { Button } from '@/components/Button';

const TrustBadge = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0 bg-emerald-500/10 p-3 rounded-full text-gold-500">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-lg text-beige-100">{title}</h3>
      <p className="text-sm text-beige-100/70">{subtitle}</p>
    </div>
  </div>
);

const Hero = () => {
  const router = useRouter();

  return (
    <section className="bg-brand-dark relative overflow-hidden pt-24 pb-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/geometric-pattern.svg')] opacity-5"></div>
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gold-500/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold font-heading text-beige-100 leading-tight">
          Seek Truth from Authentic Sources
        </h1>
        <p className="mt-4 text-lg md:text-xl text-beige-100/80 max-w-3xl mx-auto">
          AhlDhikr Hub is an Islamic Q&A platform where users can ask any faith-related question and get answers sourced directly from the Quran & Sahih Hadith.
        </p>

        <div className="mt-12 max-w-2xl mx-auto">
          <Formik
            initialValues={{ query: '' }}
            onSubmit={(values, { setSubmitting }) => {
              router.push(`/ask?q=${encodeURIComponent(values.query)}`);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="relative">
                <Field
                  type="text"
                  name="query"
                  placeholder="Ask any question about Islam..."
                  className="w-full h-16 pl-16 pr-40 py-4 text-lg bg-brand-dark/50 border border-emerald-500/30 rounded-button text-beige-100 placeholder-beige-100/50 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <Search className="h-6 w-6 text-gold-500" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    Ask Question
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <TrustBadge
            icon={<ShieldCheck className="h-8 w-8" />}
            title="Authentic Sources"
            subtitle="Answers are strictly from Quran & Sahih Hadith"
          />
          <TrustBadge
            icon={<BookCheck className="h-8 w-8" />}
            title="Verified Answers"
            subtitle="Citations are provided for every answer"
          />
          <TrustBadge
            icon={<Users className="h-8 w-8" />}
            title="Community Trusted"
            subtitle="Built for Muslims seeking genuine knowledge"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
