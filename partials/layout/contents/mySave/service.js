'use strict';

define(['projectSugar'], function () {
  var mySaveServiceModule = angular.module('mySaveServiceModule', []);
  mySaveServiceModule.factory('mySaveService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
