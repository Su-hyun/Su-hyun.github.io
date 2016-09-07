'use strict';

define(['projectSugar'], function () {
  var helpServiceModule = angular.module('helpServiceModule', []);
  helpServiceModule.factory('helpService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
