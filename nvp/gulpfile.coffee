# 引入模块

gulp = require('gulp')
runSequence = require('run-sequence')

# 定义所需要的模块
plugins = {
  gutil: require('gulp-util')
  del: require('del')
  argv:  require('yargs').argv
  coffee: require('gulp-coffee')
  less: require('gulp-less')
  concat: require('gulp-concat')
  cssmin: require('gulp-cssmin')
  replace: require('gulp-replace')
  fs: require('fs')
  linker: require('gulp-linker')
  uglify: require('gulp-uglify')
  gulpMerge: require('gulp-merge')
  browserSync: require('browser-sync')
  order: require('gulp-order')
  runSequence: runSequence
  chmod: require('gulp-chmod')
  compress: require('compression')

  historyApiFallback: require('connect-history-api-fallback')
}

# 获取变量（是否debug mode，是否压缩代码）
isDebug = !(plugins.argv.r || false)
isFrameworkDev = plugins.argv.f || false
env = plugins.argv.env || 'gdev'
if env isnt 'gqc' && env isnt 'prd' && env isnt 'prdtesting'
  env = 'gdev'
isDev = plugins.argv.d

# 定义参数
params = {
  env: env
  isFrameworkDev: isFrameworkDev
  isDebug: isDebug
  isDev: isDev
  assets: JSON.parse(plugins.fs.readFileSync('assets.json', 'utf8'))
}

# 初始化任务
[
  'task_framework'
  'task_modules'
  'task_serve'
  'task_watch'
].forEach((taskFileName) ->
  require('./gulp_tasks/' + taskFileName).initTask(gulp, plugins, params)
)

# 设置默认任务，入口点任务
gulp.task('default', (callback) ->
  runSequence(
    'framework'
    'modules'
 #   'modifyFile'
    'serve'
    'watch'
    callback
  )
)

gulp.task('modifyFile', (callback) ->
  gulp.src('./dist/**/*')
  .pipe(plugins.chmod(777))
  .pipe(gulp.dest('./dist'))
)