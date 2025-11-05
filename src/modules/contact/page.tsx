import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/Button';

const ContactPage = () => {
  return (
    <div className="bg-beige min-h-screen">
      <Head>
        <title>Contact Us - AhlDhikr Hub</title>
        <meta name="description" content="Get in touch with the AhlDhikr Hub team." />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-heading text-center mb-12">Contact Us</h1>
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
              <textarea id="message" rows={5} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
