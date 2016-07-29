'use strict';

define(['projectSugar'], function () {
  console.log("FAQ");
  var faQuestionsModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'faQuestionsService', 'layoutService']);

  faQuestionsModule.controller('faQuestionsController', ['$scope', '$ocLazyLoad', 'faQuestionsService', 'layoutService',
    function($scope, $ocLazyLoad, faQuestionsService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          faQuestionsService.fire();
          layoutService.fire();
       });


    }]);//productGuideController.controller

});
