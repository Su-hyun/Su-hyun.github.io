'use strict';

define(
  ['projectSugar'],
  function() {
    var layoutIndexModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'layoutService']);
    layoutIndexModule.controller('layoutController', ['$scope', '$ocLazyLoad','layoutService',
      function($scope, $ocLazyLoad, layoutService) {

      $scope.mainHeader = 'partials/layout/header/';
      $scope.contentWrapper = 'partials/layout/contents/';
      $scope.mainFooter = 'partials/layout/footer/';

      $scope.$on('$includeContentLoaded',function(event, file) {
        if (file === 'partials/layout/header/') {
          layoutService.fire();
        } else if (file === 'partials/layout/contents/') {
          $ocLazyLoad
              .load('partials/layout/contents/main/index.css');
          layoutService.fire();
        } else if (file === 'partials/layout/footer/') {
          layoutService.fire();
        }
      });

      $scope.$on('goToHome', function() {
        $scope.contentWrapper = 'partials/layout/contents/';
        $ocLazyLoad.load('partials/layout/contents/index.css');
        layoutService.fire();
        console.log("goToHome");
      });

      $scope.broadcastGoToHome = function() {
        $scope.$broadcast('goToHome');
      };

      ////main
      //$scope.main = function() {
      //  $ocLazyLoad
      //    .load([{
      //        name : 'mainService',
      //        files : [ 'partials/layout/contents/main/service.js' ]
      //      },{
      //        name : 'mainController',
      //        files : [ 'partials/layout/contents/main/controller.js' ]
      //      }, 'partials/layout/contents/main/index.css'
      //    ])
      //    .then(function() {
      //        $scope.contentWrapper = "partials/layout/contents/main/";
      //      }, function(e) {
      //        console.log(e);
      //      }
      //    );
      //};

      //보험바로 알기
      $scope.knowExactly = function(id) {
        var $this = $($(id.target));
        if($this.parent().is('.active')) {
          $ocLazyLoad
            .load ([{
                name: 'knowExactlyService',
                files: ['partials/layout/contents/knowExactly/service.js']
              }, {
                name: 'knowExactlyController',
                files: ['partials/layout/contents/knowExactly/controller.js']
              }, 'partials/layout/contents/knowExactly/index.css'])
            .then (function () {
                $scope.contentWrapper = "partials/layout/contents/knowExactly/";
              }, function (e) {
                console.log (e);
              }
            );
        }
      };

      // 내게 맞는 보험 찾기
      $scope.searchInsurance = function() {
        $ocLazyLoad
          .load([{
              name : 'searchInsuranceService',
              files : [ 'partials/layout/contents/searchInsurance/service.js' ]
            },{
              name : 'searchInsuranceController',
              files : [ 'partials/layout/contents/searchInsurance/controller.js' ]
            }, 'partials/layout/contents/searchInsurance/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/searchInsurance/";
            }, function(e) {
              console.log(e);
            }
          );
      };

      //보험추천받기
      $scope.recommend = function() {
        $ocLazyLoad
          .load([{
              name : 'recommendService',
              files : [ 'partials/layout/contents/recommend/service.js' ]
            },{
              name : 'recommendController',
              files : [ 'partials/layout/contents/recommend/controller.js' ]
            }, 'partials/layout/contents/recommend/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/recommend/";
            }, function(e) {
              console.log(e);
            }
          );
      };

      //보험상품 추천
      $scope.suggest = function() {
        $ocLazyLoad
          .load ([{
            name: 'suggestService',
            files: ['partials/layout/contents/suggest/service.js']
          }, {
            name: 'suggestController',
            files: ['partials/layout/contents/suggest/controller.js']
          }, 'partials/layout/contents/suggest/index.css'
          ])
          .then (function () {
                $scope.contentWrapper = "partials/layout/contents/suggest/";
              }, function (e) {
                console.log (e);
              }
          );
      };

      // 상품 가이드
      $scope.productGuide = function(id) {
        var $this = $($(id.target));
        if($this.parent().is('.active')){
          $ocLazyLoad
            .load([{
                name : 'productGuideService',
                files : [ 'partials/layout/contents/productGuide/service.js' ]
              },{
                name : 'productGuideController',
                files : [ 'partials/layout/contents/productGuide/controller.js' ]
              }, 'partials/layout/contents/productGuide/index.css'])
            .then(function() {
                $scope.contentWrapper = "partials/layout/contents/productGuide/";
              }, function(e) {
                console.log(e);
              }
            );
        }
      };

      // 보장분석
      $scope.indemnityAnalysis = function(id) {
        var $this = $($(id.target));
        if($this.parent().is('.active')) {
          $ocLazyLoad
            .load ([{
                name: 'indemnityAnalysisService',
                files: ['partials/layout/contents/indemnityAnalysis/service.js']
              }, {
                name: 'indemnityAnalysisController',
                files: ['partials/layout/contents/indemnityAnalysis/controller.js']
              }, 'partials/layout/contents/indemnityAnalysis/index.css'])
            .then (function () {
                $scope.contentWrapper = "partials/layout/contents/indemnityAnalysis/";
              }, function (e) {
                console.log (e);
              }
            );
        }
      };

      // FAQ
      $scope.faQuestions = function() {
        $ocLazyLoad
          .load([{
            name : 'faQuestionsService',
            files : [ 'partials/layout/contents/faQuestions/service.js' ]
          },{
            name : 'faQuestionsController',
            files : [ 'partials/layout/contents/faQuestions/controller.js' ]
          }, 'partials/layout/contents/faQuestions/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/faQuestions/";
            }, function(e) {
              console.log(e);
            }
          );
      };

      // 로그인
      $scope.signIn = function() {
        $ocLazyLoad
          .load([{
            name : 'signInService',
            files : [ 'partials/layout/contents/signIn/service.js' ]
          },{
            name : 'signInController',
            files : [ 'partials/layout/contents/signIn/controller.js' ]
          }, 'partials/layout/contents/signIn/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/signIn/";
            }, function(e) {
              console.log(e);
            }
          );
      };

      // 마이페이지
      $scope.myPage = function() {
        $ocLazyLoad
          .load([{
            name : 'myPageService',
            files : [ 'partials/layout/contents/myPage/service.js' ]
          },{
            name : 'myPageController',
            files : [ 'partials/layout/contents/myPage/controller.js' ]
          }, 'partials/layout/contents/myPage/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/myPage/";
            }, function(e) {
              console.log(e);
            }
          );
      };

      // 회사소개
      $scope.aboutFincl = function() {
        $ocLazyLoad
            .load([{
              name : 'aboutFinclService',
              files : [ 'partials/layout/contents/aboutFincl/service.js' ]
            },{
              name : 'aboutFinclController',
              files : [ 'partials/layout/contents/aboutFincl/controller.js' ]
            }, 'partials/layout/contents/aboutFincl/index.css'
            ])
            .then(function() {
                $scope.contentWrapper = "partials/layout/contents/aboutFincl/";
              }, function(e) {
                console.log(e);
              }
            );
      };

      // Value
      $scope.sugarValue = function() {
        $ocLazyLoad
            .load([{
              name : 'sugarValueService',
              files : [ 'partials/layout/contents/sugarValue/service.js' ]
            },{
              name : 'sugarValueController',
              files : [ 'partials/layout/contents/sugarValue/controller.js' ]
            }, 'partials/layout/contents/sugarValue/index.css'
            ])
            .then(function() {
                $scope.contentWrapper = "partials/layout/contents/sugarValue/";
              }, function(e) {
                console.log(e);
              }
            );
      };


      // 이용약관
      $scope.userAgreement = function() {
        $ocLazyLoad
          .load([{
            name : 'userAgreementService',
            files : [ 'partials/layout/contents/userAgreement/service.js' ]
          },{
            name : 'userAgreementController',
            files : [ 'partials/layout/contents/userAgreement/controller.js' ]
          }, 'partials/layout/contents/userAgreement/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/userAgreement/";
            }, function(e) {
              console.log(e);
            }
          );
      };

      // view 추가
      /*
      $scope.폴더명 = function() {
        $ocLazyLoad
          .load([{
            name : '폴더명Service',
            files : [ 'partials/layout/contents/폴더명/service.js' ]
          },{
            name : '폴더명Controller',
            files : [ 'partials/layout/contents/폴더명/controller.js' ]
          }, 'partials/layout/contents/폴더명/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/폴더명/";
            }, function(e) {
              console.log(e);
            }
          );
      };
      */



      //임시
      // 슬라이드
      $scope.eventList = [
        {
          txtImgUrl:"url(./partials/layout/contents/main/img/slide-txt-bg01.png)",
          titIr : "알면보험 모르면 모험",
          titBg : "slide-txt-tit01.png",
          titAlt : "슈가 is...",
          txt1 : "인슈어런스(Insurance) + 가이드(Guide)란 단어가 결합된 말로 " +
          "국내 유일의 온라인 기반 보험 자문 / 상품비교 서비스",
          txt2 : "정보의 비대칭으로 인해 소비자는 본인이 비싼 보험에 가입했는지, " +
          "합리적인 보험료를 납입하는지 쉽게 파악할 수 없는게 현실이다.",
          txt3 : "슈가는 고객들이 보험에 제대로 가입하도록, 그리고 이미 가입한 보험을 " +
          "십분 활용할 수 있도록 도움을 주고자 만들어졌습니다.",
          imageUrl:"url(./partials/layout/contents/main/img/slide-01.jpg)",
          bgColor:"#548ed0"
        },{
          txtImgUrl:"url(./partials/layout/contents/main/img/slide-txt-bg02.png)",
          titIr : "알면보험 모르면 모험",
          titBg : "slide-txt-tit01.png",
          titAlt : "슈가 is...",
          txt1 : "인슈어런스(Insurance) + 가이드(Guide)란 단어가 결합된 말로 " +
          "국내 유일의 온라인 기반 보험 자문 / 상품비교 서비스",
          txt2 : "정보의 비대칭으로 인해 소비자는 본인이 비싼 보험에 가입했는지, " +
          "합리적인 보험료를 납입하는지 쉽게 파악할 수 없는게 현실이다.",
          txt3 : "슈가는 고객들이 보험에 제대로 가입하도록, 그리고 이미 가입한 보험을 " +
          "십분 활용할 수 있도록 도움을 주고자 만들어졌습니다.",
          imageUrl:"url(./partials/layout/contents/main/img/slide-02.jpg)",
          bgColor:"#848484"
        },{
          txtImgUrl:"url(./partials/layout/contents/main/img/slide-txt-bg03.png)",
          titIr : "알면보험 모르면 모험",
          titBg : "slide-txt-tit01.png",
          titAlt : "슈가 is...",
          txt1 : "인슈어런스(Insurance) + 가이드(Guide)란 단어가 결합된 말로 " +
          "국내 유일의 온라인 기반 보험 자문 / 상품비교 서비스",
          txt2 : "정보의 비대칭으로 인해 소비자는 본인이 비싼 보험에 가입했는지, " +
          "합리적인 보험료를 납입하는지 쉽게 파악할 수 없는게 현실이다.",
          txt3 : "슈가는 고객들이 보험에 제대로 가입하도록, 그리고 이미 가입한 보험을 " +
          "십분 활용할 수 있도록 도움을 주고자 만들어졌습니다.",
          imageUrl:"url(./partials/layout/contents/main/img/slide-03.jpg)",
          bgColor:"#18b3af"
        }
      ];

      //슈가의 보험 추천이 일리있는 이유
      $scope.recommendList = [
        {
          tit: "보험 활용법(합리적인 기준과 방법) 가이드 제시",
          txt: "보험에 대해 최대한 쉽게 설명하고, 보험을 최대한 활용할 수 있도록 합리적인 기준과" +
          " 방법을 제시해드립니다.",
          imageUrl:"recommend-01.png"
        }, {
          tit: "본인 상황에 맞춰 꼭 필요한 만큼만 최소한의 비용으로 보험 설계 추천",
          txt: "소비자를 현혹하기 쉬운 상품, 판매를 위해 포장된 상품을 제외하고 개인별 소득 및" +
          " 현재 속한 생애주기를 기반으로 필요한 위험 대비 영역 / 금액 / 우선순위 상품 군을 추천",
          imageUrl:"recommend-02.png"
        }, {
          tit: "현재 보유 중인 상품 보장 비교/분석",
          txt: "고객이 보유하고 있는 보험 증권을 슈가 추천안과 비교하여 CFP가 적정 여부 진단 등" +
          " 분석결과 리포트 제공",
          imageUrl:"recommend-03.png"
        }, {
          tit: "표준화 된 기준으로 상품의 객관적인 비교 제공",
          txt: "고객 정보(DB)수집이 주 목적이 아닌 정확한 가격비교가 가능하도록 표준화 된 기준" +
          "(현명한 보험 소비 관점)을 정하여 최저가 순으로 상품별 / 보험사별 가격 정보 제공",
          imageUrl:"recommend-04.png"
        }
      ];

      // 보험의 진실편
      $scope.truthList = [
        {
          tit : "치과보험 손해 안 보려면 치과 절대 가지 마라",
          date : "2016-06-06",
          txt : "Phasellus vehicula justo eget diam posuere sollicitudin eu tincidunt nulla",
          imageUrl:"url(./partials/layout/contents/main/img/reason-01.jpg)"
        },{
          tit : "치과보험 손해 안 보려면 치과 절대 가지 마라",
          date : "2016-06-06",
          txt : "Phasellus vehicula justo eget diam posuere sollicitudin eu tincidunt nulla",
          imageUrl:"url(./partials/layout/contents/main/img/reason-01.jpg)"
        },{
          tit : "치과보험 손해 안 보려면 치과 절대 가지 마라",
          date : "2016-06-06",
          txt : "Phasellus vehicula justo eget diam posuere sollicitudin eu tincidunt nulla",
          imageUrl:"url(./partials/layout/contents/main/img/reason-01.jpg)"
        }
      ];

      $ocLazyLoad
        .load('./partials/common/js/jquery.cookie.js')
        .then(function () {
          layoutService.fire();
        });
    }]); // layoutIndexModule.controller



    // * main page *
    layoutIndexModule.controller('contentsController', ['$scope', '$ocLazyLoad', 'layoutService',
      function($scope, $ocLazyLoad, layoutService) {
        $scope.eventList = [
          {
            txtImgUrl:"url(./partials/layout/contents/main/img/slide-txt-bg01.png)",
            titIr : "알면보험 모르면 모험",
            titBg : "slide-txt-tit01.png",
            titAlt : "슈가 is...",
            txt1 : "인슈어런스(Insurance) + 가이드(Guide)란 단어가 결합된 말로 " +
            "국내 유일의 온라인 기반 보험 자문 / 상품비교 서비스",
            txt2 : "정보의 비대칭으로 인해 소비자는 본인이 비싼 보험에 가입했는지, " +
            "합리적인 보험료를 납입하는지 쉽게 파악할 수 없는게 현실이다.",
            txt3 : "슈가는 고객들이 보험에 제대로 가입하도록, 그리고 이미 가입한 보험을 " +
            "십분 활용할 수 있도록 도움을 주고자 만들어졌습니다.",
            imageUrl:"url(./partials/layout/contents/main/img/slide-01.jpg)",
            bgColor:"#548ed0"
          },{
            txtImgUrl:"url(./partials/layout/contents/main/img/slide-txt-bg02.png)",
            titIr : "알면보험 모르면 모험",
            titBg : "slide-txt-tit01.png",
            titAlt : "슈가 is...",
            txt1 : "인슈어런스(Insurance) + 가이드(Guide)란 단어가 결합된 말로 " +
            "국내 유일의 온라인 기반 보험 자문 / 상품비교 서비스",
            txt2 : "정보의 비대칭으로 인해 소비자는 본인이 비싼 보험에 가입했는지, " +
            "합리적인 보험료를 납입하는지 쉽게 파악할 수 없는게 현실이다.",
            txt3 : "슈가는 고객들이 보험에 제대로 가입하도록, 그리고 이미 가입한 보험을 " +
            "십분 활용할 수 있도록 도움을 주고자 만들어졌습니다.",
            imageUrl:"url(./partials/layout/contents/main/img/slide-02.jpg)",
            bgColor:"#848484"
          },{
            txtImgUrl:"url(./partials/layout/contents/main/img/slide-txt-bg03.png)",
            titIr : "알면보험 모르면 모험",
            titBg : "slide-txt-tit01.png",
            titAlt : "슈가 is...",
            txt1 : "인슈어런스(Insurance) + 가이드(Guide)란 단어가 결합된 말로 " +
            "국내 유일의 온라인 기반 보험 자문 / 상품비교 서비스",
            txt2 : "정보의 비대칭으로 인해 소비자는 본인이 비싼 보험에 가입했는지, " +
            "합리적인 보험료를 납입하는지 쉽게 파악할 수 없는게 현실이다.",
            txt3 : "슈가는 고객들이 보험에 제대로 가입하도록, 그리고 이미 가입한 보험을 " +
            "십분 활용할 수 있도록 도움을 주고자 만들어졌습니다.",
            imageUrl:"url(./partials/layout/contents/main/img/slide-03.jpg)",
            bgColor:"#18b3af"
          }
        ];

        //슈가의 보험 추천이 일리있는 이유
        $scope.recommendList = [
          {
            tit: "보험 활용법(합리적인 기준과 방법) 가이드 제시",
            txt: "보험에 대해 최대한 쉽게 설명하고, 보험을 최대한 활용할 수 있도록 합리적인 기준과" +
            " 방법을 제시해드립니다.",
            imageUrl:"recommend-01.png"
          }, {
            tit: "본인 상황에 맞춰 꼭 필요한 만큼만 최소한의 비용으로 보험 설계 추천",
            txt: "소비자를 현혹하기 쉬운 상품, 판매를 위해 포장된 상품을 제외하고 개인별 소득 및" +
            " 현재 속한 생애주기를 기반으로 필요한 위험 대비 영역 / 금액 / 우선순위 상품 군을 추천",
            imageUrl:"recommend-02.png"
          }, {
            tit: "현재 보유 중인 상품 보장 비교/분석",
            txt: "고객이 보유하고 있는 보험 증권을 슈가 추천안과 비교하여 CFP가 적정 여부 진단 등" +
            " 분석결과 리포트 제공",
            imageUrl:"recommend-03.png"
          }, {
            tit: "표준화 된 기준으로 상품의 객관적인 비교 제공",
            txt: "고객 정보(DB)수집이 주 목적이 아닌 정확한 가격비교가 가능하도록 표준화 된 기준" +
            "(현명한 보험 소비 관점)을 정하여 최저가 순으로 상품별 / 보험사별 가격 정보 제공",
            imageUrl:"recommend-04.png"
          }
        ];

        // 보험의 진실편
        $scope.truthList = [
          {
            tit : "치과보험 손해 안 보려면 치과 절대 가지 마라",
            date : "2016-06-06",
            txt : "Phasellus vehicula justo eget diam posuere sollicitudin eu tincidunt nulla",
            imageUrl:"url(./partials/layout/contents/main/img/reason-01.jpg)"
          },{
            tit : "치과보험 손해 안 보려면 치과 절대 가지 마라",
            date : "2016-06-06",
            txt : "Phasellus vehicula justo eget diam posuere sollicitudin eu tincidunt nulla",
            imageUrl:"url(./partials/layout/contents/main/img/reason-01.jpg)"
          },{
            tit : "치과보험 손해 안 보려면 치과 절대 가지 마라",
            date : "2016-06-06",
            txt : "Phasellus vehicula justo eget diam posuere sollicitudin eu tincidunt nulla",
            imageUrl:"url(./partials/layout/contents/main/img/reason-01.jpg)"
          }
        ];

        $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            layoutService.fire();

            var $eventArea = $('.event-area'),
                $eventList = $('.event-list'),
                idx = 0;
            $(window).resize(function () {
              var eventWID = $('.event-con').width(),
                  movetxt01HEI = $('.move-txt01').height();
              $('.move-txt02').css('height',movetxt01HEI);
              $eventList.eq(0).css('margin-left' , -eventWID * 0.23);
            });
            $(window).trigger("resize");

            $eventList.eq(idx).addClass('on');
            var slideRel = setInterval(function () {
              //  slideFn ($eventList, idx, 0, "-100%", 1000);
              idx ++;
              fadeFn ($eventList, idx, 1000);
              //  slideFn ($eventList, idx, "100%", 0, 1000);
            },4000);

            //$eventArea.on({
            //  mouseenter : function () {
            //    clearInterval(slideRel)
            //  },
            //  mouseleave : function () {
            //    slideRel = setInterval(function () {
            //      idx++;
            //      fadeFn ($eventList, idx, 2000);
            //    },4000);
            //  }
            //});
            //function fadeFn (select, index, sec) {
            //  var leng = select.length;
            //  select.eq(index).find('.event-area').fadeIn(sec)
            //      .parent('li').addClass('on')
            //      .siblings().removeClass('on').find('.event-area')
            //      .fadeOut(sec);
            //  if(index == leng){
            //    idx = 0;
            //    fadeFn (select, idx, sec);
            //  }
            //}

            function slideFn (select, index, start, end, sec) {
              var leng = select.length;
              select.eq(index).addClass('on').find('.event-area').css({display:'block',left:start})
                  .stop().animate({left:end},sec).parent('li').siblings('li').removeClass('on');
              if(index == leng){
                idx = 0;
                slideFn (select, idx, start, end, sec)
              }else if(index < 0){
                idx = leng - 1;
                slideFn (select, idx, start, end, sec)
              }
            }
          });
    }]);// contentsController.controller

    // directive
    layoutIndexModule.directive('viewDetail', function () {
      return {
        restrict : "E",
        replace:true,
        transclude:true,
        templateUrl:'./partials/layout/contents/main/template/viewDetail.html'
      }
    });

});
