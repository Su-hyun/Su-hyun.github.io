'use strict';

define(['projectSugar'], function () {

  var sugarValueServiceModule = angular.module('sugarValueServiceModule', []);

  sugarValueServiceModule.factory('sugarValueService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
