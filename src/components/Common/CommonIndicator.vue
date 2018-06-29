<script>
import Vue from 'vue'
import $ from 'jquery'

var commonindicator = Vue.extend({
  template: `
    <div class="module_poper_timer">
      <div class="timer"></div>
    </div>
  `,
  data: function() {
    return { 
      

    }
  },
  methods: {
    
  },

  ready () {
    var windowWith = document.documentElement.clientWidth;
    var windowHight = document.documentElement.clientHeight;
   

     
    $(".timer").css('top',(windowHight- 120)/2 + 'px');
     $(".timer").css('left',(windowWith- 50)/2 + 'px');


  }
});

Vue.component('commonindicator', commonindicator);

export default {
  data () {
    return {
      
    }
  }
}
</script>
<style>
/* Timer*/
.timer{
    top: 5px;
    left: 45%;
    width: 50px;
    height: 50px;
    background-color: transparent;
    box-shadow: inset 0px 0px 0px 2px #fff;
    border-radius: 50%;
    position: absolute;
    margin: 38px auto;/* Not necessary- its only for layouting*/
    z-index: 111;
 }
.timer:after, .timer:before{
    position: absolute;
    content:"";
    background-color: #fff;
}
.timer:after{
    width: 23px;
    height: 2px;
    top: 25px;
    left: 1px;
    -webkit-transform-origin: 24px 1px;
       -moz-transform-origin: 24px 1px;
            transform-origin: 24px 1px;
    -webkit-animation: minhand 2s linear infinite;
       -moz-animation: minhand 2s linear infinite;
            animation: minhand 2s linear infinite;
}
 .module_poper_timer {
    position: absolute;
    top:0px;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    display: none;
    z-index: 1111;
    pointer-events:none;
  }

.timer:before{
    width: 18px;
    height: 2px;
    top: 25px;
    left: 8px;
    -webkit-transform-origin: 18px 1px;
       -moz-transform-origin: 18px 1px;
            transform-origin: 18px 1px;
    -webkit-animation: hrhand 8s linear infinite;
       -moz-animation: hrhand 8s linear infinite;
            animation: hrhand 8s linear infinite;
}

@-webkit-keyframes minhand{
    0%{-webkit-transform:rotate(0deg)}
    100%{-webkit-transform:rotate(360deg)}
}
@-moz-keyframes minhand{
    0%{-moz-transform:rotate(0deg)}
    100%{-moz-transform:rotate(360deg)}
}
@keyframes minhand{
    0%{transform:rotate(0deg)}
    100%{transform:rotate(360deg)}
}

@-webkit-keyframes hrhand{
    0%{-webkit-transform:rotate(0deg)}
    100%{-webkit-transform:rotate(360deg)}
}
@-moz-keyframes hrhand{
    0%{-moz-transform:rotate(0deg)}
    100%{-moz-transform:rotate(360deg)}
}
@keyframes hrhand{
    0%{transform:rotate(0deg)}
    100%{transform:rotate(360deg)}
}

</style>