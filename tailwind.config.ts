import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        festival: {
          dark: "#09090D",
          surface: "#12121A",
          card: "#181824",
          border: "#2A2621",
          gold: {
            DEFAULT: "#FFD700",
            light: "#FFE082",
            warm: "#F5A623",
            deep: "#D4AF37",
          },
          maroon: {
            DEFAULT: "#4A0E17",
            light: "#6B1D28",
            dark: "#2E080E",
          },
          flame: "#FF7A00",
          text: {
            bright: "#FFF6E5",
            muted: "#C7B9A5",
            dim: "#7E7163",
          },
        },
      },
      fontFamily: {
        cinematic: ["Cinzel", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.95", transform: "scale(1)" },
          "25%": { opacity: "0.8", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
          "75%": { opacity: "0.85", transform: "scale(0.99)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        glow: "glow 4s ease-in-out infinite",
        flicker: "flicker 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

