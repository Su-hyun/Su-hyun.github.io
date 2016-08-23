'use strict';

define(['projectSugar'], function () {
  var properInsServiceModule = angular.module('properInsServiceModule', []);
  properInsServiceModule.factory('properInsService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
