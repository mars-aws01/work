const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
const util = require('./util');
const webpack = require('webpack');

module.exports = webpackMerge(baseConfig, {
  entry: {
    build: './examples/main.ts'
  },
  externals: [
    {
      'rxjs': 'Rx',
      '@angular/common': 'ng.common',
      '@angular/compiler': 'ng.compiler',
      '@angular/core': 'ng.core',
      '@angular/http': 'ng.http',
      '@angular/platform-browser': 'ng.platformBrowser',
      '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
      '@angular/router': 'ng.router',
      '@angular/forms': 'ng.forms',
      '@angular/animations': 'ng.animations',
    }
  ],
  output: {
    path: util.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      util.root('src', 'client')
    ),
    new HtmlWebpackPlugin({
      template: util.root('examples/index.html')
    })
  ],
  devServer: {
    port: 7777,
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    open: true
  }
});
