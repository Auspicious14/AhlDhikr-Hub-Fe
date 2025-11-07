import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import apiClient from '@/lib/apiClient';
import { Answer } from '@/lib/mock-data';

interface AskContextType {
  isLoading: boolean;
  error: string | null;
  askQuestion: (question: string) => Promise<void>;
}

const AskContext = createContext<AskContextType | undefined>(undefined);

export const AskProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const askQuestion = async (question: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Answer>('/ask', { params: { question } });
      const { slug } = response.data;
      // Redirect to the answer page on success
      router.push(`/ask/${slug}`);
    } catch (err) {
      setError('An error occurred while fetching the answer. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AskContext.Provider value={{ isLoading, error, askQuestion }}>
      {children}
    </AskContext.Provider>
  );
};

export const useAsk = () => {
  const context = useContext(AskContext);
  if (context === undefined) {
    throw new Error('useAsk must be used within an AskProvider');
  }
  return context;
};
