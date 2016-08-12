'use strict';

define([ 'projectSugar' ], function() {
	var layoutServiceModule = angular.module('layoutServiceModule', []);
	layoutServiceModule.factory('layoutService', [ '$rootScope',
			function($rootScope) {
				return {
					fire : function() {
					  console.log('load');
            $(".requireLoadingText").remove();
					}// fire end
				};// return end
			}]);// .define function end
});