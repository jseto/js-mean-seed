'use strict';

angular.module( 'myApp.home', [
])

.config( function ( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/home',
		controller: 'HomeCtrl',
		templateUrl: 'views/home/home.html',
		data:{ pageTitle: 'home' }
	});
})

.controller( 'HomeCtrl', function HomeControler() {
});

