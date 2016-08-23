'use strict';

define(['projectSugar'], function () {
  console.log("약관동의");
  var userAgreementModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'userAgreementService', 'layoutService']);
  userAgreementModule.controller('userAgreementController', ['$scope', '$ocLazyLoad', 'userAgreementService', 'layoutService',
    function($scope, $ocLazyLoad, userAgreementService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          userAgreementService.fire();
          layoutService.fire();
        });
    }]);//userAgreementController.controller

  // directive
  userAgreementModule.directive('inputTable', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/template/inputInfo.html'
    }
  });
});
