'use strict';

define(['projectSugar'], function () {
  console.log("보험상품추천");
  var suggestModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'suggestService', 'layoutService']);
  suggestModule.controller('suggestController', ['$scope', '$ocLazyLoad', 'suggestService', 'layoutService',
    function($scope, $ocLazyLoad, suggestService, layoutService) {

      $scope.lowerPriceList = [
        //{ logoImg:"lifeplanet.png", monthPay:"33000", insurable:"3억", term:"10년 만기"},
        //{ logoImg:"lifeplanet.png", monthPay:"22000", insurable:"1억", term:"20년 만기"},
        //{ logoImg:"lifeplanet.png", monthPay:"15000", insurable:"5천만원", term:"65세 만기"}
      ];

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            suggestService.fire();
            layoutService.fire();

            // 보험 추천 번호
            $(window).on('load', function () {
              var $article = $('section.suggest > article'),
                  arNum = $('section.suggest > article.on').length;
              if(arNum < 10) arNum = '0' + arNum;
              if(arNum > 1){
                $article.eq(0).find('span.arIdx').text("01");
                $article.eq(1).find('span.arIdx').text("02");
              }else{
                $('span.arIdx').text(arNum)
              }

              // 최저가 그래프
              var $graphType = $('.graph-type').children('li'),
                  graphTypeLeng = $graphType.length,
                  graphTypeIdx = graphTypeLeng - 1,
                  $graphList = $('.graph-list-box').children('li');
              $graphList.eq(graphTypeIdx).addClass('on').siblings().removeClass('on');

            });
            $(window).trigger("load");

            // 고려해야 할 보험 토글버튼
            var $btnToggle = $('.btn-toggle');
            $btnToggle.on('click', function () {
              var $this = $(this);
              if(!$this.is('.on')){
                $this.addClass('on').parents('section.might').addClass('on');
              }else if($this.is('.on')){
                $this.removeClass('on').parents('section.might').removeClass('on');
              }
            });

          });
    }]);//suggestController.controller
});
