const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: 'animate-loading',
    libraryTarget: 'umd',
		globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};

module.exports = config;