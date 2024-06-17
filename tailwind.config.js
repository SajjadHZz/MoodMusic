const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

// Rotate Y utilities
const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-x-0": {
      transform: "rotateX(0)",
    },
    ".rotate-x-20": {
      transform: "rotateX(20deg)",
    },
    ".rotate-x-40": {
      transform: "rotateX(40deg)",
    },
    ".rotate-x-60": {
      transform: "rotateX(60deg)",
    },
    ".rotate-x-80": {
      transform: "rotateX(80deg)",
    },
    ".rotate-x-180": {
      transform: "rotateX(180deg)",
    },

    ".rotate-prevs-y-10": {
      transform: "perspective(180px) rotateY(10deg)",
    },
  });
});
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-0": {
      transform: "rotateY(0)",
    },
    ".rotate-y-20": {
      transform: "rotateY(20deg)",
    },
    ".rotate-y-40": {
      transform: "rotateY(40deg)",
    },
    ".rotate-y-60": {
      transform: "rotateY(60deg)",
    },
    ".rotate-y-80": {
      transform: "rotateY(80deg)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },

    ".rotate-prevs-y-10": {
      transform: "perspective(180px) rotateY(10deg)",
    },
  });
});

// Rotate Y utilities
const backface = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-invisible": {
      "backface-visibility": "hidden",
    },
    ".transform-3d": {
      "transform-style": "preserve-3d",
    },
  });
});

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Temp: ["Temp", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [backface, rotateX, rotateY],
};
