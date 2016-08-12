'use strict';

define(['projectSugar'], function () {
  console.log("로그인");
  var signInModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'signInService', 'layoutService']);
  signInModule.controller('signInController', ['$scope', '$ocLazyLoad', 'signInService', 'layoutService',
    function($scope, $ocLazyLoad, signInService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          signInService.fire();
          layoutService.fire();
        });
    }]);//signInController.controller
});
