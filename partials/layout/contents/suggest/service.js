'use strict';

define(['projectSugar'], function () {
  var suggestServiceModule = angular.module('suggestServiceModule', []);
  suggestServiceModule.factory('suggestService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {

        }//fire end
      };//return end
    }]);//.define function end
});
