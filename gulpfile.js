var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    jscs    = require('gulp-jscs');

gulp.task('lint', function() {
  return gulp.src(['./lib/**/*.js', './test/**/*.js', './examples/**/*.js'])
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default',  ['lint']);
