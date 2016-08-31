'use strict';

define(['projectSugar'], function () {
  var tellTruthModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'tellTruthService', 'layoutService']);
  tellTruthModule.controller('tellTruthController', ['$scope', '$ocLazyLoad', 'tellTruthService', 'layoutService',
    function($scope, $ocLazyLoad, tellTruthService, layoutService) {

      $scope.newsList = [
        {
          title: "tell truth",
          titleSub: "치과보험, 그 허와 실",
          conText1: "웬만해선 손해 안 보는 보험 회사, 차라리 적금 드세요",
          conText2: "(뼈의 결손보전이나 보강 등을 목적으로 골편을 이식하는 수술)을 받은 20대 남성 환자가 찾아왔다.",
          conText3: "진단서에 골 이식이라는 말이 들어가면 보험 회사에서 보험금을 지급해 준다는데, '골 이식'이라는 말을 꼭 적어서 진단서 좀 끊어주세요..."
        },{
          title: "tell truth",
          titleSub: "치과보험, 그 허와 실",
          conText1: "웬만해선 손해 안 보는 보험 회사, 차라리 적금 드세요",
          conText2: "(뼈의 결손보전이나 보강 등을 목적으로 골편을 이식하는 수술)을 받은 20대 남성 환자가 찾아왔다.",
          conText3: "진단서에 골 이식이라는 말이 들어가면 보험 회사에서 보험금을 지급해 준다는데, '골 이식'이라는 말을 꼭 적어서 진단서 좀 끊어주세요..."
        },{
          title: "tell truth",
          titleSub: "치과보험, 그 허와 실",
          conText1: "웬만해선 손해 안 보는 보험 회사, 차라리 적금 드세요",
          conText2: "(뼈의 결손보전이나 보강 등을 목적으로 골편을 이식하는 수술)을 받은 20대 남성 환자가 찾아왔다.",
          conText3: "진단서에 골 이식이라는 말이 들어가면 보험 회사에서 보험금을 지급해 준다는데, '골 이식'이라는 말을 꼭 적어서 진단서 좀 끊어주세요..."
        }
      ];

      $scope.questionsList = [
        {
          title : "32세 연구원(사무실) 보험료가 적정한지 궁금합니다.1",
          context : "교보 큰사람 CI보험과 메리츠실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속유지할지 고민됩니다. 지금 7년납입중이구요 분석부탁드립니다.",
          date : "2016-07-07",
          count : "24"
        },{
          title : "32세 연구원(사무실) 보험료가 적정한지 궁금합니다.2",
          context : "교보 큰사람 CI보험과 메리츠실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속유지할지 고민됩니다. 지금 7년납입중이구요 분석부탁드립니다.",
          date : "2016-07-07",
          count : "32"
        },{
          title : "32세 연구원(사무실) 보험료가 적정한지 궁금합니다.3",
          context : "교보 큰사람 CI보험과 메리츠실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속유지할지 고민됩니다. 지금 7년납입중이구요 분석부탁드립니다.",
          date : "2016-07-07",
          count : "33"
        },{
          title : "32세 연구원(사무실) 보험료가 적정한지 궁금합니다.4",
          context : "교보 큰사람 CI보험과 메리츠실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속유지할지 고민됩니다. 지금 7년납입중이구요 분석부탁드립니다.",
          date : "2016-07-07",
          count : "21"
        },{
          title : "32세 연구원(사무실) 보험료가 적정한지 궁금합니다.5",
          context : "교보 큰사람 CI보험과 메리츠실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속유지할지 고민됩니다. 지금 7년납입중이구요 분석부탁드립니다.",
          date : "2016-07-07",
          count : "22"
        },{
          title : "32세 연구원(사무실) 보험료가 적정한지 궁금합니다.5",
          context : "교보 큰사람 CI보험과 메리츠실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속유지할지 고민됩니다. 지금 7년납입중이구요 분석부탁드립니다.",
          date : "2016-07-07",
          count : "22"
        }
      ];

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            tellTruthService.fire();
            layoutService.fire();

            var $tellBox = $('.tell_box'),
                $conBoxLi = $('.con_box > li'),
                $tellLi = $('.tell_board li'),
                $btnList = $('.btn-list'),
                idx = 0;
            $tellBox.children('li').eq(idx).addClass('on');
            $conBoxLi.eq(idx).addClass('on');

            $tellBox.on('click', 'li', function() {
              var $this = $(this);
              idx = $this.index();
              $this.addClass("on").siblings().removeClass('on');
              $conBoxLi.eq(idx).fadeIn(500).siblings().fadeOut(100)
            });

            $tellLi.on('click', function () {
              var $this = $(this);
              $this.parents('section').removeClass('on').next().addClass('on')
            });
            $btnList.on('click', function () {
              var $this = $(this);
              $this.parents('section').removeClass('on').prev().addClass('on')
            })
          });
    }]);//tellTruthController.controller

  tellTruthModule.directive('listView', function () {
    return {
      restrict : "A",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/tellTruth/template/listView.html'
    }
  });
});
