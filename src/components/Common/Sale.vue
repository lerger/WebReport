<script>
import Vue from 'vue'
import $ from 'jquery'

var sale = Vue.extend({
  template: `
  <div class="salesBorder">
    <div class="sales" v-for="item in params">
      <div class="saleSubTitle">
        <div class="saleName">{{item.name}}</div>
        <div class="saleValue customFont">{{item.value}}</div>
      </div>
      <div class="saleRate">
        <div class="saleRadiusDiv item-{{$index}}">
        </div>
      </div>
    </div>
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
    var saleColorArray = ['#32ffff', '#ffaaf0'];
    var saleRadiusDiv = $(".saleRadiusDiv");
    console.log(this.params.name);
    console.log(saleRadiusDiv);
    for (var i = 0; i < saleRadiusDiv.length; i++) {
      if (typeof(this.params[i].rate) == 'undefined') {
        console.log(this.params[i].rate,this.params[i].color);
        saleRadiusDiv[i].style.width = '0%';
        saleRadiusDiv[i].style.background = saleColorArray[i];
      }
      else {
        saleRadiusDiv[i].style.width = this.params[i].rate;
        saleRadiusDiv[i].style.background = saleColorArray[i];
        console.log(this.params[i].rate);
      }
    }
  }
});

Vue.component('sale', sale);

export default {
  data () {
    return {
      
    }
  }
}

</script>

<style type="text/css">
.salesBorder {
  border-bottom:0.5px solid #737c88;
}

.sales {
  /*border-top:0.5px solid #4d5766;*/
  /*border-bottom:0.5px solid #737c88;*/
  width:100%;
  height:35px;
  margin-top: 4%;
  margin-bottom: 4%;
  font-size: 14px;
  text-align:center;
  /*background-color:#384355;*/
  position:relative;
}

.saleSubTitle {
  float: left;
  margin-left: 8px;
  width: 20%;
  height: 100%;
}

.saleRate {
  float: left;
  width: 75%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.saleRadiusDiv {
  /*position: absolute;*/
  /*text-align: center;*/
  /*width: 70%;*/
  /*margin-top: 10%;*/
  height: 100%;
  widows: 0%;
  line-height: 100%;
  /*margin:3% 5% 0;*/
  border-radius: 7px;
  background-color: #32ffff;
  /*-webkit-tap-highlight-color: rgba(255, 255, 255, 0);*/
}

.secondSaleRadiusDiv {
  height: 100%;
  line-height: 100%;
  /*margin:3% 5% 0;*/
  border-radius: 7px;
  background-color: #32ffff;
}

.saleName {
  height: 50%;
  text-align: left;
  padding-bottom: 4%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.saleValue {
  height: 50%;
  text-align: left;
}

.item-0 {
  background: #32ffff;
}

.item-1 {
  background: #ffaaf0;
}
</style>