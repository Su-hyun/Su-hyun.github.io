'use strict';

define(['projectSugar'], function () {
  var properInsModule = angular.module('projectSugar', ['ui.router', 'oc.lazyLoad', 'properInsService', 'layoutService']);
  properInsModule.controller('properInsController', ['$scope', '$ocLazyLoad', 'properInsService', 'layoutService',
    function($scope, $ocLazyLoad, properInsService, layoutService) {

      $scope.properInsAsideArea = "./partials/layout/contents/properInsurance/aside/";
      $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon1Sub1/";

      $scope.$on('$includeContentLoaded',function(event, file) {
        if (file === './partials/layout/contents/properInsurance/aside/'){
          console.log(file)
        }else if (file === './partials/layout/contents/properInsurance/insCon1Sub1/'){
          console.log(file)
        }
      });

      // aside 메뉴 클릭
      $scope.$on('insCon1Sub1', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon1Sub1/";
      });
      $scope.$on('insCon1Sub2', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon1Sub2/";
      });
      $scope.$on('insCon1Sub3', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon1Sub3/";
      });
      $scope.$on('insCon2Sub1', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon2Sub1/";
      });
      $scope.$on('insCon2Sub2', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon2Sub2/";
      });
      $scope.$on('insCon2Sub3', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon2Sub3/";
      });
      $scope.$on('insCon2Sub5', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon2Sub5/";
      });
      $scope.$on('insCon3Sub1', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon3Sub1/";
      });
      $scope.$on('insCon3Sub2', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon3Sub2/";
      });
      $scope.$on('insCon3Sub3', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon3Sub3/";
      });
      $scope.$on('insCon4Sub1', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon4Sub1/";
      });
      $scope.$on('insCon5Sub1', function() {
        $scope.properInsConArea = "./partials/layout/contents/properInsurance/insCon5Sub1/";
      });

      $scope.broadcastInsCon1Sub1 = function() {
        $scope.$broadcast('insCon1Sub1');
      };
      $scope.broadcastInsCon1Sub2 = function() {
        $scope.$broadcast('insCon1Sub2');
      };
      $scope.broadcastInsCon1Sub3 = function() {
        $scope.$broadcast('insCon1Sub3');
      };
      $scope.broadcastInsCon2Sub1 = function() {
        $scope.$broadcast('insCon2Sub1');
      };
      $scope.broadcastInsCon2Sub2 = function() {
        $scope.$broadcast('insCon2Sub2');
      };
      $scope.broadcastInsCon2Sub3 = function() {
        $scope.$broadcast('insCon2Sub3');
      };
      $scope.broadcastInsCon2Sub5 = function() {
        $scope.$broadcast('insCon2Sub5');
      };
      $scope.broadcastInsCon3Sub1 = function() {
        $scope.$broadcast('insCon3Sub1');
      };
      $scope.broadcastInsCon3Sub2 = function() {
        $scope.$broadcast('insCon3Sub2');
      };
      $scope.broadcastInsCon3Sub3 = function() {
        $scope.$broadcast('insCon3Sub3');
      };
      $scope.broadcastInsCon4Sub1 = function() {
        $scope.$broadcast('insCon4Sub1');
      };
      $scope.broadcastInsCon5Sub1 = function() {
        $scope.$broadcast('insCon5Sub1');
      };
      // aside 클릭 종료

      $ocLazyLoad
        .load([
          './partials/common/js/jquery.cookie.js'
        ])
        .then(function() {
          properInsService.fire();
          layoutService.fire();

          var $properInsMenu = $('.properInsMenu');
          $properInsMenu.on('click','.clickLi', function (e) {
            var $this = $(this);
            $this.addClass('on').siblings().removeClass('on');
            $this.parents('.tabTitle').addClass('on').siblings('.tabTitle').removeClass('on').find('.on').removeClass('on');
          })
        });
    }]);//properInsController.controller
});
