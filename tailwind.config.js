/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['Lobster Two', 'cursive'],
      },
      colors: {
        main: '#d1411e',
      },

      keyframes: {
        toggle: {
          from: { opacity: '0.1' },
          to: { opacity: '1' },
        },
      },

      animation: {
        toggle: 'toggle 0.5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
