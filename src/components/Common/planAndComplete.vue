<script>
import Vue from 'vue'
import $ from 'jquery'

var planandcomplete = Vue.extend({
  template: `
    <div v-for="item in params">
      <div class="planAndComplete">
        <div class="quarterlyPlan">
          <div class="quarterlyPlanTime">{{item.quarterTime}}</div>
          <div class="quarterlyPlanVal customFont">{{item.planVal}}</div>
        </div>
        <div class="quarterlyCompletion">
           <div class="quarterlyCompletionText">完成</div>
           <div class="quarterlyCompletionVal customFont">{{item.planCompleteVal}}</div>
        </div>
    </div >    
      </div>
  `,
  data: function() {
    return { 
      // paramss:[{quarterTime:'第一季度计划',planVal:'100.00',planCompleteVal:'50.00%'},{quarterTime:'第二季度计划',planVal:'180.00',planCompleteVal:'60.00%'},{quarterTime:'第三季度计划',planVal:'220.00',planCompleteVal:'70.00%'},{quarterTime:'第四季度计划',planVal:'330.00',planCompleteVal:'90.00%'}]
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
    var planAndCompleteTextFontSize = 21/414 * windowWith;
    $(".planAndComplete").css('font-size',planAndCompleteTextFontSize+'px');


    // $(".timer").fadeOut();
  }
});

Vue.component('planandcomplete', planandcomplete);

export default {
  data () {
    return {
        
    }
  }
}

</script>

<style type="text/css">
.planAndComplete {
  border-bottom:0.5px solid #4d5766;
  border-top:0.5px solid #4d5766;
  width:100%;
  height:40px;
  padding-top: 1.5%;
  padding-bottom: 1.5%;
  /*text-align:center;*/
  background-color:#384355;
  /*position:relative;*/
  font-size: 21px;
}
.quarterlyPlan {
  float: left;
  margin-left: 8px;
  width: 60%;
  height: 100%;
  line-height: 40px;
  position: relative;

}
.quarterlyPlanTime{
  float: left;
  width: 60%;
}


.quarterlyPlanVal {
  float: left;
  text-align: left;
  width: 40%;
  height: 100%;
  line-height: 40px;
  color: #ffffff;
}

.quarterlyCompletion {
  width: 32%;
  float: right;
  height: 100%;
  line-height: 40px;
  margin-right: 2%;
}
.quarterlyCompletionText{
  float: left;
  width: 45%
}
.quarterlyCompletionVal {
  width: 55%;
  float: left;
  height: 100%;
  line-height: 40px;
  text-align: right;
  color: #ffb3f9;

}
</style>