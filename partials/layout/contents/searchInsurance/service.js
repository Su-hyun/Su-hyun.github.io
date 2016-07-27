'use strict';

define(['projectSugar'], function () {

  var searchInsuranceServiceModule = angular.module('searchInsuranceServiceModule', []);

  searchInsuranceServiceModule.factory('searchInsuranceService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
