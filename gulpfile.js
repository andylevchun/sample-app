var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

var JS_SOURCE_FILE = './src/AppBundle/Resources/assets/js/main.js';
var JS_TARGET_FOLDER = './web/bundles/app/js';
var CSS_SOURCE_FILE = './src/AppBundle/Resources/assets/gfx/scss/main.scss';
var CSS_TARGET_FOLDER = './web/bundles/app/css';

Array.prototype.contains = function () {
    var self = this;
    var argv = [].slice.call(arguments);

    return (argv.length > 1) ? argv.every( function (el) { return self.indexOf(el) > -1 } ) : self.indexOf(argv[0]) > -1;
};

var argv = [].slice.call(process.argv, 3);
var min = argv.contains('--min');

// application js
gulp.task('app.js', function () {
    return gulp.src(JS_SOURCE_FILE)
      .pipe(gulpif(min, uglify()))
      .pipe(gulp.dest(JS_TARGET_FOLDER));
});

// application css
gulp.task('app.css', function () {
    return gulp.src(CSS_SOURCE_FILE)
        .pipe(sass({ errLogToConsole: true }))
        .pipe(concat('main.css'))
        .pipe(gulpif(min, cssnano()))
        .pipe(gulp.dest(CSS_TARGET_FOLDER));
});

// default
gulp.task('default', ['app.js', 'app.css']);

// watcher
gulp.task('app-watch', function() {
    gulp.watch(JS_SOURCE_FILE, ['app.js']);
    gulp.watch(CSS_SOURCE_FILE, ['app.css']);
});