'use strict';

define(['projectSugar'], function () {
  var Module = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'Service', 'layoutService']);
  Module.controller('Controller', ['$scope', '$ocLazyLoad', 'Service', 'layoutService',
    function($scope, $ocLazyLoad, Service, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            Service.fire();
            layoutService.fire();
          });
    }]);//Controller.controller
});
