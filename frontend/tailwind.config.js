/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFAF8",
        primary: "#D9A5B3",
        textMain: "#2B2B2B",
        textMuted: "#6B6B6B",
        borderLight: "#EAEAEA",
      },
      fontFamily:{
        Poppins: ['Poppins', 'sans-serif'],
        allura: ['Allura', 'cursive'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}