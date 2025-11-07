import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import FontSizeSelector from './components/FontSizeSelector';
import { Palette, Languages } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';

const SettingsCard = ({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) => (
  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-8">
    <div className="flex items-start">
      <div className="flex-shrink-0 text-gold-500 bg-emerald-500/10 p-3 rounded-lg">
        {icon}
      </div>
      <div className="ml-6">
        <h2 className="text-xl font-bold font-heading text-beige-100">{title}</h2>
        <p className="mt-1 text-beige-100/70">{description}</p>
      </div>
    </div>
    <div className="mt-6">
      {children}
    </div>
  </div>
);


const SettingsPage = () => {
  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Head>
        <title>Settings - AhlDhikr Hub</title>
        <meta name="description" content="Customize your experience on AhlDhikr Hub. Manage display, language, and source settings." />
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-beige-100">Settings</h1>
            <p className="text-lg text-beige-100/70 mt-4 max-w-2xl mx-auto">Customize your experience to your liking.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <SettingsCard
            icon={<Palette size={24} />}
            title="Appearance"
            description="Adjust the look and feel of the application."
          >
            <div className="space-y-6 pt-4">
              <DarkModeToggle />
              <FontSizeSelector />
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<Languages size={24} />}
            title="Language"
            description="Set your preferred language for the interface."
          >
             <div className="pt-4">
              <LanguageSelector />
            </div>
          </SettingsCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
