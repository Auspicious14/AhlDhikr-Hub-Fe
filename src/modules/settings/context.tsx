import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type Language = 'en' | 'ar';
type FontSize = number; // Represent font size as a number (e.g., percentage)

interface SettingsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  isMounted: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<FontSize>(100);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const savedLang = window.localStorage.getItem('language') as Language | null;
    if (savedLang) setLanguage(savedLang);

    const savedFontSize = window.localStorage.getItem('fontSize');
    if (savedFontSize) setFontSize(Number(savedFontSize));
  }, []);

  useEffect(() => {
    if (isMounted) {
      const root = window.document.documentElement;
      root.dir = language === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('language', language);
    }
  }, [language, isMounted]);

  useEffect(() => {
    if (isMounted) {
      const root = window.document.documentElement;
      root.style.fontSize = `${fontSize}%`;
      localStorage.setItem('fontSize', String(fontSize));
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
