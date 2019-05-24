// const { TsConfigPathsPlugin } = require("awesome-typescript-loader")
const CopyWebPackPlugin = require("copy-webpack-plugin")
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: "development",

  entry: {
    content: "./src/content.ts",
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/build",
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js", ".json"],
    plugins: [new TsConfigPathsPlugin()],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },

  plugins: [
    new CopyWebPackPlugin([
      { from: "src/manifest.json" },
    ]),
  ],
}
