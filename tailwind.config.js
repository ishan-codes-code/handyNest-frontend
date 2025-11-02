/** @type {import('tailwindcss').Config} */

const { themes } = require("./src/assets/exports.js"); // ✅ fix path + require

// Split classes so things like "from-emerald-50 via-teal-50 to-cyan-50" work
const safelist = Object.values(themes).flatMap((theme) =>
  Object.values(theme)
    .filter((cls) => typeof cls === "string")
    .flatMap((cls) => cls.split(" "))
);

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist,
  theme: {
    extend: {},
  },
  plugins: [],
};
