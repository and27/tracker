/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1c1c1e",
        secondary: "#ffffff",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
