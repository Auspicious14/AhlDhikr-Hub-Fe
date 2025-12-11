export interface Source {
  citation: string;
  type: string;
  text: string; // The actual verse or hadith text
  url: string;
  arabic: string;
  transliteration: string;
  audioUrl: string;
}

export interface Answer {
  _id?: string;
  question: string;
  slug: string;
  answer: string;
  answerSnippet: string;
  source: string;
  category: string;
  sources: Source[];
  createdAt?: string;
  updatedAt?: string;
}
