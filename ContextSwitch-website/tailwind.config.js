/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#c8f542',
          50: '#f8ffe6',
          100: '#efffbf',
          200: '#deff8a',
          300: '#c8f542',
          400: '#b8e620',
          500: '#9ac710',
          600: '#77a008',
          700: '#5a780a',
          800: '#48600f',
          900: '#3d5111',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          50: '#1a1a1a',
          100: '#141414',
          200: '#0f0f0f',
          300: '#0a0a0a',
          400: '#050505',
        },
        purple: {
          DEFAULT: '#a78bfa',
          light: '#c4b5fd',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
