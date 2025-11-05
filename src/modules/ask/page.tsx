import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from './components/SearchBar';
import QuestionCard from './components/QuestionCard';
import { answers } from '@/lib/mock-data'; // Import mock data

const AskPage = () => {
  // Use mock data for recent questions
  const recentQuestions = answers.map(({ question, slug }) => ({ question, slug }));

  return (
    <div className="bg-beige min-h-screen flex flex-col">
      <Head>
        <title>Ask a Question - AhlDhikr Hub</title>
        <meta name="description" content="Ask any Islamic question and get answers sourced from the Quran and Sahih Hadith. Use our AI-powered search to find the guidance you seek." />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-emerald-800">
          Seek Knowledge from Authentic Sources
        </h1>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
          Type your question below to receive an answer backed by the Quran and Sunnah.
        </p>

        <SearchBar />

        <div className="mt-16 text-left">
          <h2 className="text-2xl font-bold font-heading mb-6">Recently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentQuestions.map((q, index) => (
              <QuestionCard key={index} question={q.question} slug={q.slug} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AskPage;
