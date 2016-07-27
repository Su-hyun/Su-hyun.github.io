'use strict';

define(['projectSugar'], function () {
  console.log("약관동의");
  var userAgreementModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'userAgreementService', 'layoutService']);

  userAgreementModule.controller('userAgreementController', ['$scope', '$ocLazyLoad', 'userAgreementService', 'layoutService',
    function($scope, $ocLazyLoad, userAgreementService, layoutService) {

      $ocLazyLoad.load([

      ]).then(function() {
        userAgreementService.fire();
        layoutService.fire();
      });


    }]);//productGuideController.controller

});
