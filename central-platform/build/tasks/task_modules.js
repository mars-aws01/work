const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const newer = require('gulp-newer');

const commonConfig = require('./../webpack.common');
const util = require('./../util');

module.exports = (gulp, params) => {
  let modules = {};
  let moduleFolder = path.join(__dirname, './../../', 'modules/src');
  let resourceTasks = [];
  fs.readdirSync(moduleFolder).forEach(name => {
    if (name.indexOf('.') === 0) { // 忽略以.开头的目录
      return;
    }
    let modulePath = path.join(moduleFolder, name);
    // 不是目录就忽略
    if (!fs.statSync(modulePath).isDirectory()) {
      return;
    }
    modules[name] = `./modules/src/${name}/index.ts`;
    // 创建模块资源复制任务
    let taskName = `build:modules.resource_${name}`;
    let distFolder = `dist/modules/${name}/resources`;
    gulp.task(taskName, () => {
      return gulp.src([
        `modules/src/${name}/resources/**/*`
      ])
        .pipe(newer(distFolder))
        .pipe(gulp.dest(distFolder));
    });
    resourceTasks.push(taskName);
  });

  gulp.task('build:modules.js', done => {
    let opt = webpackMerge(commonConfig, {
      entry: modules,
      output: {
        path: util.root('dist'),
        filename: 'modules/[name]/app.js',
        library: ['newkit', '[name]'],
        chunkFilename: '[id].js'
      },
      plugins: [
        new ExtractTextPlugin({ filename: 'modules/[name]/app.css', disable: false, allChunks: true }),
        new webpack.WatchIgnorePlugin([
          util.root('src'),
          util.root('node_modules'),
          util.root('newkit-core'),
          util.root('build'),
          util.root('dist')
        ])
      ].concat(params.minify ? [
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
        aggregateTimeout: 500
      }, (err, stats) => {
        util.showWebpackError(err, stats);
        gulp.series('bs-reload')();
        done();
      });
    }
  });

  gulp.task('build:modules.watchResources', done => {
    let watcher = gulp.watch(`modules/src/**/resources/**/*.*`);
    watcher.on('all', (type, filepath) => {
      let nameArr = filepath.split(path.sep);
      if (nameArr.length >= 3) {
        let name = nameArr[2];
        gulp.series(`build:modules.resource_${name}`)();
      }
    });
    done();
  });

  gulp.task('build:modules.resource', gulp.parallel(...resourceTasks.concat(params.prod ? [] : ['build:modules.watchResources'])));

  gulp.task('build:modules', gulp.parallel('build:modules.js', 'build:modules.resource'));
};
