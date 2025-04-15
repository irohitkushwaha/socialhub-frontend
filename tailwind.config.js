/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
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