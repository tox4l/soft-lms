import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae3',
          300: '#aeb6c5',
          400: '#7d8aa1',
          500: '#5b6987',
          600: '#46526d',
          700: '#39435a',
          800: '#21283a',
          900: '#141826',
          950: '#0b0e18',
        },
        accent: {
          DEFAULT: '#7c5cff',
          fg: '#b9a8ff',
        },
      },
      typography: () => ({}),
    },
  },
  plugins: [],
};

export default config;
