'use strict';

var fs = require('fs');
var bower = JSON.parse( fs.readFileSync( './.bowerrc', 'utf8' ) );

var basePath = __dirname;
var path = {
	base: basePath,
	client: basePath + '/client/',
	server: basePath + '/server/',
	test: basePath + '/test/',
	bower: basePath + '/' + bower.directory + '/',
	docs: basePath + '/docs/',
	coverage: basePath + '/coverage/'
};

module.exports = {
	port: 3000,
	proxy: {
		host: 'http://localhost',
		port: 3030
	},
	path: path,
	watch: {
		servedFiles: [
			path.client + '**/+(*.js|*.html|*.css)',
			'!' + path.bower + '**/+(*.js|*.html|*.css)',			//excluded
		],
		serverFiles: [
			path.server + '**/+(*.js|*.json|*.ejs|*.jade)',
			path.base + '/common/**/+(*.js|*.json)'			
		],
		docFiles: [
			path.client + '**/*.js'
		]
	},
	test:{
		unit:{
			files : [
				path.bower + 'angular/angular.js',
				path.bower + 'angular-mocks/angular-mocks.js',
				path.bower + 'js-lib/lib/**/*.js',
				path.client + 'views/**/*.js',
				path.client + 'auth/**/*.js',
				path.client + 'models/**/*.js',
				path.client + 'directives/**/*.js',
				path.test + '/**/*.js',
			]
		},
		e2e: {
			files: [
				path.test + '**/*e2e-spec.js'
			]
		}
	}
};