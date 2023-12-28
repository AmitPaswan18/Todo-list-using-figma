/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sfpro: ["SF Pro", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
