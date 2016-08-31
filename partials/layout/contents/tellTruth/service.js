'use strict';

define(['projectSugar'], function () {
  var tellTruthServiceModule = angular.module('tellTruthServiceModule', []);
  tellTruthServiceModule.factory('tellTruthService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
