
// Karma configuration
// Generated on Tue Jul 14 2015 09:46:47 GMT+0800 (China Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'requirejs', 'sinon-chai', 'should'],


        // list of files / patterns to load in the browser
        files: [
          'test/lib/angular.js',
          'test/lib/angular-route.min.js',
          'test/lib/angular-resource.js',
          'test/lib/angular-translate.js',
          'test/lib/angular-translate-loader-static-files.js',
          'test/lib/angular-mocks.js',
          'test/lib/jquery.js',
          'test/lib/jquery.cookie.js',
          //framework File
          'src/framework/js/config.js',
          'src/framework/js/vendor/moment.js',
          'src/framework/js/services/services-base.coffee',
          'src/framework/js/services/custom/common.coffee',
          'src/framework/js/services/custom/storage.coffee',
          'src/framework/js/services/custom/messager.coffee',
          'src/framework/js/services/custom/profileInfo.coffee',
          'src/framework/js/directives/vendor/angular-file-upload.js',
          //Business File
          'src/modules/vendorportal/service/**/*.coffee',
          'src/modules/vendorportal-vf/service/**/*.coffee',
          'src/modules/vendorportal/directive/custom/vdAddress.coffee',
          'src/modules/vendorportal/directive/custom/vdContact.coffee',
          'src/modules/vendorportal/app/register/stocking-po-registration.coffee',

          // *************** HTML template files ***************
          //'src/modules/vendorportal-vf/app/self-testing/prerequisite.tpl.html',

          // *************** Test File ***************
          'test/vp/directive/vdAddress.test.js',
          'test/vp/directive/vdContact.test.js',
          'test/vp/service/registration.test.js',
          //'test/vp/app/stocking-po-registration.test.js',
          // *************** Main ***************
          'test/test-main.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.coffee': ['coffee'],
            'src/modules/vendorportal/directive/custom/vdAddress.coffee': ['coverage'],
            'src/modules/vendorportal/directive/custom/vdContact.coffee': ['coverage'],
            'src/modules/vendorportal/service/cache/registration.coffee': ['coverage'],
            'src/modules/vendorportal-vf/app/self-testing/prerequisite.tpl.html': ['ng-html2js'],
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/'
        },

        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        plugins: [
          'karma-requirejs',
          'karma-mocha',
          'karma-phantomjs-launcher',
          'karma-Chrome-launcher',
          'karma-coverage',
          'karma-sinon-chai',
          'karma-should',
          'karma-coffee-preprocessor',
          'karma-ng-html2js-preprocessor'
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers  'Chrome', 'Firefox', 'PhantomJS', 'IE'
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
