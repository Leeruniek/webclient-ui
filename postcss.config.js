module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env")({
      browsers: "last 2 versions",
      stage: 3,
      features: {
        "color-mod-function": { unresolved: "ignore" },
      },
    }),
    require("cssnano"),
  ],
}
