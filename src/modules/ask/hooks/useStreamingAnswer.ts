import { Source } from "@/modules/answer/model";
import axios from "axios";
import { useState, useCallback, useRef } from "react";

interface StreamEvent {
  type:
    | "connected"
    | "thinking"
    | "sources"
    | "answer-chunk"
    | "done"
    | "error";
  data: any;
}

interface UseStreamingAnswerReturn {
  askQuestion: (question: string) => Promise<void>;
  isThinking: boolean;
  isStreaming: boolean;
  sources: Source[];
  answer: string;
  error: string | null;
  slug: string | null;
  reset: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useStreamingAnswer = (): UseStreamingAnswerReturn => {
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const reset = useCallback(() => {
    setIsThinking(false);
    setIsStreaming(false);
    setSources([]);
    setAnswer("");
    setError(null);
    setSlug(null);

    // Close any existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  const handleEvent = (event: StreamEvent) => {
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
        console.log("Streaming complete:", event.data);
        break;

      case "error":
        setError(event.data.message || "An error occurred");
        setIsThinking(false);
        setIsStreaming(false);
        break;
    }
  };

  const askQuestion = useCallback(
    async (question: string) => {
      reset();
      setError(null);
      setIsThinking(true); // Indicate thinking immediately

      try {
        const url = `${API_BASE_URL}/api/ask-stream`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });

        if (!response.ok || !response.body) {
          throw new Error(
            `Failed to connect to streaming service: ${
              response.statusText || response.status
            }`
          );
        }

        setIsThinking(false); // Stop thinking once stream starts
        setIsStreaming(true); // Indicate streaming is active

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
              handleEvent({ type: eventType as any, data: eventData });
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

  return {
    askQuestion,
    isThinking,
    isStreaming,
    sources,
    answer,
    error,
    slug,
    reset,
  };
};
