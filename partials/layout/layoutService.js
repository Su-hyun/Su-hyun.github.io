'use strict';

define([ 'projectSugar' ], function() {
	var layoutServiceModule = angular.module('layoutServiceModule', []);

	layoutServiceModule.factory('layoutService', [ '$rootScope',
			function($rootScope) {
				return {
					fire : function() {
					  var idx = 0;

            $('.lnb > li').on('click', function() {
              idx = $ (this).find ('.sub-lnb > li').length;
              var $this = $ (this),
                  liHEI = $ (this).find ('.sub-lnb > li').innerHeight ();
              if (!$this.is ('.active')) {
                $this.addClass ('active');
                $this.children ('.sub-lnb').css ("height", liHEI * idx);
                $this.siblings ().removeClass ('active').children ('.sub-lnb').css ('height', 0);
              } else if ($this.is ('.active')) {
                $this.removeClass ('active');
                $this.children ('.sub-lnb').css ('height', 0)
              }
            });


            // 임시
            var $eventList = $('.event-list');

            $(window).resize(function () {
              var eventWID = $('.event-con').width(),
                  movetxt01HEI = $('.move-txt01').height();
              $('.move-txt02').css('height',movetxt01HEI);
              $eventList.eq(0).css('margin-left' , -eventWID * 0.23);
            });
            $(window).trigger("resize");

            $eventList.eq(idx).addClass('on');
            var slideRel = setInterval(function () {
              //  slideFn ($eventList, idx, 0, "-100%", 1000);
              idx ++;
              fadeFn ($eventList, idx, 1000);
              //  slideFn ($eventList, idx, "100%", 0, 1000);

            },4000);

            //$eventArea.on({
            //  mouseenter : function () {
            //    clearInterval(slideRel)
            //  },
            //  mouseleave : function () {
            //    slideRel = setInterval(function () {
            //      idx++;
            //      fadeFn ($eventList, idx, 2000);
            //    },4000);
            //  }
            //});
            function fadeFn (select, index, sec) {
              var leng = select.length;
              select.eq(index).find('.event-area').fadeIn(sec)
                  .parent('li').addClass('on')
                  .siblings().removeClass('on').find('.event-area')
                  .fadeOut(sec);
              if(index == leng){
                idx = 0;
                fadeFn (select, idx, sec);
              }
            }

					}// fire end
				};// return end
			}]);// .define function end
});
