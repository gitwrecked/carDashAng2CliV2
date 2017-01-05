var pkg = require('./package.json');
var gulp = require('gulp');
var beautify = require('gulp-jsbeautifier');

var defaultTasks = ['format'];

gulp.task('default', defaultTasks);

gulp.task('format', function() {
    return gulp.src([
            'client/src/app/**/*.{css,scss,ts,js,html}',
            'client/src/index.html',
            '!client/node_modules/**.*',
            'server/api/**.{js,json}',
            'server/models/**/*.{js,json}',
            'server/seed/**/*.{js,json}',
            '!server/node_modules/**.*',
            '!server/swagger/**.*',
            '!server/dist/**.*',
            'server/*.{js,json}',
            '*.{js,json}'
        ], {
            base: './'
        })
        .pipe(beautify())
        .pipe(gulp.dest('./'));
});

module.exports = gulp;