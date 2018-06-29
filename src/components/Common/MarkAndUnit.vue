<script>
import Vue from 'vue'
import $ from 'jquery'

var planandmarkunit = Vue.extend({
  template: `
    <div class="planCompleteMark">
      <img :src="planCompleteMarkImage" class="planCompleteMarkImage" />
      <div class="planCompleteDiv">计划完成</div>
      <div class="planCompleteUnit">单位：亿元</div>
    </div>
   <div class="blank"></div>
    <div class="planCompleteMark">
      <img :src="actualCompleteMarkImage" class="planCompleteMarkImage" />
      <div class="planCompleteDiv">实际完成</div>
      <div class="planCompleteUnit">单位：%</div>
    </div>


  `,
  data: function() {
    return { 
      planCompleteMarkImage: require('../../assets/images/plan_point_blue.png'),
      actualCompleteMarkImage: require('../../assets/images/plan_point_pink.png'),

    }
  },
  methods: {
    
    // back: function() {
    //   history.go(-1);
    // }
  },
  props: [
    'params'
  ],
  ready () {
    var windowHeight = document.documentElement.clientHeight;
    var windowWith = document.documentElement.clientWidth;
    var fontSize = 14/414 * windowWith;
    var bodyHeight = windowHeight - 64;
    $(".planCompleteMark").css('font-size',fontSize+'px');
    $(".blank").css('height',(35/1330)*bodyHeight);

     
  }
});

Vue.component('planandmarkunit', planandmarkunit);

export default {
  data () {
    return {
        
    }
  }
}

</script>

<style type="text/css">
.planCompleteMark{
   width: 100%;
   height: 20px;
   position: relative;
   font-size: 14px;
}
.planCompleteMarkImage{
  width: 12px;
  height:12px;
  line-height:20px;
  margin-top: 3px;
  float: left;
  padding-left: 10%;
}
.planCompleteDiv{
  width: 40%;
  line-height: 20px;
  height: 20px;
  float: left;
  margin-left: 8px;
}
.planCompleteUnit{
  width: 40%;
  line-height: 20px;
  height: 20px;
  float: left;
  text-align: left;
}
</style>