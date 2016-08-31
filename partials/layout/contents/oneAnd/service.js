'use strict';

define(['projectSugar'], function () {
  var oneAndServiceModule = angular.module('oneAndServiceModule', []);
  oneAndServiceModule.factory('oneAndService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
