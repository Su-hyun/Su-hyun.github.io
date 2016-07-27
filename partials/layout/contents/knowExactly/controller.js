'use strict';

define(['projectSugar'], function () {
  console.log("보험바로 알기");
  var knowExactlyModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'knowExactlyService', 'layoutService']);

  knowExactlyModule.controller('knowExactlyController', ['$scope', '$ocLazyLoad', 'knowExactlyService', 'layoutService',
    function($scope, $ocLazyLoad, knowExactlyService, layoutService) {

      $ocLazyLoad.load([

      ]).then(function() {
        knowExactlyService.fire();
        layoutService.fire();
      });

    }]);//knowExactlyeController.controller

});
