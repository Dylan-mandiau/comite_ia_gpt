import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(214 32% 91%)',
        input: 'hsl(214 32% 91%)',
        ring: 'hsl(217 91% 60%)',
        background: 'hsl(210 40% 98%)',
        foreground: 'hsl(222 47% 11%)',
        primary: { DEFAULT: 'hsl(217 91% 60%)', foreground: 'hsl(210 40% 98%)' },
        secondary: { DEFAULT: 'hsl(210 40% 96%)', foreground: 'hsl(222 47% 11%)' },
        muted: { DEFAULT: 'hsl(210 40% 96%)', foreground: 'hsl(215 16% 47%)' },
        card: { DEFAULT: 'hsl(0 0% 100%)', foreground: 'hsl(222 47% 11%)' }
      }
    }
  },
  plugins: []
};
export default config;
