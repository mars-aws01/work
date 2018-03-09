const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const util = require('./util');

const isProd = process.env.NODE_ENV === 'production';
let minStr = `${isProd ? '.min' : ''}`;

const cssLoader = {
  loader: 'css-loader',
  options: { minimize: isProd }
};

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
const externals = {};
Object.keys(angularModuleMap)
  .forEach(k => {
    externals[`@angular/${k}`] = {
      root: ['ng', angularModuleMap[k]],
      commonjs: `@angular/${k}`,
      commonjs2: `@angular/${k}`
    };
  });
externals['rxjs'] = 'Rx';
externals['kendo-wijmo'] = 'kendo-wijmo';

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
  externals,
  entry: {
    [`newkit-core${minStr}`]: './src/index.ts'
  },
  output: {
    path: util.root('lib'),
    filename: 'js/[name].js',
    library: ['newkit', 'newkit-core'],
    libraryTarget: 'umd',
    chunkFilename: '[id].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: /node_modules/ },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ use: cssLoader }) },
      {
        test: /\.styl$/, use: ExtractTextPlugin.extract({
          use: [cssLoader, 'stylus-loader']
        })
      },
      {
        test: /\.less$/, use: ExtractTextPlugin.extract({
          use: [cssLoader, 'less-loader']
        })
      },
      //   { test: /\.scss$/, use: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader' }) },
      //   { test: /\.sass$/, use: ExtractTextPlugin.extract({ use: 'css-loader!sass-loader?indentedSyntax=true' }) }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })
  ]
};

// PRD环境，生成压缩包
if (isProd) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }));
}


module.exports = webpackConfig;