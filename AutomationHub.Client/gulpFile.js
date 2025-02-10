//Task to copy files from src/i18n/locales to static/locales
const gulp = require('gulp');
var fs = require('fs');

gulp.task('copy-locales', function () {
    //not required for local development as we are using symlinks to the locale folder
    return gulp.src('/i18n/locales/**/*', { root: '/src' })
        .pipe(gulp.dest('/build/static/locales'));
});

gulp.task('symlink-locales', function (done) {
    if (fs.existsSync('public/static/locales')) {
        fs.unlinkSync('public/static/locales');
    }
    fs.symlink('../../src/i18n/locales', 'public/static/locales', 'junction', function (err) {
        if (err) {
            console.error('An error occurred while creating symlink:', err);
        } else {
            console.log('Symlink created successfully');
        }
        done();
    });
});