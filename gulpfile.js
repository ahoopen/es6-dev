var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    webpack = require("webpack"),
    webpackConfig = require('./webpack.config.js');

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint('eslint.json'))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('sass', function () {
    return gulp.src('sass/**/*.scss')
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('target'));
});

gulp.task('clean', function (map) {
    return gulp.src(map, {read: false})
        .pipe(clean());
});

// use default task to launch Browsersync and watch JS files
gulp.task('serve', function () {

    browserSync({
        files: ['target/*.js', 'target/*.html', 'target/*.css'],
        server: {
            baseDir: "./" // Change this to your web root dir
        }
    });
});

gulp.task('clean:build', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});


gulp.task('webpack:build', function (callback) {
    var config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpack(config, function (err) {
        if (err) throw err;
        callback();
    });
});

gulp.task('clean:dev', function () {
    return gulp.src('target', {read: false})
        .pipe(clean());
});


var devConfig = Object.create(webpackConfig);
var devCompiler = webpack(devConfig);

gulp.task('webpack:dev', function (callback) {
    // modify some webpack config options
    devConfig.output.filename = './target/bundle.js';
    devConfig.devtool = "sourcemap";
    devConfig.debug = true;

    devCompiler.run(function (err) {
        if (err) throw err;
        callback();
    });
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['lint', 'build']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['clean:dev', 'webpack:dev', 'sass', 'serve', 'watch'], function () {
    // This will only run if the lint task is successful...
});

gulp.task('compile', ['clean:build', 'webpack:build']);
