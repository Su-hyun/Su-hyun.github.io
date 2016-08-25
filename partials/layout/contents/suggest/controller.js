'use strict';

define(['projectSugar'], function () {
  console.log("보험상품추천");
  var suggestModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'suggestService', 'layoutService']);
  suggestModule.controller('suggestController', ['$scope', '$http', '$ocLazyLoad', 'suggestService', 'layoutService',
    function($scope, $http, $ocLazyLoad, suggestService, layoutService) {

      //api 서버 주소
      //var apiServer = 'http://localhost:3000';
      var apiServer = 'http://192.168.100.35:3000';

      //변수 초기화
      $scope.total_annuity_money = 0;
      $scope.total_save_money = 0;
      $scope.medical_money = 0;
      $scope.diagnose_money = 0;


      $scope.lowerPriceList = [];
      $scope.lowerPriceList2 = [];
      $scope.diagnose1List = [];  // 진단비 (2개 상품)
      $scope.diagnose21List = [];  // 진단비 (1개 상품)
      $scope.diagnose22List = [];  // 진단비 (1개 상품)


      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          suggestService.fire();
          layoutService.fire();

          var $article = $('#suggestMain > article'),
              $articleOn = $('#suggestMain > article.on'),
              arNum = $articleOn.length,
              $mustHave = $('.mustHave'),
              $mustHaveOn = $('.mustHave-on'),
              $mighBe = $('.mightBe'),
              $mightBeOn = $('.mightBe-on');
          if($mustHave.is('.on')) $mustHaveOn.addClass('on');
          if($mighBe.is('.on')) $mightBeOn.addClass('on');
          if(arNum < 10) arNum = '0' + arNum;
          if(arNum > 1){
            $articleOn.eq(0).find('span.arIdx').text("01");
            $articleOn.eq(1).find('span.arIdx').text("02");
            $articleOn.eq(2).find('span.arIdx').text("03");
            $articleOn.eq(3).find('span.arIdx').text("04");
          }else{
            $('span.arIdx').text(arNum)
          }

          for(var i = 0; i < $article.length; i++){
            var leftHEI = $article.eq(i).find('.suggest-bottom-left').height();
            var rightHEI = $article.eq(i).find('.suggest-bottom-right').innerHeight();
            console.log(leftHEI)
            console.log(rightHEI)
            if(rightHEI < leftHEI){
              $article.eq(i).find('.suggest-bottom-right').css('height', leftHEI);
              $article.eq(0).find('.suggest-bottom-right').css('height', 'auto')
            }
          }

          //쿠키 값을 가지고 내용 가져오기 진행.
          var sidx = $.cookie("sidx");

          if(sidx != undefined && sidx != "") {
              //입력된 정보 가져오기
            $http.get(apiServer+'/insurance/sugarInfo',{params:{sidx:sidx}})
              .success(function(data, status, headers, config) {

                var name = data.memInfo.name;
                $scope.userName = name;
                $scope.userChild = data.memInfo.child;

                $scope.userMarride = data.memInfo.married;
                $scope.userSubfamily = data.memInfo.subfamily;

                var birth = data.memInfo.birthday;
                var birthyear = birth.substring(0,4);
                var birthmonth = birth.substring(4,6);
                var birthday = birth.substring(6,8);
                var monthlypay = data.memInfo.salary;
                var kukminyear = data.memInfo.start_job;
                var sex = data.memInfo.sex=="남자"?"M":"F";

                var data = {
                    name : name,
                    birthyear : birthyear,
                    birthmonth : birthmonth,
                    birthday : birthday,
                    monthlypay : monthlypay,
                    kukminyear : kukminyear,
                    sex : sex
                };

                //입력 정보를 기준으로 금액 정보 가져오기
                $http.get(apiServer+'/insurance/info',{params: data})
                  .success(function (data, status, headers, config) {

                    console.log(data);

                    $scope.annuity = [
                      {
                          per : Math.round(data.kukminPer),
                          money : getMoneyKor2(data.monthlyKukminPay)
                      },
                      {
                          per : 10,
                          money : getMoneyKor2(data.endjobAnnuityMoney)
                      },
                      {
                          per : Math.round(data.annuityPer),
                          money : getMoneyKor2(data.annuityMoney)
                      }
                    ];

                    $scope.needMonthMoney = getMoneyKor2(data.needMonthMoney);

                    var insurage = data.insurAge;

                    //실손의료비보험 목록 가져오기
                    $http.get(apiServer+'/insurance/health', {params: {insurage: insurage, insurPay: data.medicalMoney, insurType:'medical', sex:sex}})
                      .success(function(data) {

                        //받아온 데이터를 가지고 화면 구성 하기
                        for(var i in data) {
                          if(i == 0 ) {
                            $scope.total_save_money += data[0].total_amount;
                            $scope.medical_money = data[0].price;
                          }
                        }
                        $scope.medicalProductList = data;
                      });

                    //진단비 목록 가져오기  (2개 상품 : 일반암 + 심근경색 , 뇌출혈 )
                    $scope.diagnosePrice = 0;
                    $http.get(apiServer+'/insurance/health', {params: {insurage: insurage, insurPay: data.diagnoseMoney, insurType:'diagnose21', sex:sex}})
                      .success(function(data) {

                        //받아온 데이터를 가지고 화면 구성 하기
                        for(var i in data) {
                          if(i == 0) {
                            $scope.total_save_money += data[0].total_amount;
                            $scope.diagnosePrice = data[0].price;

                            $scope.diagnose21List.push(data[0]);
                          } else {
                            $scope.diagnose21List.push(data[1]);
                          }
                        }
                      });

                    $http.get(apiServer+'/insurance/health', {params: {insurage: insurage, insurPay: data.diagnoseMoney, insurType:'diagnose22', sex:sex}})
                      .success(function(data) {

                          //받아온 데이터를 가지고 화면 구성 하기
                        for(var i in data) {
                          if(i == 0) {
                            $scope.total_save_money += data[0].total_amount;
                            $scope.diagnosePrice += data[0].price;

                            $scope.diagnose22List.push(data[0]);

                          } else {
                            $scope.diagnose22List.push(data[1]);
                          }
                        }
                      });

                    //진단비 목록 가져오기 (1개 상품 : 일반암 뇌출혈 심근경색)
                    $http.get(apiServer+'/insurance/health', {params: {insurage: insurage, insurPay: data.diagnoseMoney, insurType:'diagnose1', sex:sex}})
                      .success(function(data) {

                        //받아온 데이터를 가지고 화면 구성 하기
                        for(var i in data) {

                        }
                        $scope.diagnose1List = data;
                      });

                    $scope.insurInfoList = [];

                    //정기보험 부분
                    if(data.insur10Money > 0) {

                      var age = insurage + 10;
                      var ageTerm = insurage + " ~ " + age + " 세";

                      var insurTMoney = data.insurMoney;

                      var inuserinfolist = {
                        insurAge : insurage,
                        age: age,
                        ageTerm : ageTerm,
                        insurMoney : data.insurMoney,
                        insurTerm : "10년 만기",
                        insurTermMoney : data.insur10Money,
                        insurMoneyKor : getMoneyKor(insurTMoney),
                        insurTermMoneyKor : getMoneyKor(data.insur10Money),
                        monthPay : 0
                      };



                      //정기보험 목록 가져오기 (10년)
                      $http.get(apiServer+'/insurance/insur', {params: {insurage: insurage, insurPay: data.insur10Money, insurType:'10'}})
                        .success(function(data) {

                          //받아온 데이터를 가지고 화면 구성 하기
                          for(var i in data) {
                            if(i == 0) {
                              $scope.insurInfoList[0].monthPay = data[0].price;

                              $scope.total_save_money += data[0].total_amount;

                              inuserinfolist.logoImg="lifeplanet.png"
                              inuserinfolist.monthPay=data[0].price;
                              inuserinfolist.insurable=data[0].total_amount;
                              inuserinfolist.term="10년 만기";
                              inuserinfolist.insurableKor = getMoneyKor(data[0].total_amount);

                              $scope.insurInfoList.push(inuserinfolist);

                            } else {
                              $scope.lowerPriceList2.push(
                                  { logoImg:"lifeplanet.png", monthPay:data[1].price, insurable:data[1].total_amount, insurableKor:getMoneyKor(data[1].total_amount), term:"10년 만기"}
                              );
                            }
                          }
                        });
                    }

                    if(data.insur20Money > 0) {

                      var age = insurage + 20;
                      var ageTerm = insurage + " ~ " + age + " 세";
                      var insurTMoney = data.insurMoney;
                      if($scope.insurInfoList.length > 0) {
                        ageTerm = $scope.insurInfoList[0].age + " ~ " + age + " 세";
                        insurTMoney -= $scope.insurInfoList[0].insurTermMoney;
                      }

                      var inuserinfolist = {
                        insurAge : insurage,
                        age: age,
                        ageTerm : ageTerm,
                        insurMoney : data.insurMoney,
                        insurTerm : "20년 만기",
                        insurTermMoney : data.insur20Money,
                        insurMoneyKor : getMoneyKor(insurTMoney),
                        insurTermMoneyKor : getMoneyKor(data.insur20Money),
                        monthPay : 0
                      };

                      //정기보험 목록 가져오기 (10년)
                      $http.get(apiServer+'/insurance/insur', {params: {insurage: insurage, insurPay: data.insur20Money, insurType:'20'}})
                        .success(function(data) {

                          //받아온 데이터를 가지고 화면 구성 하기
                          for(var i in data) {
                            if(i == 0) {
                              inuserinfolist.logoImg="lifeplanet.png"
                              inuserinfolist.monthPay=data[0].price;
                              inuserinfolist.insurable=data[0].total_amount;
                              inuserinfolist.term="20년 만기";
                              inuserinfolist.insurableKor = getMoneyKor(data[0].total_amount);

                              $scope.insurInfoList.push(inuserinfolist);

                              if($scope.insurInfoList.length > 1) $scope.insurInfoList[$scope.insurInfoList.length - 1].monthPay = $scope.insurInfoList[$scope.insurInfoList.length - 2].monthPay + data[0].price;
                              else  $scope.insurInfoList[$scope.insurInfoList.length - 1].monthPay = data[0].price;
                              $scope.total_save_money += data[0].total_amount;

                            } else {
                              $scope.lowerPriceList2.push(
                                { logoImg:"lifeplanet.png", monthPay:data[1].price, insurable:data[1].total_amount,insurableKor:getMoneyKor(data[1].total_amount), term:"20년 만기"}
                              );
                            }
                          }
                        });
                    }

                    if(data.insur65Money > 0) {

                      var age = 65;
                      var ageTerm = insurage + " ~ " + age + " 세";
                      var insurTMoney = data.insurMoney;

                      if($scope.insurInfoList.length>1) {
                        ageTerm = $scope.insurInfoList[1].age + " ~ " + age + " 세";
                        insurTMoney -= $scope.insurInfoList[1].insurTermMoney;
                      }
                      else if($scope.insurInfoList.length>0) {
                        ageTerm = $scope.insurInfoList[0].age + " ~ " + age + " 세";
                        insurTMoney -= $scope.insurInfoList[0].insurTermMoney;
                      }


                      var inuserinfolist = {
                        insurAge : insurage,
                        age: age,
                        ageTerm : ageTerm,
                        insurMoney : data.insurMoney,
                        insurTerm : "65세 만기",
                        insurTermMoney : data.insur65Money,
                        insurMoneyKor : getMoneyKor(insurTMoney),
                        insurTermMoneyKor : getMoneyKor(data.insur65Money),
                        monthPay : 0
                      };

                      //정기보험 목록 가져오기 (10년)
                      $http.get(apiServer+'/insurance/insur', {params: {insurage: insurage, insurPay: data.insur65Money, insurType:'65'}})
                        .success(function(data) {

                          //받아온 데이터를 가지고 화면 구성 하기
                          for(var i in data) {
                            if(i == 0) {
                              inuserinfolist.logoImg="lifeplanet.png"
                              inuserinfolist.monthPay=data[0].price;
                              inuserinfolist.insurable=data[0].total_amount;
                              inuserinfolist.term="65세 만기";
                              inuserinfolist.insurableKor = getMoneyKor(data[0].total_amount);

                              $scope.insurInfoList.push(inuserinfolist);

                              if($scope.insurInfoList.length > 1) $scope.insurInfoList[$scope.insurInfoList.length - 1].monthPay = $scope.insurInfoList[$scope.insurInfoList.length - 2].monthPay + data[0].price;
                              else  $scope.insurInfoList[$scope.insurInfoList.length - 1].monthPay = data[0].price;

                              $scope.total_save_money += data[0].total_amount;

                            } else {
                              $scope.lowerPriceList2.push(
                                { logoImg:"lifeplanet.png", monthPay:data[1].price, insurable:data[1].total_amount,insurableKor:getMoneyKor(data[1].total_amount), term:"65세 만기"}
                              );
                            }
                          }
                        });
                    }

                    //연금저축  목록 가져오기 annuity
                    $scope.annuityPrice = 0;
                    if(data.annuityMoney > 0) {
                      $http.get(apiServer+'/insurance/annuity', {params: {insurage: insurage, insurPay: data.annuityMoney, insurType:'saving'}})
                        .success(function(data) {

                          //받아온 데이터를 가지고 화면 구성 하기
                          for(var i in data) {
                            if(i == 0) {
                              $scope.total_annuity_money += data[0].total_amount;
                              $scope.annuityPrice = data[0].price;
                              $scope.total_annuity_money = data[0].price;
                            }
                          }
                          $scope.savingList = data;
                        });
                    }

                    //연금보험  목록 가져오기 annuity
                    if(data.annuityMoney > 0) {
                      $http.get(apiServer+'/insurance/annuity', {params: {insurage: insurage, insurPay: data.annuityMoney, insurType:'univer'}})
                        .success(function(data) {

                          //받아온 데이터를 가지고 화면 구성 하기
                          for(var i in data) {
                            if(i == 0) {
                                // $scope.total_annuity_money += data[0].total_amount;
                            }
                          }
                          $scope.univerList = data;

                        });
                    }
                  })
                  .error(function(data, status, headers, config) {

                  });
                })
                .error(function(data,status,headers,config) {
                    alert(" 데이터 처리에 문제가 발생 하였습니다. 잠시후 다시 시도해 주십시오.");
                });
          } else {
            alert("검색할 정보가 없습니다");
            $scope.broadcastGoToHome();
          }
        });
    }]);//suggestController.controller

  // directive
  suggestModule.directive('actualExpense', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/suggest/template/actualExpense.html'
    }
  });
  suggestModule.directive('termIns', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/suggest/template/termIns.html'
    }
  });
  suggestModule.directive('ciIns', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/suggest/template/ciIns.html'
    }
  });
  suggestModule.directive('pensionIns', function () {
    return {
      restrict : "E",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/suggest/template/pensionIns.html'
    }
  });
});


function getMoneyKor(money) {

    var returnString = "";

    console.log(money);
    if(money > 100000) money = parseInt(money / 10000);

    if(money > 9999) {

        var tMoney = money % 10000;
        var mMoney = money - tMoney;

        returnString = parseInt(mMoney / 10000) + "억";

        if(tMoney > 0) returnString += " "+ parseInt(tMoney / 1000) + "천";

    } else {
        returnString = parseInt(money / 1000) + "천";
    }

    return returnString;
}

function getMoneyKor2(money)
{
    money = (parseInt(money) / 10000);

    return Math.round(money);

}