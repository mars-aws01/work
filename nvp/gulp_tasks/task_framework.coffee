
###
  处理framework的打包工作
###
module.exports = {
  initTask: (gulp, plugins, params) ->
    # 提取需要使用的插件
    del = plugins.del
    coffee = plugins.coffee
    gutil = plugins.gutil
    less = plugins.less
    cssmin = plugins.cssmin
    linker = plugins.linker
    replace = plugins.replace
    fs = plugins.fs
    uglify = plugins.uglify
    concat = plugins.concat
    gulpMerge = plugins.gulpMerge
    order = plugins.order
    runSequence = plugins.runSequence
    chmod = plugins.chmod

    # 提取需要使用的参数
    isDebug = params.isDebug
    env = params.env
    assets = params.assets


    # 构建框架项目
    gulp.task('framework', (callback) ->
      runSequence(
        'fw.clean'
        [
          'fw.copyNormal', 'fw.copyVendorJs','fw.copyKendoJs','fw.copyNewkitJs', 
          'fw.copyLoginJs', 'fw.copyCss','fw.copyLoginCss',
          'fw.kendoImg','fw.toolbars_widgets_systemModule.html'
        ]
        foldersTasks
        ['fw.config','fw.siteicon']
        ['fw.notify']
        ['fw.cache']
        callback
      )
    )

    gulp.task('fw.notify', ->
      console.log('框架代码构建成功！！！！！！！！！！！！！！！！！！！！！！！！！！！！')
    )

    # 处理config.js
    gulp.task('fw.config', ->
      gulp.src(['./src/framework/js/config.js'])
      .pipe(chmod(777))
      .pipe(replace('placeHolder', env))
      .pipe(replace('NEG.debug = true;', 'NEG.debug = ' + isDebug + ';'))
      .pipe(gulp.dest('./dist/assets/'))
    )
    # 清除框架文件夹(包含toolbars和widgets还有modules)和index.html
    gulp.task('fw.clean', (callback)->
      del(['./dist/'], callback)
    )
    
    gulp.task('fw.siteicon', ->
      gulp.src('./src/framework/img/favicon.ico')
      .pipe(gulp.dest('./dist/'))
    )

    # 复制框架文件
    gulp.task('fw.copyNormal', ->
      gulp.src([
          './src/index.html'
          './src/framework*/data/**/*'
          './src/framework*/font/**/*'
          './src/framework*/img/**/*'
          './src/framework*/themes/**/*'
        ])
      .pipe(chmod(777))
      .pipe(gulp.dest('./dist/'))
    )

    # 处理kendo img 的文件
    gulp.task('fw.kendoImg', ->
      gulp.src([
          './src/framework/css/vendor/kendo/fonts*/**/*'
          './src/framework/css/vendor/kendo/images*/*'
          './src/framework/css/vendor/kendo/Silver*/*'
        ])
      .pipe(chmod(777))
      .pipe(gulp.dest('./dist/assets/'))
    )

    # 处理kendo文件
    gulp.task('fw.copyKendoJs', ->
      gulpStream = gulp.src([
        './src/framework/js/vendor/kendo/**/*.js'
      ])
      .pipe(plugins.chmod(777))
      .pipe(concat('kendo.all.js', {newLine: ';'}))
      if not isDebug
        gulpStream = gulpStream.pipe(uglify())
      gulpStream.pipe(gulp.dest('./dist/assets/'))
    )

    # 处理vendor Js文件
    gulp.task('fw.copyVendorJs', ->
      gulpStream = gulp.src([
        './src/framework/js/vendor/jquery/*.js'
        './src/framework/js/vendor/jquery/**/*.js'
        './src/framework/js/vendor/angular/angular.js',
        './src/framework/js/vendor/angular/angular-*.js',
        '!./src/framework/js/vendor/angular/*.min.js',
        './src/framework/js/vendor/angular-translate/*.js',
        './src/framework/js/vendor/angular-translate/**/*.js',
        './src/framework/js/vendor/angulartics/*.js',
        './src/framework/js/vendor/angulartics-google-analytics/*.js'
        './src/framework/js/vendor/modernizr-*.js'
        './src/framework/js/vendor/messenger.js'
        './src/framework/js/vendor/messenger-*.js'
        './src/framework/js/vendor/moment.js'
        './src/framework/js/vendor/moment-*.js'
        './src/framework/js/vendor/bootstrap.js'
        './src/framework/js/vendor/*.js'
        './src/framework/plugin/ace_1.2/ace.js'
        './src/framework/plugin/ace_1.2/ace-elements.js'
        './src/framework/plugin/ace_1.2/ace-extra.js'
        './src/framework/plugin/select2/select2.js'
        './src/framework/js/vendor/require/require.js'
        './src/framework/js/vendor/require/require-css.js'
      ])
      .pipe(plugins.chmod(777))
      .pipe(concat('vendor.all.js', {newLine: ';'}))
      if not isDebug
        gulpStream = gulpStream.pipe(uglify())
      gulpStream.pipe(gulp.dest('./dist/assets/'))
    )

    # 处理login Js文件
    gulp.task('fw.copyLoginJs', ->
      gulpStream = gulp.src([
        './src/framework/themes/ace/js/**/*.js'
      ])
      .pipe(plugins.chmod(777))
      .pipe(concat('login.all.js', {newLine: ';'}))
      if not isDebug
        gulpStream = gulpStream.pipe(uglify())
      gulpStream.pipe(gulp.dest('./dist/assets/'))
    )

    # 处理Newkit JS文件
    gulp.task('fw.copyNewkitJs', ->
      gulpStream =gulpMerge(gulp.src([
          './src/framework/js/untils/**/*.coffee'
          './src/framework/js/directives/*.coffee'
          './src/framework/js/directives/**/*.coffee'
          './src/framework/js/filters/**/*.coffee'
          './src/framework/js/services/**/*.coffee'
          './src/framework/js/services/**/*.coffee'
          './src/framework/app/l18n/**/*.coffee'
          './src/framework/app/**/*.coffee'
          './src/framework/js/*.coffee'
        ])
        .pipe(coffee({bare: true}).on('error', gutil.log))
        , gulp.src([
          './src/framework/js/utility.js'
          './src/framework/js/untils/**/*.js'
          './src/framework/js/directives/*.js'
          './src/framework/js/directives/**/*.js'
          './src/framework/js/filters/**/*.js'
          './src/framework/js/services/**/*.js'
          './src/framework/js/services/**/*.js'
          './src/framework/app/l18n/**/*.js'
          './src/framework/app/**/*.js'
        ])
      )
      .pipe(plugins.chmod(777))
      .pipe(order([
          'utility.js'
          'negDirectives.js'
          'services-base.js'
        ]))
      .pipe(concat('newkit.all.js', {newLine: ';'}))
      if not isDebug
        gulpStream = gulpStream.pipe(uglify())
      gulpStream.pipe(gulp.dest('./dist/assets/'))
    )


    # 处理Framework Css 文件
    gulp.task('fw.copyCss', ->
      gulpStream = gulpMerge(
        gulp.src(['./src/framework/**/*.less'])
        .pipe(less())
      , gulp.src(assets.frameworkCss)
      )
      .pipe(order([
          'jquery/**/*.css'
          'jquery-ui-1.10.3.full.css'
          'messenger.css'
          '/messenger/**/*.css'
          'bootstrap.css'
          'directives/**/*.css'
          'vendor/**/*.css'
          'kendo.common.css'
          'kendo.bootstrap.css'
          '/ace_1.2/**/*.css'
          '/app/**/*.css'
          'select2.css'
          'shCoreDefault.css'
          'github.css'
        ]))
      .pipe(plugins.chmod(777))
      .pipe(concat('framework.all.css',{newLine:'\n\n/**********************************************/\n\n'}))
      if not isDebug
        gulpStream = gulpStream.pipe(cssmin())
      gulpStream.pipe(gulp.dest('./dist/assets/'))
    )

    # 处理Login Css 文件
    gulp.task('fw.copyLoginCss', ->
      gulpStream = gulp.src(['./src/framework/themes/ace/css/*.css'])
      .pipe(plugins.chmod(777))
      .pipe(concat('login.all.css',{newLine:'\n\n/**********************************************/\n\n'}))
      if not isDebug
        gulpStream = gulpStream.pipe(cssmin())
      gulpStream.pipe(gulp.dest('./dist/assets/'))
    )

    # 处理modules/system的静态文件
    gulp.task('fw.toolbars_widgets_systemModule.html', ->
      gulp.src([
        './src/modules*/system/**/*'
        '!./src/modules*/system/**/*.less'
        '!./src/modules*/system/**/*.css'
        '!./src/modules*/system/**/*.coffee'
        '!./src/modules*/system/**/*.js'
      ])
      .pipe(plugins.chmod(777))
      .pipe(gulp.dest('./dist/'))
    )

    # 读取所有的module/system
    foldersTasks = []
    toolbars_widgets_src = []
    folders = [{
        name: 'modules_system'
        path: './src/modules/system'
    }]
   
    # 处理modules/system的Css文件
    folders.forEach((t, i) ->
      gulp.task(t.name + '.css', ->
        gulpStream = gulpMerge(
          gulp.src(t.path + '/**/*.less').pipe(less())
        , gulp.src(t.path + '/**/*.css')
        , gulp.src('./src/framework/css/empty.css') # 通过一个一定有的空文件，保证能生成app.css
        )
        .pipe(plugins.chmod(777))
        .pipe(concat('app.css'))
        if not isDebug
          gulpStream = gulpStream.pipe(cssmin())
        gulpStream.pipe(gulp.dest(t.path.replace(/^.\/src/, './dist')))
      )
      foldersTasks.push(t.name + '.css')
    )

    # 处理modules/system的Js文件
    folders.forEach((t, i) ->
      gulp.task(t.name + '.js', ->
        gulpStream = gulpMerge(
          gulp.src(t.path + '/**/*.coffee')
          .pipe(coffee({bare: true}).on('error', gutil.log))
        , gulp.src(t.path + '/**/*.js')
        , gulp.src('./src/framework/js/empty.js') # 通过一个一定有的空文件，保证能生成app.js
        )
        .pipe(plugins.chmod(777))
        .pipe(concat('app.js', {newLine: ';'}))
        if not isDebug
          gulpStream = gulpStream.pipe(uglify())
        gulpStream.pipe(gulp.dest(t.path.replace(/^.\/src/, './dist')))
      )
      foldersTasks.push(t.name + '.js')
    )

    gulp.task('fw.cache', ->
      version = (new Date).valueOf() + ''
      gulp.src('./dist/index.html')
      .pipe(replace('config.js"></script>', 'config.js?v=' + version + '"></script>'))
      .pipe(replace('newkit.all.js"></script>', 'newkit.all.js?v=' + version + '"></script>'))
      .pipe(replace('system/app.js"></script>', 'system/app.js?v=' + version + '"></script>'))
      .pipe(replace('.css" />', '.css?v=' + version + '" />'))
      .pipe(gulp.dest('./dist'))
    )

}