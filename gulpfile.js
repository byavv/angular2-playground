'use strict';

var _ = require('lodash'),
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),  
  webpack = require("webpack-stream"),
  path = require('path'),
  mongobackup = require('mongobackup');
  ;


gulp.task('clean:build', () => {
  return (require('del'))('./build');
});
gulp.task("images", ["clean:build"], () => {
  return gulp.src("client/assets/images/*")
    .pipe($.imagemin({
      optimizationLevel: 4
    }))
    .pipe(gulp.dest("build/images"));
});
// build for production
gulp.task("build", ["images"], () => {
  var wpConfig = require("./server/config/webpack")("production"); 
  return gulp.src(__dirname + '/client/app/bootstrap.ts')
    .pipe(webpack(wpConfig))
    .pipe(gulp.dest('./build/'));
});

// dev task
gulp.task('default', ["images"], () => {
  // livereload Chrome extension 
  // extension: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
  $.livereload.listen();
  $.nodemon().on('restart', () => {
    gulp.src('server/server.js')
      .pipe($.livereload())
      .pipe($.notify('Reloading page, please wait...'));
  })
});
