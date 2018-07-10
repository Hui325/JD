/**
 * Created by Jepson on 2018/6/17.
 */

/* 区域滚动
*  1. 给左侧盒子绑定 touchstart, touchmove, touchend
*  2. touchstart 记录开始位置  e.touches[0].clientY
*  3. touchmove 获取移动的距离, 根据移动的距离, 让 ul 动, translateY
*  4. touchend 记录当前 ul 的位置
* */
;(function() {

  var ul = document.querySelector(".jd_content_left ul");
  var jd_content_left = document.querySelector(".jd_content_left");

  // 记录起始位置
  var startY = 0;
  var currentY = 0; // 核心变量, 专门用于存储, 手指离开屏幕时, ul 的位置

  ul.addEventListener("touchstart", function( e ) {
    startY = e.touches[0].clientY;
  });

  // 获取移动的距离, 设置给 ul
  ul.addEventListener("touchmove", function( e ) {
    var distanceY = e.touches[0].clientY - startY;  // 手指滑动的距离
    // 需要在原来的位置基础之上进行偏移(不需要动画)
    ul.style.transition = "none";
    ul.style.transform = "translateY("+ (currentY+distanceY) +"px)";
  });

  ul.addEventListener("touchend", function( e ) {
    var distanceY = e.changedTouches[0].clientY - startY;
    // 更新当前 ul 的位置
    currentY += distanceY;
    console.log( "本次滑动的距离" + distanceY + ",总距离" + currentY );

    // 上面已经留白了, 需要复位
    if ( currentY > 0 ) {
      currentY = 0;
    }
    // 子盒子高度 - 父盒子高度 = 向上可以滑动的最大距离
    if ( currentY < - ( ul.offsetHeight - jd_content_left.offsetHeight ) ) {
      currentY = - ( ul.offsetHeight - jd_content_left.offsetHeight );
    }

    // 根据已经限制过 currentY 进行设置位置(有动画)
    ul.style.transition = "all .5s";
    ul.style.transform = "translateY(" + currentY +"px)";
  });

})();