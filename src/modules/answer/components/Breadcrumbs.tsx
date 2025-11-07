import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ question }: { question: string }) => {
  return (
    <nav className="flex items-center text-sm text-beige-100/60" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="hover:text-gold-500">
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            <Link href="/ask" className="ml-1 hover:text-gold-500 md:ml-2">
              Ask
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            <span className="ml-1 text-gold-500 md:ml-2 truncate max-w-xs">{question}</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
