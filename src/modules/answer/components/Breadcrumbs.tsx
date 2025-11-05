import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  question: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ question }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500">
      <Link href="/" className="hover:text-emerald-600">
        Home
      </Link>
      <ChevronRight className="h-4 w-4 mx-1" />
      <Link href="/ask" className="hover:text-emerald-600">
        Ask
      </Link>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span className="truncate w-64 md:w-auto">{question}</span>
    </nav>
  );
};

export default Breadcrumbs;
