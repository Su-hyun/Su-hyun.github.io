'use strict';

define(['projectSugar'], function () {
  console.log("보험상품추천");
  var suggestModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'suggestService', 'layoutService']);
  suggestModule.controller('suggestController', ['$scope', '$http', '$ocLazyLoad', 'suggestService', 'layoutService',
    function($scope, $http, $ocLazyLoad, suggestService, layoutService) {

      //api 서버 주소
      //var apiServer = 'http://localhost:3000';
      //var apiServer = 'http://192.168.100.35:3000';

      var sex = "";
      var insurage = 0;
      var insur10Money = 0
      var insur20Money = 0;
      var insur65Money = 0;


      //변수 초기화
      $scope.total_annuity_money = 0;
      $scope.total_save_money = 0;
      $scope.medical_money = 0;
      $scope.diagnose_money = 0;


      $scope.lowerPriceList = [];  //첫번째 정기 보험 표시용
      $scope.lowerPriceList2 = []; //두번째 정기 보험 표시용
      $scope.lowerPriceList3 = []; //두번째 정기 보험 비교 저장용

      $scope.diagnose1List = [];  // 진단비 (2개 상품)
      $scope.diagnose21List = [];  // 진단비 (1개 상품)
      $scope.diagnose22List = [];  // 진단비 (1개 상품)

      $scope.medicalProductList = [];
      $scope.medicalChildProductList = [];
      $scope.insurInfoList = [];
      $scope.savingList = [];
      $scope.univerList = [];

      $scope.expensesMore = function () {
        var url = 'partials/layout/contents/productGuide/expenses/expensesMore.html',
            option = "resizable=no, scrollbars=no, status=no, width=1200, height=800";
        $window.open(url,"_blank",option)
      };

      $scope.termMore = function () {
        var url = 'partials/layout/contents/productGuide/term/termMore.html',
            option = "resizable=no, scrollbars=no, status=no, width=1200, height=800";
        $window.open(url,"_blank",option)
      };

      $scope.diagnosisMore = function () {
        var url = 'partials/layout/contents/productGuide/diagnosis/diagnosisMore.html',
            option = "resizable=no, scrollbars=no, status=no, width=1200, height=800";
        $window.open(url,"_blank",option)
      };

      $scope.pensionMore = function () {
        var url = 'partials/layout/contents/productGuide/pension/pensionMore.html',
            option = "resizable=no, scrollbars=no, status=no, width=1200, height=800";
        $window.open(url,"_blank",option)
      };

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
            , './partials/common/js/html2canvas.min.js'
            ,'./partials/common/js/canvas2image.js'
          ])
          .then(function() {
            suggestService.fire();
            layoutService.fire();

            var $article = $('#suggestMain > article'),
                $articleOn = $('#suggestMain > article.on'),
                arNum = $articleOn.length,
                $mustHave = $('.mustHave'),
                $mustHaveOn = $('.mustHave-on'),
                $mightBe = $('.mightBe'),
                $mightBeOn = $('.mightBe-on'),
                $suggestTop = $('.suggest-con-top');
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
            $suggestTop.on('click', function(){
              var $this = $(this);
              $this.next('.suggest-con-bottom').toggleClass('changeHeight')
            });

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
                    sex = data.memInfo.sex=="남자"?"M":"F";
                    var child = data.memInfo.child;
                    var childList = data.childList;

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

                          insur10Money = data.insur10Money;
                          insur20Money = data.insur20Money;
                          insur65Money = data.insur65Money;



                          var ageTermA = data.insurAge;
                          if(parseInt(data.insur10Money) > 0) {
                            var insuerMoney = parseInt(data.insur10Money) + parseInt(data.insur20Money) + parseInt(data.insur65Money);
                            var ageTermTxt = ageTermA + " ~ ";
                            ageTermA = data.insurAge + 10;
                            ageTermTxt += ageTermA;
                            $scope.insurInfoList.push({ageTerm: ageTermTxt, insurMoneyKor : getMoneyKor(insuerMoney), insurTerm : "10년 만기", insurableKor : getMoneyKor(data.insur10Money)});
                          }
                          if(parseInt(data.insur20Money) > 0) {
                            var insuerMoney =  parseInt(data.insur20Money) + parseInt(data.insur65Money);
                            var ageTermTxt = ageTermA + " ~ ";
                            ageTermA = data.insurAge + 20;
                            ageTermTxt += ageTermA;
                            $scope.insurInfoList.push({ageTerm: ageTermTxt, insurMoneyKor : getMoneyKor(insuerMoney), insurTerm : "20년 만기", insurableKor : getMoneyKor(data.insur20Money)});
                          }
                          if(parseInt(data.insur65Money) > 0) {
                            var ageTermTxt = ageTermA + " ~ 65";

                            var insuerMoney =  parseInt(data.insur65Money);
                            $scope.insurInfoList.push({ageTerm: ageTermTxt, insurMoneyKor : getMoneyKor(insuerMoney), insurTerm : "65세 만기", insurableKor : getMoneyKor(data.insur65Money)});
                          }


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

                          insurage = data.insurAge;

                          //실손의료비보험 목록 가져오기
                          $http.get(apiServer+'/insurance/health', {params: {insurage: insurage, insurPay: data.medicalMoney, insurType:'medical', sex:sex}})
                              .success(function(data) {

                                //받아온 데이터를 가지고 화면 구성 하기
                                for(var i in data) {
                                  if(i == 0 ) {
                                    $scope.total_save_money += data[0].total_amount;
                                    // $scope.medical_money = data[0].price;

                                    $scope.medicalMoneyView('1',data[0].price);
                                  }
                                }
                                $scope.medicalProductList = data;

                                $scope.arIdx1 = "01";

                              });

                          //자녀가 있을 경우 자녀의 실손의료비도 구하기
                          if(child == "유") {
                            //자녀 인원수 만큼 구하기


                            console.log(childList);

                            for(var c in childList) {
                              var childSex = childList[c].sex=="남아"?"M":"F";
                              var childAge = getInsurAge(childList[c].age);


                              $http.get(apiServer+'/insurance/health', {params: {insurage: childAge, insurPay: data.medicalMoney, insurType:'medical', sex:childSex}})
                                  .success(function(data) {
                                    $scope.medicalChildProductList.push(data);

                                    console.log("list : "+$scope.medicalChildProductList.length);

                                  });

                            }
                          }

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


                          //정기보험 부분
                          if(data.insur10Money > 0) {

                            getInsurData(insurage, data.insur10Money, sex,0,"10","default", apiServer,$scope,$http, function() {

                              getInsurData(insurage, data.insur20Money, sex,0,"20","default", apiServer, $scope,$http, function() {

                                getInsurData(insurage, data.insur65Money, sex,0,"65","default",apiServer, $scope,$http, function() {

                                  //2단원 처리
                                  $scope.getNextInsurResult();

                                });
                              });
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

      //비용 합계 계산
      //insurInfoList[0].monthPay + insurInfoList[1].monthPay + insurInfoList[2].monthPay
      $scope.sumMoneyAll = function () {
        $scope.total_save_money =  $scope.medical_money + $scope.diagnosePrice + $scope.insurMonthMoney;
      };

      //실손 의료비 보험 금액 변경
      $scope.medical1Money = 0; //본인
      $scope.medical2Money = 0; //자녀
      $scope.medicalMoneyView = function(type, money) {
        if(type == "1") $scope.medical1Money = money;
        else $scope.medical2Money = money;

        $scope.medical_money = $scope.medical1Money + $scope.medical2Money;


        $scope.sumMoneyAll();
      };

      //연금 보험
      $scope.annuityMoneyView = function (money) {
        $scope.annuityPrice = money;
      };

      $scope.termMoneyView = function (type) {



        var insurMoney1 = $scope.lowerPriceList[0] == undefined?0:$scope.lowerPriceList[0].monthPay;
        var insurMoney2 = $scope.lowerPriceList[1] == undefined?0:$scope.lowerPriceList[1].monthPay;
        var insurMoney3 = $scope.lowerPriceList[2] == undefined?0:$scope.lowerPriceList[2].monthPay;

        if(type == 2) {
          insurMoney1 = $scope.lowerPriceList2[0] == undefined?0:$scope.lowerPriceList2[0].monthPay;
          insurMoney2 = $scope.lowerPriceList2[1] == undefined?0:$scope.lowerPriceList2[1].monthPay;
          insurMoney3 = $scope.lowerPriceList2[2] == undefined?0:$scope.lowerPriceList2[2].monthPay;
        }

        $scope.term_ins_price = insurMoney1 + insurMoney2 + insurMoney3;
      };


      //정기보험 다음 최저가 값 구해오기
      $scope.getNextInsurResult = function()
      {
        getNextInsur($scope,  function(monthPay10, monthPay20, monthPay65, minpay, minText) {

          var insurpay = 0;
          if(minText == "10") insurpay = insur10Money;
          else if(minText == "20") insurpay = insur20Money;
          else if(minText == "65") insurpay = insur65Money;

          getInsurData(insurage, insurpay, sex, minpay, minText,  "add", apiServer, $scope,$http, function() {

          });
        });
      };


      //화면을 캔버스에 담기
      $scope.viewCanvas = function()
      {


        var printHtml = '<section id="main_container" class="container suggest" >'+
            $("#main_container").html() +
            '</section>';


        $("#printhtml").contents().find('body').append(printHtml).trigger("create");
        $("#printhtml").contents().find('head').append($("<link/>", {rel:"stylesheet", href:"lib/normalize-css/normalize.css", type:"text/css"}));
        $("#printhtml").contents().find('head').append($("<link/>", {rel:"stylesheet", href:"lib/bootstrap/dist/css/bootstrap.min.css", type:"text/css"}));
        $("#printhtml").contents().find('head').append($("<link/>", {rel:"stylesheet", href:"partials/common/css/common.css", type:"text/css"}));
        $("#printhtml").contents().find('head').append($("<link/>", {rel:"stylesheet", href:"partials/layout/contents/index.css", type:"text/css"}));
        $("#printhtml").contents().find('head').append($("<link/>", {rel:"stylesheet", href:"partials/layout/contents/suggest/index.css", type:"text/css"}));
        $("#printhtml").contents().find('head').append("<style type='text/css'> .ng-hide { display: none; } </style>");

        //$("#printhtml").get(0).contentWindow.print();
        $("#printhtml").css("height",$("#main_container").height()+"px");

        var iframebody = $("#printhtml").contents().find('body');

        html2canvas(iframebody, {
          onrendered : function (canvas) {
            //이미지를 서버로 저장 하기 (프리늩 하기 메일 보내기에 사용 하기)

            //일단 다 오픈 하고 이미지 뜨고 다시 닫기


            var printhtml = "<html><head></head><body  style ='-webkit-print-color-adjust:exact;'>"+
                "<img src=\"" + canvas.toDataURL() + "\" onload=\"javascript:window.print();\" width='1100'/>" +
                "</body>";
            var win = window.open("about:blank","_blank");
            win.document.write(printhtml);

          }
        });


        // html2canvas($("#main_container"), {
        //     onrendered: function (canvas) {
        //
        //        // $("#printhtml").src = canvas.toDataURL();
        //
        //         window.open(canvas.toDataURL());
        //
        //       //  Canvas2Image.saveAsPNG(canvas);
        //
        //
        //     }
        // });
      }

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


//금액 한국 단위 붙이기
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

//보험 나이 구하기
function getInsurAge(birthday)
{
  birthday = parseInt(birthday);
  if(birthday < 19000000) {
    return "error";
  } else {
    var insuranceAge = 0;  //return value (보험 나이)

    //오늘의 년월일 값 구하기
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    //나이 구하기.
    var ageYear = year - birthday.toString().substr(0,4);
    var ageMonth = month - birthday.toString().substr(4,2); //음수라면 ageYear에서 -1을 하고 이곳에는 12를 추가 한다
    var ageDay = day - birthday.toString().substr(6,2);  //음수라면 ageMonth 에서 -1을 하고 이곳에는 +30을 한다.

    if(ageDay < 0) {
      ageDay += 30;
      ageMonth--;
    }

    if(ageMonth < 0) {
      ageMonth += 12;
      ageYear--;
    }

    if(ageMonth > 6) insuranceAge = ageYear + 1;
    else insuranceAge = ageYear;

    return insuranceAge;
  }
}

//보험료 데이터 가져오기
function getInsurData(insurage, insurpay, sex, payment, type,  mode, apiServer, $scope,$http, callback) {

  var insurType = "10";
  var insurTerm = "10년 만기";
  if(type == "20") {
    insurType = "20";
    insurTerm = "20년 만기";

  } else if(type == "65") {
    insurType = "65";
    insurTerm = "65세 만기";
  }

  if(insurpay > 0) {
    $http.get(apiServer+'/insurance/insur', {params: {insurage: insurage, insurPay: insurpay,insurSex: sex,  insurType:insurType, payment:payment}})
        .success(function(data) {

          //받아온 데이터를 가지고 화면 구성 하기
          if(mode == "default") {
            for(var i in data) {
              if(i == 0) {


                $scope.insurMonthMoney = data[0].price;

                $scope.total_save_money += data[0].total_amount;


                $scope.lowerPriceList.push({
                  logoImg:data[0].company_id+".png",monthPay:data[0].price,insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm
                });

                $scope.lowerPriceList3.push(
                    { logoImg:data[0].company_id+".png", monthPay:data[0].price, insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm}
                );

                $scope.termMoneyView(1);

              } else {


              }
            }

            callback();
          } else {
            //추가 할 경우 추가 된 값을 저장 하기.
            var lowerList2Cnt = $scope.lowerPriceList2.length;
            var lowerpricelist = [];


            for(var i = 0; i<$scope.lowerPriceList3.length; i++) {
              lowerpricelist.push( {
                logoImg: $scope.lowerPriceList3[i].logoImg,monthPay:$scope.lowerPriceList3[i].monthPay,insurable:$scope.lowerPriceList3[i].insurable, insurableKor:$scope.lowerPriceList3[i].insurableKor, term:$scope.lowerPriceList3[i].term
              });
            }


            if(type == "10") {
              lowerpricelist[0] = { logoImg:data[0].company_id+".png", monthPay:data[0].price, insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm};
            } else if(type == "20") {
              if($scope.lowerPriceList3[0].term == "10년 만기") {
                lowerpricelist[1] = { logoImg:data[0].company_id+".png", monthPay:data[0].price, insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm};
              } else {
                lowerpricelist[0] = { logoImg:data[0].company_id+".png", monthPay:data[0].price, insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm};
              }
            } else {
              if($scope.lowerPriceList3[0].term == "10년 만기") {
                if($scope.lowerPriceList3[1].term == "20년 만기") {
                  lowerpricelist[2] = { logoImg:data[0].company_id+".png", monthPay:data[0].price, insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm};
                } else {
                  lowerpricelist[1] = { logoImg:data[0].company_id+".png", monthPay:data[0].price, insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm};
                }

              } else if($scope.lowerPriceList3[0].term == "20년 만기") {
                lowerpricelist[1] = { logoImg:data[0].company_id+".png", monthPay:data[0].price, insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm};
              } else {
                lowerpricelist[0] = { logoImg:data[0].company_id+".png", monthPay:data[0].price, insurable:data[0].total_amount, insurableKor:getMoneyKor(data[0].total_amount), term:insurTerm};
              }
            }



            $scope.lowerPriceList2[lowerList2Cnt] = lowerpricelist;

            $scope.lowerPriceList3 = lowerpricelist;

            callback(data);
          }


        });
  } else {
    callback();
  }



}

//3개 중에 가장 작은 금액에 대해서 다음 것을 가져와서 뿌려주기
function getNextInsur( $scope,callback )
{
  //3개의 금액 중 월 보험료가 가장 작은것 추출
  var monthPay10 = 0;
  var monthPay20 = 0;
  var monthPay65 = 0;

  var minPay = 0;
  var minText = "";
  var minIndex = 0;


  if($scope.lowerPriceList3[0].term == "10년 만기") {
    monthPay10 = $scope.lowerPriceList3[0].monthPay;

    if($scope.lowerPriceList3[1].term == "20년 만기") {
      monthPay20 = $scope.lowerPriceList3[1].monthPay;

      if($scope.lowerPriceList3[2].term == "65세 만기") {
        monthPay65 = $scope.lowerPriceList3[2].monthPay;
      }

    } else if($scope.lowerPriceList3[1].term == "65세 만기") {
      monthPay65 = $scope.lowerPriceList3[1].monthPay;
    }

  } else if($scope.lowerPriceList3[0].term == "20년 만기") {
    monthPay20 = $scope.lowerPriceList3[0].monthPay;
    if($scope.lowerPriceList3[1].term == "65세 만기") {
      monthPay65 = $scope.lowerPriceList3[1].monthPay;
    }

  } else if($scope.lowerPriceList3[0].term == "65세 만기") {
    monthPay65 = $scope.lowerPriceList3[0].monthPay;
  }

  minPay = monthPay10;
  minText = "10";
  if((minPay > monthPay20 && monthPay20 > 0) || minPay == 0) {
    minPay = monthPay20;
    minText = "20";
  }
  if((minPay > monthPay65 && monthPay65 > 0) || minPay == 0) {
    minPay = monthPay65;
    minText = "65";
  }



  callback(monthPay10, monthPay20, monthPay65, minPay, minText);



}


