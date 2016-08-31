'use strict';

define(['projectSugar'], function () {
  var oneAndModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'oneAndService', 'layoutService']);
  oneAndModule.controller('oneAndController', ['$scope', '$ocLazyLoad', 'oneAndService', 'layoutService',
    function($scope, $ocLazyLoad, oneAndService, layoutService) {

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            oneAndService.fire();
            layoutService.fire();
            
            $(".oneAnd-tab > ul > li").click(function() {
            	$(".oneAnd-tab > ul > li").each(function() {
            		$(this).removeClass("on");
            		var downpage = $(this).attr("downpage");
            		$("."+downpage).css("display","none");
            	});
            	$(this).addClass("on");
            	
            	var downpage = $(this).attr("downpage");
            	
            	$("."+downpage).css("display","block");
            	
            	
        	});
            
            $('#textcon').on('keyup', function() {
                if($(this).val().length > 4000) {
                    $(this).val($(this).val().substring(0, 4000));
                }
                $(".count_color").text($(this).val().length);
            });
            
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
