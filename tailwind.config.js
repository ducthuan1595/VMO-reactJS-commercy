/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#f84b2f",
        "border-color": "#f2f4f5",
      },
      width: {
        "primary-width": "1200px",
      },
    },
  },
  plugins: [],
};
