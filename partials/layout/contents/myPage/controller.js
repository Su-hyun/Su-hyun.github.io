'use strict';

define(['projectSugar'], function () {
  console.log("마이페이지");
  var myPageModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'myPageService', 'layoutService']);
  myPageModule.controller('myPageController', ['$scope', '$ocLazyLoad', 'myPageService', 'layoutService',
    function($scope, $ocLazyLoad, myPageService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          mainService.fire();
          layoutService.fire();
        });
    }]);//myPageController.controller
});
