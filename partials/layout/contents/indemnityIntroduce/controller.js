'use strict';

define(['projectSugar'], function () {
  var indemnityIntroduceModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'indemnityIntroduceService', 'layoutService']);
  indemnityIntroduceModule.controller('indemnityIntroduceController', ['$scope', '$ocLazyLoad', 'indemnityIntroduceService', 'layoutService',
    function($scope, $ocLazyLoad, indemnityIntroduceService, layoutService) {

      // 왜 사람들이 슈가추천을 선택할까요?
      $scope.choiceList = [
        {
          tit: "We are helpers",
          txt: "내가 가입되어 있는 보험상품의 보장 내용, 보장 기간, 지출될 보험료  등의 핵심 정보를 한 눈에 볼 수 있습니다",
          imageUrl: "why-img01.png"
        }, {
          tit: "Free & rightful advice!",
          txt: "가입한 보험은 많아도 꼭 필요한 보장은 없을 수도 있습니다. 중복 보장은 없는지, 보장이 한쪽으로만 몰렸는지 보험료 절약 가능성은 없는지를 확인해드립니다.",
          txt2: "이런거 본 적 없죠?",
          imageUrl: "why-img02.png"
        }, {
          tit: "Friendly support",
          txt: "보험상품들의 보장내용, 특장점들에 대한 전문 지식을 바탕으로 전문가가 작성한 슈가 리포트를 무료로 받아볼 수 있습니다. ",
          imageUrl: "why-img03.png"
        }
      ];
      // 슈가추천을 받아야 하는 3가지 이유
      $scope.reasonList = [
        {
          tit: "보험에 관해 질문조차 하지 못할 것들을 알려드립니다.",
          txt1: "- 당신의 소덕에 맞는 보험금이 얼마인 줄 아세요?",
          txt2: "- 사망보장에 몇 살까지 가입하는게 맞을까요?",
          txt3: "- 암 치료를 위해 얼마의 보험에 가입해야 할까요?",
          imageUrl: "reason-01.png"
        }, {
          tit: "슈가의 추천에는 이유가 있습니다.",
          txt1: "- 기존 보험 파내를 위한 권유나 추천과 달리 우리나라 사회보장 제도(국민건강보험, 국민연금)를 충분히 고려하여 과다한 보험 가입 유도는 지양하고 꼭 필요한 보험만 추천합니다.",
          imageUrl: "reason-01.png"
        }, {
          tit: "당신에게 맞춰진 보험을 추천합니다.",
          txt1: "- 반드시 필요한 상품군과 고려할 상품군을 제시합니다.",
          txt2: "- 상품별 가격 비교를 통해 가장 저렴한 상품을 제시합니다.",
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
      $scope.newCount = function () {
        return $scope.count;
      };

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            indemnityIntroduceService.fire();
            layoutService.fire();
          });

    }]);//searchInsuranceController.controller

});
