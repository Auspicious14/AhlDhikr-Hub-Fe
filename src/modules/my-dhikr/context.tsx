import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { SavedAnswer } from './model';

interface MyDhikrContextType {
  savedAnswers: SavedAnswer[];
  saveAnswer: (answer: SavedAnswer) => void;
  removeAnswer: (slug: string) => void;
  isSaved: (slug: string) => boolean;
}

const MyDhikrContext = createContext<MyDhikrContextType | undefined>(undefined);

export const MyDhikrProvider = ({ children }: { children: ReactNode }) => {
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>([]);

  // Load saved answers from localStorage on initial render
  useEffect(() => {
    try {
      const item = window.localStorage.getItem('myDhikr');
      if (item) {
        setSavedAnswers(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to load saved answers from localStorage", error);
    }
  }, []);

  // Update localStorage whenever savedAnswers changes
  useEffect(() => {
    try {
      window.localStorage.setItem('myDhikr', JSON.stringify(savedAnswers));
    } catch (error) {
      console.error("Failed to save answers to localStorage", error);
    }
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
