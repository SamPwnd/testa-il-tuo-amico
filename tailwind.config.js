/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*/*.html',
    './index.html', 
    './src/**/*.{js,jsx}',
    '*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
    },
  },
  plugins: [],
}

