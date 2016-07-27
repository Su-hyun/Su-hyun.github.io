'use strict';

define(['projectSugar'], function () {

  var knowExactlyServiceModule = angular.module('knowExactlyServiceModule', []);

  knowExactlyServiceModule.factory('knowExactlyService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
