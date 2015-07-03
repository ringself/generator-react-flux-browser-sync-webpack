'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ReactAppGenerator = module.exports = function ReactAppGenerator() {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function() {
    this.installDependencies();
  });
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ReactAppGenerator, yeoman.generators.Base);

ReactAppGenerator.prototype.askFor = function app() {
  var cb = this.async();
  console.log("Hi, 准备开始一个基于React的项目!");
  var appName = path.basename(process.cwd());
  var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: '应用的名字?',
        default: appName
      },
      {
        type: 'confirm',
        name: 'useFlux',
        message: '是否用Flux? (推荐使用)'
      },
      {
        type: 'confirm',
        name: 'useRem',
        message: '是否用Rem方案? (推荐使用)'
      }
    ];
  
  this.prompt(prompts, function(e) {
    this.appName = e.appName;
    this.useFlux = e.useFlux;
    this.useRem = e.useRem;
    cb();
  }.bind(this));
};

ReactAppGenerator.prototype.app = function app() {
  this.mkdir('js');
  this.mkdir('js/components');
  this.mkdir('css');
  this.mkdir('build');
  this.mkdir('demo');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_webpack.config.js', 'webpack.config.js');
  this.copy('_jshintrc', '.jshintrc');
  this.copy('_gitignore', '.gitignore');
  this.copy('_gulpfile.js', 'gulpfile.js');
  
  
  this.copy('src/css/_reset.scss', 'css/sass/_reset.scss');
  this.copy('src/css/main.scss', 'css/sass/main.scss');

  if (this.useFlux) {
    this.mkdir('js/actions');
    this.mkdir('js/dispatcher');
    this.mkdir('js/stores');
    this.copy('flux-src/js/AppActions.js',    'js/actions/AppActions.js');
    this.copy('flux-src/js/ActionType.js',    'js/actions/ActionType.js');
    this.copy('flux-src/js/AppDispatcher.js', 'js/dispatcher/AppDispatcher.js');
    this.copy('flux-src/js/AppStores.js',     'js/stores/AppStores.js');
    this.copy('flux-src/js/components/parent.react.js', 'js/components/parent.react.js');
    this.copy('flux-src/js/components/child.react.js', 'js/components/child.react.js');
    this.copy('flux-src/js/app.js',      'js/app.js');
  }
  else{
    this.copy('src/js/componentsDemo.react.js', 'js/components/componentsDemo.react.js');
    this.copy('src/js/app.js',      'js/app.js');
  }

  this.template('_index.html', 'demo/index.html');
};

ReactAppGenerator.prototype.npmInit = function npmInit() {
  var cb = this.async();
  this.spawnCommand('npm', ['init'], cb).on('exit', cb);
};
