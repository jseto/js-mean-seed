'use strict';

angular.module( 'myApp.header', [
	'myApp.signin'
])

.directive('header', function () {
	return {
		restrict: 'A', 
		replace: false,
		templateUrl: 'views/header/header.html',
		controller: 'HeaderCtrl'
	};
})

.controller( 'HeaderCtrl', function HeaderControler( $scope ) {
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
});

