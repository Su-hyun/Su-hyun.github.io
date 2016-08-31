'use strict';

define(['projectSugar'], function () {
  console.log("FAQ");
  var faQuestionsModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'faQuestionsService', 'layoutService']);
  faQuestionsModule.controller('faQuestionsController', ['$scope', '$ocLazyLoad', 'faQuestionsService', 'layoutService',
    function($scope, $ocLazyLoad, faQuestionsService, layoutService) {

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          faQuestionsService.fire();
          layoutService.fire();
          	
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
          
          $(".drop_box > dl > dt").click(function() {
        	  var ddClass = $(this).next("dd").attr("class");
        	  if(ddClass == "on"){
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
