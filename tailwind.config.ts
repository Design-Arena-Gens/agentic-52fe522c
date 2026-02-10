import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        accent: "#06B6D4",
        background: "#0F172A"
      }
    }
  },
  plugins: []
};

export default config;
