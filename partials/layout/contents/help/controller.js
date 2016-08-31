'use strict';

define(['projectSugar'], function () {
  var helpModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'helpService', 'layoutService']);
  helpModule.controller('helpController', ['$scope', '$ocLazyLoad', 'helpService', 'layoutService',
    function($scope, $ocLazyLoad, helpService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            helpService.fire();
            layoutService.fire();
          });
    }]);//Controller.controller
});
