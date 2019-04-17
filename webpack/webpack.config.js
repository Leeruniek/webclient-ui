const path = require("path")

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require("html-webpack-plugin")

const SRC_DIR = path.resolve(__dirname, "../src")
const DIST_DIR = path.resolve(__dirname, "../dist")

const cssConfig = ({ isCSSModules = false } = {}) => [
  {
    loader: "style-loader",
  },
  {
    loader: "css-loader",
    options: {
      modules: isCSSModules,
      sourceMap: true,

      importLoaders: 1,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      sourceMap: true,
    },
  },
  {
    loader: "resolve-url-loader",
  },
]

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: "development",
  output: {
    path: DIST_DIR,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [SRC_DIR, /node_modules\/debug/],
        use: ["babel-loader"],
      },
      {
        test: /\.(less|scss|sass|css)$/,
        exclude: /(\.module\.css|webclient\-ui.*css|react-toolbox.*css)$/,
        use: cssConfig(),
      },
      {
        test: /(\.module\.css|webclient\-ui.*css|react-toolbox.*css)$/,
        use: cssConfig({ isCSSModules: true }),
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new HTMLPlugin({
      filename: `${DIST_DIR}/index.html`,
      template: `${SRC_DIR}/index.html`,
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    modules: [SRC_DIR, "node_modules"],
  },
}
