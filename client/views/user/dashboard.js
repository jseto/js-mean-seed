'use strict';

angular.module( 'myApp.dashboard', [
])

.config( function ( $stateProvider ) {
	$stateProvider.state( 'dashboard', {
		url: '/dashboard',
		controller: 'DashboardCtrl',
		templateUrl: 'views/user/dashboard.html',
		data:{ pageTitle: 'dashboard' }
	});
})

.controller( 'DashboardCtrl', function( $scope ) {
});

