import { Search, Mic, ChevronDown } from 'lucide-react';
import { Button } from '@/components/Button';
import { toast } from 'sonner';
import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a question.");
      return;
    }
    toast.success(`Searching for: "${query}" in category: ${category}`);
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center rounded-full border-2 border-gray-300 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-shadow shadow-sm dark:border-gray-700 dark:focus-within:ring-emerald-400 dark:focus-within:border-emerald-400">
        <div className="relative flex-shrink-0">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-5 pr-10 py-4 text-lg bg-transparent rounded-l-full appearance-none focus:outline-none dark:text-gray-300"
          >
            <option value="all">All Categories</option>
            <option value="quran">Quran</option>
            <option value="hadith">Hadith</option>
            <option value="fiqh">Fiqh</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <div className="h-8 border-l border-gray-300 mx-2 dark:border-gray-600"></div>
        <Search className="h-6 w-6 text-gray-400 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="E.g., What is the ruling on Zakat al-Fitr?"
          className="w-full ml-4 pr-32 py-4 text-lg bg-transparent border-none rounded-r-full focus:ring-0 dark:text-gray-200 dark:placeholder-gray-500"
          autoFocus
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
           <button type="button" className="p-2 text-gray-500 hover:text-emerald-600 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-gray-800">
             <Mic className="h-6 w-6" />
           </button>
           <Button type="submit" size="lg" className="rounded-full">
            Search
           </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
