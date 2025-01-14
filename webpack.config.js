// webpack.config.js
module.exports = {
  // other configurations
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devtool: false, // Disable source maps
  optimization: {
    portableRecords: true,
  },
};
