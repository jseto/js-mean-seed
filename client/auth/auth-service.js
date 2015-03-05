'use strict';

angular.module( 'myApp.auth', [
	'lbServices', 
	'ngCookies'
])
.factory( 'auth', function( $rootScope, $q, $cookies, User, LoopBackAuth ){
	var _user = null;
	var _username = '';

	return {
		login: function( rememberMe, userCredentials, success, error ){
			this.logout();
			
			var defer = $q.defer();

			_user = {};
			_user.$promise = defer.promise;
			_user.$resolved = false;
			if ( typeof userCredentials === 'string' ){
				//social login
				window.location = '/auth/' + userCredentials;
				defer.resolve(true);
				_user.$resolved = true;
			}
			else {
				if ( userCredentials.credential ) {
					if ( userCredentials.credential.indexOf('@') > 0 ){
						userCredentials.email = userCredentials.credential;
					} 
					else {
						userCredentials.username = userCredentials.credential;	
					}
				}

				User.login({
						rememberMe: rememberMe || false
					}, 
					userCredentials, 
					function _success( data ){
						angular.extend( _user, data.user );
						defer.resolve( data.user );
						_user.$resolved = true;
						_username = _user.username;
						$rootScope.$broadcast('loggedIn', _user );
						if ( success ) success( data );
					}, 
					function _error( data ){
						defer.reject( data );
						_user.$resolved = true;
						if ( error ) error( data );
					}
				);
			}
			return _user;
		},

		logout: function() {
			if ( _user ) {
				User.logout();
				_user = null;
				_username = '';
				$rootScope.$broadcast('loggedOut' );
//				window.location = '/auth/logout';
    		}
		},

		isLoggedIn: function() {
			this.currentUser();
			return _username !== '';
		},

		currentUser: function(){
			if ( !_user ) {
				var defer = $q.defer();

				_user = {};
				_user.$promise = defer.promise;
				_user.$resolved = false;

//				var cookies = $cookies.getAll();   //only available on Angular v.1.4.0
				var cookies = $cookies;
				if ( cookies.access_token ){
					LoopBackAuth.currentUserId = cookies.userId.substr( 2, cookies.userId.indexOf('.')-2 );
					LoopBackAuth.accessTokenId = cookies.access_token.substr( 2, 64 );
					delete $cookies.userId;
					delete $cookies.access_token;
					LoopBackAuth.save();
				}

				User.getCurrent( 
					function success( data ){
						angular.extend(_user, data);
						defer.resolve( data );
						_user.$resolved = true;
						_username = _user.username;
						$rootScope.$broadcast('loggedIn', _user );
					},
					function error( data ){
						defer.reject( data );
						_user.$resolved = true;
					}
				);
			}
			return _user;
		},

		getUserName: function() {
			return _username;
		}
	};
});