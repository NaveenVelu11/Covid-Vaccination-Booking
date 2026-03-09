/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#5B67CD',
          600: '#4a57a0',
          700: '#3b4acf',
        },
      },
    },
  },
  plugins: [],
}
