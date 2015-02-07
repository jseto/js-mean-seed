'use strict';

//* App Module 

angular.module('myApp', [
	'ui.router',
	'myApp.home',
	'myApp.header',
	'myApp.footer',
	'myApp.contact',
	'myApp.signup',
	'myApp.signin',
	'myApp.dashboard',
	'myApp.responsiveBody',
	'ui.bootstrap',
	'jsLib.locale',
	'jsWidgets',
	'ajoslin.promise-tracker',
	'lbServices',
	'ngAnimate',
	'ngMessages'
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

.run( function run ( $rootScope, $state, $stateParams ) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})

.controller( 'AppCtrl', [ '$scope', 'locFilter', function ( $scope, locFilter ) {
	//*** Sets page title 
	$scope.$on('$stateChangeSuccess', function( event, toState ){
		//** Appends ' - MyApp' to page title 
		if ( angular.isDefined( toState.data.pageTitle ) ) {
			$scope.pageTitle = locFilter( 'pageTitle.' + toState.data.pageTitle ) + ' - MyApp';
		}
	});
}])

;

