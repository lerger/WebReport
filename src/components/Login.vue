<template>
  <div id="loginSue" class="loginValid">
    <div style="text-align:center;margin-top:100px;">
      <img src="../assets/images/lock.png" style="width:40%" />
      <div style="margin-top:30px;">很抱歉！您暂无权限访问魔数狮。</div>
    </div>
    <div style="width:100%;text-align:center;">
      <div style="margin-left:5%;margin-top:20px;">您还可以：</div>
      <div style="padding-top:30px;">
        <span v-link="{ name: 'exit' }" style="background-color:#edece9;border:1px solid #deddd9;line-height:50px;height:50px;padding:20px 30px;border-radius:8px;color:#77b3bf;font-weight:bold;">
          返回协同办公系统
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'

function onSelected(index) {
  $(".sublogo").removeClass('subselected');
  $(".sublogo").eq(index).addClass('subselected');
}

export default {
  data () {
    return {
      
    }
  }, 
  methods: {

  },
  ready() {
      var topMargin = 0;
      var topPadding = 20;
      var bottomPadding = 20;
      var viewHeight = document.documentElement.clientHeight;
      var subHeight = (viewHeight - topMargin - topPadding - bottomPadding)/9;

      var width = document.documentElement.clientWidth;
      var height = document.documentElement.clientHeight;
     
      $("#loginSue").css({
        width: '100%',
        height: height,
        left: 0,
        top: 0
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ed drt mr>
  .loginValid {
    position:absolute;
    left:0;
    top:0;
    background-color:#fff;
    overflow: hidden;
    font-size:16px;
    color:#8c8c8c;
  }
</style>
