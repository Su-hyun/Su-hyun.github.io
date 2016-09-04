'use strict';

define(['projectSugar'], function () {
  var indemnityBoardServiceModule = angular.module('indemnityBoardServiceModule', []);
  indemnityBoardServiceModule.factory('indemnityBoardService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
