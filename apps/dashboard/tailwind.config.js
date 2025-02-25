const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(100px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(20px, -70px) scale(0.6)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      colors: {
        primary: {
          original: "#7d5c3e",
          dark: "#58402b",
          light: "#a48d78",
          super_dark: "#322519",
          super_light: "#cbbeb2",
        },
        secondary: {
          light: "#aacfe4",
          superlight: "#cfe4ef",
          dark: "#5e8397",
          superdark: "#364b56",
          original: "#86bbd8",
        },
      },
    },
  },
  plugins: [],
};
