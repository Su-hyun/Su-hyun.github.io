'use strict';

define(['projectSugar'], function () {

  var routeModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'ngAnimate', 'ngCookies', 'ngResource',
      'ngRoute', 'ngSanitize', 'ngTouch', 'ngFileUpload' ]);

  routeModule.config(['$routeProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
    function($routeProvider, $stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
      $locationProvider.hashPrefix("InsuranceGuide#");

      // You can also load via resolve
      $stateProvider
        .state('sugar', {
          url: "/sugar", // root route
          views: {
            '': {
              controller: 'layoutController', // This view will use AppCtrl loaded below in the resolve
              templateUrl: 'partials/layout/layoutIndex.html'
            }
          },
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            layoutIndexCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load([{
                name: 'layoutService',
                files: ['partials/layout/layoutService.js']
              },{
                name: 'layoutController',
                files: ['partials/layout/layoutController.js']
              }]);
            }]
          }
        })
        .state('sugar.subUrl', {
          url: "/:subUrl", // root route
          views: {
            '': {
              controller: 'layoutController', // This view will use AppCtrl loaded below in the resolve
              templateUrl: 'partials/layout/layoutIndex.html'
            }
          },
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            layoutIndexCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load([{
                name: 'layoutService',
                files: ['partials/layout/layoutService.js']
              },{
                name: 'layoutController',
                files: ['partials/layout/layoutController.js']
              }]);
            }]
          }
        });

      $urlRouterProvider.otherwise("/sugar");
      //$locationProvider.html5Mode(true);

    }]); //indexModule.config

});

