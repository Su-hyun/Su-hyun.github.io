'use strict';

define(['projectSugar'], function () {

  var userAgreementServiceModule = angular.module('userAgreementServiceModule', []);

  userAgreementServiceModule.factory('userAgreementService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          console.log('check')
        }//fire end
      };//return end
    }]);//.define function end
});
