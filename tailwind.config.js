/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        custom1380: "1380px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "bell-ring": "bellRing 0.7s ease-in-out",
      },
      keyframes: {
        bellRing: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(25deg)" },
          "20%": { transform: "rotate(-20deg)" },
          "30%": { transform: "rotate(15deg)" },
          "40%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(5deg)" },
          "60%": { transform: "rotate(-3deg)" },
          "70%, 100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "active"],
      backdropFilter: ["responsive"], // Enable backdrop-filter
    },
  },
};
