'use strict';

define([ 'projectSugar' ], function() {
	var layoutServiceModule = angular.module('layoutServiceModule', []);
	layoutServiceModule.factory('layoutService', [ '$rootScope',
			function($rootScope) {
				return {
					fire : function() {
            var $eventList = $('.event-list');
            $(window).resize(function () {
              var eventWID = $('.event-con').width(),
                  movetxt01HEI = $('.move-txt01').height();
              $('.move-txt02').css('height',movetxt01HEI);
              $eventList.eq(0).css('margin-left' , -eventWID * 0.23);
            });
            $(window).trigger("resize");
            $(".requireLoadingText").remove();
					}// fire end
				};// return end
			}]);// .define function end
});