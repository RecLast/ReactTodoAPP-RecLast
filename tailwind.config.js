/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        background: '#f8fafc',
        'card-bg': '#ffffff',
      },
      boxShadow: {
        card: '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}