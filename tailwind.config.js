import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      keyframes: {
        shine: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shine: "shine 2s linear infinite",
      },
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1e40af",
        },
      },
    },
  },
  plugins: [],
};
