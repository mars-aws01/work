module.exports = {
  initTask: (gulp, plugins, params) ->
    browserSync = plugins.browserSync

    gulp.task('serve', ->
      browserSync({
        server: {
          baseDir: "./dist"
          middleware: [plugins.historyApiFallback, plugins.compress()]
        }
        port: 9001
        files: []
      })
    )
}