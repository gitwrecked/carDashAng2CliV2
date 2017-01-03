var pkg = require('./package.json');
var gulp = require('gulp');
var beautify = require('gulp-jsbeautifier');

var defaultTasks = ['format'];

gulp.task('default', defaultTasks);

gulp.task('format', function() {
    return gulp.src([
            'client/src/app/**/*.scss',
            'client/src/app/**/*.ts',
            'client/src/index.html',
            '*.{js,json}'
        ], {
            base: './'
        })
        .pipe(beautify())
        .pipe(gulp.dest('./'));
});

module.exports = gulp;