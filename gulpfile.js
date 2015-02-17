'use strict';

var gulp = require('gulp');

var project = require('./project.conf.js');
var path = project.path;

require('require-dir')('./gulp');

var del = require('del');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');

gulp.task('default', ['develop']);

gulp.task('pristine', ['clean'], function( done ){
	del([
		path.bower + '**',
		'node_modules/**'
	], function(){
		var git = spawn('git', ['clean', '-d', '-fx', '-e', '*.local.json']);
		var stdout='';
		var stderr='';

		git.stdout.setEncoding('utf8');
		git.stdout.on('data', function (data) {
			stdout += data;
			gutil.log(data);
		});

		git.stderr.setEncoding('utf8');
		git.stderr.on('data', function (data) {
			stderr += data;
			gutil.log(gutil.colors.red(data));
			gutil.beep();
		});

		git.on('close', function(code) {
			gutil.log('Done with exit code', code);
			done();
		});        
	});
});

gulp.task( 'show:config', function(){
	console.log( JSON.stringify( project, null, 2 ) );
});

gulp.task( 'postinstall', ['webdriver-update', 'build:all'] );

gulp.task( 'develop', ['watch:client', 'watch:test:unit', 'watch:less', 'watch:ng-models'] );

gulp.task( 'develop:server', ['watch:server', 'watch:test:server'] );

gulp.task( 'develop:all', [
	'watch:client-server',
	'watch:test:unit',
	'watch:test:server',
	'watch:less',
	'watch:ng-models'
]);