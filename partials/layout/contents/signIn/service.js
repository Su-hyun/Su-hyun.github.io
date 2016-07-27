'use strict';

define(['projectSugar'], function () {

  var signInServiceModule = angular.module('signInServiceModule', []);

  signInServiceModule.factory('signInService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
