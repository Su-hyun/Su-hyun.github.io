'use strict';

define(['projectSugar'], function () {
  var indemnityBoardModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'indemnityBoardService', 'layoutService']);
  indemnityBoardModule.controller('indemnityBoardController', ['$scope', '$ocLazyLoad', 'indemnityBoardService', 'layoutService',
    function($scope, $ocLazyLoad, indemnityBoardService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            indemnityBoardService.fire();
            layoutService.fire();
          });
    }]);//Controller.controller
});
