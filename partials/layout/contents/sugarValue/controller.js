'use strict';

define(['projectSugar'], function () {
  console.log("약관동의");
  var sugarValueModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'sugarValueService', 'layoutService']);
  sugarValueModule.controller('sugarValueController', ['$scope', '$ocLazyLoad', 'sugarValueService', 'layoutService',
    function($scope, $ocLazyLoad, valueService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          sugarValueService.fire();
          layoutService.fire();
        });
    }]);//sugarValueController.controller
});
