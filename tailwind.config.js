/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        steel: {
          100: '#E0EEF8',
          200: '#B8D8F0',
          300: '#8BBDE6',
          400: '#5A9CD4',
          500: '#3A7CB8',
          600: '#2E6699',
          700: '#24507A',
          800: '#1B3A5C',
          900: '#0F1E2E',
        },
        amber: {
          100: '#FEF0DC',
          200: '#FAD9A8',
          300: '#F5C07A',
          400: '#F0A858',
          500: '#E8913A',
          600: '#D07A2A',
        },
      },
    },
  },
  plugins: [],
};
