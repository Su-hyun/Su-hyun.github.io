'use strict';

define(['projectSugar'], function () {
  console.log("내게 맞는 보험 찾기");
  var searchInsuranceModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'searchInsuranceService', 'layoutService']);
  searchInsuranceModule.controller('searchInsuranceController', ['$scope', '$ocLazyLoad', 'searchInsuranceService', 'layoutService',
    function($scope, $ocLazyLoad, searchInsuranceService, layoutService) {

      // 왜 사람들이 슈가추천을 선택할까요?
      $scope.choiceList = [
        {
          tit: "We are helpers",
          txt: "100% 무료 입니다.",
          imageUrl: "choice-01.png"
        }, {
          tit: "Free & rightful advice!",
          txt: "무엇이 필요하고, 필요없는지 알려드립니다.",
          txt2: "이런거 본 적 없죠?",
          imageUrl: "choice-02.png"
        }, {
          tit: "Friendly support",
          txt: "진짜 전문가들이 답변해드립니다.",
          imageUrl: "choice-03.png"
        }
      ];

      // 슈가추천을 받아야 하는 3가지 이유
      $scope.reasonList = [
        {
          tit: "보험에 관해 질문조차 하지 못할 것들을 알려드립니다.",
          txt1: "당신의 소덕에 맞는 보험금이 얼마인 줄 아세요?",
          txt2: "사망보장에 몇 살까지 가입하는게 맞을까요?",
          txt3: "암 치료를 위해 얼마의 보험에 가입해야 할까요?",
          imageUrl: "reason-01.png"
        }, {
          tit: "슈가의 추천에는 이유가 있습니다.",
          txt1: "기존 보험 파내를 위한 권유나 추천과 달리 우리나라 사회보장 제도(국민건강보험, 국민연금)를 충분히 고려하여 과다한 보험 가입 유도는 지양하고 꼭 필요한 보험만 추천합니다.",
          imageUrl: "reason-01.png"
        }, {
          tit: "당신에게 맞춰진 보험을 추천합니다.",
          txt1: "반드시 필요한 상품군과 고려할 상품군을 제시합니다.",
          txt2: "상품별 가격 비교를 통해 가장 저렴한 상품을 제시합니다.",
          imageUrl: "reason-01.png"
        }
      ];

      // review
      $scope.reviewList = [
        {
          name: "박 * 하",
          userAge : "34",
          date: "2016-07-07",
          txt: "주위에 보험과 관련하여 아는 사람이 전혀 없는 사람들에게 참 좋은 서비스라고 생각합니다. 쉬운 보험들이 많이 보이네요, 다른 상품들도 찬찬히 둘러볼께요~",
          imageUrl: "faceImg01.png"
        }, {
          name: "박 * 하",
          userAge : "34",
          date: "2016-07-07",
          txt: "주위에 보험과 관련하여 아는 사람이 전혀 없는 사람들에게 참 좋은 서비스라고 생각합니다. 쉬운 보험들이 많이 보이네요, 다른 상품들도 찬찬히 둘러볼께요~",
          imageUrl: "faceImg02.png"
        }, {
          name: "박 * 하",
          userAge : "34",
          date: "2016-07-07",
          txt: "주위에 보험과 관련하여 아는 사람이 전혀 없는 사람들에게 참 좋은 서비스라고 생각합니다. 쉬운 보험들이 많이 보이네요, 다른 상품들도 찬찬히 둘러볼께요~",
          imageUrl: "faceImg02.png"
        }
      ];

      $scope.count = 0;

      console.log($scope.count)

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          searchInsuranceService.fire();
          layoutService.fire();

          // 빈 설명 태그 숨김
          var $reasonP = $('.reason-txt').find('p'),
              reasonPleng = $reasonP.length;
          for(var i = 0; i < reasonPleng; i++){
            var pHtml = $reasonP.eq(i).text();
            if(pHtml == ""){
              $reasonP.eq(i).hide()
            }
          }
          // 태그 숨김 종료

        });
    }]);//searchInsuranceController.controller

});
