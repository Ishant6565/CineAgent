/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cine: {
          dark: '#000000',
          surface: '#09090b',
          card: '#121215',
          cardHover: '#18181b',
          border: 'rgba(255, 255, 255, 0.1)',
          borderHover: 'rgba(255, 255, 255, 0.25)',
          white: '#ffffff',
          silver: '#e4e4e7',
          muted: '#a1a1aa',
          subtle: '#52525b',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
