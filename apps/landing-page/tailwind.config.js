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
      colors: {
        primary: {
          original: "#7d5c3e",
          dark: "#58402b",
          light: "#a48d78",
          super_dark: "#322519",
          super_light: "#cbbeb2",
        },
      },
    },
  },
  plugins: [],
};
