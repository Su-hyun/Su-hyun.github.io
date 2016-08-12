'use strict';

define(['projectSugar'], function () {
  console.log("보장분석");
  var knowExactlyModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'knowExactlyService', 'layoutService']);
  knowExactlyModule.controller('knowExactlyController', ['$scope', '$ocLazyLoad', 'knowExactlyService', 'layoutService',
    function($scope, $ocLazyLoad, knowExactlyService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            knowExactlyService.fire();
            layoutService.fire();
          });
    }]);//knowExactlyController.controller
});
