'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var runSequence = require( 'run-sequence' );
var server = require( './server.js' );
var karma = require('karma').server;
var protractorInst = require('gulp-protractor');
var jasmineNode = require('jasmine-node').run;
var utils = require('./utils.js');

var getBrowserFromCLI = function() {   		//CLI = Command Line Interface
	var cliOption = process.argv.slice(3)[0]; 
	if ( cliOption ){
		return cliOption.slice( cliOption.lastIndexOf('-')+1 );
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

	karma.start( opts , done);
});

gulp.task('watch:test:unit', function (done) {
	karma.start({
		configFile: path.test.base + 'karma.conf.js',
	}, done);
});

gulp.task('test:e2e', function(done){
	server.start( function(){
		var args = [];

		var browser = getBrowserFromCLI();
		if ( browser ){
			args.push('--browser');
			args.push( browser.toLowerCase() );
		}

		gulp.src( 
			project.test.e2e.files 
		)
		.pipe( protractorInst.protractor({
			configFile: path.test.base + 'protractor.conf.js',
			args: args
		}))
		.on('error', function(e) { 
			server.stop( null, 'test:e2e' );
			throw e; 
		})
		.on('end', function(){
			server.stop( null, 'test:e2e' );
			done();
		});
	}, 'test:e2e' )
	.on('error', function( error ){
		if ( error.code != 'EADDRINUSE' ){
			process.emit('error', error );
		}
	});
});

var testServer = function(){
	jasmineNode({
		specFolders : project.test.server.folders,
		showColors: true,
		captureExceptions: true
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

		return folders.concat( project.watch.serverFiles );
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
gulp.task( 'webdriver-start', protractorInst.webdriver_standalone );

gulp.task( 'elementor', function( done ) {
	var exec = require('child_process').exec;
	exec ( 'elementor localhost:' + project.port, function(){
		done();
	});
});

gulp.task('protractor-qa', function() {
	console.warn('************************* THIS TASK IS NOT WORKING PROPERLY*****');
	//Presumably, there is a bug in protractor-qa
	var protractorQA = require('gulp-protractor-qa');
	protractorQA.init({
		testSrc : [
			path.test.e2e + '**/*e2e-spec.js',
			path.test.e2e + '**/*pageobject.js'
		],
		viewSrc : path.client + '**/*.html'
	});
});

