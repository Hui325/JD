/**
 * Created by Jepson on 2018/6/14.
 */

// 功能需求:
// 功能1: 页面滚动, 需要动态设置头部透明度
// 功能2: 动态设置秒杀产品 ul 的宽度
// 功能3: 倒计时功能
// 功能4: 京东快报
// 功能5: 京东轮播图




// 注意: 如果使用无分号规范, 需要在所有 () [] `` 开头的前面, 都要加分号, 闭合语句

// 功能1: 页面滚动, 需要动态设置头部透明度
;(function() {

  /*
  * 思路:
  * 1. 监听 scroll 事件
  * 2. 获取 卷去高度 scrollTop
  * 3. 动态计算透明度
  *    0 => 0
  *    600 => 0.9
  *    如果在 600内, 等比例计算, scrollTop/600 = opacity/0.9
  *    如果 > 600, 直接透明度 0.9
  * */
  var header = document.querySelector(".jd_header");
  window.addEventListener("scroll", function() {
    // 获取页面卷去高度
    //var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var scrollTop = window.pageYOffset;
    var opacity = 0;
    // 动态计算透明度
    if ( scrollTop > 600 ) {
      opacity = 0.9;
    }
    else {
      opacity = scrollTop / 600 * 0.9;
    }
    // 设置给头部
    header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";
  })
})();


// 功能2: 动态设置秒杀产品 ul 的宽度
;(function() {

  // 思路:
  // 1. 获取 ul
  // 2. 获取 所有的 li, 得到有多少个 li
  // 3. 获取 li 的宽度
  // 4. 计算 ul 的宽度, 设置给 ul
  var ul = document.querySelector(".seckill_product ul");
  var lis = ul.children;
  var liWidth = lis[0].offsetWidth;

  ul.style.width = lis.length * liWidth + "px";


  new IScroll(".seckill_product", {
    scrollX: true,
    scrollY: false
  })

})();


// 功能3: 倒计时功能
;(function() {

  var spans = document.querySelectorAll(".seckill_title .time span:nth-child(2n+1)");

  // 思路:
  // 1. 倒计时的时间 = 秒杀时间 - 当前时间    (时间戳 ms)
  // 2. 转换成 时分秒
  // 3. 将时间设置给对应的 span
  // 4. 添加定时器, 让他动起来

  // 一进入页面需要调用一次
  setTime();

  var timer = setInterval(setTime, 1000);

  function setTime() {
    var now = new Date();
    // (1) new Date(时间戳)
    // (2) new Date(字符串)   new Date("2018-6-18 12:00:00")
    //     在 ios 里面 safari 浏览器, 不支持带 - 的日期格式, 支持 /
    //     new Date("2018/6/18 12:00:00")
    // (3) new Date(年, 月, 日, 时, 分, 秒);  需要注意: 月份从 0开始
    //     new Date(2018, 5, 18, 12, 0, 0 );
    var seckillTime = new Date("2018/6/16 12:42:00");

    var time = parseInt( (seckillTime - now) / 1000 ); // 转换成秒

    // 如果时间到了, 或者是过去的时间, 清除定时器
    if ( time <= 0 ) {
      time = 0;
      clearInterval( timer );
    }

    var hours = parseInt( time / 3600  ); // 一小时 = 3600秒
    var minites = parseInt( time / 60 ) % 60; // 一分钟 = 60秒, 总的分钟数对60取余
    var seconds = time % 60;

    console.log( hours + ":" + minites + ":" + seconds );

    // 将时分秒设置给对应的 span
    spans[0].innerHTML = addZero( hours );
    spans[1].innerHTML = addZero( minites );
    spans[2].innerHTML = addZero( seconds );
  }

  // 给小于10的数字前面 + 0
  function addZero ( n ) {
    return n < 10 ? "0" + n : n;
  }
})();


// 功能4: 京东快报
;(function() {
  /*
  * 思路分析:
  * 1. 往上移动的是 ul
  * 2. 每次移动距离, 一个 li 的高度, transform: translateY(-30px);
  * */
  var ul = document.querySelector( ".jd_news .info ul" );
  var lis = ul.children;
  var liHeight = lis[0].offsetHeight;

  var index = 0; // 计数器
  setInterval(function() {

    //if ( index >= lis.length - 1 ) {
    //  index = 0;
    //  // 并且瞬间归位
    //  ul.style.transition = "none";
    //  ul.style.webkitTransition = "none";
    //  ul.style.transform = "translateY(0px)";
    //  ul.style.webkitTransform = "translateY(0px)";
    //}

    // 浏览器会维护一个样式队列, 等 js 执行完了, 一次性进行渲染, 只会触发一次回流和重绘
    // 浏览器为了保证获取性操作的准确性, 在用户执行获取性操作时, 会强制刷新 浏览器渲染队列
    //ul.offsetWidth;

    index++;
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";
    ul.style.transform = "translateY(-" + index * liHeight + "px)";
    ul.style.webkitTransform = "translateY(-" + index * liHeight + "px)";

  }, 1000);


  // 当盒子完全抵达最后一个假的li的时候, 瞬间切换成第一个的位置
  ul.addEventListener("transitionend", function() {

    if ( index >= lis.length - 1 ) {
      index = 0;
      // 不需要有动画
      ul.style.transition = "none";
      ul.style.webkitTransition = "none";
      ul.style.transform = "translateY(0px)";
      ul.style.webkitTransform = "translateY(0px)";
    }

  })



})();


// 功能5: 轮播图动起来
;(function() {

  /*
  * 思路: 就是让 ul 动, 动一个li的宽度
  * */
  var ul = document.querySelector(".jd_banner ul");
  var lis = ul.children;
  var width = lis[0].offsetWidth;
  var points = document.querySelectorAll(".jd_banner ol li"); // 小圆点

  var index = 1; // 由于有一张假图片, 所以 ul 本身已经位移了一个图片的距离

  var timer = setInterval(function() {
    index++;
    // 添加过渡
    addTransition();
    // 设置位置
    setTranslateX( -index * width );
  }, 3000);


  // transition动画执行完成时, 调用这个方法, 也就是 ul 停下来的时候调用
  ul.addEventListener("transitionend", function() {
    // 完全抵达最后一张假图时, 瞬间切换到第一张真图
    if ( index >= lis.length - 1 ) {
      index = 1;
      // 没有过渡
      removeTransition();
      // 设置位置
      setTranslateX( -index * width );
    }

    // 完全抵达第一张假图时, 瞬间切换到最后一张真图
    if ( index <= 0 ) {
      index = lis.length - 2;
      // 移除过渡
      removeTransition();
      // 设置位置
      setTranslateX( -index * width );
    }

    // 同步小圆点
    // 上面的判断已经对 index 做了处理, 限制在了 1-8
    // 小圆点索引 0-7, 让index-1的小圆点, 高亮即可
    // 先让所有的不亮, 移除类名
    points.forEach(function( v, i ) {
      v.classList.remove("current");
    })
    // 让index-1的小圆点高亮
    points[index-1].classList.add("current");
  });

  // 需求:
  // 1. 手指滑动时, ul 要跟着手指动
  // 2. 滑动完成, 需要判断左滑动还是右滑动

  // 添加手指事件监听
  var startX = 0; // 记录开始的位置
  var startTime = 0; // 记录开始的时间

  /*
  * touchstart 记录开始位置, 记录开始时间, 清除定时器
  * */
  ul.addEventListener("touchstart", function( e ) {
    startX = e.touches[0].clientX;
    startTime = new Date();  // 记录开始时间
    // 清除定时器
    clearInterval( timer );
  })

  /*
  * touchmove 获取移动的距离, 让ul跟着手指一起动, 主要要在原来的基础上移动
  * */
  ul.addEventListener("touchmove", function( e ) {
    var distanceX = e.touches[0].clientX - startX; // 移动的相对距离
    // 需要在原来位置基础上 + distanceX
    // 不需要动画, 去掉transition
    removeTransition();
    setTranslateX( -index*width + distanceX );
  })

  // 手指离开屏幕
  // 1. 根据移动的距离
  //    (1) 如果向右滑动的距离 > 1/3 宽度, 向右滑动, 显示上一张
  //    (2) 如果向左滑动的距离 > 1/3 宽度, 向左滑动, 显示下一张
  //    (3) 如果滑动的距离小于 1/3的宽度, 归位
  // 2. 需要开启定时器
  // 3. 添加快速滑动效果
  //    滑动的时间在 200ms 内, 滑动的距离超过 50, 我们认为用户想要切换图片



  /*
  * touchend,
  * 1. 获取移动的距离, 判断是否满足切换的条件, 如果满足, 进行切换
  *    如果不满足, 进行复位
  * 2. 开启定时器
  * */

  ul.addEventListener("touchend", function( e ) {

    var distanceX = e.changedTouches[0].clientX - startX;
    var time = new Date() - startTime; // 时间差

    // (1)移动的距离 > 1/3 宽度
    // (2)移动的特别快, 距离大于50
    if ( distanceX > width / 3 || time < 200 && distanceX > 50 ) {
      index--;
    }
    else if ( distanceX < -width / 3 || time < 200 && distanceX < -50 ) {
      index++;
    }
    // 归位
    addTransition();
    setTranslateX( -index*width );


    // 开启定时器
    timer = setInterval(function() {
      index++;
      // 添加过渡
      addTransition();
      // 设置位置
      setTranslateX( -index * width );
    }, 3000);
  });


  // 改变屏幕宽度时, 需要重新获取 lis 的宽度
  window.addEventListener("resize", function () {
    // 设置 width
    width = lis[0].offsetWidth;
    // 根据 index, 重新设置 ul 的位置
    removeTransition();
    setTranslateX( -index * width );
  })






  // 封装一些简单的方法, 处理兼容性
  // 添加过渡
  function addTransition() {
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";
  }

  // 移除过渡
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  // 设置位置
  function setTranslateX( value ) {
    ul.style.transform = "translateX(" + value + "px)";
    ul.style.webkitTransform = "translateX(" + value + "px)";
  }

})();


