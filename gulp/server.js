'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var utils = require('./utils.js');
var path = project.path;

var browserSync = require( 'browser-sync' );
var nodemon = require( 'nodemon' );
var fork = require('child_process').fork;
var gutil = require('gulp-util');

var serverApp = {
	start: function(done, taskName) {
		var instance = serverApp.instance = fork( path.server + 'server.js', {
			silent: true
		});
		instance.on('message', function(data){
			if ( data.message === 'started' ) {
				done();
			}
		});
		instance.stdout.on('data', function( msg ){
			if ( taskName ) {
				msg = '' + msg;
				console.log( utils.printTaskName( taskName ), msg );
			}
		});
		instance.stderr.on('data', function( msg ){
				msg = '' + msg;
				console.error( utils.printTaskNameError( 'serverApp' ), msg );
		});
	},

	stop: function(done, taskName) {
		if ( serverApp.instance ) {
			serverApp.instance.on('exit', function(){
				if ( taskName ) {
					console.log( utils.printTaskName( taskName ), 'Shutting down server');
				}
				done();
			});
			serverApp.instance.kill('SIGINT');
		}
		else {
			done();
		}
	},

	restart: function( done, taskName ){
		serverApp.stop(function(){
			serverApp.start( function(){
				if ( taskName ) {
					console.log( utils.printTaskName( taskName ), 'Server restarted');
				}
				if (done) done();
			});
		});
	}
};

gulp.task('server:start', function( done ){
	serverApp.start( function(){
		done();
	}, 'server:start');
});

gulp.task('mytest', function(){
	serverApp.restart( null, 'mytest');
});

gulp.task( 'watch:server', function(){
	var pl = require('path');
	gulp.watch( project.watch.serverFiles, function( data ){
		console.log( utils.printTaskName( 'watch:server' ), 
			gutil.colors.cyan( 'File', data.type ), 
			gutil.colors.magenta( pl.relative( path.base, data.path ) ) );
		serverApp.restart(null, 'watch:server');
	});
});

gulp.task('watch:browser:proxy', ['watch:server:proxy'], function() {
	browserSync({
		proxy: project.proxy.host + ':' + project.proxy.port,
		open: false,
		port: project.port,
		files: project.watch.servedFiles
	});
});
/*
gulp.task('watch:server:proxy', function(){
	return nodemon({
		script: path.server + 'server.js',
		args: [ String(project.proxy.port) ],
		ext: 'js json ejs jade',
		watch: project.watch.serverFiles
	})
	.on('message', function(){
		console.log('-----------------------------------------------')
	})
	.on('restart', function () {
		setTimeout( function(){			//TODO: capture server.js 'started' event
			browserSync.reload();		//setTimeout is just a workaround, so remove when done
		}, 1000);
	});
});
*/
gulp.task('develop', ['watch:browser:proxy', 'watch:test:unit']);
gulp.task('develop:quiet', ['watch:browser:proxy', 'watch:test:unit:quiet']);

gulp.task('develop:docs', ['watch:browser:proxy', 'watch:docs']);
