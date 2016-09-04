'use strict';

define(['projectSugar'], function () {
  var recommendModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad','ngFileUpload', 'recommendService', 'layoutService']);
  recommendModule.controller('recommendController', ['$scope', '$http','Upload', '$ocLazyLoad', 'recommendService', 'layoutService',
    function($scope, $http, Upload, $ocLazyLoad, recommendService, layoutService) {

      //api 서버 주소
      // var apiServer = 'http://localhost:3000';
      var apiServer = 'http://192.168.100.35:3000';

      $scope.inName = "";
      $scope.outName = function () {
        var userName = $scope.inName,
            blandName = "";
        if(userName == blandName) userName = "OOO";
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
        if(nowAge < 20) nowAge = "나이";
        if(nowAge > 100) nowAge = "나이";
        return nowAge
      };

      $scope.inJobs = "직업군";
      $scope.outJob = function () {
        return $scope.inJobs
      };

      $scope.inMarry = "기혼";
      $scope.outMarry = function () {
        return $scope.inMarry
      };
      //$(".sub-radio").hide();

      $scope.childList = [];
      var childInfo = [];

      $scope.addChild = function (selectSex, newAge) {
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

        if(parseInt(birthDay) > parseInt(year+month+day)) {
          alert("출생 후 자녀만 입력해 주세요.");

          if(selectSex == undefined) {
            alert("자녀 성별을 선택해 주세요.");
            return;
          }

          $scope.selectSex = "";
          $scope.newAge = "";
          return;
        }

        var newChild = {
          sex : selectSex,
          childAge : "보험나이 : "+nowAge+"세"
        };
        $scope.childList.push(newChild);
        $scope.disableRemove();

        //결과 처리 시 필요.
        childInfo.push({sex:selectSex, birthday: birthDay});

        $scope.selectSex = "";
        $scope.newAge = "";
      };

      $scope.delChild = function (index) {
        var childList2 = $scope.childList;
        var childInfo2 = childInfo;
        $scope.childList = [];
        childInfo = [];
        for(var i = 0; i<childList2.length; i++) {
          if(index != i) {
            $scope.childList.push({sex : childList2[i].sex, childAge: childList2[i].childAge});
            childInfo.push({sex: childInfo2.sex, birthday: childInfo2.birthday});
          }
        }

        if($scope.childList.length == 0) {
          $scope.disableAttr();
        }
      };

      //$scope.marriedSubTabView = function(stat) {
      //  $(".sub-radio").hide();
      //  if(stat == "기혼") {
      //    $(".married").show();
      //
      //
      //    if($scope.inChild == "유") {
      //      $(".married").find(".add-area").show();
      //    } else {
      //      $(".married").find(".add-area").hide();
      //    }
      //  }
      //  else {
      //
      //    $(".single").show();
      //    if($scope.inFamily == "유") {
      //      $(".single").find(".add-area").show();
      //    } else {
      //      $(".single").find(".add-area").hide();
      //    }
      //  }
      //
      //  $scope.disableAttr();
      //};

      $scope.disableAttr2 = function () {

        //기혼 + 자녀유 + 자녀 없을 시
        //미혼 + 부양가족 + 생활비 미입력
        if($scope.inMarry == "기혼" && ($scope.inChild == "유" || $scope.inChild == "" || $scope.inChild == undefined) && $scope.childList.length == 0) {
          $('.next').attr('disabled','');
        } else if($scope.inMarry == "미혼" && ($scope.inFamily == "유" || $scope.inFamily == "" || $scope.inFamily == undefined) && ($scope.inExpense == "" || $scope.inExpense == undefined) ) {
          $('.next').attr('disabled','');
        } else {
          $('.next').removeAttr('disabled');
        }

        //기혼 + 자녀 유 아래 보이기

        //미혼 + 부양가족 유 아래 보이기

        //표시 탭 수정 처리
        $(".sub-radio").hide();
        if($scope.inMarry == "기혼") {
          $("div.married").show();
          $("label.married").addClass("on");

          if($scope.inChild == "유") {
            $("div.married").find("label.addOn").addClass("on");
            $(".married").find(".add-area").show();
          } else {
            $("div.married").find("label.addNot").addClass("on");

            $(".married").find(".add-area").hide();
          }

        }
        else {
          $("div.single").show();
          $("label.single").addClass("on");


          if($scope.inFamily == "무") {
            $("div.single").find("label.addNot").addClass("on");
            $(".single").find(".add-area").hide();

          } else {
            $("div.single").find("label.addOn").addClass("on");
            $(".single").find(".add-area").show();

          }

        }

      };

      $scope.disableAttr = function () {
        $('.next').attr('disabled','');
      };

      $scope.disableRemove = function () {
        $('.next').removeAttr('disabled');
      };
      $scope.searchDisableRemove = function () {
        $('.next2').removeAttr('disabled');
        $('.btn-search').removeAttr('disabled');
      };

      $scope.ageCheck = function() {
        if ($scope.inAge) {
          var birthDay = $scope.inAge,
              date     = new Date (),
              year     = date.getFullYear (),
              month    = date.getMonth (),
              day      = date.getDay ();
          if (month < 10) month = '0' + month;
          if (day < 10) day = '0' + day;
          var monthDay  = month + day,
              birthYear = birthDay.substr (0, 4),
              birthMd   = birthDay.substr (4, 4),
              nowAge    = monthDay < birthMd ? year - birthYear - 1 : year - birthYear;
          if (nowAge == year) nowAge = "0";
          if (nowAge < 20) {
            alert ("미성년자는 이용 하실 수 없습니다");
            $scope.inAge = "";
            return;
          }
          if (nowAge > 99) {
            alert ("만 99세 이상은 검색이 되지 않습니다.");
            $scope.inAge = "";
            return;
          }
        }
      };

      $scope.childAgeCheck = function () {
        if ($scope.newAge) {
          var birthDay = $scope.newAge,
              date     = new Date (),
              year     = date.getFullYear (),
              month    = date.getMonth (),
              day      = date.getDay ();
          if (month < 10) month = '0' + month;
          if (day < 10) day = '0' + day;
          var monthDay  = month + day,
              birthYear = birthDay.substr (0, 4),
              birthMd   = birthDay.substr (4, 4),
              nowAge    = monthDay < birthMd ? year - birthYear - 1 : year - birthYear;
          if (nowAge == year) nowAge = "0";
          if (nowAge > 19) {
            alert ("성년이 된 자녀는 등록을 할 수 없습니다.");
            $scope.newAge = "";
            return;
          }
        }
      }

      $scope.jobStartCheck = function() {
        //입사년도가 미래인지 체크
        var date = new Date(),
            year = date.getFullYear();
        if($scope.inEmployment) {
          if($scope.inEmployment > year) {
            alert("입사년도는 현재 보다 이후가 될 수 없습니다");
            $scope.inEmployment = "";
          }
          //입사년도가 20살 이후인지 체크
          var birthYear = $scope.inAge.substr(0,4);
          if(($scope.inEmployment - birthYear) < 20) {
            alert("입사년도가 만 19세 이하가 될 수 없습니다");
            $scope.inEmployment = "";
          }
        }
      };

      //저장하기 기능 처리
      $scope.infoSave = function() {
        //내게 맞는 보험 찾기 클릭시
        //입력값이 다 있는지 체크 후 진행

        var sugar_name = $scope.inName;
        var sugar_birthday = $scope.inAge;
        var sugar_sex = $scope.inSex;
        var sugar_married = $scope.inMarry;

        //자녀 정보
        var sugar_child = $scope.inChild;
        //자녀가 있다고 할 경우 정보 ( 배열로 )
        var sugar_childSex = [];
        var sugar_childAge = [];
        if(childInfo.length > 0) {
          for(var i=0; i<childInfo.length; i++) {
            sugar_childSex.push(childInfo[i].sex);
            sugar_childAge.push(childInfo[i].birthday);
          }
        }

        //미혼일 경우 부양가족 정보
        var sugar_subfamily = $scope.inFamily;
        var sugar_subfamily_money = $scope.inExpense;

        //내용 메일로 받기 할때 또는 회원 정보 가져 와서.
        var sugar_email = "";
        var sugar_phone = "";

        //2페이지 정보들
        var sugar_salary = $scope.inSalary;
        var sugar_start_job = $scope.inEmployment;
        var sugar_job_type = $scope.inJob;


        var sugar_info = {
          name : sugar_name,
          birthday : sugar_birthday,
          sex : sugar_sex,
          married : sugar_married,
          child : sugar_child,
          childsex : sugar_childSex,
          childage : sugar_childAge,
          subfamily : sugar_subfamily,
          subfamily_money : sugar_subfamily_money,
          email : "",
          phone : "",
          salary: sugar_salary,
          start_job : sugar_start_job,
          job_type : sugar_job_type,
          recommend_type : "추천"

        }

        $.cookie("saveInfoData", JSON.stringify(sugar_info));

      };

      $scope.infoGet = function() {
        var infoData = JSON.parse($.cookie("saveInfoData"));

        if(infoData != null && infoData != undefined) {

          $("label").removeClass("on");

          $scope.inName = infoData.name;
          $scope.inAge = infoData.birthday;
          $scope.inSex = infoData.sex;
          //sex 표시 체크 on 처리
          $(".sex").find("label").removeClass("on");
          if(infoData.sex == "남자") {
            $(".male").addClass("on");
          } else if(infoData.sex == "여자") {
            $(".female").addClass("on");
          }

          $scope.inMarry = infoData.married;

          $scope.inFamily = infoData.subfamily;

          $scope.inExpense = infoData.subfamily_money;
          //marry 표시 체크 on 처리

          //표시 탭 수정 처리
          $(".sub-radio").hide();
          if(infoData.married == "기혼") {
            $("div.married").show();
            $("label.married").addClass("on");

            if(infoData.child == "유") {
              $("div.married").find("label.addOn").addClass("on");
              $(".married").find(".add-area").show();
            } else {
              $("div.married").find("label.addNot").addClass("on");

              $(".married").find(".add-area").hide();
            }

          }
          else {
            $("div.single").show();
            $("label.single").addClass("on");


            if($scope.inFamily == "무") {
              $("div.single").find("label.addNot").addClass("on");
              $(".single").find(".add-area").hide();

            } else {
              $("div.single").find("label.addOn").addClass("on");
              $(".single").find(".add-area").show();

            }

          }

          $scope.inChild = infoData.child;

          $scope.childList = [];
          childInfo = [];
          for(var i = 0; i<infoData.childsex.length; i++) {

            var birthDay = infoData.childage[i],
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
              sex : infoData.childsex[i],
              childAge : "보험나이 : "+nowAge+"세"
            };
            $scope.childList.push(newChild);
            $scope.disableRemove();

            //결과 처리 시 필요.
            childInfo.push({sex:infoData.childsex[i], birthday: birthDay});

          }



          if(infoData.married == "기혼" && infoData.childsex.length > 0) $scope.disableRemove();
          if(infoData.married == "기혼" && infoData.child == "무") $scope.disableRemove();
          if(infoData.married == "미혼" && infoData.subfamily_money) $scope.disableRemove();
          if(infoData.married == "미혼" && infoData.subfamily == "무") $scope.disableRemove();


          $scope.inSalary = infoData.salary;
          $scope.inEmployment = infoData.start_job;
          $scope.inJob = infoData.job_type;



        }
      }


      //프로그램에서 사용하는 변수 선언
      var inChild = $scope.inChild;
      var inFamily = $scope.inFamily;
      var inSex = $scope.inSex;

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            recommendService.fire();
            layoutService.fire();

            $(document).ready(function () {

              $scope.infoGet();  //저장 쿠키값 체크 하기

              var $recommend = $('#recommend'),
                  idx = 0;

              // #Page height
              //$(document).on('load', function () {
              //  var myHEI = $(window).height() - 58 - 81;
              //  $recommend.css('min-height', myHEI);
              //});
              //$(document).trigger('load');

              $('label.radio').on('click',function () {
                $(this).addClass('on').parent('li').siblings().find('.on').removeClass('on');
                if ($(this).is('.married')) {
                  $('.sub-radio.married').css('display', 'block');
                  $('.sub-radio.single').css('display', 'none');
                }else if ($ (this).is ('.single')) {
                  $('.sub-radio.married').css('display', 'none');
                  $('.sub-radio.single').css('display', 'block');
                }else if($(this).is('.addNot')){
                  $('.add-area').css('display','none');
                  $('.notice.type2').css('display','none');
                }else if($(this).is('.addOn')){
                  $('.add-area').css('display','block');
                  $('.notice.type2').css('display','block');
                }
              });

              $('.btn-tab01').on('click',function() {
                if(idx == 1) {
                  $('.btn.btn-prev').click();
                }
              });

              $('.btn-tab02').on('click',function() {
                if($('.next').attr('disabled') != "disabled") {
                  $('.btn.btn-next').click();
                }
              });

              $('.btn').on('click', function (e) {
                var $this = $(this),
                    $navLi = $('.nav li'),
                    $formArea = $('.form-area'),
                    navLeng = $navLi.length,
                    formAleng = $formArea.length;

                $scope.infoSave();  //정보 쿠키 저장

                if($this.is('.btn-next')){
                  idx ++;
                  $navLi.eq(idx).addClass('on').siblings().removeClass('on');
                  $formArea.eq(idx).addClass('on').siblings().removeClass('on');
                  if(idx == navLeng) e.preventDefault();
                  if(idx == formAleng) e.preventDefault();
                }
                if($this.is('.btn-prev')){
                  idx --;
                  $navLi.eq(idx).addClass('on').siblings().removeClass('on');
                  $formArea.eq(idx).addClass('on').siblings().removeClass('on');
                  if(idx == navLeng) e.preventDefault();
                  if(idx == formAleng) e.preventDefault();
                }

                if($this.is('.btn-search')) {
                  //내게 맞는 보험 찾기 클릭시
                  //입력값이 다 있는지 체크 후 진행

                  var sugar_name = $scope.inName;
                  var sugar_birthday = $scope.inAge;
                  var sugar_sex = $scope.inSex;
                  var sugar_married = $scope.inMarry;

                  //자녀 정보
                  var sugar_child = $scope.inChild;
                  //자녀가 있다고 할 경우 정보 ( 배열로 )
                  var sugar_childSex = [];
                  var sugar_childAge = [];
                  if(childInfo.length > 0) {
                    for(var i=0; i<childInfo.length; i++) {
                      sugar_childSex.push(childInfo[i].sex);
                      sugar_childAge.push(childInfo[i].birthday);
                    }
                  }

                  //미혼일 경우 부양가족 정보
                  var sugar_subfamily = $scope.inFamily;
                  var sugar_subfamily_money = $scope.inExpense;

                  //내용 메일로 받기 할때 또는 회원 정보 가져 와서.
                  var sugar_email = "";
                  var sugar_phone = "";

                  //2페이지 정보들
                  var sugar_salary = $scope.inSalary;
                  var sugar_start_job = $scope.inEmployment;
                  var sugar_job_type = $scope.inJob;

                  // 값을 디비에 저장 하고 다음 페이지로 넘어 간다.
                  // /insurance/info [POST] (기본 입력 정보 등록)
                  // 저장된 값은 쿠키를 통해 sidx 값으로 저장 하고 다음 페이지로 이동

                  var sugar_info = {
                    name : sugar_name,
                    birthday : sugar_birthday,
                    sex : sugar_sex,
                    married : sugar_married,
                    child : sugar_child,
                    childsex : sugar_childSex,
                    childage : sugar_childAge,
                    subfamily : sugar_subfamily,
                    subfamily_money : sugar_subfamily_money,
                    email : "",
                    phone : "",
                    salary: sugar_salary,
                    start_job : sugar_start_job,
                    job_type : sugar_job_type,
                    recommend_type : "추천"

                  }


                  $http.post(apiServer+'/insurance/info', sugar_info)
                      .success(function(data, status, headers, config) {
                        //기본 입력 정보 가져오기.

                        if(data.result == "ok") {


                          if(data.sidx > 0) {
                            //data 처리
                            $.cookie("sidx",data.sidx,{ expires: 30*24*60*60});
                            $scope.suggest();
                          } else {
                            alert(" 데이터 처리에 문제가 발생 하였습니다. 잠시후 다시 시도해 주십시오.");
                          }
                        }
                        else {
                          alert(" 데이터 처리에 문제가 발생 하였습니다. 잠시후 다시 시도해 주십시오.");
                        }
                      }).error(function(data,status,headers,config) {
                    alert(" 데이터 처리에 문제가 발생 하였습니다. 잠시후 다시 시도해 주십시오.");
                  });

                }

              });

              $('.jobs li label').click(function () {
                console.log("aaaa")
              })
            })
          });
    }]);//recommendController.controller
});
