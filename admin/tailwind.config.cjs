/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        "source-sans-pro": ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        primary: {
          ...colors.red,
          700: "#bf1922",
          500: "#e32832",
        },
        secondary: {
          300: "#FBDB6B",
          500: "#FACF39",
          700: "#F9C307",
        },
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "9/16": "9 / 16",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      height: {
        4.5: "18px",
        13: "3.25rem",
        15: "3.75rem",
        87.5: "58.25rem",
        65: "43.25rem",
        "fit-layout": "calc(100vh - 80px)",
      },
      minHeight: {
        "fit-layout": "calc(100vh - 80px)",
        13: "3.25rem",
      },
      maxHeight: {
        "fit-layout": "calc(100vh - 80px)",
      },
      scale: {
        25: "0.25",
        120: "1.2",
        140: "1.4",
        160: "1.6",
        175: "1.75",
        180: "1.8",
        200: "2.00",
      },
      width: {
        13: "3.25rem",
        "fit-layout": "calc(100% - 288px)",
        4.5: "18px",
        160: "40rem",
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        xl: "0px 5px 14px 0px rgba(100, 100, 111, 0.2)",
        left: "0px 2px 4px 0px rgba(14, 30, 37, 0.12) , 0px 2px 16px 0px rgba(14, 30, 37, 0.32)",
      },
      keyframes: {
        blink: {
          to: {
            opacity: "0",
          },
        },
      },
      animation: {
        blink: "blink 1s infinite",
      },
    },
    screens: {
      xs: "320px",
      ...defaultTheme.screens,
      "3xl": "1600px",
      "4xl": "1920px",
    },
  },
  plugins: [require("tailwindcss"), require("postcss")],
};
