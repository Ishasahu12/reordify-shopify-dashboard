/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#07D568',
        'accent-dark': '#062912',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 20px 60px rgba(23,28,45,0.08)',
        'lift': '0 26px 70px rgba(23,28,45,0.12)',
        'accent': '0 14px 30px rgba(7,213,104,0.28)',
      },
      borderRadius: {
        'base': '18px',
        'lg': '28px',
      },
    },
  },
  plugins: [],
};
