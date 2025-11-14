import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Answer } from '@/lib/mock-data';

interface AnswerPageProps {
  data: {
    question: string;
    answer: string;
    sources: any[];
  };
}

const AnswerPage = ({ data }: AnswerPageProps) => {
  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Head>
        <title>{data.question} - AhlDhikr Hub</title>
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-heading text-beige-100 mb-8">{data.question}</h1>
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: data.answer }} />
        <h2 className="text-2xl font-bold font-heading text-beige-100 mt-12 mb-4">Sources</h2>
        <ul>
          {data.sources.map((source, index) => (
            <li key={index} className="text-beige-100">{source.citation}</li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  const question = (slug as string).replace(/-/g, ' ');

  // Fetch data from our new API endpoint
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask/${slug}`);
  const answerData = await res.json();

  if (!answerData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        question,
        ...answerData,
      },
    },
  };
};

export default AnswerPage;
