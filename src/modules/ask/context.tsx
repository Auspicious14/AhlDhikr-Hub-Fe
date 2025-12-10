import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { Source } from "../answer/model";

interface AskContextType {
  isThinking: boolean;
  isStreaming: boolean;
  sources: Source[];
  answer: string;
  error: string | null;
  slug: string | null;
  askQuestionStream: (question: string) => Promise<void>;
  getRecentQuestions: (limit?: number) => Promise<RecentQuestion[]>;
  reset: () => void;
}

interface RecentQuestion {
  question: string;
  slug: string;
}

const AskContext = createContext<AskContextType | undefined>(undefined);

export const AskProvider = ({ children }: { children: ReactNode }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const router = useRouter();

  const reset = useCallback(() => {
    setIsThinking(false);
    setIsStreaming(false);
    setSources([]);
    setAnswer("");
    setError(null);
    setSlug(null);
  }, []);

  const handleEvent = useCallback((event: any) => {
    switch (event.type) {
      case "connected":
        console.log("Connected to streaming service");
        break;
      case "thinking":
        setIsThinking(true);
        break;
      case "sources":
        setIsThinking(false);
        setIsStreaming(true);
        setSources(event.data.sources || []);
        break;
      case "answer-chunk":
        setAnswer((prev) => prev + event.data.chunk);
        break;
      case "done":
        setIsStreaming(false);
        setSlug(event.data.slug);
        break;
      case "error":
        setError(event.data.message || "An error occurred");
        setIsThinking(false);
        setIsStreaming(false);
        break;
    }
  }, []);

  const askQuestionStream = useCallback(
    async (question: string) => {
      reset();
      setError(null);
      setIsThinking(true);

      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;
        const url = apiClient.getUri({ url: "/ask-stream" });

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ question }),
        });

        if (response.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            toast.error("Session expired. Please login again.");
          }
          throw new Error("Session expired. Please login again.");
        }

        if (!response.ok || !response.body) {
          throw new Error(
            `Failed to connect: ${response.statusText || response.status}`
          );
        }

        setIsThinking(false);
        setIsStreaming(true);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim()) continue;
            const eventMatch = line.match(/^event: (.+)\ndata: (.+)$/);
            if (eventMatch) {
              const eventType = eventMatch[1];
              const eventData = JSON.parse(eventMatch[2]);
              handleEvent({ type: eventType, data: eventData });
            }
          }
        }
      } catch (err) {
        console.error("Streaming error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsThinking(false);
        setIsStreaming(false);
      }
    },
    [reset, handleEvent]
  );

  const getRecentQuestions = useCallback(
    async (limit: number = 5): Promise<RecentQuestion[]> => {
      try {
        const response = await apiClient.get<RecentQuestion[]>(
          "/recent-questions",
          {
            params: { limit },
          }
        );
        return response.data;
      } catch (err) {
        console.error("Error fetching recent questions:", err);
        return [];
      }
    },
    []
  );

  return (
    <AskContext.Provider
      value={{
        isThinking,
        isStreaming,
        sources,
        answer,
        error,
        slug,
        askQuestionStream,
        getRecentQuestions,
        reset,
      }}
    >
      {children}
    </AskContext.Provider>
  );
};

export const useAsk = () => {
  const context = useContext(AskContext);
  if (context === undefined) {
    throw new Error("useAsk must be used within an AskProvider");
  }
  return context;
};
