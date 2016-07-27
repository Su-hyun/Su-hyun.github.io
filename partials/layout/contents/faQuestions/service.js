'use strict';

define(['projectSugar'], function () {

  var faQuestionsServiceModule = angular.module('faQuestionsServiceModule', []);

  faQuestionsServiceModule.factory('faQuestionsService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
