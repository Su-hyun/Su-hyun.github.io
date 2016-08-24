'use strict';

define(['projectSugar'], function () {
  console.log("약관동의");
  var sugarValueModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'sugarValueService', 'layoutService']);

  //sugarValueModule.config(function($stateProvider, $urlRouterProvider){
  //
  //  // For any unmatched url, send to /route1
  //  $urlRouterProvider.otherwise("/value")
  //
  //  $stateProvider
  //    .state('report', {
  //      views: {
  //              'filters': { ... templates and/or controllers ... },
  //      'tabledata': {},
  //      'graph': {},
  //    }
  //});


  sugarValueModule.controller('sugarValueController', ['$scope','$state', '$ocLazyLoad', 'sugarValueService', 'layoutService',
    function($scope, $state, $ocLazyLoad, sugarValueService, layoutService) {
      $state.transitionTo('contacts.list');

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          sugarValueService.fire();
          layoutService.fire();
        });
    }]);//sugarValueController.controller
});
