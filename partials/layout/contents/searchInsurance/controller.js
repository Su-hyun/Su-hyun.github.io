'use strict';

define(['projectSugar'], function () {
  console.log("내게 맞는 보험 찾기");
  var searchInsuranceModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'searchInsuranceService', 'layoutService']);

  searchInsuranceModule.controller('searchInsuranceController', ['$scope', '$ocLazyLoad', 'searchInsuranceService', 'layoutService',
    function($scope, $ocLazyLoad, searchInsuranceService, layoutService) {

      $ocLazyLoad.load([

      ]).then(function() {
        searchInsuranceService.fire();
        layoutService.fire();
      });

    }]);//productGuideController.controller

});
