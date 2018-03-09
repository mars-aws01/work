const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const util = require('./util');

const isProd = process.env.NODE_ENV === 'production';
let minStr = `${isProd ? '.min' : ''}`;

// Angular module map
const angularModuleMap = {
  common: 'common',
  compiler: 'compiler',
  core: 'core',
  http: 'http',
  'platform-browser': 'platformBrowser',
  'platform-browser-dynamic': 'platformBrowserDynamic',
  router: 'router',
  forms: 'forms',
  animations: 'animations'
};

let externals = {};
Object.keys(angularModuleMap)
  .forEach(k => {
    externals[`@angular/${k}`] = {
      root: ['ng', angularModuleMap[k]],
      commonjs: `@angular/${k}`,
      commonjs2: `@angular/${k}`
    };
  });
externals['rxjs'] = 'Rx';

const webpackConfig = {
  devtool: 'source-map',
  cache: true,
  profile: true,
  resolve: {
    extensions: ['.ts', '.js']
  },
  watchOptions: {
    ignored: /node_modules/
  },
  entry: {
    [`kendo-wijmo${minStr}`]: './src/index.ts'
  },
  output: {
    path: util.root('dist'),
    filename: `kendo-wijmo/js/[name].js`,
    library: 'kendo-wijmo',
    libraryTarget: 'umd'
  },
  externals,
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
    new CheckerPlugin(),
    new ExtractTextPlugin({ filename: `kendo-wijmo/css/[name].css`, disable: false, allChunks: true })
  ]
};
// PRD环境，生成压缩包
if (isProd) {
  delete webpackConfig.devtool;
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }));
}

module.exports = webpackConfig;
