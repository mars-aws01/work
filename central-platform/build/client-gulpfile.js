require('shelljs/global');
const fs = require('fs');
const path = require('path');
const gulp = require('gulp4');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const notifier = require('node-notifier');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const newer = require('gulp-newer');

const commonConfig = require('./webpack.common');
const util = require('./util');
const tsconfigTpl = require('./tsconfig_tpl.json');

const minify = process.argv.indexOf('--minify') >= 0

let resourceTasks = [];

const buildModules = () => {
  let modules = {};
  let moduleFolder = path.join(__dirname, '../../', 'src/modules');

  let modules = fs.readdirSync(moduleFolder);

  if (modules.length === 0) {
    throw new Error('请先创建至少一个模块');
  }

  modules.forEach(name => {
    if (name.indexOf('.') === 0) { // 忽略以.开头的目录
      return;
    }
    let modulePath = path.join(moduleFolder, name);
    // 不是目录就忽略
    if (!fs.statSync(modulePath).isDirectory()) {
      return;
    }
    modules[name] = `${moduleFolder}/${name}/index.ts`;
    // 创建模块资源复制任务
    let taskName = `build:modules.resource_${name}`;
    let distFolder = `dist/modules/${name}/resources`;
    gulp.task(taskName, () => {
      return gulp.src([
        `src/modules/${name}/resources/**/*`
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
        path: util.root('../dist'),
        filename: 'modules/[name]/app.js',
        library: ['newkit', '[name]'],
        chunkFilename: '[id].js'
      },
      plugins: [
        new ExtractTextPlugin({ filename: 'modules/[name]/app.css', disable: false, allChunks: true })
      ].concat(minify ? [
        new webpack.optimize.UglifyJsPlugin({
          mangle: {
            keep_fnames: true
          }
        })
      ] : [])
    });
    webpack(opt).watch({
      aggregateTimeout: 500,
      ignored: [/node_modules/, /dist/]
    }, (err, stats) => {
      util.showWebpackError(err, stats);
      gulp.series('bs-reload')();
      done();
    });
  });

  gulp.task('build:modules', gulp.parallel('build:modules.js'));
};

buildModules();

gulp.task('clean', done => {
  rm('-rf', 'dist');
  done();
});

gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    },
    middleware: [historyApiFallback()],
    ghostMode: false,
    port: 10000
  });
  done();
});

gulp.task('bs-reload', done => {
  notifier.notify({ title: 'Newkit', message: 'Build successfully.' });
  browserSync.reload();
  done();
});

gulp.task('copyNewkit', () => {
  return gulp.src([
    './newkit_package/**/*',
    '!./newkit_package/build',
    '!./newkit_package/build/**/*',
    '!./newkit_package/declare.d.ts'
  ])
    .pipe(gulp.dest('dist'));
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

gulp.task('build:modules.resource', gulp.parallel(...resourceTasks, 'build:modules.watchResources'));

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('copyNewkit', 'build:modules', 'build:modules.resource'),
  'serve'
));
