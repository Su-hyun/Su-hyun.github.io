'use strict';

define(['projectSugar'], function () {
  var ServiceModule = angular.module('ServiceModule', []);
  ServiceModule.factory('Service', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
