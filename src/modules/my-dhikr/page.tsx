import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SavedAnswerCard from './components/SavedAnswerCard';
import FilterControls from './components/FilterControls';
import { XCircle, Bookmark } from 'lucide-react';
import Head from 'next/head';
import { useMyDhikr } from './context';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';

const MyDhikrPage = () => {
  const { savedAnswers } = useMyDhikr();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const router = useRouter();

  const allCategories = ['All', ...Array.from(new Set(savedAnswers.map(a => a.category)))];

  const handleFilterChange = (category: string) => {
    setActiveCategory(category === 'All' ? null : category);
  };

  const filteredAnswers = savedAnswers.filter(answer => {
    const searchMatch = answer.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        answer.answerSnippet.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = !activeCategory || answer.category === activeCategory;
    return searchMatch && categoryMatch;
  });

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Head>
        <title>My Dhikr - Saved Answers - AhlDhikr Hub</title>
        <meta name="description" content="Review and manage your saved answers from AhlDhikr Hub. Filter by category or search for specific questions." />
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-beige-100">My Dhikr</h1>
            <p className="text-lg text-beige-100/70 mt-4 max-w-2xl mx-auto">Your personal collection of saved answers for reflection and review.</p>
        </div>

        {/* Search and Filter Section */}
        {savedAnswers.length > 0 && (
          <FilterControls
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={allCategories}
            activeCategory={activeCategory || 'All'}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* Answers Grid */}
        {filteredAnswers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {filteredAnswers.map((item) => (
                    <SavedAnswerCard
                        key={item.slug}
                        slug={item.slug}
                        question={item.question}
                        answerSnippet={item.answerSnippet}
                        source={item.source}
                        category={item.category}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                {savedAnswers.length === 0 ? (
                    <>
                        <Bookmark className="mx-auto h-20 w-20 text-emerald-500/30" />
                        <h2 className="mt-6 text-3xl font-bold font-heading text-beige-100">Your Dhikr is Empty</h2>
                        <p className="mt-4 text-lg text-beige-100/60">
                            You haven't saved any answers yet. Start exploring and save answers to review them here.
                        </p>
                        <div className="mt-8">
                            <Button onClick={() => router.push('/ask')} size="lg">Ask a Question</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <XCircle className="mx-auto h-20 w-20 text-red-500/50" />
                        <h2 className="mt-6 text-3xl font-bold font-heading text-beige-100">No Matches Found</h2>
                        <p className="mt-4 text-lg text-beige-100/60">
                            Try adjusting your search or filter criteria.
                        </p>
                    </>
                )}
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyDhikrPage;
