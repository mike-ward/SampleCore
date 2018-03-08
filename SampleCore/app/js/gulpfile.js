var gulp = require('gulp-npm-run')(require('gulp'));
var sequence = require('run-sequence');

var watcher = gulp.watch('**/*.ts', ['default']);

gulp.task('default', function(done) {
  sequence('dev-build', 'test', done);
});