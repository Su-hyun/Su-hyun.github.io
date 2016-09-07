'use strict';

define(['projectSugar'], function () {
  var recommendModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad','ngFileUpload', 'recommendService', 'layoutService']);
  recommendModule.controller('recommendController', ['$scope', '$http','Upload','$timeout', '$ocLazyLoad', 'recommendService', 'layoutService',
    function($scope, $http, Upload,$timeout, $ocLazyLoad, recommendService, layoutService) {


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


      $scope.inJob = "직업군";
      $scope.inJobs = $scope.inJob;
      $scope.outJob = function () {
        return $scope.inJob
      };

      $scope.inMarry = "기혼";
      $scope.outMarry = function () {
        return $scope.inMarry
      };



      $scope.inChild = "유";
      $scope.childList = [];
      $scope.childInfo = [];
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

          $scope.selectSex = "";
          $scope.newAge = "";
          return;
        }


        if(selectSex == undefined || selectSex == "") {
          alert("자녀 성별을 선택해 주세요.");
          return;
        }

        var newChild = {
          sex : selectSex,
          childAge : "보험나이 : "+nowAge+"세"
        };
        $scope.childList.push(newChild);
        $scope.disableRemove();

        //결과 처리 시 필요.
        $scope.childInfo.push({sex:selectSex, birthday: birthDay});
        $scope.selectSex = "";
        $scope.newAge = "";
      };

      $scope.delChild = function (index) {
        var childList2 = $scope.childList;
        var childInfo2 = $scope.childInfo;
        $scope.childList = [];
        $scope.childInfo = [];
        for(var i = 0; i<childList2.length; i++) {
          if(index != i) {
            $scope.childList.push({sex : childList2[i].sex, childAge: childList2[i].childAge});
            $scope.childInfo.push({sex: childInfo2.sex, birthday: childInfo2.birthday});
          }
        }

        // if($scope.childList.length == 0) {
        //   $scope.disableAttr();
        // }
      };

      $scope.disableAttr2 = function () {

        //기혼 + 자녀유 + 자녀 없을 시
        //미혼 + 부양가족 + 생활비 미입력
        // if($scope.inMarry == "기혼" && ($scope.inChild == "유" || $scope.inChild == "" || $scope.inChild == undefined) && $scope.childList.length == 0) {
        //   $('.next').attr('disabled','');
        // } else if($scope.inMarry == "미혼" && ($scope.inFamily == "유" || $scope.inFamily == "" || $scope.inFamily == undefined) && ($scope.inExpense == "" || $scope.inExpense == undefined) ) {
        //   $('.next').attr('disabled','');
        // } else {
        //   $('.next').removeAttr('disabled');
        // }

      };

      $scope.disableAttr = function () {

        // $('.next').attr('disabled','');

      };

      $scope.next1Check = function() {
        if(empty($scope.inMarry) || empty($scope.inChild) ||  empty($scope.inName) || empty($scope.inAge)  ) {
          return true;
        } else {
          if($scope.inMarry == "기혼" && ($scope.inChild == "유" || $scope.inChild == "" || $scope.inChild == undefined) && $scope.childList.length == 0) {
            return true;
          } else if($scope.inMarry == "미혼" && ($scope.inFamily == "유" || $scope.inFamily == "" || $scope.inFamily == undefined) && ($scope.inExpense == "" || $scope.inExpense == undefined) ) {
            return true;
          } else {
            return false;
          }
        }
      };

      $scope.next2Checek = function() {

        if(empty($scope.inSalary) || empty($scope.inEmployment) || empty($scope.inJob)) {
          return true;
        } else {
          return false;
        }

      };

      $scope.disableRemove = function () {
        // if(empty($scope.inMarry) || empty($scope.inChild) ||  empty($scope.inName) || empty($scope.inAge)  ) {
        //
        // } else {
        //   $('.next').removeAttr('disabled');
        // }
      };
      $scope.searchDisableRemove = function () {
        //$('.next2').removeAttr('disabled');
        //$('.btn-search').removeAttr('disabled');
      };

      $scope.goStep3 = function () {
        $scope.bojang = true;
      }

      $scope.ageCheck = function() {


        if ($scope.inAge && Number($scope.inAge) != NaN) {


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
        } else {
          alert("생년월일은 숫자만 입력 가능 합니다");
          $scope.inAge = "";
        }
      };

      $scope.childAgeCheck = function () {
        if ($scope.newAge && Number($scope.newAge) != NaN) {
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
        } else {
          alert("생년월일은 숫자만 입력 가능 합니다");
          $scope.newAge = "";
        }
      }

      $scope.jobStartCheck = function() {
        //입사년도가 미래인지 체크
        var date = new Date(),
            year = date.getFullYear();
        if($scope.inEmployment && Number($scope.inEmployment) != NaN) {
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
        if($scope.childInfo.length > 0) {
          for(var i=0; i<$scope.childInfo.length; i++) {
            sugar_childSex.push($scope.childInfo[i].sex);
            sugar_childAge.push($scope.childInfo[i].birthday);
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
        var sugar_job_type = $scope.inJobs;


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

        $.cookie("saveInfoData", JSON.stringify(sugar_info),{ expires: 30*24*60*60});

      };

      //기본값 구하기
      $scope.infoGet = function() {
        var infoData = JSON.parse($.cookie("saveInfoData"));

        if(infoData != null && infoData != undefined) {

          //$("label").removeClass("on");

          $scope.inName = infoData.name;
          $scope.inAge = infoData.birthday;
          $scope.inSex = infoData.sex;


          $scope.inMarry = infoData.married;
          $scope.inFamily = infoData.subfamily;
          $scope.inExpense = infoData.subfamily_money;
          //marry 표시 체크 on 처리



          $scope.inChild = infoData.child;

          $scope.childList = [];
          $scope.childInfo = [];
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
            $scope.childInfo.push({sex:infoData.childsex[i], birthday: birthDay});

          }



          if(infoData.married == "기혼" && infoData.childsex.length > 0) $scope.disableRemove();
          if(infoData.married == "기혼" && infoData.child == "무") $scope.disableRemove();
          if(infoData.married == "미혼" && infoData.subfamily_money) $scope.disableRemove();
          if(infoData.married == "미혼" && infoData.subfamily == "무") $scope.disableRemove();


          $scope.inSalary = infoData.salary;
          $scope.inEmployment = infoData.start_job;

          $scope.inJobs = infoData.job_type;
          if($scope.inJobs == "근로소득자") {
            $(".salarymen").addClass("on");
          } else if($scope.inJobs == "개인사업자") {
            $(".business").addClass("on");
          } else if($scope.inJobs == "전업주부") {
            $(".housewife").addClass("on");
          } else if($scope.inJobs == "특수직업") {
            $(".otherjobs").addClass("on");
          }

         // $('.next2').removeAttr('disabled');
         // $('.btn-search').removeAttr('disabled');
        }
      };

      //파일 업로드 후 결과 리턴

      $scope.files = [];
      $scope.uploadFiles = function(files, errFiles) {

        //$scope.files = files;

        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
          file.upload = Upload.upload({
            url: apiServer+'/board/fileup',
            data: {file: file}
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
              $scope.files.push(response.data);
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            // file.progress = Math.min(100, parseInt(100.0 *  evt.loaded / evt.total));
          });
        });
      };

      $scope.fileDelete = function(di) {

        var filedel = [];
        for(var i in $scope.files) {
          if(i!=di) {
            filedel.push($scope.files[i]);
          }
        }

        $scope.files = filedel;
      };


      //보장분석 정보 저장
      $scope.fileCount = 0;
      $scope.checkUpload = function(){


        saveInfo($http, $scope, function(sidx) {

          if(sidx != false && sidx > 0) {
            postBoardContent("check", sidx, $http, $scope, function(data) {

              var sbidx = data.sbidx;
              $scope.fileCount = 0;

              $(".files_path").each(function(i) {
                var file_path = $(this).val();
                var file_name = $(".files_name").eq(i).val();
                postBoardFile(sbidx, file_path, file_name, $http, $scope, function() {
                  $scope.fileCount++;

                  if($(".files_path").length == $scope.fileCount) {
                    alert("신청 되었습니다 ");

                    $scope.indemnityBoard();

                  }
                });
              });

            });
          }


        });
      };

      $scope.sendSugarResult = function()
      {
        saveInfo($http, $scope, function(sidx) {


          if(sidx != false && sidx > 0) {
            //보험 찾기 일 경우 이동
            $scope.suggest();
          }

        });
      };

      $scope.checkUploadVal = function() {

        if($scope.files.length == 0 || empty($scope.qTxt) || empty($scope.qTitle) ) {
          return true;
        } else {
          return false;
        }

      };


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


              var $recommendDiv = $('#recommend').children('div'),
                  idx = 0;

              // #Page height
              $(document).on('load', function () {
                var myHEI = $(window).height() - 65 - 81;
                $recommendDiv.css('min-height', myHEI);
              });
              $(document).trigger('load');

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


                }

              });

              if($(".step-3").html() != undefined) {
                //쿠키 저장 값이 있으면 이동하기
                if($.cookie("sidx") > 0) {

                  $(".form-area").removeClass("on");
                  $(".col-sm-4").removeClass("on");
                  $(".step-3").addClass('on');
                  $(".btn-tab03").addClass('on');

                }
              }

              $('.jobs li label').click(function () {
                console.log("aaaa")
              });

              $('.onlyNumber').keypress(function(event){
                //alert(event.which);
                if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8)) {

                  //alert('숫자임!');
                } else {
                  //alert('숫자아님!');
                  event.preventDefault();
                }
              }).css("IME-MODE","disabled");

            });
          });
    }]);//recommendController.controller
});


function saveInfo($http, $scope, callback) {


  //항목 체크
  if(empty($scope.inName) || empty($scope.inSex) || empty($scope.inAge) || empty($scope.inMarry) || empty($scope.inSalary) || empty($scope.inEmployment) || empty($scope.inJobs)) {
    alert("필수 입력 항목이 체크가 되지 않았습니다 ");
    callback(false);
    return;
  }

  var sugar_name = $scope.inName;
  var sugar_birthday = $scope.inAge;
  var sugar_sex = $scope.inSex;
  var sugar_married = $scope.inMarry;

  //자녀 정보
  var sugar_child = $scope.inChild;
  //자녀가 있다고 할 경우 정보 ( 배열로 )
  var sugar_childSex = [];
  var sugar_childAge = [];
  if($scope.childInfo.length > 0) {
    for(var i=0; i<$scope.childInfo.length; i++) {
      sugar_childSex.push($scope.childInfo[i].sex);
      sugar_childAge.push($scope.childInfo[i].birthday);
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
  var sugar_job_type = $scope.inJobs;

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

           callback(data.sidx);

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


function postBoardContent(boardCode, sidx, $http, $scope, callback) {

  var content = $("#qTxt").val();
  var subject = $("#qTitle").val();

  var etc1 = sidx;
  var etc2 = $scope.etc2;
  var etc3 = $scope.etc3;
  var etc4 = $scope.etc41 + $scope.etc42 + $scope.etc43;
  var etc5 = $scope.etc1;


  if(empty($.cookie("loginemail"))) {
    alert("로그인 정보가 없습니다");
    return false;
  }

  if(empty(content) || empty(subject) ) {
    alert(" 입력 항목이 비었습니다 ");
    return false;
  }

  var contentData = {
    board_code: boardCode,
    email : $.cookie("loginemail"),
    writer : $.cookie("loginwriter"),
    s_code : "N",
    subject : subject,
    content : content,
    etc1 : etc1,
    etc2 : etc2,
    etc3 : etc3,
    etc4 : etc4,
    etc5 : etc5
  };

  $http.post(apiServer+'/board/content', contentData).success(function(data) {

    if(data.result == "ok") {

      $("#board_content").val("");
      $("#board_subject").val("");


      //파일 경로 입력


      callback(data);

    }
    //댓글 부분 다시 불러오기.

  });

}
//첨부 파일 정보만 별도로 저장 하기
function postBoardFile(sbidx, file_path, file_name, $http, $scope, callback) {

  var contentData = {
    sbidx : sbidx,
  file_path : file_path,
      file_name : file_name
  };
  $http.post(apiServer+'/board/boardFileUp', contentData). success(function(data) {
    callback();
  });
}

function empty(val) {
  if(val == "" || val == undefined) return true;
  else return false;
}
