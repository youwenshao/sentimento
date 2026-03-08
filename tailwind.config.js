/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./SentimentoPage.jsx",
  ],
  theme: {
    extend: {
      colors: {
        // Shared semantic tokens (default to text colors for borders/accents/etc)
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        
        // Explicit Light Mode Tokens (Dark Text)
        'light-bg': '#FAFAFA',
        'light-surface': '#F5F5F5',
        'light-primary': '#1A202C', // Refined dark gray
        'light-secondary': '#2D3748',
        'light-tertiary': '#4A5568',
        
        // Explicit Dark Mode Tokens (Light Text)
        'dark-primary': '#F7FAFC',
        'dark-secondary': '#EDF2F7',
        'dark-tertiary': '#E2E8F0',

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
      // Specific overrides for background colors
      backgroundColor: {
        primary: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        panel: 'var(--bg-panel)',
      },
      borderColor: {
        panel: 'var(--border-panel)',
      },
    },
  },
  plugins: [],
}
