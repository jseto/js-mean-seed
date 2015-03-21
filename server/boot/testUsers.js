'use strict';

module.exports = function(app) {
	var users = [
	    {username: 'foo', email: 'foo@example.com', password: 'opensesame', emailVerified: true },
	    {username: 'bar', email: 'bar@example.com', password: 'opensesame', emailVerified: true },
	    {username: 'admin', email: 'admin@example.com', password: 'opensesame', emailVerified: true }
	];
	app.models.user.create( users, function( err ) {
		if (err) {
			console.error('Cannot create test users');
		}
		else {
//			console.log('Test users created\n', users );
		}
	});	
};
