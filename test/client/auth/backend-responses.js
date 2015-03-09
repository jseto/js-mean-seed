'use strict';

jasmine.response = {
	responseGET: function( who ){
		var loggedUser = 1 + (who === 'bar') + 2*(who === 'social');
		var displayName = who === 'social'? who : null;
		return {
			'displayName': displayName,
			'username': who,
			'email': who + '@example.com',
			'emailVerified':true,
			'id': loggedUser
		};
	},

	responsePOST: function( who ) {
		var user = this.responseGET( who );
		return {
			'id': who + 'lvCSX1juCWzSGZpWGIXlJuJjr1S5Si0rw4333IaR3tPYGiByd1QQj34kRgaSG',
			'ttl':1209600,
			'created':'2015-02-23T17:53:44.598Z',
			'userId': user.id,
			'user': user
		};
	}
};

