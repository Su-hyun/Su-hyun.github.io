'use strict';

define(['projectSugar'], function () {
  var tellTruthModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'tellTruthService', 'layoutService']);
  tellTruthModule.controller('tellTruthController', ['$scope','$http', '$ocLazyLoad', 'tellTruthService', 'layoutService','$anchorScroll','$location','$sce',
    function($scope,$http, $ocLazyLoad, tellTruthService, layoutService,$anchorScroll,$location,$sce) {


      $anchorScroll.yOffset = 0;

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


      $scope.questionsList = [];


      getBoardList("true", 6, 1, $http, $scope, function() {
        //게시판 리스트 생성 완료
        //하단 페이징 부분 생성 필요

        $scope.makePaging();

      });


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

        $location.hash('subBG');
        $anchorScroll();

        $scope.page = page;

        getBoardList("true", 6, page, $http, $scope, function() {
          $scope.makePaging();

        });

      };
      $scope.goBackPage = function () {

        $location.hash('subBG');
        $anchorScroll();

        $scope.page--;
        if($scope.page == 0) $scope.page = 1;

        getBoardList("true", 6, $scope.page, $http, $scope, function() {
          $scope.makePaging();

        });
      };
      $scope.goNextPage = function () {

        $location.hash('subBG');
        $anchorScroll();

        $scope.page++;
        if($scope.page > $scope.totalPage) $scope.page = $scope.totalPage;

        getBoardList("true", 6, $scope.page, $http, $scope, function() {
          $scope.makePaging();

        });
      };



      $scope.viewContent = function (sbidx) {

        $location.hash('subBG');
        $anchorScroll();

        if(sbidx != 0 && sbidx != undefined) {

          getBoardContent('true', sbidx, $http, $scope, function() {

            $("#tellTruthList").removeClass('on');
            $("#viewContent").addClass('on');


          });
        } else {
          alert("글이 없습니다");
        }

      };

      if($scope.truthSbidx != undefined && $scope.truthSbidx > 0) {
        $scope.viewContent($scope.truthSbidx);
      }

      $scope.commentInsert = function() {


        //값 체크 하기
        var email = $scope.loginemail;
        var writer = $scope.loginwriter;
        var sbidx = $scope.comment_sbidx;
        var p_sbcidx = $scope.comment_p_sbcidx;
        var comment = $("#comment_comment").val();
        var sbcidx = $scope.comment_sbcidx;

        if(empty(email) || empty(writer) || empty(sbidx) || empty(comment)) {

          alert("필수 값이 없습니다");
          return false;

        } else {
          var commentData = {
            email: email,
            writer : writer,
            sbidx : sbidx,
            p_sbcidx : p_sbcidx,
            comment : comment
          };

          $http.post(apiServer+'/board/comment', commentData).success(function(data) {

            console.log(data);

            if(data.result == "ok") {
              getBoardCommentList(sbidx, $http, $scope, function(data){
                $("#comment_comment").val("");
                $scope.comment_p_sbcidx = "";
                $scope.comment_sbcidx = "";
              });
            }
            //댓글 부분 다시 불러오기.

          });

        }

      };

      $scope.trustAsHtml = function(string) {
        return $sce.trustAsHtml(string);
      };

      $scope.commentDelete = function(sbcidx) {
        if(confirm("삭제 하시겠습니까?") ) {
          $http.delete(apiServer + '/board/comment/'+sbcidx).success(function (data) {
            $("#"+sbcidx).parent().remove();
          });
        }

      };
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

            //내용 보기
            $tellLi.on('click', function () {

             // var $this = $(this);

             // $this.parents('section').removeClass('on').next().addClass('on')
            });
            $btnList.on('click', function () {
              var $this = $(this);
              $this.parents('section').removeClass('on').prev().addClass('on');

              $location.hash('subBG');
              $anchorScroll();
            })
          });


    }]);//tellTruthController.controller

  tellTruthModule.directive('listView', function () {

    //내용 가져 오기

    return {
      restrict : "A",
      replace:true,
      transclude:true,
      scope:true,
      templateUrl:'./partials/layout/contents/tellTruth/template/listView.html'
    }
  });


});


function getBoardList(boardCode, listCount, page, $http, $scope, callback) {

  $http.get(apiServer+'/board/totalcnt/'+boardCode,{params:{listCount:listCount}})
      .success(function(data, status, headers, config) {
        $scope.questionsList = [];

        $scope.page = page;
        $scope.totalPage = data.boardPage;


        if(data.boardCnt > 0) {

          $http.get(apiServer+'/board/list/'+boardCode+'/'+page,{params:{listCount:listCount}})
              .success(function(data, status, headers, config) {


                for(var i in data.list) {


                  var redate = data.list[i].reg_datetime;
                  var list = {
                    title : data.list[i].subject,
                    context : data.list[i].content.substr(0,10),
                    date : redate,
                    count : data.list[i].count,
                    sbidx : data.list[i].sbidx,
                    file_path: data.list[i].file_path,
                    apiServer: apiServer
                  };

                  $scope.questionsList.push(list);
                }

              });

        } else {
          alert("게시물이 없습니다");
        }

        callback();

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

        $scope.file_path= data[0].file_path;
        $scope.apiServer= apiServer;

        $scope.loginemail = $.cookie("loginemail");
        $scope.loginwriter = $.cookie("loginwriter");

        $scope.comment_sbidx = sbidx;


        getBoardCommentList(sbidx, $http, $scope, function() {

          callback();

        });


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