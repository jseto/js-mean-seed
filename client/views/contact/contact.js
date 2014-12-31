'use strict';

angular.module( 'myApp.contact', [
])

.config( function( $stateProvider ) {
	$stateProvider.state( 'contact', {
		url: '/contact',
		controller: 'ContactCtrl',
		templateUrl: 'contact/contact.html',
		data:{ pageTitle: 'contact' }
	});
})

.controller( 'ContactCtrl', function( $scope ) {
});

