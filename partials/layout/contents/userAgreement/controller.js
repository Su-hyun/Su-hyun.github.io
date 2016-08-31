'use strict';

define(['projectSugar'], function () {
  console.log("약관동의");
  var userAgreementModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'userAgreementService', 'layoutService']);
  userAgreementModule.controller('userAgreementController', ['$scope', '$ocLazyLoad', 'userAgreementService', 'layoutService',
    function($scope, $ocLazyLoad, userAgreementService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          userAgreementService.fire();
          layoutService.fire();

          var $userAgreement = $('#userAgreement'),
              $section = $userAgreement.children('section'),
              $locationLi = $('.location').children('li'),
              $agreeNext = $('.btn-agreeNext'),
              idx = 0;

          // #userAgreement height
          $(document).on('load', function () {
            var agreeHEI = $(window).height() - 65 - 81;
            $userAgreement.css('min-height', agreeHEI);

          });
          $(document).trigger('load');

          $agreeNext.on('click', function () {
            idx ++;
            $locationLi.eq(idx).addClass('on').siblings().removeClass('on');
            $section.eq(idx).addClass('on').siblings().removeClass('on')
          });
        });
    }]);//userAgreementController.controller
});
