'use strict';

define([ 'projectSugar' ], function() {
	var layoutServiceModule = angular.module('layoutServiceModule', []);

	layoutServiceModule.factory('layoutService', [ '$rootScope',
			function($rootScope) {
				return {
					fire : function() {
					  var idx = 0;
            $('.lnb > li').on('click', function() {
              idx = $ (this).find ('.sub-lnb > li').length;
              var $this = $ (this),
                  liHEI = $ (this).find ('.sub-lnb > li').innerHeight ();
              if (!$this.is ('.active')) {
                $this.addClass ('active');
                $this.children ('.sub-lnb').css ("height", liHEI * idx);
                $this.siblings ().removeClass ('active').children ('.sub-lnb').css ('height', 0);
              } else if ($this.is ('.active')) {
                $this.removeClass ('active');
                $this.children ('.sub-lnb').css ('height', 0)
              }
            });
					}// fire end
				};// return end
			}]);// .define function end
});
