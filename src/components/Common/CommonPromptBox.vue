<script>
import Vue from 'vue'
import $ from 'jquery'

var commonpromptbox = Vue.extend({
  template: `
      <div id="prompt">请选择关注指标</div>
  `,
  data: function() {
    return { 
      

    }
  },
  methods: {
    
  },
   props: [
    'params'
  ],
  ready () {
    var windowWith = $(window).width();
    var promptWidth = $("#prompt").width();
    var leftPadding = (windowWith - promptWidth)/2;

    $("#prompt").css('left',leftPadding + 'px');

  }
});

Vue.component('commonpromptbox', commonpromptbox);

export default {
  data () {
    return {
      
    }
  }
}
</script>
<style>
  #prompt{
    width: 50%;
    height: 100px;    
    line-height: 100px;
    border-radius: 10px;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    background:rgb(145,145,145);
    position: fixed;
    left: 27%;
    top: 45%;
    margin:0px auto;
    z-index: 99;
    display: none;
}
</style>