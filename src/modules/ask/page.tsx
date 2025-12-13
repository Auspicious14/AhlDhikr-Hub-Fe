import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuestionForm from "./components/QuestionForm";
// import CategoriesSidebar from './components/CategoriesSidebar';
import RecentQuestionsSidebar from "./components/RecentQuestionsSidebar";

const AskPage = () => {
  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Head>
        <title>Ask a Question - AhlDhikr Hub</title>
        <meta
          name="description"
          content="Ask any Islamic question and get answers sourced from the Quran and Sahih Hadith. Use our AI-powered search to find the guidance you seek."
        />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <h1 className="text-4xl font-bold font-heading text-beige-100 mb-8">
              Ask a Question
            </h1>
            <QuestionForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-10">
              {/* <CategoriesSidebar /> */}
              <RecentQuestionsSidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AskPage;
