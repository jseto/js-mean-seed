'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var runSequence = require( 'run-sequence' );
var server = require( './server.js' );
var Karma = require('karma').Server;
var protractorInst = require('gulp-protractor');
var jasmineNode = require('jasmine-node').run;
var utils = require('./utils.js');

var getBrowserFromCLI = function() {   		//CLI = Command Line Interface
	for( var i = 3; i < process.argv.length; i++ ) {
		if ( /-+browser=\w*/.test( process.argv[i] ) ) {
			return process.argv[i].substr( process.argv[i].indexOf('=') + 1 );
		}
		if ( /-+browser/.test( process.argv[i] ) ) {
			return process.argv[ i + 1 ];
		}
	}
	return null;
};

gulp.task('test:unit', function (done) {
	var opts = {
		configFile: path.test.base + 'karma.conf.js',
		singleRun: true,
		autoWatch: false,
	    reporters: [
	    	'progress',
    		'coverage'
    	],
	};

	var browser = getBrowserFromCLI();
	if ( browser ){
		browser = browser[0].toUpperCase() + browser.slice(1).toLowerCase();
		opts.browsers = [ browser ];
	}

	new Karma( opts , done).start();
});

gulp.task('watch:test:unit', function (done) {
	new Karma({
		configFile: path.test.base + 'karma.conf.js',
	}, done).start();
});

gulp.task('test:e2e', function(done){
	server.start({
		testing: true,
		taskName: 'test:e2e',
		port: project.testPort
	}, function(){
		var args = process.argv.slice(3);

		gulp.src(
			project.test.e2e.files
		)
		.pipe( protractorInst.protractor({
			configFile: path.test.base + 'protractor.conf.js',
			specs: '../test/client/auth/signup.e2e-spec.js',
			args: args
		}))
		.on('error', function(e) {
			server.stop( done, 'test:e2e' );
			throw e;
		})
		.on('end', function(){
			server.stop( done, 'test:e2e' );
		});
	})
	.on('error', function( error ){
		if ( error.code != 'EADDRINUSE' ){
			process.emit('error', error );
		}
	});
});

var testServer = function( done ){
	if (!done)done=function(){};

	jasmineNode({
		specFolders : project.test.server.folders,
		showColors: true,
		captureExceptions: true,
		onComplete: done
	});
};

gulp.task( 'test:server', testServer );

gulp.task( 'watch:test:server', function(){
	//TODO: not working on jasmine-node 2.0.0beta4
	// jasmineNode({
	// 	specFolders : project.test.server.folders,
	// 	watchFolders: ['common/models'],
	// 	showColors: true,
	// 	autoTest: true,
	// });

	var serverTestFiles = function(){
		var folders = [];
		for( var i in project.test.server.folders ){
			folders.push( project.test.server.folders[i] + '+(*.js|*.json)');
		}

		return folders.concat( project.watch.serverFiles ).concat( project.watch.modelFiles );
	};

	gulp.watch( serverTestFiles(), function( data ) {
		console.log( utils.printChangedFiles( data ) );
		testServer();
	});
});

gulp.task( 'test', function( done ){
	runSequence( 'test:unit', 'test:e2e', 'test:server', done );
});

// Downloads the selenium webdriver
gulp.task( 'webdriver-update', protractorInst.webdriver_update );
