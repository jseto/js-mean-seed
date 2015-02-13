'use strict';

var gutil = require('gulp-util');

module.exports = {
	printTaskName: function( name ) {
		return '[' + gutil.colors.blue( name ) + ']';
	},

	printTaskNameError: function( name ) {
		return '[' + gutil.colors.red( name ) + ']';
	}
};