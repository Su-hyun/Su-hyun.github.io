'use strict';

define(['projectSugar'], function () {
  var recommendServiceModule = angular.module('recommendServiceModule', []);
  recommendServiceModule.factory('recommendService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {

        }//fire end
      };//return end
    }]);//.define function end
});
