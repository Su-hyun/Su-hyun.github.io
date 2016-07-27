'use strict';

define(['projectSugar'], function () {

  var productGuideServiceModule = angular.module('productGuideServiceModule', []);

  productGuideServiceModule.factory('productGuideService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
