/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'color-main': '#71c6dd',
        'color-main-hover': '#5698a8',
        'color-main-light': '#e1f6fb',
        'color-dark': '#3f4156',
        'color-dark-medium': '#51546e',
        'color-dark-light': '#696d97',
        'color-light': '#e5e5e5',
        'color-gray': '#8b8b8b',
        'color-light-gray': '#b2bdbd',
        'color-bg': '#2d2d39',
        'color-success': '#5dd693',
        'color-error': '#fc4b0b',
        'color-header': '#ffe391'
      },
    },
  },
  plugins: [],
}