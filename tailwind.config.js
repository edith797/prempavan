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
          bg: "#F5F5DC", // Soft Beige
          text: "#2B2B2B", // Dark Grey
        },
        secondary: {
          bg: "#EDE6D6", // Light Beige
          text: "#3F3F3F", // Charcoal Grey
        },
        accent: {
          warm: "#C9B79C", // Warm Sand
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
