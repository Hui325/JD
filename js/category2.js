/**
 * Created by Jepson on 2018/6/17.
 */

//;(function() {
//
//  var ul = document.querySelector(".jd_content_left ul");
//  var jd_content_left = document.querySelector(".jd_content_left");
//
//  var startY = 0; // 记录开始的坐标
//  var currentY = 0; // 记录当前 ul 的位置
//
//  // touchstart 记录开始坐标
//  ul.addEventListener("touchstart", function( e ) {
//    startY = e.touches[0].clientY;
//  });
//
//  // touchmove 根据移动的距离, 让 ul 在原来的基础上移动(没有动画)
//  ul.addEventListener("touchmove", function( e ) {
//    var distanceY = e.touches[0].clientY - startY;
//    ul.style.transition = "none";
//    ul.style.transform = "translateY(" + (currentY + distanceY)+ "px)";
//  });
//  // touchend
//  // 1. 更新 currentY, 在原有currentY基础上加上本次移动的距离,记录当前 ul 的位置
//  // 2. 判断是否需要回弹
//  ul.addEventListener("touchend", function( e ) {
//    var distanceY = e.changedTouches[0].clientY - startY; // 求得本次移动的距离
//    currentY += distanceY;  // 将本次移动的距离更新到 currentY 中
//
//    if ( currentY > 0 ) {
//      currentY = 0
//    }
//    if ( currentY < -(ul.offsetHeight - jd_content_left.offsetHeight) ) {
//      currentY = -(ul.offsetHeight - jd_content_left.offsetHeight);
//    }
//
//    // 回弹需要动画
//    ul.style.transition = "all .5s";
//    ul.style.transform =  "translateY(" + currentY + "px)";
//  });
//
//})();


/*
* iScroll使用注意事项
* 1. 必须要有很长的子元素, 要有一个有宽高的父容器
* 2. 父容器只能有一个子元素, 如果有多个, 其他将会被忽略
* 3. (1) 需要在 onload 中, onload 可以保证图片加载完了, 进行 IScroll 初始化,
*        那么计算子盒子宽高时, 才是准确的
*    (2) 需要清除浮动, 保证计算准确
* */
window.addEventListener("load", function() {
  new IScroll('.jd_content_left');
  // 默认是纵向的区域滚动
  new IScroll(".jd_content_right", {
    scrollX: false,   // 配置横向区域滚动, 默认值 false
    scrollY: true    // 配置纵向区域滚动, 默认值 true
  });
});

