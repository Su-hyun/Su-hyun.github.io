'use strict';

define(['projectSugar'], function () {
  console.log("내게 맞는 보험 찾기");
  var recommendModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'recommendService', 'layoutService']);

  recommendModule.controller('recommendController', ['$scope', '$ocLazyLoad', 'recommendService', 'layoutService',
    function($scope, $ocLazyLoad, recommendService, layoutService) {

    $scope.inName = null;
    $scope.outName = function () {
      var userName = $scope.inName;
      if(userName == null) userName = "OOO";
      return userName
    };

    $scope.inSex = "성별";
    $scope.outSex = function () {
      return $scope.inSex
    };

    $scope.inAge = "";
    $scope.outAge = function () {
      var birthDay = $scope.inAge,
          date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDay();
      if(month < 10) month = '0' + month;
      if(day < 10) day = '0' + day;
      var monthDay = month + day,
          birthYear = birthDay.substr(0, 4),
          birthMd = birthDay.substr(4,4),
          nowAge = monthDay < birthMd ? year - birthYear - 1 : year - birthYear;
      if(nowAge == year) nowAge = "나이";
      return nowAge
    };

    $scope.inJob = "직업군";
    $scope.outJob = function () {
      return $scope.inJob
    };

    $scope.inMarry = "결혼여부";
    $scope.outMarry = function () {
      return $scope.inMarry
    };

    $scope.childList = [];

    $scope.addChild = function (selectSex, newAge) {
      if(newAge == undefined) return;
      if(newAge === '') return;

      var birthDay = newAge,
          date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDay();
      if(month < 10) month = '0' + month;
      if(day < 10) day = '0' + day;

      var monthDay = month + day,
          birthYear = birthDay.substr(0, 4),
          birthMd = birthDay.substr(4,4),
          nowAge = monthDay < birthMd ? year - birthYear - 1 : year - birthYear;
      if(nowAge == year) nowAge = "0";

      var newChild = {
        sex : selectSex,
        childAge : "보험나이 : "+nowAge+"세"
      };
      $scope.childList.push(newChild);
      selectSex = '';
    };

    $scope.disableAttr = function () {
      $('.btn-next').attr('disabled','');
    };

    $scope.disableRemove = function () {
      $('.btn-next').removeAttr('disabled');
    };


    $ocLazyLoad
      .load([
        './partials/common/js/jquery.cookie.js'
      ])
      .then(function() {
        recommendService.fire();
        layoutService.fire();

        $(document).ready(function () {
          var idx = 0;


          $('.btn').on('click', function (e) {
            var $this = $(this),
                $navLi = $('.nav li'),
                $formArea = $('.form-area'),
                navLeng = $navLi.length,
                formAleng = $formArea.length;

            if($this.is('.btn-next')){
              idx ++;
              $navLi.eq(idx).addClass('on').siblings().removeClass('on');
              $formArea.eq(idx).addClass('on').siblings().removeClass('on');
              if(idx == navLeng) e.preventDefault();
              if(idx == formAleng) e.preventDefault();
            }
            if($this.is('.btn-prev')){
              idx --;
              $navLi.eq(idx).addClass('on').siblings().removeClass('on');
              $formArea.eq(idx).addClass('on').siblings().removeClass('on');
              if(idx == navLeng) e.preventDefault();
              if(idx == formAleng) e.preventDefault();
            }
          });

          $('.test').click(function () {
            console.log("test")
            $('.btn-next').removeAttr('disabled')
          })
        })
      });
  }]);//recommendController.controller
});