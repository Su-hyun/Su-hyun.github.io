'use strict';

define(['projectSugar'], function () {
  var myPageServiceModule = angular.module('myPageServiceModule', []);
  myPageServiceModule.factory('myPageService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
