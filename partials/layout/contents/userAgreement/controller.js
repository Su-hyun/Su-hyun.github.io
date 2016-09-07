'use strict';

define(['projectSugar'], function () {
  console.log("약관동의");
  var userAgreementModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'userAgreementService', 'layoutService']);
  userAgreementModule.controller('userAgreementController', ['$scope','$http', '$ocLazyLoad', 'userAgreementService', 'layoutService',
    function($scope,$http, $ocLazyLoad, userAgreementService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          userAgreementService.fire();
          layoutService.fire();

          var $userAgreement = $('#userAgreement'),
              $section = $userAgreement.children('section'),
              $location = $('.location'),
              $agreeNext = $('.btn-agreeNext'),
              idx = 0;

          // #userAgreement height
          $(document).on('load', function () {
            var agreeHEI = $(window).height() - 65 - 81;
            $userAgreement.css('min-height', agreeHEI);

          });
          $(document).trigger('load');

          $agreeNext.on('click', function () {



              idx ++;

            $location.children('li').eq(idx).addClass('on').siblings().removeClass('on');
            $section.eq(idx).addClass('on').siblings().removeClass('on')
            if($location.children('li').eq(1).is('.on')) $location.removeClass('location_01').addClass('location_02');
            if($location.children('li').eq(2).is('.on')) $location.removeClass('location_02').addClass('location_03');


          });

          $(".btn-agreeSubmit").on("click",function() {

              $scope.join_user();


          });
        });

        $scope.joinEmailCheck = false;

      //이메일 주소 넣기
      $scope.emailChange = function(option) {

        var jEmail = $scope.join_email.split("@");

        $scope.join_email = jEmail[0]+"@"+option;

      };

      //이메일 중복 확인
      $scope.checkEmail = function() {
        var checkData = {
          email : '@joinEmail'
        };

        $http.get(yopServer+'/users/exist', {params:checkData})
            .success(function(data) {

              //존재 안함일 경우에만 진행 가능
              //result:isExist == N

              if(data.result.isExist == "N") {
                 alert("사용해도 좋습니다");

                  alert('@joinEmail');
                  $scope.joinEmailCheck = $scope.join_email;
              } else {
                alert("이미 가입된 이메일 입니다 ");
                $scope.join_email = "";
                  $scope.joinEmailCheck = false;
              }

            })
            . error(function(data) {
              if(data.result.isExist == "N") {
                alert("사용해도 좋습니다");
                  $scope.joinEmailCheck = $scope.join_email;
              } else {
                alert("이미 가입된 이메일 입니다 ");
                $scope.join_email = "";
                  $scope.joinEmailCheck = false;
              }
        });
      };

      //회원 아이디 비밀번호를 1차 저장 한다
      $scope.join_user = function() {

          if($scope.joinEmailCheck == false) {
              alert("이메일 중복확인을 해 주시기 바랍니다");
              return false;
          }

          if(empty($scope.join_email)) {
              alert("이메일 주소를 입력 해 주시기 바랍니다");
              return false;
          }
          if($scope.join_email != $scope.joinEmailCheck) {
              alert("이메일 중복확인을 해 주시기 바랍니다");
              return;
          }
          if($scope.join_password != $scope.join_password2) {
              alert("입력된 비밀번호가 서로 다릅니다");
              return;
          }

          if(empty($scope.join_password)) {
              alert("비밀번호를 입력해 주십시오");
              return;
          }
          if(empty($scope.join_name)) {
              alert("이름을 입력해 주십시오");
              return;
          }



        var checkData = {
          email : $scope.join_email,
          password : $scope.join_password
        };

        $http.post(yopServer+'/users/createID', checkData)
            .success(function(data) {

              //정상 저장 되었을 경우에만 다음 단계 진행
              if(data.resultInfo.code == "201") {

                var updateData = {
                  mobileNum: "" + $scope.join_mobile_1 + $scope.join_mobile_2 + $scope.join_mobile_1,
                  nickName: $scope.join_name,
                  marriedYn: $scope.join_merried
                };

                var token = data.result.accessToken;

                $http.patch(yopServer+'/users/update/'+token, updateData)
                    .success(function(data) {
                      //업데이트 완료시 완료 페이지로 이동
                      alert("회원 가입이 되었습니다");

                        $('.location').children('li').eq(2).addClass('on').siblings().removeClass('on');
                        $('#userAgreement').children('section').eq(2).addClass('on').siblings().removeClass('on');
                        if( $('.location').children('li').eq(2).is('.on'))  $('.location').removeClass('location_02').addClass('location_03');

                        var updateData = {
                            email : $scope.join_email,
                            name : $scope.join_name,
                            mobile : "" + $scope.join_mobile_1 + $scope.join_mobile_2 + $scope.join_mobile_1,
                            married : $scope.join_merried,
                            token : token
                        }

                        $http.post(apiServer+'/board/userInsert/', updateData)
                            .success(function(data) {
                                console.log("회원가입완료");
                            });


                        return true;
                    }).error( function(error,status) {
                        alert("회원 가입은 되었으나 세부 정보 업데이트에 오류가 있었습니다. 차후 회원정보 변경을 통해 세부 정보 업데이트를 부탁 드립니다");
                    return true;
                  });
              } else {
                  alert("회원 가입시 오류가 있었습니다 ");
                  return false;
              }

              //그 외 예외 처리



            })
            .error(function(data) {
                alert("회원 가입시 오류가 있었습니다");
                return false;
              console.log(data);
            });


      };


    }]);//userAgreementController.controller
});


function empty(val) {
    if(val == "" || val == undefined) return true;
    else return false;
}