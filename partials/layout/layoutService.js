'use strict';

define([ 'projectSugar' ], function() {
	var layoutServiceModule = angular.module('layoutServiceModule', []);
	layoutServiceModule.factory('layoutService', [ '$rootScope',
			function($rootScope) {
				return {
					fire : function() {
            var $lnbUl = $('.lnb'),
                $subUl = $('.sub-lnb'),
                $subUlBg = $('.sub-bg');
            $(".requireLoadingText").remove();
						$('.wrapper').on('click', function () {
              $lnbUl.children('li').removeClass('active');
							$subUl.css('height',0);
							$subUlBg.css('height',0);
						});
            console.log("fire")
					}// fire end
				};// return end
			}]);// .define function end
});