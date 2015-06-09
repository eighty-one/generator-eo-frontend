var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    browserify = require('browserify'),
    glob = require('glob'),
    _ = require('underscore'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint');

require('gulp-grunt')(gulp);

gulp.task('css', function() {
    return sass('<%= sassPath %>', {style: 'expanded'})
        .pipe(minifycss())
        .pipe(gulp.dest('<%= baseAssetPath %>css'))
        .pipe(browserSync.stream());
});


gulp.task('icon', function() {
    gulp.run('grunt-icon');
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "<%= developmentUrl %>"
    });
});

gulp.task('browserify', function(done) {

    function bundleJavaScript(srcs) {

        var b = browserify(srcs);

        b.bundle()
            .pipe(source('site.bundled.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(path.join('./<%= baseAssetPath %>', "javascript")))
            .on('end', function() {
                done();
            });

    }

    bundleJavaScript(glob.sync('./<%= jsPath %>site.js'));

});

gulp.task('lint', function() {

    return gulp.src(['./<%= jsPath %>**/*.js'])
        .pipe(plumber())
        .pipe(jshint({
            jquery: false
        }))
        .pipe(jshint.reporter('default'));

});


gulp.task('jsonly', ['browserify'], function(){});

gulp.task('js', ['lint', 'browserify'], function() {});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('./<%= sassPath %>**/*.scss', ['css']);
    gulp.watch('./<%= jsPath %>**/*.js', ['jsonly']);
    gulp.watch('./<%= webRootPath %>**/*.html').on('change', browserSync.reload);
    gulp.watch('./<%= webRootPath %>**/*.ss').on('change', browserSync.reload);
    gulp.watch('./<%= webRootPath %>**/*.ss').on('change', browserSync.reload);

});

gulp.task('build', ['js', 'css', 'icon'], function(done) {
    done();
});

gulp.task('default', ['build'], function() {});