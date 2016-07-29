// ===== layout event
$(document).ready(function () {
  var $eventArea = $('.event-area'),
      $eventList = $('.event-list'),
      idx= 0,
      flag = true;

  $(window).resize(function () {
    var eventWID = $('.event-con').width(),
        eventHEI = eventWID * 0.43,
        movetxt01HEI = $('.move-txt01').height();

    //$('.visual').css('height',eventHEI);
    //$eventArea.css('height',eventHEI);
    $('.move-txt02').css('height',movetxt01HEI);
    //$eventList.css('margin-top' , eventHEI / 2);
    $eventList.eq(0).css('margin-left' , -eventWID * 0.23);
  });
  $(window).trigger("resize");

  //$('.lnb > li').on({
  //  mouseenter:function(){
  //    idx = $(this).find('.sub-lnb > li').length;
  //    var liHEI = $(this).find('.sub-lnb > li').innerHeight();
  //    $(this).children('.sub-lnb').css("height",liHEI*idx)
  //  },
  //  mouseleave:function () {
  //    $(this).children('.sub-lnb').css('height',0)
  //  }
  //});

  fadeFn ($eventList, idx, 1000);
  var slideRel = setInterval(function () {
    idx++;
    fadeFn ($eventList, idx, 2000);
  },4000);

  //var slideRel = setInterval(function () {
  //  movement (select, start, end, index)
  //  idx ++;
  //  movement (select, start, end, index)
  //},2000);

  $eventArea.on({
    mouseenter : function () {
      clearInterval(slideRel)
    },
    mouseleave : function () {
      slideRel = setInterval(function () {
        idx++;
        fadeFn ($eventList, idx, 2000);
      },4000);
      //slideRel = setInterval(function () {
      //  movement (slideList, 0, "-100%", idx);
      //  idx ++;
      //  movement (slideList, "100%", 0, idx);
      //},2000);
    }
  });

  function fadeFn (select, index, sec) {
    var leng = select.length;
    select.eq(index).find('.event-area').fadeIn(sec)
        .parent('li').addClass('on')
        .siblings().removeClass('on').find('.event-area')
        .fadeOut(sec)
    if(index == leng){
      idx = 0;
      fadeFn (select, idx, 2000);
    }
  }

  //function movement (select, start, end, index) {
  //  var leng = select.length;
  //  select.eq(index).addClass('on')
  //    .find('.event-area').css({
  //        display:'block',
  //        left:start
  //      }).stop().animate({
  //        left:end
  //      },function () {
  //        flag = true;
  //      })
  //    .parent('li').siblings('li').removeClass('on');
  //
  //  if(index == leng){
  //    idx = 0;
  //    movement(select, start, end , idx);
  //  }else if(index < 0){
  //    idx = leng - 1;
  //    movement(select, start, end , idx);
  //  }
  //}
});
// ===== layout event end

