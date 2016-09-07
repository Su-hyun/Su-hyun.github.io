'use strict';

define(['projectSugar'], function () {
  console.log("FAQ");
  var faQuestionsModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'faQuestionsService', 'layoutService']);
  faQuestionsModule.controller('faQuestionsController', ['$scope','$http', '$ocLazyLoad', 'faQuestionsService', 'layoutService',
    function($scope, $http, $ocLazyLoad, faQuestionsService, layoutService) {


		$scope.mainTabNum = 1;
		$scope.keyword = "상품공통";
		$scope.mainTab1 = "Y";
		$scope.mainTab2 = "";
		$scope.mainTab3 = "";
		$scope.mainTab4 = "";

		$scope.mainTab = function(tab) {
			$scope.mainTabNum = tab;
			if(tab == "1") {
				$scope.keyword = "상품공통";
				$(".tab_area>li").removeClass("on");
				$(".tab_area>li").first().addClass("on");

				$scope.mainTab1 = "Y";
				$scope.mainTab2 = "";
				$scope.mainTab3 = "";
				$scope.mainTab4 = "";


			} else if(tab == "2") {
				$scope.keyword = "가입(청약)";

				$scope.mainTab1 = "";
				$scope.mainTab2 = "Y";
				$scope.mainTab3 = "";
				$scope.mainTab4 = "";

			} else if(tab == "3") {
				$scope.keyword = "청구/유지";

				$scope.mainTab1 = "";
				$scope.mainTab2 = "";
				$scope.mainTab3 = "Y";
				$scope.mainTab4 = "";
			} else if(tab == "4") {
				$scope.keyword = "사이트 이용";

				$scope.mainTab1 = "";
				$scope.mainTab2 = "";
				$scope.mainTab3 = "";
				$scope.mainTab4 = "Y";
			}

			$scope.searchQuery = "A.etc1='"+$scope.keyword+"'";


			$(".tab>li").removeClass("on");
			$(".tab>li").eq((tab-1)).addClass("on");

			for(var i = 0; i < $(".tab > li").length; i++){
				if((i+1) == tab ){
					var menu = $(".tab > li").eq(i).children("a").children("img").attr("src").replace("_off.png", "_on.png");
					$(".tab > li").eq(i).children("a").children("img").attr("src",menu);
				} else {
					var menu = $(".tab > li").eq(i).children("a").children("img").attr("src").replace("_on.png", "_off.png");
					$(".tab > li").eq(i).children("a").children("img").attr("src",menu);
				}
			}

			//게시판 리스트 가져오기
			getBoardList("faq",20, 1,$scope.searchQuery, $http, $scope, function() {
				//게시판 리스트 생성 완료
				//하단 페이징 부분 생성 필요


				$scope.makePaging();


			});
		};

		$scope.subTab = function(search) {
			$scope.keyword = search;
			$scope.searchQuery = "A.etc1='"+search+"'";
			getBoardList("faq",20, 1,$scope.searchQuery, $http, $scope, function() {
				//게시판 리스트 생성 완료
				//하단 페이징 부분 생성 필요
				$scope.makePaging();
			});
		};

		//게시판 리스트 가져오기
		getBoardList("faq",20, 1,"A.etc1='상품공통'", $http, $scope, function() {
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

			$scope.page = page;

			getBoardList("faq",20, $scope.page,$scope.searchQuery, $http, $scope, function() {
				//게시판 리스트 생성 완료
				//하단 페이징 부분 생성 필요
				$scope.makePaging();
			});

		};
		$scope.goBackPage = function () {
			$scope.page--;
			if($scope.page == 0) $scope.page = 1;

			getBoardList("faq",20, $scope.page,$scope.searchQuery, $http, $scope, function() {
				//게시판 리스트 생성 완료
				//하단 페이징 부분 생성 필요
				$scope.makePaging();
			});
		};
		$scope.goNextPage = function () {

			$scope.page++;
			if($scope.page > $scope.totalPage) $scope.page = $scope.totalPage;

			getBoardList("faq",20, $scope.page,$scope.searchQuery, $http, $scope, function() {
				//게시판 리스트 생성 완료
				//하단 페이징 부분 생성 필요
				$scope.makePaging();
			});
		};

		//검색하기
		$scope.searchQuery = "A.etc1='상품공통'";
		$scope.search_type = "all";
		$scope.search_keyword = "";
		$scope.faqsearch = function () {

			$scope.searchQuery = "A.etc1='"+$scope.keyword+"'";

			if($scope.search_keyword == "" || $scope.search_keyword == undefined) {
				alert("검색할 내용을 입력해 주십시오");
				return;
			}


			if($scope.search_type == "all") {
				$scope.searchQuery = "A.etc1='"+$scope.keyword+"' and (A.subject like '%"+$scope.search_keyword+"%' or A.content like '%"+$scope.search_keyword+"%') ";
			} else if($scope.search_type == "subject") {
				$scope.searchQuery = "A.etc1='"+$scope.keyword+"' and A.subject like '%"+$scope.search_keyword+"%' ";
			} else if($scope.search_type == "content") {
				$scope.searchQuery = "A.etc1='"+$scope.keyword+"' and  A.content like '%"+$scope.search_keyword+"%' ";
			}

			getBoardList("faq",20, $scope.page,$scope.searchQuery, $http, $scope, function() {
				//게시판 리스트 생성 완료
				//하단 페이징 부분 생성 필요
				$scope.makePaging();
			});

		};


      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          faQuestionsService.fire();
          layoutService.fire();

			$scope.faqList = [{
				title:"실손의료비는 재가입이 가능할까요?",
				content:"돈만 있음 다 됩니다"
			},{
				title:"실손의료비는 재가입이 가능할까요?",
				content:"돈만 있음 다 됩니다"
			},{
				title:"실손의료비는 재가입이 가능할까요?",
				content:"돈만 있음 다 됩니다"
			},{
				title:"실손의료비는 재가입이 가능할까요?",
				content:"돈만 있음 다 됩니다"
			},{
				title:"실손의료비는 재가입이 가능할까요?",
				content:"돈만 있음 다 됩니다"
			}];

          	//상단 탭은 메뉴
            //화면 들어올때 현재 메뉴 활성화
          	for(var i = 0; i < $(".tab > li").length; i++){
          		if($(".tab > li").eq(i).attr("class") == "on"){
          			var menu = $(".tab > li").eq(i).children("a").children("img").attr("src").replace("_off.png", "_on.png");
          			$(".tab > li").eq(i).children("a").children("img").attr("src",menu);
          		}
          	}
          	$(".tab > li").mouseenter(function() {
          		var menu = $(this).children("a").children("img").attr("src").replace("_off.png", "_on.png");
          		$(this).children("a").children("img").attr("src",menu);
			});
          	$(".tab > li").mouseleave(function() {
          		var menu = $(this).children("a").children("img").attr("src").replace("_on.png", "_off.png");
          		if($(this).attr("class") != "on"){
          			$(this).children("a").children("img").attr("src",menu);
          		}
			});
          	
          	
			$(".tab_area > li").click(function() {
				$(".tab_area > li").each(function() {
					$(this).removeClass("on");
				});
				$(this).addClass("on");
			});
          
          $(".drop_box > dl ").on('click','dt',function() {
        	  var ddClass = $(this).next("dd").hasClass("on");

			  
        	  if(ddClass){
        		  $(this).next("dd").removeClass("on");
        		  $(this).children(".arrow").css("background","url(./partials/layout/contents/faQuestions/img/arrow_down.gif) left top no-repeat");
        	  }else{
        		  $(this).next("dd").addClass("on");
        		  $(this).children(".arrow").css("background","url(./partials/layout/contents/faQuestions/img/arrow_up.gif) left top no-repeat");
        	  }
          });
          
       });




    }]);//faQuestionsController.controller
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
								sbidx : data.list[i].sbidx
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


			$scope.view_title = data[0].subject;
			$scope.view_date = data[0].reg_datetime.substr(0, 10);
			$scope.view_count = data[0].count;
			$scope.view_content = data[0].content;
			$scope.view_next_sbidx = data[0].nextSbidx;
			$scope.view_back_sbidx = data[0].backSbidx;
			$scope.comment_count = data[0].comment_cnt;

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

function postBoardContent(boardCode, $http, $scope, callback) {

	var content = $("#board_content").val();
	var subject = $("#board_subject").val();

	var etc1 = $scope.etc1;
	var etc2 = $scope.etc2;
	var etc3 = $scope.etc3;
	var etc4 = $scope.etc41 + $scope.etc42 + $scope.etc43;
	var etc5 = $scope.etc1;

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

function empty(val) {
	if(val == "" || val == undefined) return true;
	else return false;
}