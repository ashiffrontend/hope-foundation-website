/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F62FE',
          hover: '#0043CE',
          light: '#EDF5FF',
        },
        secondary: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
          light: '#F0FDF4',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FFFBEB',
        },
      },
    },
  },
  plugins: [],
};
