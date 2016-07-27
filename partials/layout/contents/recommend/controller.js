'use strict';

define(['projectSugar'], function () {
  console.log("내게 맞는 보험 찾기");
  var recommendModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'recommendService', 'layoutService']);

  recommendModule.controller('recommendController', ['$scope', '$ocLazyLoad', 'recommendService', 'layoutService',
    function($scope, $ocLazyLoad, recommendService, layoutService) {
      $ocLazyLoad.load([

      ]).then(function() {
        recommendService.fire();
        layoutService.fire();
        labelOn();
      });

    }]);//recommendController.controller

  recommendModule.controller('formCtrl', function ($scope) {

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

    $scope.childList = [
      {sex : "남아", childAge : "보험나이 : 14세"}
    ];

    console.log($scope.newAge);
    
    $scope.addChild = function (selecSex, newAge) {
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
        sex : $scope.selectSex,
        childAge : "보험나이 : "+nowAge+"세"
      };
      $scope.childList.push(newChild);
      newAge = '';
    };


  });
});

function labelOn () {

}