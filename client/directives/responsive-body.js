'use strict';

angular.module( 'myApp.responsiveBody', [
	'jsLib.sprintf'
])

.directive('responsiveBody', function( sprintfFilter, $rootScope ){
	return {
		scope: {
			responsiveBody: '&'
		}, 
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		template: function( element, attrs ) {
			var html = [
				'<div class=\"container\">',
				'	<div class=\"row\">',
				'		<div id="__responsiveBody_1_" class=\"col-sm-{0}\"></div>',
				'		<div id="__responsiveBody_2_" class=\"col-sm-{1}\">',
				'			<div ng-transclude></div>',
				'		</div>',
				'		<div id="__responsiveBody_3_" class=\"col-sm-{2}\"></div>',
				'	</div>',
				'</div>' 
			].join('\n'); 

			var responsiveBody = $rootScope.$eval( attrs.responsiveBody );
			var rb = [];

			switch( typeof responsiveBody ) {
				case 'number':
					rb[0] = rb[2] = (12 - responsiveBody)/2>>0; //integer division
					rb[1] = 12 - rb[0] * 2;
					break;
				case 'object':
					rb = responsiveBody;	
					break;
				default:
					rb = [ 1, 10, 1 ];
			}	
			return sprintfFilter( html, rb );
		},
		replace: false,
		transclude: true
	};
});