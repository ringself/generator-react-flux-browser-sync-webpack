var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-minify-css"),
    jshint = require("gulp-jshint"),
    concat = require("gulp-concat"),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    htmlInjector = require("bs-html-injector"),
    exec = require('child_process').exec,
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    webpackCompiler = webpack(webpackConfig);

gulp.task('clean', function() {
  del(['build/*.js','build/*.css'],{force: true});
});

gulp.task('scripts', ['webpack'], function() {
  gulp.src('./build/*.debug.js')
      .pipe(concat('<%= _.slugify(appName)%>.debug.js'))
      .pipe(gulp.dest('./build'))
      .pipe(uglify())
      .pipe(rename(function(path){
        path.basename = path.basename.replace('.debug','')
      }))
      .pipe(gulp.dest('./build'))
});

gulp.task('style', function() {
  gulp.src('./css/sass/main.scss')
      .pipe(sass())
      .pipe(concat('<%= _.slugify(appName)%>.debug.css'))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('./build'))
      .pipe(minifyCss())
      .pipe(rename(function(path){
        path.basename = path.basename.replace('.debug','')
      }))
      .pipe(gulp.dest('./build'))
});

gulp.task('webpack', function(callback) {
  webpackCompiler.run(function(err, stats){
    if (err) throw new gutil.PluginError('[webpack]', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    callback();
  });
});

// browser-sync
gulp.task('browser-sync', function() {
    browserSync.use(htmlInjector, {
        files: "demo/*.html"
    });
    browserSync({
        server: {
            baseDir: "./",
            index: "/demo/index.html"
        },
        https: false
    });
    gulp.watch(['build/**/*']).on('change', function(file) {
        reload(file.path);
    });
});

gulp.task('default', ['clean', 'scripts', 'style']);

gulp.task('watch', function() {
  gulp.watch(['./js/**/*.js'], ['scripts']);
  gulp.watch(['./css/**/*.scss'], ['style']);
});

// start
gulp.task('start',['default','browser-sync','watch']);

module.exports = gulp;
