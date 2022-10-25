/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/*.{html,js,tsx}',
      './pages/*/*.{html,js,tsx}',
      './components/*.js'
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }