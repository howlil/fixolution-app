/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0EA9C5",
        col: "#0EA9C5",
        second: "#04343D",
        warning: "#BF3131",
        accept: "#31BF72",
      },
    },
  },
  plugins: [],
};
