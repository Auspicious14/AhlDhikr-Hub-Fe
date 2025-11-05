const type = require('tailwindcss/plugin')
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: '#1A5F3A',
        gold: '#D4AF37',
        beige: '#F5F0E6',
        midnight: '#0F172A',
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
        heading: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
