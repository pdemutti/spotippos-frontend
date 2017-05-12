var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watch = require('gulp-watch');

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
});
