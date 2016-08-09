'use strict';

define(['projectSugar'], function () {

  var mainServiceModule = angular.module('mainServiceModule', []);

  mainServiceModule.factory('mainService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {

        }//fire end
      };//return end
    }]);//.define function end
});
