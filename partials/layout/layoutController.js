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
          $ocLazyLoad.load('partials/layout/contents/index.css');
          layoutService.fire();
        } else if (file === 'partials/layout/footer/') {
          layoutService.fire();
        }
      });

      $scope.$on('goToHome', function() {
        $scope.contentWrapper = 'partials/layout/contents/';
        $ocLazyLoad
            .load('partials/layout/contents/index.css');
        layoutService.fire();
        console.log("goToHome");
      });

      $scope.broadcastGoToHome = function() {
        $scope.$broadcast('goToHome');
      };

      //main
      $scope.main = function() {
        $ocLazyLoad
          .load([{
            name : 'mainService',
            files : [ 'partials/layout/contents/main/service.js' ]
          },{
            name : 'mainController',
            files : [ 'partials/layout/contents/main/controller.js' ]
          }, 'partials/layout/contents/main/index.css'
          ])
          .then(function() {
                $scope.contentWrapper = "partials/layout/contents/main/";
              }, function(e) {
                console.log(e);
              }
          );
      };

      //보험바로 알기
      $scope.knowExactly = function() {
        $ocLazyLoad
          .load([{
            name : 'knowExactlyService',
            files : [ 'partials/layout/contents/knowExactly/service.js' ]
          },{
            name : 'knowExactlyController',
            files : [ 'partials/layout/contents/knowExactly/controller.js' ]
          }, 'partials/layout/contents/knowExactly/index.css'
          ])
          .then(function() {
            $scope.contentWrapper = "partials/layout/contents/knowExactly/";
            }, function(e) {
            console.log(e);
            }
          );
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

      // 상품 가이드
      $scope.productGuide = function() {
        $ocLazyLoad
          .load([{
            name : 'productGuideService',
            files : [ 'partials/layout/contents/productGuide/service.js' ]
          },{
            name : 'productGuideController',
            files : [ 'partials/layout/contents/productGuide/controller.js' ]
          }, 'partials/layout/contents/productGuide/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/productGuide/";
            }, function(e) {
              console.log(e);
            }
          );
      };


      // 보장분석
      $scope.indemnityAnalysis = function() {
        $ocLazyLoad
          .load([{
            name : 'indemnityAnalysisService',
            files : [ 'partials/layout/contents/indemnityAnalysis/service.js' ]
          },{
            name : 'indemnityAnalysisController',
            files : [ 'partials/layout/contents/indemnityAnalysis/controller.js' ]
          }, 'partials/layout/contents/indemnityAnalysis/index.css'
          ])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/indemnityAnalysis/";
            }, function(e) {
              console.log(e);
            }
          );
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

      $ocLazyLoad
        .load('./partials/common/js/jquery.cookie.js')
        .then(function () {
          layoutService.fire();
        });

    }]); // layoutIndexModule.controller


    // directive
    //layoutIndexModule.directive('viewDetail', function () {
    //  return {
    //    restrict : "E",
    //    replace:true,
    //    transclude:true,
    //    templateUrl:'./partials/layout/contents/main/template/viewDetail.html'
    //  }
    //});

});
