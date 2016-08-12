'use strict';

define(['projectSugar'], function () {
  console.log("상품 가이드");
  var productGuideModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'productGuideService', 'layoutService']);
  productGuideModule.controller('productGuideController', ['$scope', '$ocLazyLoad', 'productGuideService', 'layoutService',
    function($scope, $ocLazyLoad, productGuideService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          productGuideService.fire();
          layoutService.fire();
        });
    }]);//productGuideController.controller
});
