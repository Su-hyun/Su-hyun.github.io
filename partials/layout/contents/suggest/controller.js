'use strict';

define(['projectSugar'], function () {
  console.log("보험상품추천");
  var suggestModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'suggestService', 'layoutService']);
  suggestModule.controller('suggestController', ['$scope', '$ocLazyLoad', 'suggestService', 'layoutService',
    function($scope, $ocLazyLoad, suggestService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            suggestService.fire();
            layoutService.fire();

            $('span.arIdx').on('load', function () {
              var arNum = $(this).parents('article.on').index();
              if(arNum < 10) arNum = '0' + arNum;
                  console.log(arNum)
              $(this).text(arNum)
            });
            $('span.arIdx').trigger("load")

          });
    }]);//suggestController.controller
});
