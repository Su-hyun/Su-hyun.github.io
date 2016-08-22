'use strict';

define(['projectSugar'], function () {
  var tellTruthModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'tellTruthService', 'layoutService']);
  tellTruthModule.controller('tellTruthController', ['$scope', '$ocLazyLoad', 'tellTruthService', 'layoutService',
    function($scope, $ocLazyLoad, tellTruthService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            tellTruthService.fire();
            layoutService.fire();
          });
    }]);//tellTruthController.controller
});
