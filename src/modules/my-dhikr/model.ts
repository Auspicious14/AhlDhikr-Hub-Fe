export interface SavedAnswer {
  slug: string; // A unique identifier for the question
  question: string;
  answerSnippet: string;
  source: string;
  category: string;
}
