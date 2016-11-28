var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var APP_PATH = path.resolve(__dirname, '');
var SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
  cache: true,
  target: 'electron',
  externals: [nodeExternals()],

  devtool: 'source-map',
  entry: {
    index: './src'
  },
  output: {
    path: APP_PATH,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: [SRC_PATH],
        query: {
          presets: ['es2015', 'react', 'stage-3'],
          plugins: ['antd']
        }
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new CopyWebpackPlugin([
      // { from: path.resolve(SRC_PATH, 'index.html'), to: 'index.html' },
    ])
  ]
};
