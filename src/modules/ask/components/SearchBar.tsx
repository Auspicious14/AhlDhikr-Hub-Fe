import { Search, Mic } from 'lucide-react';
import { Button } from '@/components/Button';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a question.");
      return;
    }
    toast.success(`Searching for: "${query}"`);
    // In a real app, you would navigate to the answer page or fetch results here.
    // For now, we just show a toast.
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <Toaster position="top-center" richColors />
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search className="absolute left-4 h-6 w-6 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="E.g., What is the ruling on Zakat al-Fitr?"
          className="w-full pl-14 pr-32 py-4 text-lg border-2 border-gray-300 rounded-full focus:ring-emerald-500 focus:border-emerald-500 transition"
          autoFocus
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
           <button type="button" className="p-2 text-gray-500 hover:text-emerald-600 rounded-full hover:bg-gray-100">
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
