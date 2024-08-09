// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Update this line to match your file structure
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        midOrange: "#ED7239", // Custom color example
        lightOrange: "#FCEEDE", // Custom color example
        darkOrange: "#CD6333", // Custom color example
        highlightOrange: "#F1E2D1",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
