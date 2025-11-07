import { useSettings } from '../context';
import { Minus, Plus, RefreshCw } from 'lucide-react';

const FONT_SIZES = [80, 90, 100, 110, 120];
const MIN_FONT_SIZE = 80;
const MAX_FONT_SIZE = 150;
const DEFAULT_FONT_SIZE = 100;

const FontSizeSelector = () => {
  const { fontSize, setFontSize, isMounted } = useSettings();

  if (!isMounted) return null;

  return (
    <div className="bg-brand-dark/50 border border-emerald-500/20 p-4 rounded-lg">
      <div className="flex items-center justify-between">
         <div>
            <h3 className="font-semibold text-beige-100">Font Size</h3>
            <p className="text-sm text-beige-100/60">Adjust the text size for better readability.</p>
        </div>
        <button
            onClick={() => setFontSize(DEFAULT_FONT_SIZE)}
            className="p-2 text-beige-100/70 hover:text-gold-500 hover:bg-emerald-500/10 rounded-full transition-colors"
            aria-label="Reset font size"
        >
            <RefreshCw size={18} />
        </button>
      </div>

      {/* Slider for Mobile */}
      <div className="md:hidden mt-4">
        <input
          type="range"
          min={MIN_FONT_SIZE}
          max={MAX_FONT_SIZE}
          step="10"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full h-2 bg-emerald-500/20 rounded-lg appearance-none cursor-pointer accent-gold-500"
        />
        <div className="flex justify-between text-xs text-beige-100/60 mt-2">
          <span>Small</span>
          <span>Default</span>
          <span>Large</span>
        </div>
      </div>

      {/* Buttons for Desktop */}
      <div className="hidden md:flex items-center justify-between mt-4 bg-brand-dark/60 p-2 rounded-lg">
        <button
          onClick={() => setFontSize(Math.max(MIN_FONT_SIZE, fontSize - 10))}
          disabled={fontSize <= MIN_FONT_SIZE}
          className="p-2 disabled:opacity-50"
        >
          <Minus className="text-beige-100/80" />
        </button>
        <div className="font-bold text-gold-500 text-lg w-20 text-center">{fontSize}%</div>
        <button
          onClick={() => setFontSize(Math.min(MAX_FONT_SIZE, fontSize + 10))}
          disabled={fontSize >= MAX_FONT_SIZE}
          className="p-2 disabled:opacity-50"
        >
          <Plus className="text-beige-100/80" />
        </button>
      </div>
    </div>
  );
};

export default FontSizeSelector;
