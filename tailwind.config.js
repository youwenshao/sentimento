/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./SentimentoPage.jsx",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: '#0c0a09',
          surface: '#1c1917',
          border: '#292524',
          orange: '#f97316',
          amber: '#fbbf24',
          red: '#ef4444',
          crimson: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}
