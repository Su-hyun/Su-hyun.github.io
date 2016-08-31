'use strict';

define(['projectSugar'], function () {
  var indemnityIntroduceServiceModule = angular.module('indemnityIntroduceServiceModule', []);
  indemnityIntroduceServiceModule.factory('indemnityIntroduceService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
