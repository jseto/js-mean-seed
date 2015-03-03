'use strict';

angular.module( 'myApp.auth', [
	'lbServices'
])
.factory( 'auth', function( $rootScope, $q, User ){
	var _user = null;
	var _username = '';

	return {
		login: function( rememberMe, userCredentials, success, error ){

			this.logout();

			if ( userCredentials.credential ) {
				if ( userCredentials.credential.indexOf('@') > 0 ){
					userCredentials.email = userCredentials.credential;
				} 
				else {
					userCredentials.username = userCredentials.credential;	
				}
			}
			
			var defer = $q.defer();

			_user = {};
			_user.$promise = defer.promise;
			_user.$resolved = false;

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

			return _user;
		},

		logout: function() {
			if ( _user ) {
				User.logout();
				_user = null;
				_username = '';
				$rootScope.$broadcast('loggedOut' );
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