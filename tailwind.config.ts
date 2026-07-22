import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#06B6D4',
        accent: '#A855F7',
        arena: {
          bg: '#070A13',
          panel: '#10172A',
          cyan: '#36E2FF',
          violet: '#9A6CFF',
          gold: '#FFC857',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(54, 226, 255, 0.24)',
      },
    },
  },
  plugins: [],
};

export default config;
