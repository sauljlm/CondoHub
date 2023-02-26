/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        greenTheme: "#0f766e",
        lightGreenTheme: "#99f6e4",
        indigoTheme: "#3730a3",
        blueTheme: "#7dd3fc",
        grayTheme: "#71717a",
      },
    },
  },
  plugins: [require("@tailwindcss/forms", "@tailwindcss/aspect-ratio")],
};
