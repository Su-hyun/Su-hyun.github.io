'use strict';

define(['projectSugar'], function () {
  var mySaveModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'mySaveService', 'layoutService']);
  mySaveModule.controller('mySaveController', ['$scope', '$ocLazyLoad', 'mySaveService', 'layoutService',
    function($scope, $ocLazyLoad, mySaveService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            mySaveService.fire();
            layoutService.fire();
          });
    }]);//Controller.controller
});
