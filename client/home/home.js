'use strict';

angular.module( 'myApp.home', [
	'ui.router'
])

.config( function ( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/home',
		controller: 'HomeCtrl',
		templateUrl: 'home/home.html',
		data:{ pageTitle: 'home' }
	});
})

.controller( 'HomeCtrl', function HomeControler( $scope ) {
});

