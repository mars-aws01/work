require('shelljs/global');
const gulp = require('gulp4');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const notifier = require('node-notifier');

const params = {
  minify: process.argv.indexOf('--minify') >= 0,
  prod: process.argv.indexOf('--prod') >= 0
};

['task_vendor', 'task_central', 'task_modules', 'task_common'].forEach(item => {
  require(`./tasks/${item}`)(gulp, params);
});

gulp.task('clean', done => {
  rm('-rf', 'dist/central');
  rm('-rf', 'dist/modules');
  rm('-f', 'dist/index.html');
  done();
});

gulp.task('clean:dist', done => {
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

gulp.task('dev', gulp.series(
  'clean',
  gulp.parallel('build:central', 'build:modules'),
  'serve'
));

gulp.task('build', gulp.series(
  'clean:dist',
  gulp.parallel('build:central', 'build:modules')
));

gulp.task('bs-reload', done => {
  notifier.notify({ title: 'Newkit', message: 'Build successfully.' });
  browserSync.reload();
  done();
});
