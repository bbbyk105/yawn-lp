import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // ✅ ES6 importに変更

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    typography, // ✅ requireではなくimportを使用
  ],
};

export default config;
