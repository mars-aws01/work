const concat = require('gulp-concat');
const assets = require('../assets.json');

module.exports = (gulp, params) => {
  gulp.task('build:angular-all', () => {
    return gulp.src(assets['angular-all'])
      .pipe(concat('angular-all.js', { newLine: ';\n' }))
      .pipe(gulp.dest('./dist/angular-all/'));
  });

  gulp.task('build:angular-all.min', () => {
    return gulp.src(assets['angular-all.min'])
      .pipe(concat('angular-all.min.js', { newLine: ';\n' }))
      .pipe(gulp.dest('./dist/angular-all/'));
  });
};
