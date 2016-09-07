'use strict';


//api 서버 주소
//var apiServer = 'http://localhost:3000';
var apiServer = 'http://192.168.100.35:3000';

var yopServer = 'https://yellopass-staging.yellofg.com/noco-itgr-auth/v1';
//var yopServer = 'https://yellopass.yellofg.com//noco-itgr-auth/v1';


define(
  ['projectSugar'],
  function() {
    var layoutIndexModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'layoutService']);
    layoutIndexModule.controller('layoutController', ['$scope','$http', '$ocLazyLoad','layoutService', '$rootScope','$stateParams','$anchorScroll','$location',
      function($scope,$http, $ocLazyLoad, layoutService,$rootScope, $stateParams,$anchorScroll,$location) {

      $scope.mainHeader = 'partials/layout/header/';
      $scope.contentWrapper = 'partials/layout/contents/';
      $scope.mainFooter = 'partials/layout/footer/';

      $anchorScroll.yOffset = 0;

      $scope.$on('$includeContentLoaded',function(event, file) {

        if (file === 'partials/layout/header/'){
          console.log(file)
        }else if (file === 'partials/layout/contents/'){
          $ocLazyLoad.load('partials/layout/contents/index.css');
          console.log(file)
        }else if (file === 'partials/layout/footer/'){
          console.log(file)
        }
      });

      // --* URL 지정 *--
      // 내 보장분석 URL
      $scope.$on('indemnityAnalysis', function() {
        $ocLazyLoad
          .load([
            {
              name : 'recommendService',
              files : [ 'partials/layout/contents/recommend/service.js' ]
            },
            {
              name : 'recommendController',
              files : [ 'partials/layout/contents/recommend/controller.js' ]
            },
              'partials/layout/contents/recommend/index.css'])
          .then(
            function() {
              $scope.contentWrapper = "partials/layout/contents/recommend/indemnityAnalysis/";
                window.moveTo(0,0);
            },
            function(e) {
              console.log(e);
            });
      });
      // --* URL 종료 *--


      // --* Lnb 이동 *--
      //메인페이지
      $scope.$on('goToHome', function() {
        $scope.contentWrapper = 'partials/layout/contents/';
        $ocLazyLoad.load('partials/layout/contents/index.css');
        console.log("goToHome");
          window.moveTo(0,0);
      });
      $scope.broadcastGoToHome = function() {
        $scope.$broadcast('goToHome');
      };

      //보험바로 알기
      $scope.knowExactly = function(id) {
        var $this = $($(id.target));

          $location.hash('subBG');
          $anchorScroll();

        if($this.parent().is('.active')) {
          $ocLazyLoad
            .load ([{
              name: 'properInsService',
              files: ['partials/layout/contents/properInsurance/service.js']
            }, {
              name: 'properInsController',
              files: ['partials/layout/contents/properInsurance/controller.js']
            }, 'partials/layout/contents/properInsurance/index.css'])
            .then (function () {
                  $scope.contentWrapper = "partials/layout/contents/properInsurance/";

                }, function (e) {
                  console.log (e);
                }
            );
        }
      };

      //올바른 보험
      $scope.properInsurance = function() {

          $location.hash('subBG');
          $anchorScroll();

        $ocLazyLoad
          .load ([{
              name: 'properInsService',
              files: ['partials/layout/contents/properInsurance/service.js']
            }, {
              name: 'properInsController',
              files: ['partials/layout/contents/properInsurance/controller.js']
            }, 'partials/layout/contents/properInsurance/index.css'])
          .then (function () {
              $scope.contentWrapper = "partials/layout/contents/properInsurance/";
            }, function (e) {
              console.log (e);
            }
          );
      };

      //보험의 진실
      $scope.tellTruth = function() {

          $location.hash('subBG');
          $anchorScroll();


          $ocLazyLoad
          .load ([{
            name: 'tellTruthService',
            files: ['partials/layout/contents/tellTruth/service.js']
          }, {
            name: 'tellTruthController',
            files: ['partials/layout/contents/tellTruth/controller.js']
          }, 'partials/layout/contents/tellTruth/index.css'])
          .then (function () {
              $scope.contentWrapper = "partials/layout/contents/tellTruth/";
              window.moveTo(0,0);
            }, function (e) {
              console.log (e);
            }
          );
      };

      // 내게 맞는 보험 찾기
      $scope.searchInsurance = function() {

          $location.hash('subBG');
          $anchorScroll();

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

          $location.hash('subBG');
          $anchorScroll();

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

          $location.hash('subBG');
          $anchorScroll();

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

          $location.hash('subBG');
          $anchorScroll();

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
                $scope.contentWrapper = "partials/layout/contents/productGuide/expenses/";
              }, function(e) {
                console.log(e);
              }
            );
        }
      };

      // 실손의료비 가이드
      $scope.expensesGuide = function() {

          $location.hash('subBG');
          $anchorScroll();

          $ocLazyLoad
          .load([{
            name : 'productGuideService',
            files : [ 'partials/layout/contents/productGuide/service.js' ]
          },{
            name : 'productGuideController',
            files : [ 'partials/layout/contents/productGuide/controller.js' ]
          }, 'partials/layout/contents/productGuide/index.css'])
          .then(function() {
                $scope.contentWrapper = "partials/layout/contents/productGuide/expenses/";
              }, function(e) {
                console.log(e);
              }
          );
      };

      // 정기보험 가이드
      $scope.termGuide = function() {

          $location.hash('subBG');
          $anchorScroll();

          $ocLazyLoad
          .load([{
            name : 'productGuideService',
            files : [ 'partials/layout/contents/productGuide/service.js' ]
          },{
            name : 'productGuideController',
            files : [ 'partials/layout/contents/productGuide/controller.js' ]
          }, 'partials/layout/contents/productGuide/index.css'])
          .then(function() {
                $scope.contentWrapper = "partials/layout/contents/productGuide/term/";
              }, function(e) {
                console.log(e);
              }
          );
      };

      // 진단비 가이드
      $scope.diagnosisGuide = function() {

          $location.hash('subBG');
          $anchorScroll();

          $ocLazyLoad
          .load([{
            name : 'productGuideService',
            files : [ 'partials/layout/contents/productGuide/service.js' ]
          },{
            name : 'productGuideController',
            files : [ 'partials/layout/contents/productGuide/controller.js' ]
          }, 'partials/layout/contents/productGuide/index.css'])
          .then(function() {
                $scope.contentWrapper = "partials/layout/contents/productGuide/diagnosis/";
              }, function(e) {
                console.log(e);
              }
          );
      };

      // 연금 가이드
      $scope.pensionGuide = function() {

          $location.hash('subBG');
          $anchorScroll();

          $ocLazyLoad
          .load([{
            name : 'productGuideService',
            files : [ 'partials/layout/contents/productGuide/service.js' ]
          },{
            name : 'productGuideController',
            files : [ 'partials/layout/contents/productGuide/controller.js' ]
          }, 'partials/layout/contents/productGuide/index.css'])
          .then(function() {
                $scope.contentWrapper = "partials/layout/contents/productGuide/pension/";
              }, function(e) {
                console.log(e);
              }
          );
      };

      // 보장분석 소개
      $scope.indemnityIntroduce = function(id) {

          $location.hash('subBG');
          $anchorScroll();

          var $this = $($(id.target));
        if($this.parent().is('.active')) {
          $ocLazyLoad
            .load ([{
              name: 'indemnityIntroduceService',
              files: ['partials/layout/contents/indemnityIntroduce/service.js']
            }, {
              name: 'indemnityIntroduceController',
              files: ['partials/layout/contents/indemnityIntroduce/controller.js']
            }, 'partials/layout/contents/indemnityIntroduce/index.css'])
            .then (function () {
                $scope.contentWrapper = "partials/layout/contents/indemnityIntroduce/";
              }, function (e) {
                console.log (e);
              }
            );
        }
      };

      // 핵심보장분석 소개
      $scope.indemnityIntroduceSub = function() {

          $location.hash('subBG');
          $anchorScroll();

          $ocLazyLoad
          .load ([{
            name: 'indemnityIntroduceService',
            files: ['partials/layout/contents/indemnityIntroduce/service.js']
          }, {
            name: 'indemnityIntroduceController',
            files: ['partials/layout/contents/indemnityIntroduce/controller.js']
          }, 'partials/layout/contents/indemnityIntroduce/index.css'])
          .then (function () {
                $scope.contentWrapper = "partials/layout/contents/indemnityIntroduce/";
              }, function (e) {
                console.log (e);
              }
          );
      };

      // 내 보장분석
      $scope.indemnityAnalysis = function() {

          $location.hash('subBG');
          $anchorScroll();

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
                $scope.contentWrapper = "partials/layout/contents/recommend/indemnityAnalysis/";
              }, function(e) {
                console.log(e);
              }
          );
      };

      //// 내 보장분석
      //$scope.indemnityAnalysis = function() {
      //  $ocLazyLoad
      //    .load ([{
      //      name: 'indemnityAnalysisService',
      //      files: ['partials/layout/contents/indemnityAnalysis/service.js']
      //    }, {
      //      name: 'indemnityAnalysisController',
      //      files: ['partials/layout/contents/indemnityAnalysis/controller.js']
      //    }, 'partials/layout/contents/indemnityAnalysis/index.css'])
      //    .then (function () {
      //        $scope.contentWrapper = "partials/layout/contents/indemnityAnalysis/";
      //      }, function (e) {
      //        console.log (e);
      //      }
      //    );
      //};

      // 보장분석 게시판
      $scope.indemnityBoard = function() {

          $location.hash('subBG');
          $anchorScroll();

          $ocLazyLoad
          .load ([{
            name: 'indemnityBoardService',
            files: ['partials/layout/contents/indemnityBoard/service.js']
          }, {
            name: 'indemnityBoardController',
            files: ['partials/layout/contents/indemnityBoard/controller.js']
          }, 'partials/layout/contents/indemnityBoard/index.css'])
          .then (function () {
                $scope.contentWrapper = "partials/layout/contents/indemnityBoard/";
              }, function (e) {
                console.log (e);
              }
          );
      };

      // help
      $scope.help = function(id) {

          $location.hash('subBG');
          $anchorScroll();

          var $this = $($(id.target));
        if($this.parent().is('.active')) {
          $ocLazyLoad
            .load ([{
              name: 'helpService',
              files: ['partials/layout/contents/help/service.js']
            }, {
              name: 'helpController',
              files: ['partials/layout/contents/help/controller.js']
            }, 'partials/layout/contents/help/index.css'
            ])
            .then (function () {
                  $scope.contentWrapper = "partials/layout/contents/help/";
                }, function (e) {
                  console.log (e);
                }
            );
        }
      };

      // 마이페이지
      $scope.myPage = function() {

          $location.hash('subBG');
          $anchorScroll();

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

        // 1:1 게시판
      $scope.oneAnd = function() {

          $location.hash('subBG');
          $anchorScroll();


          $ocLazyLoad
          .load([{
            name : 'oneAndService',
            files : [ 'partials/layout/contents/oneAnd/service.js' ]
          },{
            name : 'oneAndController',
            files : [ 'partials/layout/contents/oneAnd/controller.js' ]
          }, 'partials/layout/contents/oneAnd/index.css'
          ])
          .then(function() {
                $scope.contentWrapper = "partials/layout/contents/oneAnd/";

              }, function(e) {
                console.log(e);
              }
          );
      };

      // FAQ
      $scope.faQuestions = function() {

          $location.hash('subBG');
          $anchorScroll();

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
      $scope.showSingIn = false;
      $scope.signIn = function() {
        $scope.showSingIn = !$scope.showSingIn;
      };


      // 회사소개
      $scope.aboutFincl = function() {

          $location.hash('subBG');
          $anchorScroll();

          $ocLazyLoad
          .load([{
            name : 'aboutFinclService',
            files : [ 'partials/layout/contents/aboutFincl/service.js' ]
          },{
            name : 'aboutFinclController',
            files : [ 'partials/layout/contents/aboutFincl/controller.js' ]
          }, 'partials/layout/contents/aboutFincl/index.css'])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/aboutFincl/";
            }, function(e) {
              console.log(e);
            }
          );
      };

      // Value
      $scope.sugarValue = function() {

          $location.hash('subBG');
          $anchorScroll();

          $ocLazyLoad
          .load([{
            name : 'sugarValueService',
            files : [ 'partials/layout/contents/sugarValue/service.js' ]
          },{
            name : 'sugarValueController',
            files : [ 'partials/layout/contents/sugarValue/controller.js' ]
          }, 'partials/layout/contents/sugarValue/index.css'])
          .then(function() {
              $scope.contentWrapper = "partials/layout/contents/sugarValue/";
            }, function(e) {
              console.log(e);
            }
          );
      };


      // 이용약관
      $scope.userAgreement = function() {

          $location.hash('subBG');
          $anchorScroll();

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


          $scope.resetPasswd = function() {
              window.open("partials/subhtml/password_reset.html","resetPassword","width=500,height=700");
          };


          $ocLazyLoad
        .load('./partials/common/js/jquery.cookie.js')
        .then(function () {
          //layoutService.fire();

        });



          //로그인 처리
          $scope.doLogin = function() {

              //널값 체크
              if($("#email").val() == undefined || $("#email").val() == "") {
                  alert("E-mail을 입력해 주십시오");
                  return;
              }
              if($("#password").val() == undefined || $("#password").val() == "") {
                  alert("Password를 입력해 주십시오");
                  return;
              }

              var loginData = {
                  email : $("#email").val(),
                  password : $("#password").val()
              };


              $http.post(yopServer+'/users/login', loginData)
                  .success(function(data) {

                      if(data == "" || data == undefined) {
                          alert("등록된 이메일이 없습니다");
                      } else {
                          if(data.resultInfo.code == "200") {
                              //로그인 잘 되면 아이디 , 값 쿠키 굽고 로그인 창 닫기
                              var token = data.result.accessToken;
                              var reData = {
                                  fields : 'email,nickName,mobileNum,marriedYn,birthData,gender'
                              };

                              $http.get(yopServer+'/users/'+token, {params:reData})
                                  .success(function(data) {
                                      $.cookie("loginToken",token);
                                      $.cookie("loginemail",data.result.email);
                                      $.cookie("loginwriter",data.result.nickName);

                                      $scope.logintoken = token;

                                      $scope.broadcastGoToHome();

                                      alert("로그인 되었습니다");

                                      $("#loginView").modal('hide');

                                  });

                          } else {
                              alert(data.resultInfo.message);
                          }
                      }

                  }).error(function(error, status) {
                      console.log(error);

              });


          };


            $scope.logout = function() {
                $.cookie("loginToken","");
                $.cookie("loginemail","");
                $.cookie("loginwriter","");
                $scope.logintoken = "";
            };

            $scope.truthView = function(sbidx) {
                $scope.truthSbidx = sbidx;
                $scope.tellTruth();
            }


    }]); // layoutIndexModule.controller

    layoutIndexModule.controller('headerController', ['$scope', '$ocLazyLoad', 'layoutService',
      function($scope, $ocLazyLoad, layoutService) {
        $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {

            var $lnbUl = $('.lnb'),
                $subUl = $('.sub-lnb'),
                $subUlBg = $('.sub-bg');
            $('.logo-header').on('click', function () {
              $lnbUl.children('li').removeClass('active');
              $subUl.css('height',0);
              $subUlBg.css('height',0);
              console.log("ccccc")
            });
            $lnbUl.on('click', '> li', function() {
              var $this = $ (this);
              $this.addClass('on').siblings().removeClass('on');
              if (!$this.is ('.active')) {
                $this.addClass ('active').siblings().removeClass ('active');
                $subUlBg.css('height',160);
                $subUl.css('height',160);
                if(!$this.children().is('.sub-lnb')){
                  $this.removeClass('active');
                  $subUlBg.css('height',0);
                  $subUl.css('height',0)
                }
              }else if($this.is ('.active')) {
                $this.removeClass ('active');
                $subUl.css('height',0);
                $subUlBg.css('height',0);
              }
            });

            //$subUl.on('click', '> li', function () {
            //  console.log('sub')
            //  var $this = $(this)
            //  if($this.parents().is('.active')){
            //    console.log("acacac")
            //    $this.parents().removeClass('active')
            //  }
            //})

          })
      }]);

    // * main page *
    layoutIndexModule.controller('contentsController', ['$scope','$http', '$ocLazyLoad', '$stateParams', 'layoutService',
      function($scope,$http, $ocLazyLoad, $stateParams, layoutService) {
        console.log("----" + $stateParams.subModule + "----");

        // URL 감지
        angular.element(document).ready(function() {
          if($stateParams.subUrl){
            $scope.$emit('indemnityAnalysis');
          }
        });


        $scope.eventList = [
          {
            titIr : "알면보험 모르면 모험",
            txt11 : "인슈어런스(Insurance) + 가이드(Guide)란 단어가 결합된 말로 " +
            "국내 유일의 온라인 기반 보험 자문 / 상품비교 서비스",
            txt12 : "정보의 비대칭으로 인해 소비자는 본인이 비싼 보험에 가입했는지, " +
            "합리적인 보험료를 납입하는지 쉽게 파악할 수 없는게 현실이다.",
            txt13 : "슈가는 고객들이 보험에 제대로 가입하도록, 그리고 이미 가입한 보험을 " +
            "십분 활용할 수 있도록 도움을 주고자 만들어졌습니다."
          },{
            titIr : "알면보험 모르면 모험",
            txt0 : "알고하면, 더 큰 혜택",
            txt21 : "국내모든보험사 상품 정보를 수집하여 슈가만의 상품분석 알고리즘을 통해 최적의 상품군과 가장 저렴한 보험상품을 추천 해 드립니다.",
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
            imageUrl:"reason-01.jpg"
          },{
            tit : "치과보험 손해 안 보려면 치과 절대 가지 마라",
            date : "2016-06-06",
            txt : "Phasellus vehicula justo eget diam posuere sollicitudin eu tincidunt nulla",
            imageUrl:"reason-01.jpg"
          },{
            tit : "치과보험 손해 안 보려면 치과 절대 가지 마라",
            date : "2016-06-06",
            txt : "Phasellus vehicula justo eget diam posuere sollicitudin eu tincidunt nulla",
            imageUrl:"reason-01.jpg"
          }
        ];

        //메인페이지 보험의 진실 내용 가져오기
          getMainBoardList("true", 3, 1,'', $http, $scope, function(data) {
              $scope.truthList = [];

              for(var i in data.list) {


                  var redate = data.list[i].reg_datetime;
                  var list = {
                      tit : data.list[i].subject,
                      txt : data.list[i].content.substr(0,10),
                      date : redate,
                      count : data.list[i].count,
                      sbidx : data.list[i].sbidx,
                      imageUrl: data.list[i].file_path,
                      apiServer: apiServer
                  };

                  $scope.truthList .push(list);
              }


          });


        $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            layoutService.fire();
            var $eventArea = $('.event-area'),
                $eventList = $('.event-list'),
                idx = 0;
            $eventList.eq(idx).addClass('on');
            var slideRel = setInterval(function () {
              //  slideFn ($eventList, idx, 0, "-100%", 1000);
              idx ++;
              addOnFn ($eventList, idx);
              //fadeFn ($eventList, idx, 1000);
              //  slideFn ($eventList, idx, "100%", 0, 1000);
            },5000);

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

            function addOnFn (select, index) {
              var leng = select.length;
              select.eq(index).addClass('on').siblings().removeClass('on')
              if(index == leng){
                idx = 0;
                addOnFn (select, idx)
              }
            }

            //function slideFn (select, index, start, end, sec) {
            //  var leng = select.length;
            //  select.eq(index).addClass('on').find('.event-area').css({display:'block',left:start})
            //      .stop().animate({left:end},sec).parent('li').siblings('li').removeClass('on');
            //  if(index == leng){
            //    idx = 0;
            //    slideFn (select, idx, start, end, sec)
            //  }else if(index < 0){
            //    idx = leng - 1;
            //    slideFn (select, idx, start, end, sec)
            //  }
            //}
          });
    }]);// contentsController.controller

    // directive
    layoutIndexModule.directive('viewDetail', function () {
      return {
        restrict : "A",
        replace:true,
        transclude:true,
        templateUrl:'./partials/layout/contents/template/viewDetail.html'
      }
    });

    layoutIndexModule.directive('signInModal', function () {
      return {
        restrict : "A",
        replace:true,
        transclude:true,
        templateUrl:'./partials/layout/contents/template/signIn.html',
        scope:true,
        link: function postLink(scope, element, attrs) {
          scope.$watch(attrs.visible, function(value){
            if(value == true)
              $(element).modal('show');
            else
              $(element).modal('hide');
          });
          $(element).on('shown.bs.modal', function(){
            scope.$apply(function(){
              scope.$parent[attrs.visible] = true;
            });
          });
          $(element).on('hidden.bs.modal', function(){
            scope.$apply(function(){
              scope.$parent[attrs.visible] = false;
            });
          });
        }
      }
    });

    layoutIndexModule.directive('inputTable', function () {
      return {
        restrict : "A",
        replace:true,
        transclude:true,
        templateUrl:'./partials/layout/contents/template/inputInfo.html'
      }
    });

    layoutIndexModule.directive('recommendTable', function () {
      return {
        restrict : "A",
        replace:true,
        transclude:true,
        templateUrl:'./partials/layout/contents/template/recommendTable.html'
      }
    });
    
    layoutIndexModule.directive('infoTable', function () {
      return {
        restrict : "A",
        replace:true,
        transclude:true,
        templateUrl:'./partials/layout/contents/template/infoTable.html'
      }
    });

});


function getMainBoardList(boardCode, listCount, page,where, $http, $scope, callback) {

    $http.get(apiServer+'/board/totalcnt/'+boardCode,{params:{listCount:listCount, where:where}})
        .success(function(data, status, headers, config) {
            $scope.questionsList = [];

            $scope.page = page;
            $scope.totalPage = data.boardPage;

            if(data.boardCnt > 0) {

                $http.get(apiServer+'/board/list/'+boardCode+'/'+page,{params:{listCount:listCount, where:where}})
                    .success(function(data, status, headers, config) {

                        callback(data);

                    });

            } else {
                alert("게시물이 없습니다");
            }


        });
}