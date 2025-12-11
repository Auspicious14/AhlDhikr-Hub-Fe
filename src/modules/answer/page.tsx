import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import ShareButtons from "./components/ShareButtons";
import EvidenceSidebar from "./components/EvidenceSidebar";
import { toast } from "sonner";
import { Bookmark, Check } from "lucide-react";
import { Button } from "@/components/Button";
import { useMyDhikr } from "../my-dhikr/context";
import { SavedAnswer } from "../my-dhikr/model";
import { Answer } from "./model";

interface AnswerPageProps {
  answer: Answer;
}

const AnswerPage = ({ answer }: AnswerPageProps) => {
  const router = useRouter();
  const { saveAnswer, removeAnswer, isSaved } = useMyDhikr();

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
      toast.error("Removed from My Dhikr.", {
        style: {
          background: "#1c1c1c",
          color: "#f5f0e6",
          border: "1px solid #D4AF37",
        },
      });
    } else {
      saveAnswer(answerToSave);
      toast.success("Saved to My Dhikr!", {
        style: {
          background: "#1c1c1c",
          color: "#f5f0e6",
          border: "1px solid #1A5F3A",
        },
      });
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen">
      <Head>
        <title>{answer.question} - AhlDhikr Hub</title>
        <meta
          name="description"
          content={`The answer to the question: ${answer.question}, with sources from the Quran and Sunnah.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: answer.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: answer.answer.replace(/<[^>]*>?/gm, ""),
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <Breadcrumbs question={answer.question} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Answer Content */}
          <div className="lg:col-span-8 bg-emerald-500/5 border border-emerald-500/20 rounded-card p-8">
            <h1 className="text-3xl lg:text-4xl font-bold font-heading text-beige-100 mb-6">
              {answer.question}
            </h1>
            <div
              className="prose prose-invert max-w-none text-beige-100/80 prose-p:text-lg prose-p:leading-relaxed prose-blockquote:border-l-gold-500 prose-strong:text-gold-500"
              dangerouslySetInnerHTML={{ __html: answer.answer }}
            />
            <hr className="my-8 border-emerald-500/20" />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <Button
                onClick={handleSaveToggle}
                variant={alreadySaved ? "secondary" : "default"}
                size="lg"
              >
                {alreadySaved ? (
                  <Check className="mr-2 h-5 w-5" />
                ) : (
                  <Bookmark className="mr-2 h-5 w-5" />
                )}
                {alreadySaved ? "Saved to My Dhikr" : "Save to My Dhikr"}
              </Button>
              <ShareButtons question={answer.question} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <EvidenceSidebar sources={answer.sources} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnswerPage;
