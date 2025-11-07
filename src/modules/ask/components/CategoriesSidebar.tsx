import Link from 'next/link';
import { Tag } from 'lucide-react';
import { categories } from '@/lib/mock-data';

const CategoryLink = ({ name, slug }: { name: string; slug: string }) => (
  <Link href={`/category/${slug}`} className="block bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-beige-100 hover:bg-emerald-500/20 hover:border-gold-500/50 transition-colors duration-300">
    {name}
  </Link>
);

const CategoriesSidebar = () => {
  return (
    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-6">
      <h2 className="flex items-center text-2xl font-bold font-heading text-gold-500 mb-6">
        <Tag className="mr-3 h-6 w-6" />
        Categories
      </h2>
      <div className="space-y-4">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryLink key={category.slug} name={category.name} slug={category.slug} />
          ))
        ) : (
          <p className="text-beige-100/60">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesSidebar;
