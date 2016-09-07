'use strict';

define(['projectSugar'], function () {
  var indemnityBoardModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'indemnityBoardService', 'layoutService']);
  indemnityBoardModule.controller('indemnityBoardController', ['$scope','$http', '$ocLazyLoad', 'indemnityBoardService', 'layoutService',
    function($scope, $http, $ocLazyLoad, indemnityBoardService, layoutService) {

      $scope.recommendThumbList = [
        {
          title : "32세 연구원(사무직)",
          name : "박 * 하",
          age : "34",
          date : "2016-07-07",
          count : "10",
          imgUrl : "",
          context : "교보 큰사랑 CI보험과 메리츠 실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속 유지할지 고민됩니다. 지금 7년납입중이구요 분선부탁드립니다"+
              "교보 큰사랑 CI보험과 메리츠 실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속 유지할지 고민됩니다. 지금 7년납입중이구요 분선부탁드립니다"
        },{
          title : "32세 연구원(사무직)",
          name : "박 * 하",
          age : "40",
          date : "2016-07-09",
          count : "123",
          imgUrl : "",
          context : "교보 큰사랑 CI보험과 메리츠 실비보험 가입중인데요"
        },{
          title : "32세 연구원(사무직)",
          name : "박 * 하",
          age : "38",
          date : "2016-07-12",
          count : "12",
          imgUrl : "",
          context : "교보 큰사랑 CI보험과 메리츠 실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속 유지할지 고민됩니다."
        },{
          title : "32세 연구원(사무직)",
          name : "박 * 하",
          age : "27",
          date : "2016-07-27",
          count : "9",
          imgUrl : "",
          context : "교보 큰사랑 CI보험과 메리츠 실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속 유지할지 고민됩니다. 지금 7년납입중이구요 분선부탁드립니다"+
              "교보 큰사랑 CI보험과 메리츠 실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속 유지할지 고민됩니다. 지금 7년납입중이구요 분선부탁드립니다"+
              "교보 큰사랑 CI보험과 메리츠 실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속 유지할지 고민됩니다. 지금 7년납입중이구요 분선부탁드립니다"
        },{
          title : "32세 연구원(사무직)",
          name : "박 * 하",
          age : "30",
          date : "2016-08-07",
          count : "27",
          imgUrl : "",
          context : "교보 큰사랑 CI보험과 메리츠 실비보험 지금 7년납입중이구요 분선부탁드립니다"
        },{
          title : "32세 연구원(사무직)",
          name : "박 * 하",
          age : "28",
          date : "2016-08-17",
          count : "89",
          imgUrl : "",
          context : "교보 큰사랑 CI보험과 메리츠 실비보험 가입중인데요 요새 CI보험이 문제가 많아 계속 유지할지 고민됩니다. 지금 7년납입중이구요 분선부탁드립니다"
        }
      ];

      $scope.whereString = "";

      $scope.defaultList = function() {

        getBoardList("check", 6, 1, $scope.whereString, $http, $scope, function() {
          //게시판 리스트 생성 완료
          //하단 페이징 부분 생성 필요

          $scope.makePaging();

        });
      };


      $scope.defaultList();

      $scope.reDefaultList = function () {
        $scope.whereString = "";
        $scope.defaultList();
      };

      $scope.searchDefaultList = function () {

        var where = "1=1";

        where += $scope.search_insur_type?" and A.etc2='"+$scope.search_insur_type+"' ":"";
        if($scope.search_txt) {
          if($scope.search_name) where += " and B.name='"+$scope.search_txt+"' ";
          if($scope.search_subject_content) where += " and (A.subject like '%"+$scope.search_txt+"%' or A.contnet like '%"+$scope.search_txt+"%' ) ";
        }

        console.log(where);

        $scope.whereString = where;

        $scope.defaultList();
      }


      //하단 페이징 관련 내용
      $scope.page = 1;  //현재 페이지
      $scope.totalPage = 1; //전체 페이지
      $scope.pageList = []; //보여줄 페이지 갯수

      $scope.makePaging = function () {
        $scope.pageList = [];

        if($scope.totalPage < 5) {

          for(var p = 1; p<= $scope.totalPage; p++) {
            $scope.pageList.push(p);
          }


        } else {
          if($scope.page > 2) {

            for(var p = 1; p<= 5; p++) {
              $scope.pageList.push(p);
            }

          } else if(($scope.page + 2) > $scope.totalPage) {
            for(var p=($scope.totalPage - 5) ; p<= $scope.totalPage; p++) {
              $scope.pageList.push(p);
            }
          } else {
            for(var p=($scope.page - 2) ; p<= ($scope.page + 2); p++) {
              $scope.pageList.push(p);
            }
          }
        }

      };

      $scope.goPage = function (page) {

        $scope.page = page;

        getBoardList("check", 6, page,$scope.whereString, $http, $scope, function() {
          $scope.makePaging();

        });

      };
      $scope.goBackPage = function () {
        $scope.page--;
        if($scope.page == 0) $scope.page = 1;

        getBoardList("check", 6, $scope.page,$scope.whereString, $http, $scope, function() {
          $scope.makePaging();

        });
      };
      $scope.goNextPage = function () {

        $scope.page++;
        if($scope.page > $scope.totalPage) $scope.page = $scope.totalPage;

        getBoardList("check", 6, $scope.page,$scope.whereString, $http, $scope, function() {
          $scope.makePaging();

        });
      };


      $scope.viewContent = function (sbidx) {

        if(sbidx != 0 && sbidx != undefined) {

          getBoardContent('check', sbidx, $http, $scope, function() {

            $("#listContent").removeClass("on");

            $("#viewContent").addClass("on");


          });
        } else {
          alert("글이 없습니다");
        }

      };

      $scope.returnList = function () {
        $("#listContent").addClass("on");

        $("#viewContent").removeClass("on");
      };

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js',
          './partials/common/js/freewall.js'
        ])
        .then(function() {
          indemnityBoardService.fire();
          layoutService.fire();

          var wall = new Freewall("#freewall");
        wall.reset({
          selector: '.brick',
          animate: false,
          cellW: 350,
          cellH: 'auto',
          onResize: function() {
            wall.fitWidth();
          }
        });
        wall.fitWidth();

        var $indemnityBoardList = $('#indemnityBoardList');
        $indemnityBoardList.on('click', '.hiddenOpen',function () {
          //var $this = $(this);
         // $this.parents('section').removeClass('on').siblings('section').addClass('on')
        });
      });
    }]);//indemnityBoardController.controller

  indemnityBoardModule.directive('boardView', function () {
    return {
      restrict : "A",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/indemnityBoard/template/boardView.html',
      link: function (scope, iElement, iAttrs, controller) {
        var $checkGender = iElement.find('#checkGender'),
            genderText = $checkGender.text();
        scope.gender = genderText;
        scope.avatarImg = function () {
          if(genderText === '남'){
            return "avatarMale.png"
          }
          if(genderText === '여'){
            return "avatarFemale.png"
          }
        };
      }
    }
  });
});



function getBoardList(boardCode, listCount, page, where, $http, $scope, callback) {

  $http.get(apiServer+'/board/totalcnt/'+boardCode,{params:{listCount:listCount, where:where}})
      .success(function(data, status, headers, config) {
        $scope.recommendThumbList = [];

        $scope.page = page;
        $scope.totalPage = data.boardPage;


        if(data.boardCnt > 0) {

          $http.get(apiServer+'/board/list/'+boardCode+'/'+page,{params:{listCount:listCount, where:where}})
              .success(function(data, status, headers, config) {


                for(var i in data.list) {

                  var redate = data.list[i].reg_datetime;
                  var list = {
                    title : data.list[i].subject,
                    name : data.list[i].name,
                    age : getInsuranceAge(data.list[i].birthday),
                    imgUrl : "",
                    context : data.list[i].content.substr(0,50),
                    date : redate,
                    count : data.list[i].count,
                    sbidx : data.list[i].sbidx,
                    file_path: data.list[i].file_path,
                    apiServer: apiServer
                  };

                  $scope.recommendThumbList.push(list);
                }

                $(window).resize();
                callback();
              });

        } else {
          alert("게시물이 없습니다");

          callback();
        }


      });




}

function getBoardContent(boardCode, sbidx, $http, $scope, callback) {

  //카운트 업데이트

  //내용 가져오기
  $http.get(apiServer+'/board/content/'+sbidx)
      .success(function(data, status, headers, config) {

        $scope.view_title = data[0].subject;
        $scope.view_date = data[0].reg_datetime.substr(0, 10);
        $scope.view_count = data[0].count;
        $scope.view_content = data[0].content;
        $scope.view_next_sbidx = data[0].nextSbidx;
        $scope.view_back_sbidx = data[0].backSbidx;
        $scope.comment_count = data[0].comment_cnt;
        $scope.view_etc2 = data[0].etc2;
        $scope.view_etc3 = data[0].etc3;

        $scope.file_path= data[0].file_path;
        $scope.apiServer= apiServer;

        $scope.loginemail = $.cookie("loginemail");
        $scope.loginwriter = $.cookie("loginwriter");

        $scope.comment_sbidx = sbidx;

        $http.get(apiServer+'/insurance/sugarInfo',{params:{sidx:data[0].etc1}})
            .success(function(data, status, headers, config) {


              $scope.view_name = data.memInfo.name;
              $scope.view_age = getInsuranceAge(data.memInfo.birthday);
              $scope.view_sex = data.memInfo.sex;

              callback();

            });

        // getBoardCommentList(sbidx, $http, $scope, function() {
        //
        //
        //
        // });


      });

}

function getBoardCommentList(sbidx, $http, $scope, callback) {


  //댓글 부분 적용

  $http.get(apiServer+'/board/comment/'+sbidx)
      .success(function(data, status, headers, config) {

        $scope.comments = data;

        callback();
      });
}

function empty(val) {
  if(val == "" || val == undefined) return true;
  else return false;
}

function getInsuranceAge (birthday) {

  var insuranceAge = 0;  //return value (보험 나이)

  //오늘의 년월일 값 구하기
  var date = new Date();

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  //나이 구하기.
  var ageYear = year - birthday.substr(0,4);
  var ageMonth = month - birthday.substr(4,2); //음수라면 ageYear에서 -1을 하고 이곳에는 12를 추가 한다
  var ageDay = day - birthday.substr(6,2);  //음수라면 ageMonth 에서 -1을 하고 이곳에는 +30을 한다.

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