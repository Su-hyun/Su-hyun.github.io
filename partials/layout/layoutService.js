'use strict';

define([ 'projectSugar' ], function() {
	var layoutServiceModule = angular.module('layoutServiceModule', []);

	layoutServiceModule.factory('layoutService', [ '$rootScope',
			function($rootScope) {
				return {
					fire : function() {

					}// fire end
				};// return end
			}]);// .define function end
});
