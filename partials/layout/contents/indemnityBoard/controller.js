'use strict';

define(['projectSugar'], function () {
  var indemnityBoardModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'indemnityBoardService', 'layoutService']);
  indemnityBoardModule.controller('indemnityBoardController', ['$scope', '$ocLazyLoad', 'indemnityBoardService', 'layoutService',
    function($scope, $ocLazyLoad, indemnityBoardService, layoutService) {

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

      $ocLazyLoad
          .load([
            './partials/common/js/jquery.cookie.js'
          ])
          .then(function() {
            indemnityBoardService.fire();
            layoutService.fire();

            var $thumbnail = $('.thumbnail'),
                $thumbList = $thumbnail.find('li'),
                thumWidArray = [],
                thumHeiArray = [],
                thumbLeft = 0,
                thumbTop = 0;

            $thumbList.each(function () {
              var $this = $(this),
                  thumbWID = $this.outerWidth() + 25,
                  thumbHEI = $this.outerHeight() + 10;
              thumbLeft = thumbLeft + thumbWID;
              thumbTop = thumbTop + thumbHEI;
              thumWidArray.push(thumbLeft);
              thumHeiArray.push(thumbTop);
            });

            for(var i = 0; i < thumWidArray.length; i++){
              thumbLeft = -thumWidArray[0];
              thumbLeft = thumbLeft + thumWidArray[i];
              $thumbList.eq(i).css('left', thumbLeft)
            }
            //for(var i = 0; i < thumHeiArray.length; i++){
            //  var heiNum = thumHeiArray[i];
            //  hei = hei + heiNum;
            //  console.log(hei)
            //}



          });
    }]);//indemnityBoardController.controller

  indemnityBoardModule.directive('boardView', function () {
    return {
      restrict : "A",
      replace:true,
      transclude:true,
      templateUrl:'./partials/layout/contents/indemnityBoard/template/boardView.html'
    }
  });
});
