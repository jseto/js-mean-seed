'use strict';

//* App Module 

angular.module('myApp', [
	'ui.router',
	'myApp.home',
	'myApp.header',
	'myApp.footer',
	'myApp.contact',
	'myApp.signup',
	'myApp.loginPanel',
	'myApp.dashboard',
	'myApp.responsiveBody',
	'myApp.auth',
	'ui.bootstrap',
	'jsLib.locale',
	'jsLib.widgets',
	'ajoslin.promise-tracker',
	'lbServices',
	'ngAnimate',
	'ngMessages',
	'permission'
])

.config( function( $urlRouterProvider, $locationProvider, $httpProvider, LocaleProvider ) {
	//*** Default route setup 
	$urlRouterProvider.otherwise( '/home' );
	
	//*** Remove # from url 
	$locationProvider.html5Mode(true);

	//*** Locale setup 
	LocaleProvider.setLocale('en');
	LocaleProvider.setLocalePath('locale/');
})

.run( function run ( $rootScope, $state, $stateParams, Permission, auth ) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

	Permission.defineRole('loggedIn', function () {
		return auth.currentUser().$promise;
	});
})

.controller( 'AppCtrl', function ( $scope, $state, locFilter ) {
	//*** Sets page title 
	$scope.$on('$stateChangeSuccess', function( event, toState ){
		//** Appends ' - MyApp' to page title 
		if ( angular.isDefined( toState.data.pageTitle ) ) {
			$scope.pageTitle = locFilter( 'pageTitle.' + toState.data.pageTitle ) + ' - MyApp';
		}
	});

	//*** Redirects on logout
	$scope.$on('loggedOut', function(){
		$state.go('home');
	});
})

;

