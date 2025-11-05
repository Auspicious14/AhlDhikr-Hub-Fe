import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toggle from './components/Toggle';
import { Palette, Languages, BookCheck } from 'lucide-react';
import { useSettings } from './context'; // Use the context

const SettingsPage = () => {
  const { theme, setTheme, language, setLanguage } = useSettings();
  const [activeTab, setActiveTab] = React.useState('Display');
  const isDarkMode = theme === 'dark';
  const isArabicFirst = language === 'ar';

  const handleDarkModeToggle = (enabled: boolean) => {
    setTheme(enabled ? 'dark' : 'light');
  };

  const handleLanguageToggle = (enabled: boolean) => {
    setLanguage(enabled ? 'ar' : 'en');
  };

  const tabs = [
    { name: 'Display', icon: Palette },
    { name: 'Language', icon: Languages },
    { name: 'Sources', icon: BookCheck },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Display':
        return (
            <div>
                <h2 className="text-2xl font-bold font-heading mb-4">Display Settings</h2>
                <Toggle label="Dark Mode" enabled={isDarkMode} setEnabled={handleDarkModeToggle} />
                {/* Font size slider would go here */}
            </div>
        );
      case 'Language':
        return (
            <div>
                <h2 className="text-2xl font-bold font-heading mb-4">Language Settings</h2>
                <Toggle label="Arabic-First Answers" enabled={isArabicFirst} setEnabled={handleLanguageToggle} />
                {/* Language selection dropdown would go here */}
            </div>
        );
      case 'Sources':
         return (
            <div>
                <h2 className="text-2xl font-bold font-heading mb-4">Source Settings</h2>
                <p>Manage your preferred sources and scholars (coming soon).</p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-beige min-h-screen">
      <Head>
        <title>Settings - AhlDhikr Hub</title>
        <meta name="description" content="Customize your experience on AhlDhikr Hub. Manage display, language, and source settings." />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold font-heading text-center mb-12">Settings</h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Tabs Navigation */}
          <div className="md:col-span-1">
            <nav className="flex flex-col space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-left font-semibold transition-colors ${
                    activeTab === tab.name
                      ? 'bg-emerald-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
          {/* Content */}
          <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-md">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
