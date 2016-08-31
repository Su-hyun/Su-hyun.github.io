'use strict';

define([ 'projectSugar' ], function() {
	var layoutServiceModule = angular.module('layoutServiceModule', []);
	layoutServiceModule.factory('layoutService', [ '$rootScope',
			function($rootScope) {
				return {
					fire : function() {
            var $lnbUl = $('.lnb'),
                $subUl = $('.sub-lnb'),
                $subUlBg = $('.sub-bg'),
                $pageing = $('.btn-page'),
                $pageLocation = $('.page-location'),
                boardListAreaLeng = $('.boardListArea > li').length,
                pageNum = boardListAreaLeng / 6,
                idx = 0;
            //$(".requireLoadingText").remove();
            $("#loading").remove();
						$('.wrapper').on('click', function () {
              $lnbUl.children('li').removeClass('active');
							$subUl.css('height',0);
							$subUlBg.css('height',0);
						});

            console.log(boardListAreaLeng);

            $pageLocation.on('click', 'a', function () {
							var $this = $(this);
							$this.addClass('on').siblings().removeClass('on');
						});
            $pageing.on('click', 'button', function () {
              var $this = $(this),
                  aLang = $pageLocation.children('a').length;
              idx = $pageLocation.children('a.on').index();
              if($this.is('.next')){
                idx ++;
                $pageLocation.children('a').eq(idx).addClass('on').siblings('a').removeClass('on');
                if(idx > 2){
                  idx = 2;
                  $pageLocation.children('a').eq(idx).addClass('on').siblings('a').removeClass('on');
                }
              }else if($this.is('.prev')){
                idx --;
                $pageLocation.children('a').eq(idx).addClass('on').siblings('a').removeClass('on');
                if(idx < 0 ){
                  idx = 0;
                  $pageLocation.children('a').eq(idx).addClass('on').siblings('a').removeClass('on');
                }
              }
            });
            console.log("fire")
					}// fire end
				};// return end
			}]);// .define function end
});