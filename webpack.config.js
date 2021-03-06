const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./build"),
    filename: "app.bundle.js",
    publicPath: "/"
  },
  module: {

    rules: [

      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(?:png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })]
};
