<script>
import Vue from 'vue'
import $ from 'jquery'
import HyperbolaChart from '../Assets/HyperbolaChart'

var hyperbolachartmoude = Vue.extend({
  template: `
      <div class="HyperbolaChartMoudeContainer">
      <div id="HyperbolaChartMoude" class="HyperbolaChartMoudeContent"></div>
    
      <div id="HyperbolaChartMoudeXBlackBg" class="xBlackBg">
      <div id="HyperbolaChartMoudeMonthUpperId" class="xAxisDivUper"></div>
    </div>
  </div>
 
  `,
  data: function() {
    return { 
      // backButton: {icon: require('../../assets/images/back.png'), link: 'home'},
      // commonrightbutton: {icon: require('../../assets/images/threebar.png'), link: ''}

    }
  },
  watch:{
　　　 hyperbolachartparams(curVal,oldVal){
　　　　　　　console.log(curVal,oldVal);
            console.log('监听数据变化后调用方法');
            HyperbolaChart.method().init();
            HyperbolaChart.method().setData(this.hyperbolachartparams.jhwc,this.hyperbolachartparams.jhwcl,this.hyperbolachartparams.sd,this.hyperbolachartparams.newAdd);
　　　 },
　},
  methods: {

    // changeMeth: function() {
    //   history.go(-1);
    // }
  },
  props: ['hyperbolachartparams'],
  
  ready () {
    // $(".timer").fadeOut();
    console.log('数据变化后调用组件的方法ready');
    HyperbolaChart.method().init();
    HyperbolaChart.method().setData(this.hyperbolachartparams.jhwc,this.hyperbolachartparams.jhwcl,this.hyperbolachartparams.sd,this.hyperbolachartparams.newAdd);
  }
});

Vue.component('hyperbolachartmoude', hyperbolachartmoude);

export default {
  data () {
    return {
      
    }
  }
}

</script>

<style type="text/css">

.HyperbolaChartMoudeContainer{
  height: 300px;
  position: relative;
}
.HyperbolaChartMoudeContent{
  width: 100%;
  height: 100%;
}
.xBlackBg{
  position:absolute;
  width:100%;
  margin-left:0%;
  height:3.5%;
  border-top: 2px solid #798592;
  background-color:#384355;
  bottom: -8px;
  height: 25px;
  line-height: 25px;
  z-index: 5;
}
</style>