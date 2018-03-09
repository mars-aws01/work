const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = require('./../webpack.common');
const util = require('./../util');
const tsconfigTpl = require('./../tsconfig_tpl.json');

module.exports = (gulp, params) => {

  gulp.task('types:modules', done => {
    let mIndex = process.argv.indexOf('-m');
    let moduleName = process.argv[mIndex + 1];
    if (!moduleName) {
      done();
      return console.error(`Must use \`-m <module>\` to provider module name.`);
    }
    let tsconfigTplCopy = Object.assign({}, tsconfigTpl);
    tsconfigTplCopy.compilerOptions.declarationDir = `./../../../node_modules/@types/newkit/${moduleName}`;
    let configFilePath = `./modules/src/${moduleName}/tsconfig.json`;
    fs.writeFileSync(configFilePath, JSON.stringify(tsconfigTplCopy, null, '  '));
    cd(`./modules/src/${moduleName}`);
    exec('tsc');
    cd('../../../'); // 退回到根目录
    rm('-rf', configFilePath);
    fs.writeFileSync(`./node_modules/@types/newkit/${moduleName}/index.d.ts`, `export * from './app';`, 'utf8');
    done();
  });
};