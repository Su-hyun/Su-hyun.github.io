'use strict';

define(['projectSugar'], function () {

  var recommendServiceModule = angular.module('recommendServiceModule', []);

  recommendServiceModule.factory('recommendService', ['$rootScope',
    function($rootScope) {
      return {
        fire: function() {
          $('label.radio').on('click',function () {
            $(this).addClass('on').parent('li').siblings().find('.on').removeClass('on');

            if($(this).is('.married')) {
              $('.sub-radio.married').css ('display', 'block');
              $('.sub-radio.single').css ('display', 'none');
            }else if($(this).is('.single')) {
              $('.sub-radio.married').css ('display', 'none');
              $('.sub-radio.single').css ('display', 'block');
            }
          });

          // Iterate over each select element
          var ex = document.getElementById("#selectbox")

          console.log(ex)
          $('select').each(function () {
            var $this = $(this),
                numberOfOptions = $(this).children('option').length;

            $this.addClass('s-hidden');

            $this.wrap('<div class="select"></div>');

            $this.after('<div class="styledSelect"></div>');

            // Cache the styled div
            var $styledSelect = $this.next('div.styledSelect');

            $styledSelect.text($this.children('option').eq(0).text());

            var $list = $('<ul />', {
              'class': 'options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
              $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
              }).appendTo($list);
            }

            var $listItems = $list.children('li');

            $styledSelect.click(function (e) {
              e.stopPropagation();
              $('div.styledSelect.active').each(function () {
                $(this).removeClass('active').next('ul.options').hide();
              });
              $(this).toggleClass('active').next('ul.options').toggle();
            });

            $listItems.click(function (e) {
              e.stopPropagation();
              $styledSelect.text($(this).text()).removeClass('active');
              $this.val($(this).attr('rel'));
              $list.hide();
            });

            $(document).click(function () {
              $styledSelect.removeClass('active');
              $list.hide();
            });

          });
        }//fire end
      };//return end
    }]);//.define function end
});
