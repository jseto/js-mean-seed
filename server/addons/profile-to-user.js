'use strict';

//Create a Loopback user from social profile

var profileProvider = function( profile ) {
	var provider = profile.provider;
	var email = profile.emails && profile.emails[0] && profile.emails[0].value;
	if (!email) {
		// Fake an e-mail
		email = (profile.username || profile.id) + '@loopback.' + profile.provider + '.com';
	}

	var userObj = {
		username: provider + '.' + (profile.username || profile.id),
		password: String(Math.random()).substr(2),
		email: email,
		displayName: profile.displayName,
		gender: profile.gender || profile._json.gender,
		picture: ( profile.photos && profile.photos[0].value ) || profile._json.picture,
		locale: (profile._json.locale && profile._json.locale.substr( 0, 2 ) ) || profile._json.lang,
	};

	var socialLink = profile._json.link || ( provider === 'twitter' && profile.username );
	if (socialLink){
		userObj.profileLink = {};
		userObj.profileLink[ provider ] = socialLink;
	}

	return userObj;
};

var facebookProvider = function( profile ) {
	var userObj = profileProvider( profile );
	
	userObj.picture = userObj.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
	
	return userObj;
};

var twitterProvider = function( profile ){
	var userObj = profileProvider( profile );
	
	userObj.picture = userObj.picture.replace('_normal','');
	userObj.profileLink.twitter =  profile.username;

	return userObj;
};


function profileToUser(provider, profile) {
	var userObj;

	switch (provider) {
		case 'facebook-login':
			userObj = facebookProvider( profile );
			break;
		case 'twitter-login':
			userObj = twitterProvider( profile );
			break;
		default:
			userObj = profileProvider( profile );
			break;
	}
	return userObj;
}

module.exports = profileToUser;