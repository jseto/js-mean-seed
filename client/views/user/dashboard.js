'use strict';

angular.module( 'myApp.dashboard', [
	'permission'
])

.config( function ( $stateProvider ) {
	$stateProvider.state( 'dashboard', {
		url: '/dashboard',
		controller: 'DashboardCtrl',
		templateUrl: 'views/user/dashboard.html',
		data: {
			pageTitle: 'dashboard',
			permissions: {
				only: [
					'loggedIn'
				],
				redirectTo: 'login'
			}
		}
	});
})

.controller( 'DashboardCtrl', function( $scope, auth, promiseTracker ) {
	$scope.loadingUser = promiseTracker();
	$scope.user = auth.currentUser();
	$scope.loadingUser.addPromise( $scope.user.$promise );
});

