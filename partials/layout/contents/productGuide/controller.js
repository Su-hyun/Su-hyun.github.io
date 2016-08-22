'use strict';

define(['projectSugar'], function () {
  console.log("상품 가이드");
  var productGuideModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'productGuideService', 'layoutService']);
  productGuideModule.controller('productGuideController', ['$scope', '$ocLazyLoad', 'productGuideService', 'layoutService',
    function($scope, $ocLazyLoad, productGuideService, layoutService) {

      $scope.inquiryBoardList =[
        {title : "보험의 가입금액을 변경할 수 있나요?", processing : "완료", inputDate : "2016-06-02"},
        {title : "보험의 가입금액을 변경할 수 있나요?", processing : "미완료", inputDate : "2016-06-02"},
        {title : "보험의 가입금액을 변경할 수 있나요?", processing : "완료", inputDate : "2016-06-02"}
      ]

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          productGuideService.fire();
          layoutService.fire();
        });
    }]);//productGuideController.controller
});
