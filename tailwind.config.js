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
        'button-text': '#FFFFFF' // text-white
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'pop-up': 'pop-up 0.5s ease-in-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'pop-up': {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '50%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        }
      }
    }
  },
  plugins: []
}
