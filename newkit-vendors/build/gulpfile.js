require('shelljs/global')
const gulp = require('gulp4');

const params = {};

gulp.task('clean', done => {
  rm('-rf', distFolder);
  done();
});

['task_angular'].forEach(item => {
  require(`./tasks/${item}`)(gulp, params);
});

gulp.task('angular', gulp.parallel('build:angular-all', 'build:angular-all.min'));

gulp.task('kw', done => {
  exec('npm run webpack:kw & npm run webpack:kw-min --color=always');
  done();
});

gulp.task('vendor', gulp.parallel('angular', 'kw'));
