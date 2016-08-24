'use strict';

define(['projectSugar'], function () {

  var routeModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'ngAnimate', 'ngCookies', 'ngResource',
      'ngRoute', 'ngSanitize', 'ngTouch' ]);

  routeModule.config(['$routeProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
    function($routeProvider, $stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {

      $urlRouterProvider.otherwise("/");
      $locationProvider.hashPrefix("InsuranceGuide#");

      // You can also load via resolve
      $stateProvider
        .state('layoutIndex', {
          url: "/", // root route
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

        /* test 추가시 사용
        .state('test', {
          url: "/test", // root route
          views: {
            '': {
              controller: 'testLayoutController', // This view will use AppCtrl loaded below in the resolve
              templateUrl: 'partials/layout/testIndex.html'
            }
          },
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            testIndexCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
              // you can lazy load files for an existing module
              return $ocLazyLoad.load([{
                name: 'devLayoutService',
                files: ['partials/layout/testService.js']
              },{
                name: 'devLayoutController',
                files: ['partials/layout/testController.js']
              }]);
            }]
          }
        });
        */
    }]); //indexModule.config

});

