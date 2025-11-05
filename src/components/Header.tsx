import Link from 'next/link';
import { Sun, Moon, Bell, User, Menu, X } from 'lucide-react';
import { useSettings } from '@/modules/settings/context';
import { useState } from 'react';

const Header = () => {
  const { theme, setTheme } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link href="/settings" className="text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Settings
            </Link>
            <Link href="/contact" className="text-gray-500 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400">
              {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            </button>
            <button className="hidden md:block p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="h-6 w-6" />
            </button>
            <button className="hidden md:block p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <User className="h-6 w-6" />
            </button>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 rounded-full text-gray-500 dark:text-gray-300">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden pt-2 pb-4 space-y-2">
            <Link href="/ask" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 hover:bg-gray-50 dark:hover:text-emerald-400 dark:hover:bg-gray-800">
              Ask a Question
            </Link>
            <Link href="/my-dhikr" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 hover:bg-gray-50 dark:hover:text-emerald-400 dark:hover:bg-gray-800">
              My Dhikr
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 hover:bg-gray-50 dark:hover:text-emerald-400 dark:hover:bg-gray-800">
              About
            </Link>
            <Link href="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 hover:bg-gray-50 dark:hover:text-emerald-400 dark:hover:bg-gray-800">
              Settings
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 hover:bg-gray-50 dark:hover:text-emerald-400 dark:hover:bg-gray-800">
              Contact
            </Link>
             <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <button className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 hover:bg-gray-50 dark:hover:text-emerald-400 dark:hover:bg-gray-800">
                  <Bell className="h-6 w-6 mr-3" />
                  Notifications
                </button>
                <button className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 hover:bg-gray-50 dark:hover:text-emerald-400 dark:hover:bg-gray-800">
                  <User className="h-6 w-6 mr-3" />
                  Profile
                </button>
              </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
