<template>
  <div class="building">
    <div id="bp" style="text-align:center;margin-top:100px;">
      <img id="buildingImg" src="../assets/images/building.png" style="width:35%" />
    </div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {
      
    }
  }, 
  methods: {

  },
  ready() {
      var topMargin = 0;
      var topPadding = 10;
      var bottomPadding = 10;
      var viewHeight = document.documentElement.clientHeight;
      var subHeight = (viewHeight - topMargin - topPadding - bottomPadding)/9;

      var width = document.documentElement.clientWidth;
      var height = document.documentElement.clientHeight;
     
      $(".building").css({
        width: '100%',
        height: height,
        left: 0,
        top: -topPadding
      });

      $("#buildingImg").parent().css({
        'margin-top': (width*0.4)/2
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .building {
    position:absolute;
    left:0;
    top:0;
    background-color:#fff;
    overflow: hidden;
    font-size:22px;
  }
</style>
