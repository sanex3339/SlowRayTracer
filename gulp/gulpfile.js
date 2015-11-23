'use strict';

let browserify  = require("browserify"),
    browserSync = require('browser-sync'),
    data = require('gulp-data'),
    each = require('async-each'),
    fs = require('fs'),
    gulp = require('gulp'),
    sequence = require('gulp-sequence'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    replace = require('gulp-replace'),
    reload = browserSync.reload,
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer");


/* PARAMS */

let config = {
    server: {
        baseDir: '../dest/'
    },
    tunnel: false,
    port: 9000,
    reloadOnRestart: true,
    logPrefix: 't.kachalov'
};

gulp.task('default', ['build']);

gulp.task('build', ['bundle', 'webserver', 'watch']);

/* TASKS FOR BUILDING */

/* build html */

gulp.task('html', () => {
    gulp.src('../src/index.html')
        .pipe(plumber())
        .pipe(gulp.dest('../dest/'));
});

/* build js */

gulp.task('js', () => {
    var reservedVariables = [];

    return gulp.src('../src/PathTracer/**/*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts({
            module : "commonjs",
            target : "ES5",
            typescript: require('typescript')
        }))
        .pipe(data(function(file) {
            let results,
                result,
                res;

            results = String(file.contents).match(/function[^(]*\(([^)]*)\)/g);

            for (result in results) {
                res = results[result].match(/function[^(]*\(([^)]*)\)/)[1].split(',');

                res.forEach((value) => {
                    if (value === '') {
                        return false;
                    }

                    if (/I[A-Z]\w*/.test(value)) {
                        reservedVariables.push(value);
                    }
                });
            }

            reservedVariables = reservedVariables.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });

            return  reservedVariables;
        }))
        .pipe(replace(/\$\(/g, 'jQuery('))
        .pipe(replace(/\$\./g, 'jQuery.'))
        .pipe(uglify({
            mangle: {
                except: reservedVariables
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../src/Compiled'));
});

gulp.task('bundle', ['js', 'html'], () => {
    let ba = browserify({
        standalone : 'PathTracer',
        entries: [
            "../src/Compiled/PathTracer.js",
        ],
        debug: true
    });

    let bb = browserify({
        standalone : 'TraceWorker',
        entries: [
            "../src/Compiled/TracerWorker.js"
        ],
        debug: true
    });

    ba.bundle()
        .pipe(source("PathTracer.js"))
        .pipe(buffer())
        .pipe(gulp.dest("../dest/"));

    return bb.bundle()
        .pipe(source("TracerWorker.js"))
        .pipe(buffer())
        .pipe(gulp.dest("../dest/"));
});

gulp.task('reload', ['bundle'], () => {
    reload();
});

/* TASKS FOR WATCHERS AND SERVER */

gulp.task('watch', () => {
    gulp.watch('../src/PathTracer/**/*.js', ['reload']);
    gulp.watch('../src/*.html', ['reload']);
});

gulp.task('webserver', () => {
    browserSync(config);
});