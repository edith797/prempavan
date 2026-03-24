/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#020617", // Deep Navy
          text: "#f8fafc", // White/Light grey
        },
        secondary: {
          bg: "#0f172a", // Lighter Navy
          text: "#e2e8f0", // Soft blue grey
        },
        accent: {
          warm: "#1e3a8a", // Rich blue
          cyan: "#0ea5e9"  // Electric Blue
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
