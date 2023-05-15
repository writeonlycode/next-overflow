/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "night-0": "#2e3440",
        "night-1": "#3b4252",
        "night-2": "#434c5e",
        "night-3": "#4c566a",
        "snow-0": "#d8dee9",
        "snow-1": "#e5e9f0",
        "snow-2": "#eceff4",
        "frost-0": "#8fbcbb",
        "frost-1": "#88c0d0",
        "frost-2": "#81a1c1",
        "frost-3": "#5e81ac",
        "aurora-0": "#bf616a",
        "aurora-1": "#d08770",
        "aurora-2": "#ebcb8b",
        "aurora-3": "#a3be8c",
        "aurora-4": "#b48ead",
      },
    },
  },
  plugins: [],
};
