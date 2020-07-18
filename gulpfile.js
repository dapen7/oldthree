var gulp = require('gulp');
var connect = require('gulp-connect');
var fileinclude = require('gulp-file-include');
var jade = require('gulp-jade')
var path = require('path')
var cache = require('gulp-cache')
var gulpCopy = require('gulp-copy');

var rootPath = "src"
var sourceFiles = ["img", "css", "js"].map(item => path.join(rootPath, item + "/**/*"));
var outputPath = 'dist/';

gulp.task('watchPage', function (cb) {
    gulp.watch(["pages/**/*", '!node_modules/**'], gulp.series(['fileInclude']));
    cb();
});

gulp.task('watchSrc', function (cb) {
    gulp.watch([rootPath + "/**", '!node_modules/**'], gulp.series(['copy']));
    cb();
});

gulp.task('watchDist', function (cb) {
    gulp.watch([outputPath + "**", '!node_modules/**'], gulp.series(['reload']));
    cb();
});

gulp.task('reload', function (cb) {
    gulp.src(['**', '!node_modules/**']).pipe(connect.reload());
    cb();
});

gulp.task('copy', function (cb) {
    gulp.src(sourceFiles).pipe(gulp.dest(outputPath))
    cb()
})

gulp.task('fileInclude', function (cb) {
    gulp.src('pages/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
        }))
        // .pipe(jade({pretty: true}))
        .pipe(gulp.dest(outputPath));
    cb();
});

gulp.task('server', function (cb) {
    connect.server({
        root: './',
        livereload: true,
        host:"0.0.0.0",
        port: 8030
    });
    cb();
});

gulp.task('start', function (cb) {
    connect.server({
        root: './' + outputPath,
        livereload: true,
        port: 8031
    });
    cb();
});


gulp.task('default', gulp.series(['copy', 'watchPage', 'watchSrc', "start"]));