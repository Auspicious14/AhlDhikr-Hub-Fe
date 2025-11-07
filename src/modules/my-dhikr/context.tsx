import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { SavedAnswer } from './model';
import { getJsonCookie, setJsonCookie } from '@/lib/cookies';

interface MyDhikrContextType {
  savedAnswers: SavedAnswer[];
  saveAnswer: (answer: SavedAnswer) => void;
  removeAnswer: (slug: string) => void;
  isSaved: (slug: string) => boolean;
}

const MY_DHIKR_COOKIE = 'myDhikr';
const MyDhikrContext = createContext<MyDhikrContextType | undefined>(undefined);

export const MyDhikrProvider = ({ children }: { children: ReactNode }) => {
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>([]);

  // Load saved answers from cookie on initial render
  useEffect(() => {
    const loadedAnswers = getJsonCookie<SavedAnswer[]>(MY_DHIKR_COOKIE);
    if (loadedAnswers) {
      setSavedAnswers(loadedAnswers);
    }
  }, []);

  // Update cookie whenever savedAnswers changes
  useEffect(() => {
    setJsonCookie(MY_DHIKR_COOKIE, savedAnswers, { expires: 365 }); // Expires in 1 year
  }, [savedAnswers]);

  const saveAnswer = (answer: SavedAnswer) => {
    setSavedAnswers(prev => {
      // Avoid duplicates
      if (prev.some(a => a.slug === answer.slug)) {
        return prev;
      }
      return [...prev, answer];
    });
  };

  const removeAnswer = (slug: string) => {
    setSavedAnswers(prev => prev.filter(a => a.slug !== slug));
  };

  const isSaved = (slug: string) => {
    return savedAnswers.some(a => a.slug === slug);
  };

  return (
    <MyDhikrContext.Provider value={{ savedAnswers, saveAnswer, removeAnswer, isSaved }}>
      {children}
    </MyDhikrContext.Provider>
  );
};

export const useMyDhikr = () => {
  const context = useContext(MyDhikrContext);
  if (context === undefined) {
    throw new Error('useMyDhikr must be used within a MyDhikrProvider');
  }
  return context;
};
