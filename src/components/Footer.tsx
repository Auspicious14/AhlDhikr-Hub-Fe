import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold font-heading text-emerald-600">AhlDhikr Hub</h3>
            <p className="mt-2 text-gray-500">Answers from Quran & Sahih Hadith.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/ask" className="text-gray-500 hover:text-emerald-600">Ask a Question</Link></li>
              <li><Link href="/my-dhikr" className="text-gray-500 hover:text-emerald-600">My Dhikr</Link></li>
              <li><Link href="/about" className="text-gray-500 hover:text-emerald-600">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-gray-500 hover:text-emerald-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-500 hover:text-emerald-600">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Connect</h4>
            <div className="mt-4 flex space-x-4">
              {/* Social media links here */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AhlDhikr Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
