'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var utils = require('./utils.js');
var path = project.path;

var browserSync = require( 'browser-sync' );
var fork = require('child_process').fork;

var serverApp = module.exports = {
	start: function( options, done ) {
		var args = [];
		args.push( options.port? String( options.port ) : String( project.port ) );
		if ( options.testing ){
			args.push( '--testing' );
		}
		var instance = serverApp.instance = fork( path.server + 'server.js', args, { silent: true } );
		instance.on('message', function(data){
			if ( data.message === 'started' ) {
				instance.emit('started');
				if (options.taskName){
					console.log( utils.printTaskName( options.taskName ), 'Server started');
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
			if ( options.taskName ){
				console.log( utils.printTaskName( options.taskName ), String( msg ).slice(0,-1) );
			} 
		});
		instance.stderr.on('data', function( msg ){
			console.log( utils.printTaskNameError( options.taskName ), String( msg ) );
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

	restart: function( options, done ){
		serverApp.stop(function(){
			serverApp.start( options, function(){
				if ( options.taskName ) {
					console.log( utils.printTaskName( options.taskName ), 'Server restarted');
				}
				if (done) done();
			});
		});
	}
};

gulp.task('server:start', function( done ){
	serverApp.start( {
		taskName: 'server:start' 
	}, function(){
		done();
	});
});

var watchServer = function( options, done  ){
	serverApp.start( options, done );
	gulp.watch( project.watch.serverFiles, function( data ){
		console.log( utils.printChangedFiles( data ) );
		options.taskName = 'watch:server';
		serverApp.restart( options, done );
	});
};

gulp.task( 'watch:server', function(){
	watchServer({
		testing: true,
		port: project.proxy.port
	}, browserSync.reload );
});

var browserSyncProxy = function(){
	browserSync({
		proxy: project.proxy.host + ':' + project.proxy.port,
		open: false,
		port: project.port,
		files: project.watch.servedFiles,
		notify: false
	});
};

gulp.task('watch:client-server', ['watch:server'], browserSyncProxy );

gulp.task( 'watch:client', function(){
	serverApp.start({
		testing: true,
		taskName: 'watch:client',
		port: project.proxy.port
	}, browserSyncProxy );
});
