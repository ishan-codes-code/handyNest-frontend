/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust for your project
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // Borders
    {
      pattern:
        /(border|hover:border)-(emerald|purple|blue|orange|slate|amber)-(100|200)/,
    },
    // Background hovers
    {
      pattern: /hover:bg-(emerald|purple|blue|orange|slate|amber)-50/,
    },
    // Gradient background (from/to)
    {
      pattern:
        /(from|to)-(emerald|purple|blue|orange|slate|amber)-(50|100|200|600|700)/,
    },
  ],
  plugins: [],
};
