import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        gold: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#d4a017",
          600: "#b45309",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      fontFamily: {
        arabic: ["var(--font-ibm-plex-arabic)", "Tahoma", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        card: "0 4px 16px -4px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        elevated: "0 12px 40px -12px rgb(0 0 0 / 0.12), 0 4px 12px -4px rgb(0 0 0 / 0.06)",
        glow: "0 0 24px -4px hsl(173 70% 40% / 0.35)",
        "glow-gold": "0 0 24px -4px hsl(43 74% 49% / 0.35)",
      },
      backgroundImage: {
        mesh: "radial-gradient(at 40% 20%, hsl(173 60% 40% / 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(200 50% 30% / 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(43 60% 50% / 0.04) 0px, transparent 50%)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
