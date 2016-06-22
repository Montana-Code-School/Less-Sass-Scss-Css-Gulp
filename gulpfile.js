var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sixto5 = require('gulp-6to5');
var sass = require('gulp-sass');
var less = require('gulp-less');
var css = require('gulp-css');

var paths = {
  jsSource: ['./public/app/**/*.js'],
  sassSource: ['./public/styles/**/*.sass', './public/styles/**/*.scss'],
  lessSource: ['./public/styles/**/*.less'],
  cssSource: ['./public/styles/**/*.css']
};

gulp.task('sass', function(){
  return gulp.src(paths.sassSource)
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('less', function(){
  return gulp.src(paths.lessSource)
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('css', function(){
  return gulp.src(paths.cssSource)
    .pipe(css())
    .pipe(concat('styler.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('js', function(){
  return gulp.src(paths.jsSource)
    .pipe(concat('bundle.js'))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['watch', 'js', 'sass', 'less', 'css']);

gulp.task('watch', function(){
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.sassSource, ['sass']);
  gulp.watch(paths.lessSource, ['less']);
  gulp.watch(paths.cssSource, ['css']);
});
