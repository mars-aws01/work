###
  处理toolbars的打包工作
###
module.exports = {
  initTask: (gulp, plugins, params) ->
    # 提取需要使用的插件
    runSequence = plugins.runSequence
    coffee = plugins.coffee
    concat = plugins.concat
    gutil = plugins.gutil
    cssmin = plugins.cssmin
    less = plugins.less
    replace = plugins.replace
    gulpMerge = plugins.gulpMerge
    fs = plugins.fs
    uglify = plugins.uglify
    linker = plugins.linker
    chmod = plugins.chmod

    # 提取需要使用的参数
    isDebug = params.isDebug
    isDev = params.isDev

    # 构建toolbars
    gulp.task('modules', (callback)->
      runSequence(
        ['modules.copyFiles']
        folderTasks
        ['module.linkIndex']
        'modules.empty'
        callback
      )
    )

    gulp.task('modules.empty', ->
      console.log('模块构建成功！！！！！！！！！！！！！！')
    )

    folderTasks = []
    folders = []
    fs.readdirSync('./src/modules/').forEach((folder, i) ->
      if folder isnt 'system'
        folders.push(folder)
    )

    # 创建任务，处理css和js，
    folders.forEach((f) ->
      path = './src/modules/' + f
      # 处理js
      gulp.task('modules_' + f + '.js', ->
        gulpStream = gulpMerge(
          gulp.src(path + '/**/*.coffee').pipe(coffee({bare: true}).on('error', gutil.log))
        , gulp.src(path + '/**/*.js')
        , gulp.src('./src/framework/js/empty.js') # 通过一个一定有的空文件，保证能生成app.js
        )
        .pipe(chmod(777))
        if not isDev
          gulpStream = gulpStream.pipe(concat('app.js', {newLine: ';'}))
#          if not isDebug
#            gulpStream = gulpStream.pipe(uglify())
        gulpStream.pipe(gulp.dest(path.replace(/^.\/src/, './dist')))
      )
      folderTasks.push('modules_' + f + '.js')
      # 处理css
      gulp.task('modules_' + f + '.css', ->
        gulpStream = gulpMerge(
          gulp.src(path + '/**/*.less').pipe(less())
        , gulp.src(path + '/**/*.css')
        , gulp.src('./src/framework/css/empty.css') # 通过一个一定有的空文件，保证能生成app.js
        )
        .pipe(chmod(777))
        if not isDev
          gulpStream = gulpStream.pipe(concat('app.css', {newLine: ''}))
          if not isDebug
            gulpStream = gulpStream.pipe(cssmin())
        gulpStream.pipe(gulp.dest(path.replace(/^.\/src/, './dist')))
      )
      folderTasks.push('modules_' + f + '.css')
    )

    gulp.task('modules.copyFiles', ->
      gulp.src([
        './src/modules/**/*'
        '!./src/modules/system/**/*'
        '!./src/modules/**/*.+(less|css|js|coffee)'
      ])
      .pipe(chmod(777))
      .pipe(gulp.dest('./dist/modules/'))
    )


    gulp.task('module.linkIndex', ->
      # If release,do nothing.
#      if not isDebug and not isDev
#        return
      jsArr = []
      cssArr = []
      folders.forEach((f) ->
        jsArr.push('./dist/modules/' + f + '/app.js')
        cssArr.push('./dist/modules/' + f + '/app.css')
      )
      if isDev
        jsArr = [
          './dist/modules/**/*.js'
          '!./dist/modules/system/**/*.js'
        ]
        cssArr = [
          './dist/modules/**/*/*.css'
          '!./dist/modules/system/**/*.css'
        ]
      gulp.src('./dist/index.html')
      .pipe(chmod(777))
      .pipe(linker({
          scripts: jsArr
          startTag: '<!--placeholder_modules_js_start-->'
          endTag: '<!--placeholder_modules_js_end-->'
          fileTmpl: '<script src="%s\"></script>'
          appRoot: './dist'
        })
      )
      .pipe(linker({
          scripts: cssArr
          startTag: '<!--placeholder_modules_css_start-->'
          endTag: '<!--placeholder_modules_css_end-->'
          fileTmpl: '<link rel="stylesheet" href="%s" />'
          appRoot: './dist'
        })
      )
      .pipe(gulp.dest('./dist/'))
    )
}
