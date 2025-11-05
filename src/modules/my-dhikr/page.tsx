import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SavedAnswerCard from './components/SavedAnswerCard';
import FilterChip from './components/FilterChip';
import { Search, XCircle } from 'lucide-react';
import Head from 'next/head';
import { useMyDhikr } from './context';

const MyDhikrPage = () => {
  const { savedAnswers } = useMyDhikr();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const allCategories = Array.from(new Set(savedAnswers.map(a => a.category)));

  const toggleFilter = (category: string) => {
    setActiveFilters(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredAnswers = savedAnswers.filter(answer => {
    const searchMatch = answer.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        answer.answerSnippet.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = activeFilters.length === 0 || activeFilters.includes(answer.category);
    return searchMatch && categoryMatch;
  });

  return (
    <div className="bg-beige min-h-screen flex flex-col">
      <Head>
        <title>My Dhikr - Saved Answers - AhlDhikr Hub</title>
        <meta name="description" content="Review and manage your saved answers from AhlDhikr Hub. Filter by category or search for specific questions." />
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading">My Dhikr</h1>
            <p className="text-lg text-gray-600 mt-2">Your personal collection of saved answers.</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
            <div className="relative max-w-2xl mx-auto mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your saved answers..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-full focus:ring-emerald-500 focus:border-emerald-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex justify-center flex-wrap gap-2">
                {allCategories.map(category => (
                    <FilterChip
                        key={category}
                        label={category}
                        isActive={activeFilters.includes(category)}
                        onClick={() => toggleFilter(category)}
                    />
                ))}
            </div>
        </div>

        {/* Answers Grid */}
        {filteredAnswers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAnswers.map((item) => (
                    <SavedAnswerCard key={item.slug} question={item.question} answerSnippet={item.answerSnippet} source={item.source} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <XCircle className="mx-auto h-16 w-16 text-gray-400" />
                <h2 className="mt-4 text-2xl font-bold font-heading">No Matches Found</h2>
                <p className="mt-2 text-gray-600">
                    {savedAnswers.length === 0
                        ? "You haven't saved any answers yet. Start exploring and save answers to review them here."
                        : "Try adjusting your search or filter criteria."
                    }
                </p>
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyDhikrPage;
