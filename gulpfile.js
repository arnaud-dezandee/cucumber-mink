var gulp   = require('gulp'),
    gulpIf = require('gulp-if'),
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

  function needsLicense(file) {
    return file.contents.toString().indexOf(license) === -1;
  }

  return gulp.src('./lib/**/*.js')
    .pipe(gulpIf(needsLicense, header(license)))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('default',  ['lint']);
