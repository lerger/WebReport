<script>
import Vue from 'vue'
import $ from 'jquery'

var salecomposition = Vue.extend({
  template: `
  <div v-for="item in params">
    <div class="onlineSale">
      <div class="legend item-{{$index}}">
        <div v-bind:class="lengthColor"></div>
      </div>
      <div class="onlineSaleName">{{item.name}}</div>
      <div class="onlineSaleRate customFont">{{item.rate}}</div>
      <div class="onlineSaleValue customFont">{{item.value}}</div>
      
    </div>
  </div>
  `,
  data: function() {
    return { 

      // backButton: {icon: require('../../assets/images/back.png'), link: 'home'},
      // commonrightbutton: {icon: require('../../assets/images/threebar.png'), link: ''}
      // onlineSaleList: [{color:'#ffd687', name:'线上销售一', value:'0.00', rate:'0.00%'}, {color:'#87ffb7', name:'线上销售二', value:'0.00', rate:'0.00%'}, {color:'#87b7ff', name:'线上销售三', value:'0.00', rate:'0.00%'}, {color:'#9287ff', name:'线上销售四', value:'0.00', rate:'0.00%'}, {color:'#ff8787', name:'线上销售五', value:'0.00', rate:'0.00%'}]
      // lengthColor: 'ggkb',
    }
  },
  // computed: {
  //   lengthColor: function(index){
  //     console.log(index);
  //     return {
  //       'ggkb-orange': true,
  //       'ggkb-large': true
  //     }
  //   }
  // },
  methods: {
    
    // back: function() {
    //   history.go(-1);
    // }
  },
  props: [
    'params'
  ],
  init() {
    console.log('SaleCompositionInit',document.querySelector(".onlineSale"));
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    console.log(width,height);
  },
  created() {
    console.log('SaleCompositionCreate',document.querySelector(".onlineSale"));
    this.onlineSaleList = this.params;
  },
  ready () {
    // $(".timer").fadeOut();
    // $(".legend").css('background-color',this.params.color);
    console.log('SaleCompositionReady',document.querySelector(".onlineSale"));
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var onlineSaleHeight = (height - 64)*(100/1330);
    $(".onlineSale").css('height',onlineSaleHeight);
    $(".onlineSaleName").css('line-height',onlineSaleHeight+'px');
    $(".onlineSaleValue").css('line-height',onlineSaleHeight+'px');
    $(".onlineSaleRate").css('line-height',onlineSaleHeight+'px');
    var legend = $(".legend");
    for (var i = 0; i < legend.length; i++) {
      console.log(this.params[i].color);
      legend[i].style.background = this.params[i].color;
    }
  }
});

Vue.component('salecomposition', salecomposition);

export default {
  data () {
    return {
      
    }
  }
}

</script>

<style type="text/css">
.onlineSale {
  border-bottom:0.5px solid #4d5766;
  width:100%;
  height:40px;
  padding-top: 1.5%;
  padding-bottom: 1.5%;
  /*text-align:center;*/
  background-color:#384355;
  /*position:relative;*/
  /*font-size: 16px;*/
}

.legend {
  float: left;
  margin-top: 3.5%;
  margin-left: 2%;
  margin-right: 2%;
  /*margin-bottom: 2%;*/
  height: 15px;
  width: 15px;
}

.onlineSaleName {
  float: left;
  width: 35%;
  height: 100%;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.onlineSaleValue {
  float: right;
  width: 22%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  /*color: #8f9baa;*/
}

.onlineSaleRate {
  float: right;
  margin-right: 3%;
  width: 30%;
  height: 100%;
  text-align: right;
  line-height: 40px;
  /*color: #8f9baa;*/
}

.ggkb {
  width: 100%;
  height: 100%;
  background: #ffd687;
}

.ggkb-orange {
  width: 100%;
  height: 100%;
  background: #ff0000;
}

.item-0{
  background: #ffd687;
}

.item-1{
  background: #87ffb7;
}

.item-2{
  background: #87b7ff;
}

.item-3{
  background: #9287ff;
}

.item-4{
  background: #ff8787;
}
</style>