'use strict';

var gulp = require('gulp');
var project = require('../project.conf.js');
var path = project.path;

var del = require('del');
var less = require('gulp-less');
var utils = require('./utils.js');

gulp.task('clean', [ 'clean:docs', 'clean:coverage' ]);

gulp.task('clean:docs', function( done ){
	del( [ path.docs + '**'], done );
});

gulp.task('clean:coverage', function(done){
	del( [ path.coverage + '**'], done );
});

var processLess = function(){
	var p = require('path');
	var LessPluginAutoPrefix = require('less-plugin-autoprefix');
	var autoprefix = new LessPluginAutoPrefix( { 
//		browsers: ["last 2 versions"] 
	});

	gulp.src( project.appLess )
		.pipe( less({
			plugins: [ autoprefix ],
			verbose: true	
		}))
		.pipe( gulp.dest( project.appCss ) );

	console.log( 
		utils.printTaskName( 'less' ), 
		'Created', utils.relPath( project.appCss ) + '/' +
		p.basename(project.appLess, '.less') + 
		'.css' 
	);
};

gulp.task( 'less', processLess );

gulp.task( 'watch:less', function(){
	gulp.watch( project.watch.lessFiles, function( data ){
		console.log( utils.printChangedFiles(data) );
		processLess('watch:less');
	});
});