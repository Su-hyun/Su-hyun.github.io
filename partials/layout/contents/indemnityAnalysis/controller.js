'use strict';

define(['projectSugar'], function () {
  console.log("보장분석");
  var indemnityAnalysisModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'indemnityAnalysisService', 'layoutService']);

  indemnityAnalysisModule.controller('indemnityAnalysisController', ['$scope', '$ocLazyLoad', 'indemnityAnalysisService', 'layoutService',
    function($scope, $ocLazyLoad, indemnityAnalysisService, layoutService) {

      $ocLazyLoad.load([

      ]).then(function() {
        indemnityAnalysisService.fire();
        layoutService.fire();
      });


    }]);//productGuideController.controller

});
