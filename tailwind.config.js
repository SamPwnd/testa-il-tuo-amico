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
      colors: {
        transparent: "transparent",
        current: "currentColor",
        cream: "#FDFCDC",  
        white: "#F4F4F8",
        primary: {
          dark: '#003049',
          light: '#5590b4'
        },
        secondary: '#FDF0D5'
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
    },
  },
  plugins: [],
}

