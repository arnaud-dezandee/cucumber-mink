var gulp   = require('gulp'),
    header = require('gulp-header'),
    eslint = require('gulp-eslint');

gulp.task('lint', function() {
  return gulp.src(['./lib/**/*.js', './test/**/*.js', './examples/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('licensing', function() {
  var license = [
    '/**',
    ' * The MIT License (MIT)',
    ' *',
    ' * Copyright (c) 2015 Arnaud Dezandee',
    ' *',
    ' * Authors:',
    ' *     Arnaud Dezandee <dezandee.arnaud@gmail.com>',
    ' */',
    '\n'
  ].join('\n');

  return gulp.src('./lib/**/*.js')
    .pipe(header(license))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('default',  ['lint']);
