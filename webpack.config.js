const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build')
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}