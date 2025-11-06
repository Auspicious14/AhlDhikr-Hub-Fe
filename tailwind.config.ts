const type = require('tailwindcss/plugin')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors from the designs
        brand: {
          primary: '#1A5F3A',      // Deep emerald green
          secondary: '#D4AF37',     // Gold accent
          light: '#F5F0E6',         // Warm beige
          dark: '#0F172A',          // Midnight blue/black
        },
        // Semantic colors
        emerald: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#1A5F3A',           // Brand primary
          600: '#166534',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        gold: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#D4AF37',           // Brand gold
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },
        beige: {
          50: '#FEFDFB',
          100: '#F5F0E6',           // Brand beige
          200: '#EDE8DD',
          300: '#E5DFD4',
          400: '#DDD7CB',
          500: '#D5CFC2',
          600: '#B8B2A5',
          700: '#9B9588',
          800: '#7E786B',
          900: '#615B4E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
        heading: ['Playfair Display', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 10px 30px -3px rgba(0, 0, 0, 0.08)',
        'strong': '0 10px 40px -5px rgba(0, 0, 0, 0.15), 0 15px 50px -8px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
