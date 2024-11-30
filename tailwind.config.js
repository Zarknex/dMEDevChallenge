/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'navbar-bg': '#B91C1C', // bg-red-700
        'button-primary': '#EF4444', // bg-red-500
        'button-primary-hover': '#F87171', // hover:bg-red-400
        'button-border': '#7F1D1D', // border-red-800
        'button-text': '#FFFFFF', // text-white
      },
    },
  },
  plugins: [],
};
