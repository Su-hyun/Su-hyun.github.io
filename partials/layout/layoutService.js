'use strict';

define([ 'projectSugar' ], function() {
	var layoutServiceModule = angular.module('layoutServiceModule', []);

	layoutServiceModule.factory('layoutService', [ '$rootScope',
			function($rootScope) {
				return {
					fire : function() {
					  var $eventArea = $('.event-area'),
                $eventList = $('.event-list'),
                idx = 0;

            $(window).resize(function () {
              var eventWID = $('.event-con').width(),
                  movetxt01HEI = $('.move-txt01').height();
              $('.move-txt02').css('height',movetxt01HEI);
              $eventList.eq(0).css('margin-left' , -eventWID * 0.23);
            });
            $(window).trigger("resize");

            $('.lnb > li').on({
              mouseenter: function () {
                idx = $ (this).find ('.sub-lnb > li').length;
                var liHEI = $ (this).find ('.sub-lnb > li').innerHeight ();
                $ (this).children ('.sub-lnb').css ("height", liHEI * idx)
              },
              mouseleave: function () {
                $ (this).children ('.sub-lnb').css ('height', 0)
              }
            });

            var slideRel = setInterval(function () {
              idx ++;
              fadeFn ($eventList, idx, 2000);
            },4000);

            $eventArea.on({
              mouseenter : function () {
                clearInterval(slideRel)
              },
              mouseleave : function () {
                slideRel = setInterval(function () {
                  idx++;
                  fadeFn ($eventList, idx, 2000);
                },4000);
              }
            });

            function fadeFn (select, index, sec) {
              var leng = select.length;
              select.eq(index).find('.event-area').fadeIn(sec)
                  .parent('li').addClass('on')
                  .siblings().removeClass('on').find('.event-area')
                  .fadeOut(sec);
              if(index == leng){
                idx = 0;
                fadeFn (select, idx, 2000);
              }
            }
					}// fire end
				};// return end
			}]);// .define function end
});
