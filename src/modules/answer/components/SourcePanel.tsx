import { useState } from 'react';
import { ChevronDown, Volume2 } from 'lucide-react';
import { Source } from '../model';

interface SourcePanelProps {
  sources: Source[];
}

const SourcePanel: React.FC<SourcePanelProps> = ({ sources }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold font-heading">Sources & Citations</h2>
        <ChevronDown className={`h-6 w-6 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 bg-white p-6 rounded-lg shadow-md space-y-4">
          {sources.map((source, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <p className="font-semibold text-emerald-700">{source.citation}</p>
              <p className="font-arabic text-2xl text-right my-2">{source.arabic}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 italic">{source.transliteration}</p>
                <button className="p-2 text-gray-500 hover:text-emerald-600 rounded-full hover:bg-gray-100">
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourcePanel;
