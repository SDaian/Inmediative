var gulp = require('gulp'),
watch = require('gulp-watch');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');




var del = require('del');
var cache = require('gulp-cache');


//Clean dist folder
gulp.task('clean', function() {
 return del.sync('dist/css');
})

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

var input = './css/**/*.css';
var output = './css';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
gulp.task('prefix', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest(output));
});

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
    	.pipe(concat('style.min.css'))
    	.pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['clean'] , function() {

    gulp.watch([ 'sass/**/*.sass'], ['sass','prefix', 'minify-css']);

});


