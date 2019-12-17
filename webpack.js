/*eslint no-undef: "error"*/
/*eslint-env node*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js"
  },

  devServer: {
    contentBase: "dist",
    open: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "!!html-loader!./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "./contents.css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([{ from: "src/lib", to: "lib" }])
  ]
};