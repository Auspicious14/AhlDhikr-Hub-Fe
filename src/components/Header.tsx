import Link from 'next/link';
import { Sun, Moon, Menu, X, Compass, BookOpen, Heart, Settings, LogIn } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-beige-100 hover:text-gold-500 transition-colors duration-300">
    {children}
  </Link>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link href={href} onClick={onClick} className="flex items-center space-x-4 py-3 px-4 text-lg text-beige-100 rounded-lg hover:bg-emerald-500/20 transition-colors duration-300">
    {children}
  </Link>
);

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderThemeToggle = () => {
    if (!mounted) return null;
    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="p-2 rounded-full text-gold-500 hover:bg-emerald-500/20 transition-colors duration-300"
      >
        {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-emerald-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3">
                <img src="/logo.svg" alt="AhlDhikr Hub Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold font-heading text-beige-100">AhlDhikr Hub</span>
              </Link>
            </div>

            <nav className="hidden md:flex md:items-center md:space-x-8">
              <NavLink href="/#how-it-works">How It Works</NavLink>
              <NavLink href="/#testimonials">Testimonials</NavLink>
              <NavLink href="/ask">Ask a Question</NavLink>
              <NavLink href="/my-dhikr">My Dhikr</NavLink>
            </nav>

            <div className="flex items-center space-x-4">
              {renderThemeToggle()}
              <div className="hidden md:block">
                <Link href="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-full text-gold-500 hover:bg-emerald-500/20"
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-end h-20 items-center">
            {/* This is a spacer to align with the header button */}
          </div>
          <nav className="flex flex-col space-y-6 pt-8">
            <MobileNavLink href="/#how-it-works" onClick={toggleMenu}>
              <Compass />
              <span>How It Works</span>
            </MobileNavLink>
            <MobileNavLink href="/#testimonials" onClick={toggleMenu}>
              <BookOpen />
              <span>Testimonials</span>
            </MobileNavLink>
            <MobileNavLink href="/ask" onClick={toggleMenu}>
              <Heart />
              <span>Ask a Question</span>
            </MobileNavLink>
            <MobileNavLink href="/my-dhikr" onClick={toggleMenu}>
              <Settings />
              <span>My Dhikr</span>
            </MobileNavLink>
            <div className="border-t border-emerald-500/20 my-6"></div>
            <MobileNavLink href="/login" onClick={toggleMenu}>
                <LogIn />
                <span>Login</span>
            </MobileNavLink>
          </nav>
        </div>
      </div>
       {/* Spacer to prevent content from being hidden behind the fixed header */}
       <div className="h-20" />
    </>
  );
};

export default Header;
