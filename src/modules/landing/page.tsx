import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Head from 'next/head';

const LandingPage = () => {
  return (
    <div>
        <Head>
            <title>AhlDhikr Hub - Islamic Q&A from Quran & Sahih Hadith</title>
            <meta name="description" content="AhlDhikr Hub is an Islamic Q&A platform where users can ask any faith-related question and get answers sourced directly from the Quran & Sahih Hadith." />
            <meta property="og:title" content="AhlDhikr Hub - Islamic Q&A from Quran & Sahih Hadith" />
            <meta property="og:description" content="Find authentic answers to your Islamic questions. Our platform provides citations from the Quran and Sahih Hadith for every answer." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://ahldhikr-hub.com" />
            {/* Add og:image later */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "AhlDhikr Hub",
                  "url": "https://ahldhikr-hub.com",
                  "logo": "https://ahldhikr-hub.com/logo.png", // Replace with actual logo URL
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Customer Support",
                    "email": "support@ahldhikr-hub.com"
                  }
                })
              }}
            />
        </Head>
        <Header />
        <main>
            <Hero />
            <HowItWorks />
            <Testimonials />
            <FinalCTA />
        </main>
        <Footer />
    </div>
  );
};

export default LandingPage;
