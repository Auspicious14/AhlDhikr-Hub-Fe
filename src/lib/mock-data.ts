import { Source } from "@/modules/answer/model";

export interface Answer {
    answer: string;
    sources: Source[];
}

export const categories = [
    { name: 'Fiqh', slug: 'fiqh' },
    { name: 'Hadith', slug: 'hadith' },
    { name: 'Aqeedah', slug: 'aqeedah' },
    { name: 'Tafsir', slug: 'tafsir' },
    { name: 'Seerah', slug: 'seerah' },
];
