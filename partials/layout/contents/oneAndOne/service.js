'use strict';

define(['projectSugar'], function () {
  var onoAndOneServiceModule = angular.module('onoAndOneServiceModule', []);
  onoAndOneServiceModule.factory('onoAndOneService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
