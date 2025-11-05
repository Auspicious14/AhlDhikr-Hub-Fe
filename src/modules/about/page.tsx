import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="bg-beige min-h-screen">
      <Head>
        <title>About Us - AhlDhikr Hub</title>
        <meta name="description" content="Learn more about AhlDhikr Hub, our mission, and our team." />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-heading text-center mb-12">About AhlDhikr Hub</h1>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700">
            AhlDhikr Hub is a dedicated platform for Muslims to ask questions and get answers based on the Quran and Sahih Hadith. Our mission is to provide a reliable and accessible source of Islamic knowledge for the Ummah.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
