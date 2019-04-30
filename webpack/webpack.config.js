const path = require("path")

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require("html-webpack-plugin")

const SRC_DIR = path.resolve(__dirname, "../src")
const DIST_DIR = path.resolve(__dirname, "../dist")

const getExcludedJSPath = () => {
  if (process.env.NODE_ENV === "development") {
    return /node_modules/
  }

  return [/node_modules/, /.storybook/, /\.stories.(js|jsx)$/]
}

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
  entry: `${SRC_DIR}/components.js`,
  output: {
    path: DIST_DIR,
    filename: "[name].js",
    library: "",
    libraryTarget: "commonjs",
  },
  optimization: {
    minimize: false
  },
  externals: {
    "react": "react",
    "react-dom": "react-dom",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: getExcludedJSPath(),
        include: [SRC_DIR, /node_modules\/debug/],
        use: ["babel-loader"],
      },
      {
        /*
         * The url-loader works like the file-loader, but can return a
         * DataURL if the file is smaller than a byte limit.
         *
         * All images under 2KB are inlined, if more than 2KB pass to
         * file-loader
         */
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 2048,
          name: "images/[name].[hash].[ext]",
        },
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[hash].[ext]",
        },
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
