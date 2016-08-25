'use strict';

define(['projectSugar'], function () {
  console.log("약관동의");
  var sugarValueModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'sugarValueService', 'layoutService']);

  sugarValueModule.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.when("", "/contacts/list");
    $urlRouterProvider.when("/", "/contacts/list");

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/contacts/list");

    $stateProvider
        .state('contacts', {
          abstract: true,
          url: '/contacts',
          templateUrl: 'partials/layout/contents/sugarValue/contacts.html',
          controller: function($scope){
            $scope.contacts = [{ id:0, name: "Alice" }, { id:1, name: "Bob" }];
          },
          onEnter: function(){
            console.log("enter contacts");
          }

        })
        .state('contacts.list', {
          url: '/list',
          // loaded into ui-view of parent's template
          templateUrl: 'partials/layout/contents/sugarValue/contacts.list.html',
          onEnter: function(){
            console.log("enter contacts.list");
          }
        })
        //.state('contacts.detail', {
        //  url: '/:id',
        //  // loaded into ui-view of parent's template
        //  templateUrl: 'partials/layout/contents/sugarValue/contacts.detail.html',
        //  controller: function($scope, $stateParams){
        //    $scope.person = $scope.contacts[$stateParams.id];
        //  },
        //  onEnter: function(){
        //    console.log("enter contacts.detail");
        //  }
        //})
  })


  sugarValueModule.controller('sugarValueController', ['$scope','$state', '$ocLazyLoad', 'sugarValueService', 'layoutService',
    function($scope, $state, $ocLazyLoad, sugarValueService, layoutService) {
      //$state.transitionTo('contacts.list');

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
