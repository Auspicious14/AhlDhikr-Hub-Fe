import { useTheme } from 'next-themes';
import { useSettings } from '../context';
import { Switch } from '@headlessui/react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { isMounted } = useSettings();

  if (!isMounted) return null;

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-between bg-brand-dark/50 border border-emerald-500/20 p-4 rounded-lg">
      <div>
        <h3 className="font-semibold text-beige-100">Dark Mode</h3>
        <p className="text-sm text-beige-100/60">Toggle between light and dark themes.</p>
      </div>
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        className={`${
          isDarkMode ? 'bg-gold-500' : 'bg-emerald-500/30'
        } relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300`}
      >
        <span className="sr-only">Enable dark mode</span>
        <span
          className={`${
            isDarkMode ? 'translate-x-8' : 'translate-x-1'
          } inline-block h-6 w-6 transform rounded-full bg-beige-100 transition-transform duration-300 flex items-center justify-center`}
        >
          {isDarkMode ? <Moon size={16} className="text-brand-dark" /> : <Sun size={16} className="text-brand-dark" />}
        </span>
      </Switch>
    </div>
  );
};

export default DarkModeToggle;
