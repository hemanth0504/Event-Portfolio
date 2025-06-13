/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Poppins: ['Poppins', 'sans-serif'],
        allura: ['Allura', 'cursive'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}