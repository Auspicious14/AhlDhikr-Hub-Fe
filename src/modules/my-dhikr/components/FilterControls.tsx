import { Search } from 'lucide-react';

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  activeCategory: string;
  onFilterChange: (category: string) => void;
}

const FilterControls = ({
  searchQuery,
  setSearchQuery,
  categories,
  activeCategory,
  onFilterChange,
}: FilterControlsProps) => {
  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gold-500 mb-2">
            Search Questions
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword..."
              className="w-full h-12 pl-12 pr-4 bg-brand-dark/50 border border-emerald-500/30 rounded-button text-beige-100 placeholder-beige-100/50 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold-500/70" />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gold-500 mb-2">
            Filter by Category
          </label>
          <select
            id="category"
            value={activeCategory}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full h-12 px-4 bg-brand-dark/50 border border-emerald-500/30 rounded-button text-beige-100 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
