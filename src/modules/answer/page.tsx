import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import SourcePanel from './components/SourcePanel';
import ShareButtons from './components/ShareButtons';
import { Toaster, toast } from 'sonner';
import { Bookmark, Check, XCircle } from 'lucide-react';
import { Button } from '@/components/Button';
import { useMyDhikr } from '../my-dhikr/context';
import { SavedAnswer } from '../my-dhikr/model';
import { answers } from '@/lib/mock-data';

const AnswerPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { saveAnswer, removeAnswer, isSaved } = useMyDhikr();

  const answer = answers.find(a => a.slug === slug);

  if (!answer) {
    return (
      <div className="bg-beige min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
            <XCircle className="mx-auto h-16 w-16 text-gray-400" />
            <h1 className="mt-4 text-3xl font-bold font-heading">Answer Not Found</h1>
            <p className="mt-2 text-gray-600">The question you are looking for does not exist or has been moved.</p>
            <div className="mt-8">
                <Button onClick={() => router.push('/ask')}>Ask a New Question</Button>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  const alreadySaved = isSaved(answer.slug);

  const handleSaveToggle = () => {
    const answerToSave: SavedAnswer = {
        slug: answer.slug,
        question: answer.question,
        answerSnippet: answer.answerSnippet,
        source: answer.source,
        category: answer.category,
    };

    if (alreadySaved) {
        removeAnswer(answerToSave.slug);
        toast.error("Removed from My Dhikr.");
    } else {
        saveAnswer(answerToSave);
        toast.success("Saved to My Dhikr!");
    }
  };

  return (
    <div className="bg-beige min-h-screen">
      <Head>
        <title>{answer.question} - AhlDhikr Hub</title>
        <meta name="description" content={`The answer to the question: ${answer.question}, with sources from the Quran and Sunnah.`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": answer.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": answer.answer.replace(/<[^>]*>?/gm, '')
              }
            }]
          })}}
        />
      </Head>

      <Toaster position="top-center" richColors />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs question={answer.question} />
        <div className="mt-4 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold font-heading mb-6">{answer.question}</h1>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: answer.answer }} />
          <hr className="my-8" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <Button onClick={handleSaveToggle} variant={alreadySaved ? "secondary" : "default"}>
              {alreadySaved ? <Check className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
              {alreadySaved ? "Saved" : "Save to My Dhikr"}
            </Button>
            <ShareButtons question={answer.question} />
          </div>
        </div>
        <SourcePanel sources={answer.sources} />
      </main>
      <Footer />
    </div>
  );
};

export default AnswerPage;
