'use strict';

define(['projectSugar'], function () {

  var indemnityAnalysisServiceModule = angular.module('indemnityAnalysisServiceModule', []);

  indemnityAnalysisServiceModule.factory('indemnityAnalysisService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
