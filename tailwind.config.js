const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      ...colors,
      primary: {
        ...colors.primary,
        blue: "#1a62d6",
      },
      secondary: {
        ...colors.secondary,
        blue: "#0048b9",
      },
    },
  },
  variants: {},
  plugins: [],
};
