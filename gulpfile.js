var gulp = require('gulp'); //compiler
var watch = require('gulp-watch');//listens for changes
var concat = require('gulp-concat');//concatenates files into one
var annotate = require('gulp-ng-annotate');//notes any errors in terminal
var uglify = require('gulp-uglify');//minifies
var sass = require('gulp-sass');//sass package for both sass and scss
var less = require('gulp-less');//less package
var css = require('gulp-css');//css package

var paths = {//setting up source locations to watch for new files and files changes for each language
  jsSource: ['./public/app/**/*.js'],
  sassSource: ['./public/styles/**/*.sass', './public/styles/**/*.scss'],
  lessSource: ['./public/styles/**/*.less'],
  cssSource: ['./public/styles/**/*.css']
};

//tasks tells gulp what to do with these files
gulp.task('sass', function(){//name the type of files
  return gulp.src(paths.sassSource) //source the path
    .pipe(sass()) //run the sass package
    .pipe(concat('styles.css'))//concatenate to styles.css file
    .pipe(gulp.dest('./public'));//tells gulp wheres to put styles.css file
});

//same as sass
gulp.task('less', function(){
  return gulp.src(paths.lessSource)
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public'));
});

//same as sass
gulp.task('css', function(){
  return gulp.src(paths.cssSource)
    .pipe(css())
    .pipe(concat('styler.css'))
    .pipe(gulp.dest('./public'));
});

//mostly same as sass
gulp.task('js', function(){
  return gulp.src(paths.jsSource)
    .pipe(concat('bundle.js'))
    .pipe(annotate())//notes any errors if any
    .pipe(uglify())//minifies code
    .pipe(gulp.dest('./public'));
});

//gulp watch setup for each type of file
gulp.task('default', ['watch', 'js', 'sass', 'less', 'css']);

//listener for each type of file referencing location and name
gulp.task('watch', function(){
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.sassSource, ['sass']);
  gulp.watch(paths.lessSource, ['less']);
  gulp.watch(paths.cssSource, ['css']);
});
