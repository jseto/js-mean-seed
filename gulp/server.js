'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var utils = require('./utils.js');
var path = project.path;

var browserSync = require( 'browser-sync' );
var fork = require('child_process').fork;
var gutil = require('gulp-util');

var serverApp = module.exports = {
	start: function(done, taskName, port ) {
		var args = port? [ String( port ) ] : [ String( project.port ) ];
		var instance = serverApp.instance = fork( path.server + 'server.js', args, { silent: true } );
		instance.on('message', function(data){
			if ( data.message === 'started' ) {
				instance.emit('started');
				if (taskName){
					console.log( utils.printTaskName( taskName ), 'Server started');
				}
			}
			if ( data.message === 'error' ) {
				var error = new Error(data.error.syscall + ' ' + data.error.errno);
				for ( var key in data.error ){
					error[key] = data.error[ key ];
				}
				instance.emit('error', error );
			}
			if (done) done();
		});
		instance.stdout.on('data', function( msg ){
			if ( taskName ){
				console.log( utils.printTaskName( taskName ), String( msg ).slice(0,-1) );
			} 
		});
		instance.stderr.on('data', function( msg ){
			console.log( utils.printTaskNameError( taskName ), String( msg ) );
		});
		return instance;
	},

	stop: function(done, taskName) {
		if ( serverApp.instance ) {
			serverApp.instance.on('exit', function(){
				if ( taskName ) {
					console.log( utils.printTaskName( taskName ), 'Server shutdown');
				}
				if (done) done();
			});
			serverApp.instance.kill('SIGINT');
		}
		else {
			done();
		}
	},

	restart: function( done, taskName, port ){
		serverApp.stop(function(){
			serverApp.start( function(){
				if ( taskName ) {
					console.log( utils.printTaskName( taskName ), 'Server restarted');
				}
				if (done) done();
			}, null, port);
		});
	}
};

gulp.task('server:start', function( done ){
	serverApp.start( function(){
		done();
	}, 'server:start');
});

var watchServer = function( done, port ){
	serverApp.start( done , null, port );
	gulp.watch( project.watch.serverFiles, function( data ){
		console.log( utils.printChangedFiles( data ) );
		serverApp.restart( done , 'watch:server', port);
	});
};

gulp.task( 'watch:server', function(){
	watchServer( browserSync.reload, project.proxy.port );
});

var browserSyncProxy = function(){
	browserSync({
		proxy: project.proxy.host + ':' + project.proxy.port,
		open: false,
		port: project.port,
		files: project.watch.servedFiles
	});
};

gulp.task('watch:client-server', ['watch:server'], browserSyncProxy );

gulp.task( 'watch:client', function(){
	serverApp.start( browserSyncProxy, 'watch:client', project.proxy.port );
});