const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./../webpack.common');
const util = require('./../util');

module.exports = (gulp, params) => {
  gulp.task('central:html', () => {
    return gulp.src([
      'index.html',
      'src/config*/*.js'
    ])
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('central:resources', () => {
    return gulp.src(['src/resources/**/*'])
      .pipe(gulp.dest('dist/central/resources'));
  });

  gulp.task('central:watch', done => {
    gulp.watch([
      'index.html'
    ], gulp.series('central:html', 'bs-reload'));
    done();
  });

  gulp.task('central:js', done => {
    let opt = webpackMerge(commonConfig, {
      entry: {
        'central': './src/index.ts',
        'central-client': './client/central-client.ts'
      },
      output: {
        path: util.root('dist'),
        filename: 'central/[name].js',
        library: ['newkit', '[name]'],
        chunkFilename: '[id].js'
      },
      plugins: [
        new ExtractTextPlugin({ filename: 'central/[name].css', disable: false, allChunks: true })
      ].concat(params.minify ? [
        new webpack.DefinePlugin({
          'process.env': { NODE_ENV: '"production"' }
        }),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
          mangle: {
            keep_fnames: true
          }
        })
      ] : [])
    });
    if (params.prod) {
      webpack(opt).run((err, stats) => {
        util.showWebpackError(err, stats);
        gulp.series('bs-reload')();
        done();
      });
    } else {
      webpack(opt).watch({
        aggregateTimeout: 500,
        ignored: [/node_modules/, /modules/, /build/, /dist/]
      }, (err, stats) => {
        util.showWebpackError(err, stats);
        gulp.series('bs-reload')();
        done();
      });
    }
  });

  gulp.task('build:central', gulp.parallel(...['central:js', 'central:html', 'central:resources'].concat(params.prod ? [] : ['central:watch'])));
};
