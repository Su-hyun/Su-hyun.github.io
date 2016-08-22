'use strict';

define(['projectSugar'], function () {
  console.log("상품 가이드");
  var oneAndOneModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'oneAndOneService', 'layoutService']);
  oneAndOneModule.controller('oneAndOneController', ['$scope', '$ocLazyLoad', 'oneAndOneService', 'layoutService',
    function($scope, $ocLazyLoad, oneAndOneService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            oneAndOneService.fire();
            layoutService.fire();
          });
    }]);//oneAndOneController.controller
});
