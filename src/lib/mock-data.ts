import { SavedAnswer } from "@/modules/my-dhikr/model";
import { Source } from "@/modules/answer/model";

export interface Answer extends SavedAnswer {
    answer: string;
    sources: Source[];
}

export const answers: Answer[] = [
    {
        question: "What is the ruling on fasting on the Day of Arafah?",
        slug: "ruling-on-fasting-day-of-arafah",
        answer: "<p>Fasting on the Day of Arafah is a highly recommended Sunnah for those who are not performing Hajj. It is an expiation for the sins of the preceding year and the coming year.</p><p>The Prophet (peace and blessings of Allah be upon him) was asked about fasting on the day of Arafah, and he said: <strong>“It expiates for the sins of the previous year and of the coming year.”</strong> [Narrated by Muslim, 1162].</p><p>This fasting is only recommended for those who are not on Hajj. As for the pilgrim, it is not Sunnah for him to fast on the Day of Arafah, because the Prophet (peace and blessings of Allah be upon him) did not fast on this day in Arafah.</p>",
        answerSnippet: "Fasting on the Day of Arafah is a highly recommended Sunnah for those not performing Hajj...",
        source: "Sahih Muslim",
        category: "Fiqh",
        sources: [
            { citation: "Sahih Muslim, 1162", type: "Hadith", url: "#", arabic: "صحيح مسلم، ١١٦٢", transliteration: "Sahih Muslim, 1162", audioUrl: "#", text: ""},
            { citation: "Qur'an 5:3", type: "Qur'an", url: "#", arabic: "الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا", transliteration: "Al-yawma akmaltu lakum deenakum wa atmamtu 'alaykum ni'matee wa radeetu lakumu al-islama deena", audioUrl: "#", text: "" }
        ]
    },
    {
        question: "The importance of the first ten days of Dhul-Hijjah",
        slug: "importance-of-dhul-hijjah",
        answer: "<p>The first ten days of Dhul-Hijjah are the best days of the year. The Prophet (peace be upon him) said: <strong>'There are no days in which righteous deeds are more beloved to Allah than these ten days.'</strong> They said: 'Not even jihad for the sake of Allah?' He said: 'Not even jihad for the sake of Allah, unless a man goes out himself with his wealth and does not bring anything back.' [Narrated by al-Bukhari, 969]</p>",
        answerSnippet: "The first ten days of Dhul-Hijjah are the best days of the year...",
        source: "Sahih al-Bukhari",
        category: "Hadith",
        sources: [
            { citation: "Sahih al-Bukhari, 969", type: "Hadith", url: "#", arabic: "صحيح البخاري، ٩٦٩", transliteration: "Sahih al-Bukhari, 969", audioUrl: "#", text:"" }
        ]
    }
];

export const categories = [
    { name: 'Fiqh', slug: 'fiqh' },
    { name: 'Hadith', slug: 'hadith' },
    { name: 'Aqeedah', slug: 'aqeedah' },
    { name: 'Tafsir', slug: 'tafsir' },
    { name: 'Seerah', slug: 'seerah' },
];
