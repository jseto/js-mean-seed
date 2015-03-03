'use strict';

angular.module( 'myApp.header', [
	'myApp.auth'
])

.directive('header', function () {
	return {
		restrict: 'A', 
		replace: false,
		templateUrl: 'views/header/header.html',
		controller: 'HeaderCtrl'
	};
})

.controller( 'HeaderCtrl', function HeaderControler( $scope, auth ) {
	/*** setup for activeTab to change active button*/
	var activePage = '';
	$scope.$on('$stateChangeSuccess', function( event, toState ){
		activePage = toState.name;
	});
	$scope.activeTab = function( name ) {
		if ( name == activePage ) {
			return 'active';
		}
		else {
			return '';
		}
	};

	$scope.signOut = function(){
		auth.logout();
	};

	$scope.username = auth.getUserName();

	$scope.$on('loggedIn', function( mgs, user ){
		$scope.username = user.username;
		$scope.loggedIn = true;
	});

	$scope.$on('loggedOut', function(){
		$scope.username = null;
		$scope.loggedIn = false;
	});
});

