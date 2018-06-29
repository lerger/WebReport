<script>
import Vue from 'vue'
import $ from 'jquery'

var plancomplete = Vue.extend({
  template: `
    <div class="planComplete">
      <div class="planName">{{params.name}}</div>
      <div class="planValue customFont" id='{{params.planValues}}'>{{params.value}}</div>
    </div>
  `,
  data: function() {
    return { 

      // backButton: {icon: require('../../assets/images/back.png'), link: 'home'},
      // commonrightbutton: {icon: require('../../assets/images/threebar.png'), link: ''}

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
    // $(".timer").fadeOut();
    var windowHeight = document.documentElement.clientHeight;
    var windowWith = document.documentElement.clientWidth;
    var planAndCompleteTextFontSize = 21/414 * windowWith;
    $(".planComplete").css('font-size',planAndCompleteTextFontSize+'px');
    $("#CompletionRate").css('color','#ffb3f9')
  }
});

Vue.component('plancomplete', plancomplete);

export default {
  data () {
    return {
      
    }
  }
}

</script>

<style type="text/css">
.planComplete {
  /*border-top:0.5px solid #4d5766;*/
  border-bottom:0.5px solid #737c88;
  width:100%;
  height:55px;
  text-align:center;
  background-color:#384355;
  position:relative;
  font-size: 21px;
}

.planName {
  height: 100%;
  line-height:55px; 
  float: left;
  text-align: left;
  font-size: 20px;
  margin-left: 8px;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.planValue {
  float: right;
  text-align: right;
  height: 100%;
  width: 20%;
  line-height:55px; 
  margin-right: 4%;
}
</style>