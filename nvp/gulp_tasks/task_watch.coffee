module.exports = {
  initTask: (gulp, plugins, params) ->
    browserSync = plugins.browserSync
    runSequence = plugins.runSequence

    gulp.task('watch', ->
      if params.isFrameworkDev
        gulp.watch([
          './src/**/*'
        ], ['reload-all'])
      else
        gulp.watch([
          './src/modules/**/*.coffee'
          './src/modules/**/*.js'
          './src/modules/**/*.html'
          './src/modules/**/*.css'
          './src/modules/**/*.less'
          './src/framework/**/*.coffee'
          './src/framework/**/*.js'
          './src/framework/**/*.html'
          './src/framework/**/*.css'
          './src/framework/**/*.less'
        ], {debounceDelay: 2000}, ['reload-modules'])
    )

    gulp.task('bs-reload', ->
      browserSync.reload()
    )

    gulp.task('reload-modules', (callback) ->
      console.log('代码已更新，正在重新构建，时间：' + (new Date()).toLocaleString())
      runSequence(
        ['framework']
        ['modules']
        ['bs-reload']
        callback
      )
    )
    gulp.task('reload-all', (callback) ->
      runSequence(
        ['framework']
        ['modules']
        ['bs-reload']
        callback
      )
    )
}