<template>
  
  <div id="home_header" class="header">
    <ccheader></ccheader>
  </div>

  <div class="cellContainer">
    <!-- <div class="cell_content" v-touch:swipeup="dragUp($event)" v-touch:swipedown="dragDown($event)"> -->
    <div class="cell_content">
      <!-- <div> -->
      <!-- <div class="cellIndex_list item-{{$index}}" v-dragable-for="item in homeList"> -->
      <div class="cellIndex_list item-{{$index}}" v-for="item in homeList">
        <div class="cancelAttention">
          <div class="cancelAttentionDiv" @click="cancelAttentionButton($event,$index,item.indexNo)">
            删除
          </div>
          <div class="stickTop" @click="attentionTopButton($event,$index,item.indexNo,item.topStatus)">
            {{item.topMsg}}
          </div>
        </div>
        
        <div id="touchDiv"></div> 
        <div class="cellList cell-{{$index}}" v-touch:swipeleft="showCancelAttention($event,$index,1)" v-touch:swiperight="hideCancelAttention($event,$index,-1)">
          <div :class="{cellDouble: $index % 2 == 0,cellSingle: $index % 2 == 1}">
          <a @click="onSelected(item.indexName, item.indexNo, 1, item.status, item.identify, item.drillDown,orgHomeList[$index].unit)" href='javascript:void(0);' :class="{active: activePoint == item.indexNo}">
            <div class="cellSubTitle">
              <div class="cellSubTitleImg">
                <img :src="item.icon" />
              </div>      
              <div class="homeCellSubTitleNum_name">{{item.indexName}}</div>
            </div>
            <div class="pointValueArea" v-show="item.runMemo == null || item.runMemo == ''">
              <div class="pointValue">
                <div class="cellPointValue customFont">
                  {{item.value}}
                </div>
              </div>
              <div class="cellUnit">
                <div class="unitDiv">
                  {{item.unit}}
                </div>        
              </div>
            </div>
            <div class="pointValueSue" v-show="item.runMemo != null && item.runMemo != ''">
              {{item.runMemo}}
              <!-- 一下是预警图标 -->
              <!-- <div class="cellSubTitleImg2">
                  <img v-if="warningEarly" :src="warning_red" />
                  <img v-else :src="warning_yellow" />
              </div> -->
            </div>
            
          </a>
          </div>
        </div>
      </div>

      <div class="home_addButton">
        <a @click="toSearch($event)">
          <div class="home_addButtonTouchDiv">
            <img :src="addButton.icon" />
            <div class="fontSize4">{{addButton.title}}</div>
          </div>
        </a>
      </div>

    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import router from 'src/routers';
import Params from 'src/routersParam'
import ParamsData from 'src/js/params_data'
import $ from 'jquery'
import Header from './Common/Header'
import CommonJs from './Common/CommonJs'
import CommonIndicator from './Common/CommonIndicator'
// import VueDraggable from 'vuedraggable'

// import Footer from './Common/Footer'
// import searchController from '../components/searchController'

var vueTouch = require('vue-touch')
vueTouch.config = {"swipe":{ direction: 'horizontal' }};
Vue.use(vueTouch)
// Vue.use(VueDraggable)

var currentSwipe;
var count = 0;
var currentClassName;
// var homeList = [];

document.addEventListener('dragstart',function(event){
  // console.log(event);
});

export default {
  name: 'Home',
  data () {
    return {
      homeList: [],
      orgHomeList: [],
      warning_red:require('../assets/images/warning_red.png'),
      warning_yellow:require('../assets/images/warning_yellow.png'),
      addButton: {
        title:'添加关注', icon: require('../assets/images/plus_green.png')
      },

      activePoint: ''
    }
  },
  //计算属性
  computed: {

  },
  watch: {
    'homeList': function () {
        // console.log('Collection updated!');
    },
  },
  props:{
    data:['0022','0011','0008','0045']
  },
  // route:{
  //   data: function() {
  //     console.log('route');
  //     var url = 'http://redmooncn.cn:8080/board-web/bdHomePageInfo/queryHomePage.do'
  //     var urlData = {userNo:window.localStorage.userid,currency:'CN',date:20160331};
  //     var homeArray = [];
  //       $.post(url,urlData,function(result){
  //         console.log(result);
  //         console.log(result[0].retBody);
  //         console.log(this.homeList);
  //         this.homeList = result[0].retBody;
  //         console.log(this.homeList);
  //         console.log(this.homeList.length);
  //         resetCss();
  //       },'json');      
  //   },
  //   waitForData: true,
  // },
  //在实例开始初始化时同步调用。此时数据观测、事件和 watcher 都尚未初始化
  init() {
    // console.log('init');
  },
  //在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。但是还没有开始 DOM 编译，$el 还不存在
  created() {
    // console.log('created');

  },
  //在编译开始前调用
  beforeCompile() {
    // console.log('beforeCompile');
  },
  //在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新。但是不担保 $el 已插入文档
  compiled() {
    // console.log('compiled');
  },
  methods: {
    removeEvent(event) {
        event.preventDefault();
    },
    resetCss() {
      // console.log('resetCss');
      // var singleColor = "#4b5765";
      // var doubleColor = "#3d4a5b";

      var singleColor = "#455161";
      var doubleColor = "#354254";

      var cellList = $(".cellList");
      
      if (cellList.length % 2 == 0) {
        $(".home_addButton").css('background',singleColor);
      }
      else {
        $(".home_addButton").css('background',doubleColor);
      }

      //获取当前设备屏幕窗口的高宽
      var viewHeight = document.documentElement.clientHeight;
      // console.log(viewHeight);

      var viewWidth = document.documentElement.clientWidth;
      // console.log(viewWidth);

      //首页cell左右上外边距(用百分比计算以适配不同尺寸web)
      var homeCellMarginLeft = viewWidth * 0.0;
      var homeCellMarginRight = viewWidth * 0.0;
      var homeCellMarginTop = viewWidth * 0.0;
      // console.log('homeMarginLeft',homeCellMarginLeft);
      // console.log('homeMarginRight',homeCellMarginRight);


      //首页cell宽高
      var homeCellWidth = viewWidth - homeCellMarginLeft - homeCellMarginRight;
      var homeCellHeight = viewWidth * (7/24);
      // console.log('homeCellWidth',homeCellWidth);
      // console.log('homeCellHeight',homeCellHeight);

      //关注高度
      $(".home_addButton").css('height',homeCellHeight);
      //
      $(".cellIndex_list").css('height',homeCellHeight);
      // $(".cellIndex_list").css('marginTop',homeCellMarginTop);
      // $(".cellIndex_list").css('marginLeft',homeCellMarginLeft);
      // $(".cellIndex_list").css('marginRight',homeCellMarginRight);

      //
      $(".cellSubTitle").css('width',homeCellHeight);

      //图片尺寸
      var cellSubTitleImgWidth = homeCellHeight * (4/12);
      // console.log('图片尺寸',cellSubTitleImgWidth);
      // $(".cellIndex_list img").css('width',cellSubTitleImgWidth);
      $(".cellIndex_list img").css('height',cellSubTitleImgWidth);
      var cellSubTitleImgHeight = homeCellHeight * (5.5/10);
      $(".cellSubTitleImg").css('height',cellSubTitleImgHeight);

      //指标点名称元素高度
      var homeCellSubTitleNum_nameHeight = homeCellHeight * (4.5/10) ;
      //指标点名称字体大小
      var homeCellSubTitleNum_nameFontSize = homeCellSubTitleNum_nameHeight/3.2;

      $(".homeCellSubTitleNum_name").each(function() {
        var titleContent = $(this).text();
        if(titleContent.length >= 14) {
          var homeCellSubTitleNum_nameFontSizeAdjust = homeCellSubTitleNum_nameHeight/3.6;
          $(this).css('font-size',homeCellSubTitleNum_nameFontSizeAdjust);
        }
        else if(titleContent.length >=17) {
          var homeCellSubTitleNum_nameFontSizeAdjust = homeCellSubTitleNum_nameHeight/3.8;
          $(this).css('font-size',homeCellSubTitleNum_nameFontSizeAdjust);
        }
        else {
          $(this).css('font-size',homeCellSubTitleNum_nameFontSize);
        }
      });
     

      
      // console.log($(".homeCellSubTitleNum_name").css('width'));
      // console.log($(".homeCellSubTitleNum_name").css('font-size'));


      var cellTitleTextCount = parseInt(parseFloat($(".homeCellSubTitleNum_name").css('width'))/parseFloat($(".homeCellSubTitleNum_name").css('font-size')));
      // console.log(cellTitleTextCount);

      //单位宽度
      var cellUnitWidth = homeCellHeight * 0.5;
      $(".cellUnit").css('width',cellUnitWidth);
      //单位字体大小
      var cellUnitFontSize = cellUnitWidth/4 + 'px';
      // console.log(cellUnitFontSize);
      $(".unitDiv").css('font-size',cellUnitFontSize);
      //指标点值宽度
      var pointValueWidth = homeCellWidth - homeCellHeight - cellUnitWidth;
      $(".pointValue").css('width',pointValueWidth); 

      
      //平台兼容性处理
      if(ParamsData.method().getMobileSystem() != 1) {
        //指标点值设置行高居中
        var fontOffsetH = 0;
        var valueLineHeight = (homeCellHeight-fontOffsetH)+'px';
        $(".cellPointValue").css('margin-top',fontOffsetH);
        $(".cellPointValue").css('height',valueLineHeight);
        $(".cellPointValue").css('line-height',valueLineHeight);

        $(".cellSubTitleImg2 img").css("height", '15px');
        $(".cellSubTitleImg2 img").css("width", '15px');

        //指标点值得字体大小
        var valueFontSize = homeCellHeight/1.9;
        $(".cellPointValue").css('font-size',valueFontSize);        
      }
      else {
        //指标点值设置行高居中
        var fontOffsetH = 12;
        var valueLineHeight = (homeCellHeight-fontOffsetH)+'px';
        $(".cellPointValue").css('margin-top',fontOffsetH);
        $(".cellPointValue").css('height',valueLineHeight);
        $(".cellPointValue").css('line-height',valueLineHeight);


        $(".cellSubTitleImg2 img").css("height", '15px');
        $(".cellSubTitleImg2 img").css("width", '15px');
        //指标点值得字体大小
        var valueFontSize = homeCellHeight/2;
        $(".cellPointValue").css('font-size',valueFontSize);    
      }

      var cellHeight = $(".cellList").height();
      $(".pointValueSue").css('line-height', cellHeight + "px");    
      $(".pointValueSue").css('font-size',valueFontSize/3);    
    
      //单位
      // $(".unitDiv").css('line-height',valueLineHeight);
      var z = $(".cellIndex_list").css('z-index');
      // console.log(z);

  
      //取消关注按钮
      $(".cancelAttention").css('height',homeCellHeight);
      $(".cancelAttentionDiv").css('width',homeCellHeight);
      $(".stickTop").css('width',homeCellHeight);
      // $(".cancelAttentionDiv").css('height',homeCellHeight);
      var cancelAttentionDivLineHeight = homeCellHeight+'px';
      // console.log('cancelAttentionDivLineHeight',cancelAttentionDivLineHeight);
      $(".cancelAttentionDiv").css('line-height',cancelAttentionDivLineHeight);
      $(".stickTop").css('line-height',cancelAttentionDivLineHeight);
      var cancelAttentionFontSize = homeCellHeight/4.5;
      $(".cancelAttentionDiv").css('font-size',22);
      //重设图片居中
      var imgHeight = $(".home_addButtonTouchDiv img").height();
      var fontHeight = $(".home_addButtonTouchDiv div").height();
      var imgTop = (homeCellHeight - imgHeight - fontHeight)/2;
      $(".home_addButtonTouchDiv img").css('padding-top', imgTop);    
    },
    //请求数据赋值给homeList
    fetchData () {
      var url = ParamsData.method().queryHomePage();
      var homeData = {userNo:window.localStorage.userid,currency:'CN'};
      $(".module_poper_timer").fadeIn();
      var topOrCancelTop = "";

      $.post(url,homeData,(result)=>{
        console.log(url);
        console.log(homeData);
        // console.log(result);
        // console.log(result[0].retBody);
        var homeArray = ParamsData.method().deepClone(result[0].retBody);
        this.orgHomeList = result[0].retBody;
        // console.log(homeArray);
        // console.log(this.orgHomeList);
        // var rateIndexNoArray = ParamsData.data().rateIndexNoArray;
        for (var i = homeArray.length - 1; i >= 0; i--) {
          // console.log(homeArray[i].value);
          
          if (homeArray[i].value == 0) {
            homeArray[i].value = '0.00';
          }
          else {
            // console.log(homeArray[i].value);
            // homeArray[i].value = parseFloat(homeArray[i].value);
            // console.log(homeArray[i].value);
            // homeArray[i].value = Math.round(homeArray[i].value*100)/100;
            // console.log(homeArray[i].value);
            // homeArray[i].value = ParamsData.method().subTwoDecimal(homeArray[i].value);
            homeArray[i].value = parseFloat(homeArray[i].value);
            homeArray[i].value = homeArray[i].value.toFixed(2);
            // console.log(homeArray[i].value);
          }
          
          if (homeArray[i].unit == '亿') {
            homeArray[i].unit = ' / ' + homeArray[i].unit;
          }
          else if (homeArray[i].unit == '%') {
            homeArray[i].unit = '　%';
          }
          else if (homeArray[i].unit == '人') {
            homeArray[i].unit = ' / ' + homeArray[i].unit;
            if (homeArray[i].value.length == 0) {
              homeArray[i].value = 0;
            }
            homeArray[i].value = parseInt(homeArray[i].value);
          }
          else if (homeArray[i].unit == '张') {
            homeArray[i].unit = ' / ' + homeArray[i].unit;
            if (homeArray[i].value.length == 0) {
              homeArray[i].value = 0;
            }
            homeArray[i].value = parseInt(homeArray[i].value);
          }
          else if (homeArray[i].unit == '万张') {
            homeArray[i].unit = ' / ' + homeArray[i].unit;
          }
          else if (homeArray[i].unit == '万') {
            homeArray[i].unit = ' / ' + homeArray[i].unit;
          }
          else if (homeArray[i].unit == '万人') {
            homeArray[i].unit = ' / ' + homeArray[i].unit;
          }
          else if (homeArray[i].unit == '户') {
            homeArray[i].unit = ' / ' + homeArray[i].unit;
            if (homeArray[i].value.length == 0) {
              homeArray[i].value = 0;
            }
            homeArray[i].value = parseInt(homeArray[i].value);
          }
          topOrCancelTop = homeArray[i].topStatus == 0?"置顶":"取消置顶";
          homeArray[i].topMsg = topOrCancelTop;
        }
     

        this.homeList = homeArray;

        setTimeout(() => {
          this.resetCss(); 
          $(".module_poper_timer").fadeOut();         
        }, 10);
        
        this.getModuleHeaderData();
        
      },'json');
      // console.log('fetchData');
    },
    getModuleHeaderData: function(){
        //获取客户端设备DOM宽高
        // var width = document.documentElement.clientWidth;
        // var height = document.documentElement.clientHeight;
        
        // var data = ParamsData.method().getModuleHeaderParams();

        // if(data.length == 0) {
        //   var url = ParamsData.method().getSearchIndexList();
        //   var params = {userNo:window.localStorage.userid};
        //   $.post(url,params,function(result){
        //     var pointArray = result[0].retBody;  
        //     var allPointNameArray = [];
        //     for (var i = pointArray.length - 1; i >= 0; i--) {
        //       // if (pointArray[i].indexName.length>textCount) {
        //       //   pointArray[i].indexName = pointArray[i].indexName.substring(0,textCount) + '...';
        //       // }
        //        allPointNameArray.push(pointArray[i]);
        //     }
        //     allPointNameArray.reverse();
        //     ParamsData.method().setModuleHeaderParams(allPointNameArray);
        //   }, 'json');
        // } 
    },
    onSelected: function(name,indexNo,attentionState,status,identify,drillDown,unit) {
      this.activePoint = indexNo;
      // console.log(this.activePoint,identify);
      console.log(drillDown);
      //判断如果下钻字段为空或为空字符串赋值0
      if (drillDown == null || drillDown == '') {
        drillDown = 0;
      };
      console.log(drillDown);

      //点击跳转前判断当前是否有左滑显示置顶删除按钮有则先left:0
      if (count != 0) {
        $(currentClassName).animate({left:0});
        count = 0;
      }
      else {
        // $(".module_poper_timer").fadeIn();
        // var detailType = ParamsData.method().getDetailChartType(indexNo);
        // console.log(indexNo);

        var backName = '首页';
        var firstBackName = '';
        var authorityNo = 0;
        var hiddenModuleSwitch = false;
        /*
        机构级别
         */
        var orgLevel = 0;

        //用户登录接口返回当前登录用户所在机构号，根据机构号查询详情
        var orgNo = window.localStorage.orgNo;
        var indexUnit;
        // if (unit.indexOf('%') != -1) {
          indexUnit = unit;
        // }
        // else {
        //   indexUnit = null;
        // }

        router.go({name:'index_assets',
          params:{
            pointName:name,   //指标名称
            pointNo:indexNo,    //指标编码
            attentionState:attentionState,    //关注状态
            status:status,
            orgNo:orgNo,    //机构编号
            backName:backName,     //导航返回标题名
            firstBackName: firstBackName,
            // authorityNo:authorityNo,   //权限编码
            hiddenModuleSwitch: hiddenModuleSwitch,
            orgLevel: orgLevel,
            identify: identify,
            drillDown: drillDown,
            unit: indexUnit,
            cascFlag: 0
          }});
      }
    },
    dragUp: function(event) {
      // console.log(event);
    },
    dragDown: function(event) {
      // console.log(event);
    },
    //左滑显示取消关注按钮
    showCancelAttention: function(event,index) {
      event.preventDefault=true; 
      count = count + 1;
      if (count == 1) {
        currentClassName = '.cell-'+index;
        var w = $(currentClassName).css("width");
        currentSwipe = index;
        //向左滑动显示取消关注
        var toLeft = $(".cellSubTitle").css('width');
        toLeft = '-'+parseFloat(toLeft)*2+'px';
        $(currentClassName).animate({left:toLeft});
      }
      else if (count > 1) {
        if (currentSwipe == index) {
          //滑动恢复正常
          $(currentClassName).animate({left:0});
          count = 0;
        }
        else {
          $(currentClassName).animate({left:0});
          count = 0;
        }
      }
    },
    //右滑隐藏取消关注按钮
    hideCancelAttention: function() {
      $(currentClassName).animate({left:0});
      count = 0;
    },
    //点击取消关注
    cancelAttentionButton: function(event,index,indexNo) {
      //发送请求取消关注closeAttentionUrl
      var url = ParamsData.method().getCloseAttentionUrl();
      var data = {userNo:window.localStorage.userid,indexNos:indexNo};    //key/value参数
      $.post(url,data,(result)=>{
        $("#prompt").text('取消关注成功')
        $("#prompt").fadeIn();
        setTimeout(()=>{
           $("#prompt").fadeOut();
        },1000)

        // var _this = this;
        // this.requestData(_this);
        this.fetchData();
        $(".cellContent").hide();
        setTimeout(() => {
              $(".cellContent").show();
              this.resetCss();    

          }, 0)
        count = 0;
      },'json');
    },
    //置顶或着取消置顶
    attentionTopButton: function(event,index,indexNo,topStatus) {
      // console.log(event,index,indexNo);
      // console.log(topStatus);
      var url = ParamsData.method().getStickTop();
      // console.log('置顶接口url',url);
      // var params = {userNo:window.localStorage.userid,indexNo:indexNo,top:'T',currency:'CN'};
      var params = topStatus == 0?{userNo:window.localStorage.userid,indexNo:indexNo,top:'T',currency:'CN'}:{userNo:window.localStorage.userid,indexNo:indexNo,top:'0',currency:'CN'};
      $.post(url, params, (result)=> {
        // console.log(result);
        this.fetchData();
        $(".cellContent").hide();
        setTimeout(() => {
              $(".cellContent").show();
              this.resetCss();    

          }, 0)
        count = 0;
      }, 'json');
    },
    toSearch: function($event) {
      router.go({ name: 'index_column'});
    },
  },
  attached () {
    // console.log('attached');
  },
  detached() {
    // console.log('detached');
  },
  beforeDestroy() {
    // console.log('beforeDestroy');
  },
  destroyed() {
    // console.log('destroyed');
  },
  ready() {
    // $(".cellIndex_list").hide();
    // console.log('ready');
    this.fetchData();


    var state = ParamsData.method().getAttentionState();
    // ParamsData.method().setAttentionState(2);

    if (state == 1) {
     
      $("#prompt").text('关注成功')
      $("#prompt").fadeIn();
      setTimeout(()=>{
        $("#prompt").fadeOut();
      },1000)
      ParamsData.method().setAttentionState(0);
    }
    else{

    }
  
    document.body.removeEventListener('touchmove', this.removeEvent);

    // var startX;
    // var startY;
    // var moveEndX;
    // var moveEndY;
    // $(".cellList").on("touchstart", function(e) {
    //    e.stopPropagation();//e.preventDefault();
    //    startX = e.originalEvent.changedTouches[0].pageX,
    //    startY = e.originalEvent.changedTouches[0].pageY;

    // }),
    // $(".cellList").on("touchmove", function(e) {
    //    e.stopPropagation();//e.preventDefault();
    //    moveEndX = e.originalEvent.changedTouches[0].pageX,
    //    moveEndY = e.originalEvent.changedTouches[0].pageY;
    //    var X = moveEndX - startX;
    //    var Y = moveEndY - startY;
    //    if ( X > 0 ) {
    //       console.log('向右滑动');
    //       console.log(e.currentTarget);
    //       var curritId = e.currentTarget.id;
    //       $("#"+curritId).animate({"right":"0px"});
    //    }
    //    else {
    //       console.log('向左滑动');
    //       var curritId = e.currentTarget.id;
    //       $("#"+curritId).animate({"right":"100px"});
    //    }
    //     // else if ( Y > 0) {
    //     //   console.log('向下滑动')
    //     // }
    //     //  else if ( Y < 0 ) {
    //     //      console.log('向上滑动')
    //     //  }
    //     //  else{
     
    //     //   }

    // });
    
      // new Vue({
      //   el: '#home_header'
      // });
      
      // $(".cctitle").text('首页');
      // console.log(DIGI);
      // console.log(HomeCss);
      // console.log(this.homeList[0]);
      // console.log(VueTouch.config);
      // var _this = this;
      // this.requestData(_this);
    $(".cctitle").text(ParamsData.method().getAppTitle());
    // $(".cellIndex_list").show();

    // resetCss();
  }
}

//左->右滑动显示
$.fn.slideLeftToRightShow = function(speed, callback) {
  this.animate({
    width: "show",
    paddingRight: "show",
    paddingLeft: "show",
    marginRight: "show",
    marginLeft: "show",
    left: 0
  }, speed, callback);
}

//右->左滑动隐藏
$.fn.slideRightToLeftHide = function(speed, callback) {
  this.animate({
    width: "hide",
    paddingLeft: "hide",
    paddingRight: "hide",
    marginLeft: "hide",
    marginRight: "hide",
    left: 0
  }, speed, callback);
}



//左->右滑动隐藏
$.fn.slideLeftToRightHide = function(speed, callback) {
  this.animate({
    width: "hide",
    paddingRight: "hide",
    paddingLeft: "hide",
    marginRight: "hide",
    marginLeft: "hide",
    right: 0
  }, speed, callback);
}

//右->左滑动显示
$.fn.slideRightToLeftShow = function(speed, callback) {
  this.animate({
    width: "show",
    paddingLeft: "show",
    paddingRight: "show",
    marginLeft: "show",
    marginRight: "show",
    right: 0
  }, speed, callback);
}

//下->上滑动隐藏
$.fn.slideDownToUpHide = function(speed, callback) {
  this.animate({
    'margin-top': -moduleHeight
  }, speed, callback);
}

//上->下滑动显示
$.fn.slideUpToDownShow = function(speed, callback) {
  this.animate({
    'margin-top': moduleHeight
  }, speed, callback);
}
</script>

<style type="text/css">
.active {
  background: #ff0000;
}

/*.cellDouble {
  height: 100%;
  background: #4b5765;
}

.cellSingle {
  height: 100%;
  background: #3d4a5b;
}*/

.cellDouble {
  height: 100%;
  background: #455161;
}

.cellSingle {
  height: 100%;
  background: #354254;
}
.cellSubTitleImg2{
  width: 10%;
  height: 100%;
  text-align: right;
  vertical-align: middle;
  float: right;
  position: relative;
}
.cellSubTitleImg2 img{
  position: absolute;
}


</style>
