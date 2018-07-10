// 功能1: 全选反选功能
// 思路: 先给所有的按钮, 添加点击事件, 点击的时候, 切换类 checked

;(function() {

  // 拿到所有的按钮
  var all = document.querySelectorAll(".jd_checkbox");
  // 全选反选按钮
  var selectAll = document.querySelector(".goods_title .jd_checkbox");
  // 下面的所有按钮
  var checkBoxs = document.querySelectorAll(".goods_wrapper .jd_checkbox");

  // 给每一个按钮, 都要添加点击事件
  all.forEach(function( v, i ) {
    v.addEventListener("click", function() {
      // 切换当前元素的类
      this.classList.toggle("checked");
    });
  });

  // 全选反选按钮, 被点击时, 要让下面的所有按钮, 进行同步状态
  selectAll.addEventListener("click", function() {

    if ( this.classList.contains("checked") ) {
      // 让下面的所有按钮, 都加上 checked 类
      checkBoxs.forEach(function( v, i ) {
        v.classList.add("checked");
      });
    }
    else {
      checkBoxs.forEach(function( v, i ) {
        v.classList.remove("checked");
      })
    }

  })

})();