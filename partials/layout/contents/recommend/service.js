'use strict';

define(['projectSugar'], function () {

  var recommendServiceModule = angular.module('recommendServiceModule', []);

  recommendServiceModule.factory('recommendService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          $('label.radio').on('click',function () {
            console.log("aa");
            $(this).addClass('on').parent('li').siblings().find('.on').removeClass('on');

            if($(this).is('.married')) {
              $('.sub-radio.married').css ('display', 'block');
              $('.sub-radio.single').css ('display', 'none');
            }else if($(this).is('.single')) {
              $('.sub-radio.married').css ('display', 'none');
              $('.sub-radio.single').css ('display', 'block');
            }
          });
        }//fire end
      };//return end
    }]);//.define function end
});
