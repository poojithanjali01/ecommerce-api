/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/TS files inside src
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1e40af', // Optional: custom primary color
          secondary: '#9333ea',
        },
        borderRadius: {
          '2xl': '1rem',
        },
      },
    },
    plugins: [],
  }
  