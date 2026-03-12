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
        brand: {
          DEFAULT: "#38BDF8", // Vibrant Cyan/Sky Blue
          hover: "#0EA5E9",
          light: "#E0F2FE",
        },
        slate: {
          850: "#1e293b",
          900: "#0f172a", // Deep Slate
          950: "#020617", // Black-ish Slate
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;