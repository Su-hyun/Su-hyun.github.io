'use strict';

define(['projectSugar'], function () {
  console.log("마이페이지");
  var myPageModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'myPageService', 'layoutService']);
  myPageModule.controller('myPageController', ['$scope', '$ocLazyLoad', 'myPageService', 'layoutService',
    function($scope, $ocLazyLoad, myPageService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          myPageService.fire();
          layoutService.fire();

          var $myPage = $('#myPage'),
              $viewNav = $('.viewNav'),
              $selectList = $('.select-list'),
              $btnSelect = $('.btn-select'),
              $viewForm = $('.myPage-form').children('div'),
              idx;

          // #myPage height
          $(document).on('load', function () {
            var myHEI = $(window).height() - 65 - 81;
            $myPage.css('min-height', myHEI);

            var $selectListWID = $selectList.outerWidth();
            $btnSelect.css('width',$selectListWID - 0.5)
          });
          $(document).trigger('load');


          $selectList.on('click', function () {
            $(this).toggleClass("on")
          });
          $btnSelect.on('click', 'li', function () {
            var $this = $(this),
                thisText = $this.text();
                idx = $this.index();
            $viewNav.text(thisText);
            $viewForm.eq(idx).addClass('on').siblings().removeClass('on')
          })

        });
    }]);//myPageController.controller

});
