import Link from 'next/link';
import { Sun, Moon, Bell, User } from 'lucide-react';
import { useSettings } from '@/modules/settings/context';

const Header = () => {
  const { theme, setTheme } = useSettings();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="bg-white/80 dark:bg-midnight/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-500">AhlDhikr Hub</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/ask" className="text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Ask a Question
            </Link>
            <Link href="/my-dhikr" className="text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              My Dhikr
            </Link>
            <Link href="/about" className="text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400">
              {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            </button>
            <button className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
