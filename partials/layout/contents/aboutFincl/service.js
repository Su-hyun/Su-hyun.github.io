'use strict';

define(['projectSugar'], function () {
  var aboutFinclServiceModule = angular.module('aboutFinclServiceModule', []);
  aboutFinclServiceModule.factory('aboutFinclService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
