/**
 * Created by Kyle on 15/06/10.
 */
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');



gulp.task('build:stylus', function(){
    gulp.src('./src/stylus/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest('./dist/assets/css'));
});


gulp.task('default', ['build:stylus']);



gulp.task('watch', ['build:stylus'], function(){
    gulp.watch('./src/stylus/*.styl', ['build:stylus']);
});
