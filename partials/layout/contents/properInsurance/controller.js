'use strict';

define(['projectSugar'], function () {
  var properInsModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'properInsService', 'layoutService']);
  properInsModule.controller('properInsController', ['$scope', '$ocLazyLoad', 'properInsService', 'layoutService',
    function($scope, $ocLazyLoad, properInsService, layoutService) {


      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            properInsService.fire();
            layoutService.fire();
          });
    }]);//properInsController.controller

  properInsModule.directive('insAside', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/properInsurance/template/aside.html'
    }
  })
  .directive('insTit01Con01', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/properInsurance/template/insCon01-01.html'
    }
  })
  .directive('insTit01Con02', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/properInsurance/template/insCon01-02.html'
    }
  })
  .directive('insTit01Con03', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/properInsurance/template/insCon01-03.html'
    }
  })
  .directive('insTit02Con01', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/properInsurance/template/insCon02-01.html'
    }
  })
  .directive('insTit02Con02', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/properInsurance/template/insCon02-02.html'
    }
  })
  .directive('insTit02Con03', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/properInsurance/template/insCon02-03.html'
    }
  })
  .directive('insTit03Con01', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/properInsurance/template/insCon03-01.html'
    }
  })
});
