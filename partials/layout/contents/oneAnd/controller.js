'use strict';

define(['projectSugar'], function () {
  var oneAndModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'oneAndService', 'layoutService']);
  oneAndModule.controller('oneAndController', ['$scope','$http', '$ocLazyLoad', 'oneAndService', 'layoutService',
    function($scope, $http, $ocLazyLoad, oneAndService, layoutService) {


      //내용 보기

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

            getBoardList("one", 10, page, 'A.email="'+$.cookie("loginemail")+'"', $http, $scope, function() {
                $scope.makePaging();

            });

        };
        $scope.goBackPage = function () {
            $scope.page--;
            if($scope.page == 0) $scope.page = 1;

            getBoardList("one", 10, $scope.page, 'A.email="'+$.cookie("loginemail")+'"', $http, $scope, function() {
                $scope.makePaging();

            });
        };
        $scope.goNextPage = function () {

            $scope.page++;
            if($scope.page > $scope.totalPage) $scope.page = $scope.totalPage;

            getBoardList("one", 10, $scope.page, 'A.email="'+$.cookie("loginemail")+'"', $http, $scope, function() {
                $scope.makePaging();

            });
        };



        $scope.viewContent = function (sbidx) {

                if(sbidx != 0 && sbidx != undefined) {

                    getBoardContent('one', sbidx, $http, $scope, function() {


                        $(".oneAnd-con").hide();
                        $(".twoAnd-con").hide();
                        $(".threeAnd-con").show();


                    });
                } else {
                    alert("글이 없습니다");
                }

        };

        $scope.checkbox = [];

        $scope.checkboxCheck = function () {
            $scope.checkbox = [];
            $(".delCheck").each(function(d) {
               if($(this).prop("checked")) {
                   $scope.checkbox.push($(this).val());

               };
            });


            boardDelete('one', $scope.checkbox,$http,$scope, function() {
                $scope.viewList();
            });

        };

        $scope.cancleInsert = function () {
            $("#textcon").val("");
            $scope.subject = "";

            $scope.etc2 = "";
            $scope.etc42 = "";
            $scope.etc43 = "";
            $scope.etc5 = "";
        };

        $scope.contentInsert = function() {


            postBoardContent("one", $http, $scope, function() {
                $scope.cancleInsert();
                $scope.viewList();
            });

        };

        $scope.viewList = function () {

            //데이터 가져오기
            getBoardList('one', 10, 1, 'A.email="'+$.cookie("loginemail")+'"', $http, $scope, function() {

                $(".oneAnd-con").hide();
                $(".twoAnd-con").show();
                $(".threeAnd-con").hide();
            });

        };

        $scope.viewInput = function () {

            $(".oneAnd-con").show();
            $(".twoAnd-con").hide();
            $(".threeAnd-con").hide();
        }

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            oneAndService.fire();
            layoutService.fire();
            
            $(".oneAnd-tab > ul > li").click(function() {

                $(".threeAnd-con").hide();
                $(".oneAnd-tab > ul > li").each(function() {
            		$(this).removeClass("on");
            		var downpage = $(this).attr("downpage");
            		//$("."+downpage).css("display","none");
            	});
            	$(this).addClass("on");
            	
            	var downpage = $(this).attr("downpage");
            	
            	//$("."+downpage).css("display","block");

            	
            	
        	});
            
            $('#textcon').on('keyup', function() {
                if($(this).val().length > 4000) {
                    $(this).val($(this).val().substring(0, 4000));
                }
                $(".count_color").text($(this).val().length);
            });



              $scope.etc5 = $.cookie("loginwriter");
              $scope.etc2 = $.cookie("loginemail");
              $scope.etc1 = "";


          });
    }]);//Controller.controller

  oneAndModule.directive('boardView', function () {
    return {
      restrict : "A",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/oneAnd/template/boardView.html'
    }
  })
});




function getBoardList(boardCode, listCount, page, where, $http, $scope, callback) {

    $http.get(apiServer+'/board/totalcnt/'+boardCode,{params:{listCount:listCount, where:where}})
        .success(function(data, status, headers, config) {
            $scope.boardList = [];

            $scope.page = page;
            $scope.totalPage = data.boardPage;

            if(data.boardCnt > 0) {

                $http.get(apiServer+'/board/list/'+boardCode+'/'+page,{params:{listCount:listCount, where:where}})
                    .success(function(data, status, headers, config) {


                        for(var i in data.list) {


                            var redate = data.list[i].reg_datetime;
                            var list = {
                                title : data.list[i].subject,
                                context : data.list[i].content,
                                date : redate,
                                count : data.list[i].count,
                                sbidx : data.list[i].sbidx,
                                reply : data.list[i].re_content,
                                reply_text : data.list[i].re_content?"완료":"미답변"
                            };

                            $scope.boardList.push(list);
                        }

                    });

            } else {
            }

            callback();

        });
}

function getBoardContent(boardCode, sbidx, $http, $scope, callback) {


    //카운트 업데이트

    //내용 가져오기
    $http.get(apiServer+'/board/content/'+sbidx)
        .success(function(data, status, headers, config) {

            if(data.length > 0) {

                $scope.view_title = data[0].subject;
                $scope.view_date = data[0].reg_datetime.substr(0, 10);
                $scope.view_count = data[0].count;
                $scope.view_content = data[0].content;
                $scope.view_next_sbidx = data[0].nextSbidx;
                $scope.view_back_sbidx = data[0].backSbidx;
                $scope.comment_count = data[0].comment_cnt;
                $scope.view_reply = data[0].re_content;

                $scope.loginemail = $.cookie("loginemail");
                $scope.loginwriter = $.cookie("loginwriter");

                $scope.comment_sbidx = sbidx;

                callback();
            } else {

                callback();
            }



            //
            //
            // getBoardCommentList(sbidx, $http, $scope, function() {
            //
            //     callback();
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

function postBoardContent(boardCode, $http, $scope, callback) {

    var content = $("#textcon").val();
    var subject = $scope.subject;

    var etc1 = $scope.etc1;
    var etc2 = $scope.etc2;
    var etc3 = $scope.etc3;
    var etc4 = $scope.etc41 + $scope.etc42 + $scope.etc43;
    var etc5 = $scope.etc5;


    //동의 체크
    if($scope.iAgree != "iAgree") {
        alert("개인정보 수집에 동의해 주셔야 합니다 ");
        return false;
    }

    if(empty($.cookie("loginemail"))) {
        alert("로그인 정보가 없습니다");
        return false;
    }

    if(empty(content) || empty(subject) || empty(etc5) ) {
        alert(" 입력 항목이 비었습니다 ");
        return false;
    }

    if(etc1 == "Y" && empty(etc2)) {
        alert("  이메일 항목이 비었습니다 ");
        return false;
    }

    if(etc3 == "Y" && empty(etc4)) {
        alert("  전화번호 항목이 비었습니다 ");
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

        console.log(data);

        if(data.result == "ok") {

            $("#board_content").val("");
            $("#board_subject").val("");
            callback();

        }
        //댓글 부분 다시 불러오기.

    });

}

function boardDelete(boardCode, checkSbidx,$http,$scope, callback) {

    console.log(JSON.stringify(checkSbidx));
    var contentData = {sbidx:JSON.stringify(checkSbidx)};

    $http.post(apiServer+'/board/contentListDelete', contentData).success(function(data) {

        console.log(data);

        if(data.result == "ok") {

            callback();

        }
        //댓글 부분 다시 불러오기.

    });

}

function empty(val) {
    if(val == "" || val == undefined) return true;
    else return false;
}