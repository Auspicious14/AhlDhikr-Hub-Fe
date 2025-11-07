import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { getCookie, setCookie } from '@/lib/cookies';

type Language = 'en' | 'ar';
type FontSize = number;

interface SettingsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  isMounted: boolean;
}

const LANGUAGE_COOKIE = 'language';
const FONT_SIZE_COOKIE = 'fontSize';
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<FontSize>(100);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const savedLang = getCookie(LANGUAGE_COOKIE) as Language | null;
    if (savedLang) setLanguage(savedLang);

    const savedFontSize = getCookie(FONT_SIZE_COOKIE);
    if (savedFontSize) setFontSize(Number(savedFontSize));
  }, []);

  useEffect(() => {
    if (isMounted) {
      const root = window.document.documentElement;
      root.dir = language === 'ar' ? 'rtl' : 'ltr';
      setCookie(LANGUAGE_COOKIE, language, { expires: 365 });
    }
  }, [language, isMounted]);

  useEffect(() => {
    if (isMounted) {
      const root = window.document.documentElement;
      root.style.fontSize = `${fontSize}%`;
      setCookie(FONT_SIZE_COOKIE, String(fontSize), { expires: 365 });
    }
  }, [fontSize, isMounted]);

  return (
    <SettingsContext.Provider value={{ language, setLanguage, fontSize, setFontSize, isMounted }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
