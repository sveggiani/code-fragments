// webpack.config.prod.js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const APP = path.join(__dirname, 'src')
const DIST = path.join(__dirname, 'dist')


module.exports = {
  devtool: 'source-map',
  entry: ['./src/index'],
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.html']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html'
    }),
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: APP
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      plugins: ['transform-class-properties'],
      include: APP
    }]
  }
}
