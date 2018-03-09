require('shelljs/global');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const baseConfig = require('./webpack.base.conf');
const util = require('./util');

// 清空dist目录
rm('-rf', 'dist');

module.exports = webpackMerge(baseConfig, {
  entry: {
    'build': './examples/main.ts'
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
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: util.root('examples/index.html')
    })
  ]
});
