import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
        <Link href={href} className="text-beige-100/70 hover:text-gold-500 transition-colors duration-300">
            {children}
        </Link>
    </li>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-beige-100/70 hover:text-gold-500 transition-colors duration-300">
        {icon}
    </a>
);

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-emerald-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3">
              <img src="/logo.svg" alt="AhlDhikr Hub Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold font-heading text-beige-100">AhlDhikr Hub</span>
            </div>
            <p className="mt-4 text-beige-100/70 max-w-sm">
              An Islamic Q&A platform where users can ask any faith-related question and get answers sourced directly from the Quran & Sahih Hadith.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg text-gold-500 font-heading">Sitemap</h4>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/ask">Ask a Question</FooterLink>
              <FooterLink href="/my-dhikr">My Dhikr</FooterLink>
              <FooterLink href="/#how-it-works">How It Works</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg text-gold-500 font-heading">Resources</h4>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-bold text-lg text-gold-500 font-heading">Connect With Us</h4>
            <p className="mt-4 text-beige-100/70">
              Follow us on our social media channels to stay updated.
            </p>
            <div className="mt-6 flex space-x-6">
                <SocialLink href="https://twitter.com" icon={<Twitter size={24} />} />
                <SocialLink href="https://facebook.com" icon={<Facebook size={24} />} />
                <SocialLink href="https://instagram.com" icon={<Instagram size={24} />} />
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-emerald-500/20 pt-8 text-center text-beige-100/60">
          <p>&copy; {new Date().getFullYear()} AhlDhikr Hub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
