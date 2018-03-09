const path = require('path');
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
  externals: [{
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

    '@newkit/core': `newkit['newkit-core']`,
    'kendo-wijmo': `window['kendo-wijmo']`
  }, function (context, request, callback) {
    if (request.indexOf('newkit/') === 0) {
      let key = request.split('/')[1];
      return callback(null, `var newkit['${key}']`);
    }
    callback();
  }],
  module: {
    rules: [
      { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: /node_modules/ },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
      { test: /\.styl$/, use: ExtractTextPlugin.extract({ use: 'css-loader!stylus-loader' }) },
      { test: /\.less$/, use: ExtractTextPlugin.extract({ use: 'css-loader!less-loader' }) },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader' }) },
      { test: /\.sass$/, use: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader?indentedSyntax=true' }) }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};