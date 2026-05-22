import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        // Jet near-black neutral with cool-neutral grays
        ink: {
          50:  "#fafafa",
          100: "#e6e6ea",
          200: "#c9c9d1",
          300: "#9a9aa6",
          400: "#6f6f7a",
          500: "#4f4f59",
          600: "#37373f",
          700: "#27272c",
          800: "#18181b",
          900: "#0e0e10",
          950: "#08080a",
        },
        accent: {
          DEFAULT: "#ffffff",
          fg: "#fafafa",
        },
      },
      boxShadow: {
        "glow-sm": "0 0 24px rgba(255,255,255,0.10)",
        "glow":    "0 0 40px rgba(255,255,255,0.15)",
        "glow-lg": "0 0 64px rgba(255,255,255,0.20)",
      },
    },
  },
  plugins: [],
};

export default config;
