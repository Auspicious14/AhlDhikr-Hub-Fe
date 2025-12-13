import Link from 'next/link';
import { Sun, Moon, Menu, X, BookOpen, Settings, LogIn, LogOut, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { useAuth } from '@/modules/auth/context';

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
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
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
              <NavLink href="/ask">Ask a Question</NavLink>
              {isAuthenticated && <NavLink href="/my-dhikr">My Dhikr</NavLink>}
              <NavLink href="/settings">Settings</NavLink>
            </nav>

            <div className="flex items-center space-x-4">
              {renderThemeToggle()}
              <div className="hidden md:flex md:items-center md:space-x-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-2 text-beige-100">
                      <User className="h-5 w-5" />
                      <span className="text-sm">{user?.name || user?.email}</span>
                    </div>
                    <Button variant="ghost" onClick={logout}>
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button variant="secondary">Login</Button>
                  </Link>
                )}
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

      <div
        className={`fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-end h-20 items-center"></div>
          <nav className="flex flex-col space-y-6 pt-8">
            <MobileNavLink href="/ask" onClick={toggleMenu}>
              <BookOpen />
              <span>Ask a Question</span>
            </MobileNavLink>
            {isAuthenticated && (
              <MobileNavLink href="/my-dhikr" onClick={toggleMenu}>
                <BookOpen />
                <span>My Dhikr</span>
              </MobileNavLink>
            )}
            <MobileNavLink href="/settings" onClick={toggleMenu}>
              <Settings />
              <span>Settings</span>
            </MobileNavLink>
            <div className="border-t border-emerald-500/20 my-6"></div>
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4 py-3 px-4 text-lg text-beige-100">
                  <User />
                  <span>{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-4 py-3 px-4 text-lg text-beige-100 rounded-lg hover:bg-emerald-500/20 transition-colors duration-300 w-full text-left"
                >
                  <LogOut />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <MobileNavLink href="/auth" onClick={toggleMenu}>
                <LogIn />
                <span>Login</span>
              </MobileNavLink>
            )}
          </nav>
        </div>
      </div>
      <div className="h-20" />
    </>
  );
};

export default Header;
