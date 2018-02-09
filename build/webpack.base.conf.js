const { CheckerPlugin } = require('awesome-typescript-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  cache: true,
  profile: true,
  resolve: {
    extensions: ['.ts', '.js']
  },
  watchOptions: {
    ignored: /node_modules/
  },
  stats: 'minimal',
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
  module: {
    rules: [
      { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: /node_modules/ },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
      { test: /\.styl$/, use: ExtractTextPlugin.extract({ use: 'css-loader!stylus-loader' }) }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true })
  ]
};
