<script>
import Vue from 'vue'
import $ from 'jquery'　
import router from '../../routers';
import ParamsData from '../../js/params_data' 

function removeEvent(event) {
    event.preventDefault();
}

var ccmoduleheader = Vue.extend({
  template: `
    <div class="module_switcher">
      <div class="module_switcher_title" @click="switchModule">
        <span class="moduleName">{{params.title}}</span><span><img :src='arrowButton.icon' /></span>
      </div>
    </div>
    <div class="module_poper">
      <div class="module_poper_content">
        
        <div class="switcher_item item-{$index}}" v-for="moduleitem in params" @click="switchModulename(moduleitem.indexName,moduleitem.indexNo,moduleitem.identify,moduleitem.unit,moduleitem.drillDown)">{{moduleitem.indexName}}</div>

      </div> 
      <div class="module_poper_bg">
      </div>
      <div class="module_poper_blur" @click="switchModule">
      </div>  
    </div>
  `,
  data: function() {
    return { 
      arrowButton: {icon: require('../../assets/images/arrow_bottom_white.png'), link: ''},
      moduleTitleArray: []
    }
  },
  methods: {
    switchModule: function() { 
      var modulePoper = $(".module_poper");
      //显示切换指标模块
      if(modulePoper.is(":hidden")) {
        $("body").css('position', 'fixed');
        $('body').animate({scrollTop: '0px'}, 300);

        $(".module_poper_blur").get(0).addEventListener('touchmove', removeEvent, false);
        // window.addEventListener('scroll', this.handleScroll, false);

        // $(".module_poper_blur").css('overflow-y', 'hidden');
        // $("body").css('overflow-y', 'hidden');

        modulePoper.fadeIn(500);
        
      }
      else {
        $("body").css('position', 'relative');
        $(".module_poper_blur").get(0).removeEventListener('touchmove', removeEvent, false);
        window.removeEventListener('scroll', this.handleScroll);

        modulePoper.fadeOut(500);
      }

      $(".switcher_item:last").addClass("switcher_item_bottom");
      
    },
    switchModulename: function(indexName,indexNo,identify,indexUnit,drillDown) {
      if (drillDown == null || drillDown == '') {
        drillDown = 0;
      };

      console.log(indexName,indexNo,identify,drillDown);
      var moduleitem = indexName;
      $("body").css('position', 'relative');
      $(".module_poper_blur").get(0).removeEventListener('touchmove', removeEvent, false);
      window.removeEventListener('scroll', this.handleScroll);
      var paramDate = document.getElementById("calendar").innerHTML;

      var moduleTitleWidth = parseInt($(".module_switcher_title").css('width'))*0.7;
      var moduleTitleFont = parseInt($(".module_switcher_title").css('font-size'));
      var mouduleTitleCount = parseInt(moduleTitleWidth/moduleTitleFont);
      var indexNameTitle;
      if (indexName.length>mouduleTitleCount) {
        indexNameTitle = indexName.substring(0,mouduleTitleCount) + '...';
        $(".moduleName").html(indexNameTitle);
      }
      else {
        $(".moduleName").html(indexName);
      }

      var nameTitleWidth = parseInt($(".name").css('width'));
      var nameFont = parseInt($(".name").css('font-size'));
      var nameCount = parseInt(nameTitleWidth/nameFont);
      console.log(nameCount);
      var indexNameSubTitle;
      // if (indexName.length>nameCount) {
      //   indexNameSubTitle = indexName.substring(0,mouduleTitleCount) + '...';
      //   $(".name").html(indexNameSubTitle);
      // }
      // else {
        $(".name").html(indexName);
      // }

      var modulePoper = $(".module_poper");
      modulePoper.fadeOut(500);

      // getDetailRequestData(indexNo, date, this.downImg, this.upImg);

      // this.callback.data(indexNo, paramDate);
      console.log(indexName);
      //判断指标是日度指标还是月度指标还是季度指标若identity什么也没有需要赋值为null否则路由无法跳转
      if (!identify) {
        // alert('identify为空');
        identify = null;
      }
      this.callback.chart(indexNo, indexName, paramDate, identify, indexUnit, drillDown);
      //子组件向父组件传值
      this.$emit('change',indexNo,indexName,paramDate,identify,indexUnit);

      // callback();
      // console.log(     );
      // console.log(this.callback.chart);

    }
  },
  props: [
    'params',
    'callback'
  ],
  created() {
    // console.log('moduleCreate');
    // var url = ParamsData.method().getSearchIndexList();
    // $.post(url, null, (result)=> {
    //   console.log(result);
    //   this.moduleTitleArray = result[0].retBody;
    //   console.log(this.moduleTitleArray);
    // }, 'json');
  },
  ready () {
    // console.log(this.switchModule);
    // this.switchModule();
    console.log(this.params);
    var windowHeight = document.documentElement.clientHeight;
    $("body").css('position', 'relative');
    window.removeEventListener('scroll', this.handleScroll, false);
    $('body').animate({scrollTop: '0px'}, 0);
    $('.module_poper_content').css('height',windowHeight *0.6);
    // var arrowTop = $(".module_switcher_title").height() / 3;
    // $(".module_switcher_title img").css("top", arrowTop);
    // alert($(".module_switcher_title").height());
    // alert(arrowTop);
    // var curTitle = $(".moduleName").text().trim().substring(0, 6);
    // $(".moduleName").text(curTitle);
    // $(".name").text(curTitle);

    // var width = document.documentElement.clientWidth;
    // var height = document.documentElement.clientHeight;
    // $("body").css("height", height);
    console.log(this.moduleTitleArray);
  }
});

Vue.component('ccmoduleheader', ccmoduleheader);

export default {
  data () {
    return {
      
    }
  }
}
</script>

<style>
  .module_poper {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
  }

  .module_poper {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/bg_black.png');
    background-size: 100% 100%;
    z-index: 9;
  }

  .module_poper_blur {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/blur.png');
    background-size: 100% 100%;
    z-index: 10;
  }

  .module_poper_content {
    position: absolute;
    top: 74px;
    left: 0;
    width: 84%;
    height: 50%;
    margin: 0 8%;
    background-color: #398490;
    border-radius: 4%;
    padding: 6% 0;
    z-index: 11;
    overflow-y: auto;
  }

  .module_poper_content .switcher_item {
    color: #ffffff;
    border-top: 1px solid #73a4ad;
    margin: 0 10%;
    width: 80%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    /*文本超出部分隐藏显示...*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .switcher_item_bottom {
    border-bottom: 1px solid #73a4ad;
  }
</style>