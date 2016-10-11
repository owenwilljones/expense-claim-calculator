var gulp = require('gulp'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	reactify = require('reactify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer');

gulp.task('default', ['prod-mode', 'watch']);

gulp.task('watch', function() {
	gulp.watch('source/**/*.*', ['package']);
});

gulp.task('package', function() {
	var b = browserify({
		entries: 'source/main.js',
		debug: true,
		transform: [reactify]
	});

	return b.bundle ()
		  .pipe(source('source/main.js'))
		  .pipe(buffer())
		  .pipe(uglify())
		  .pipe(gulp.dest('./output'));
});

gulp.task('prod-mode', function() {
	process.env.NODE_ENV = 'production';
});