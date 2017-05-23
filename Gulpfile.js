var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watch = require('gulp-watch');
var async = require('async');
var consolidate = require('gulp-consolidate');
var runTimestamp = Math.round(Date.now()/1000);

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'typos';

gulp.task('iconfont', function(){
  gulp.src(['./app/svg/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      targetPath: '../../../app/scss/_icons.scss',
      fontPath: '/fonts/icons/'
    }))
    .pipe(iconfont({
      fontName: fontName
     }))
    .pipe(gulp.dest('./public/fonts/icons/'));
});

gulp.task('sass', function() {
    gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function() {
   browserify('./app/js/main.js')
   .bundle()
   .on('error', function(e){
     gutil.log(e);
   })
   .pipe(source('bundle.js'))
   .pipe(gulp.dest('./public/js/dist'));
});

gulp.task('watch', function() {
    gulp.watch('./app/scss/*.scss', ['sass'])
    gulp.watch('./app/js/*.js', ['js'])
});
gulp.task('build',['sass', 'js', 'iconfont']);
gulp.task('default', ['watch', 'build']);
