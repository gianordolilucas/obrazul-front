module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    "postcss-preset-env",
    [
      "tailwindcss",
      {
        // Change this to your own Tailwind theme configuration
        config: "./tailwind.config.js",
      },
    ],
    "autoprefixer",
  ],
};
