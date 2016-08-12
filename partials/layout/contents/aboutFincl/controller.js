'use strict';

define(['projectSugar'], function () {
  console.log("About Fincl");
  var aboutFinclModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'aboutFinclService', 'layoutService']);
  aboutFinclModule.controller('aboutFinclController', ['$scope', '$ocLazyLoad', 'aboutFinclService', 'layoutService',
    function($scope, $ocLazyLoad, aboutFinclService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            aboutFinclService.fire();
            layoutService.fire();
          });
    }]);//aboutFinclController.controller
});
