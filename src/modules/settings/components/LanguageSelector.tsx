import { useSettings } from '../context';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage, isMounted } = useSettings();

  if (!isMounted) return null;

  return (
    <div className="bg-brand-dark/50 border border-emerald-500/20 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
            <h3 className="font-semibold text-beige-100">Interface Language</h3>
            <p className="text-sm text-beige-100/60">Select your preferred language.</p>
        </div>
        <div className="flex items-center space-x-2 bg-brand-dark/60 p-1 rounded-lg">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
              language === 'en' ? 'bg-gold-500 text-brand-dark' : 'text-beige-100/70 hover:bg-emerald-500/10'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${
              language === 'ar' ? 'bg-gold-500 text-brand-dark' : 'text-beige-100/70 hover:bg-emerald-500/10'
            }`}
          >
            العربية
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
