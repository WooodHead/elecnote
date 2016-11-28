var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var APP_PATH = path.resolve(__dirname, 'app');
var SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
  cache: true,
  target: 'electron',
  externals: [nodeExternals()],

  devtool: 'source-map',
  entry: {
    index: './src/index',
    setting: './src/setting',
  },
  output: {
    path: APP_PATH,
    filename: '[name]/index.js',
    chunkFilename: '[name]/[chunkhash].js',
    sourceMapFilename: '[name]/index.map'
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
      { from: path.resolve(SRC_PATH, 'index/index.html'), to: path.resolve(APP_PATH, 'index/index.html') },
      { from: path.resolve(SRC_PATH, 'setting/index.html'), to: path.resolve(APP_PATH, 'setting/index.html') },
    ])
  ]
};
