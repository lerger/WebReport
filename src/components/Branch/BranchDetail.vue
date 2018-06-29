<template>
  <div id="assets_commonheader" class="header">
    <cccommonheader :params="headerParams"></cccommonheader>
  </div>
  <div id="assets_moduleheader" class="moduleheader">
    <ccmoduleheader :params="moduleHeaderParams" :callback="callback"></ccmoduleheader>
  </div>
  <div id="" class="planComplete" v-if="showPlanandChart">
    <plancomplete :params="planCompleteValue"></plancomplete>
  </div>
  <div id="dateClick" class="date_area">
    <div class="dateBorder">
      <div class="name">{{headerParams.title}}</div>
      <div class="date customFont">
        <span id="calendar">0000-00-00</span>
        <div class="calendarImgDiv">
        <img :src="calendarButton.icon" id="calendarImg">
        </div>
      </div>
    </div>
  </div>
  <div class="prompTexplain">
  </div>
  <div class="val_area" @click="goPicker($event)">
    <div id="asset_val" class="customFont" value="0.00">0.00</div>
    <h1 class="pieUnit">亿</h1>
  </div>

  <!-- 销售组件频繁的显示影藏显示v-show资源消耗更少元素存在，v-if隐藏销毁，显示创建消耗资源更大，单次或次数很少的显示与隐藏 -->
  <div v-show="showSale">
      <sale :params="salesParams"></sale>
  </div>
  <div v-show="showSalePlan">
    <plancomplete :params="salePlanParams"></plancomplete>
  </div>
  <div id="" class="planComplete" v-if="showPlanandChart">
    <plancomplete :params="CompletionRate"></plancomplete>
  </div>
  
  
  <div class="timePoint">
    <!-- 上日 -->
    <div class="beginningOfYearAndSameTime" id="previousDay">
      <div class="beginningOfYearAndSameTimeBorder">
        <div class="beginningAndSameTimeName">
          <div class="beginningOfYearName">比上日</div>
        </div>

        <div id="lastDayCompareVal" class="beginningAndSameTimeValue customFont" value="0.00">0.00</div>

        <div class="beginningAndSameTimeRate">
          <div class="beginningOfYearRateImg">
            <img id="lastDayCompareImg" :src="upImg" />
          </div>
          <div class="beginningOfYearRateValue">
            <span id="lastDayCompareRate" class="customFont" value="0.00">0.00%</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 上月 -->
    <div class="beginningOfYearAndSameTime" id="previousMonth">
      <div class="beginningOfYearAndSameTimeBorder">
        <div class="beginningAndSameTimeName">
          <div class="beginningOfYearName">比上月</div>
        </div>

        <div id="lastMonthCompareVal" class="beginningAndSameTimeValue customFont" value="0.00">0.00</div>
        
        <div class="beginningAndSameTimeRate">
          <div class="beginningOfYearRateImg">
            <img id="lastMonthCompareImg" :src="upImg" />
          </div>
          <div class="beginningOfYearRateValue">
            <span id="lastMonthCompareRate" class="customFont" value="0.00">0.00%</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 年初 -->
    <div class="beginningOfYearAndSameTime" id="Early">
      <div class="beginningOfYearAndSameTimeBorder">
        <div class="beginningAndSameTimeName">

          <div class="beginningOfYearName">比年初</div>

        </div>

        <div id="beginningYearOrLastYearCompareVal" class="beginningAndSameTimeValue customFont" value="0.00">0.00</div>
        
        <div class="beginningAndSameTimeRate">
          <div class="beginningOfYearRateImg">
            <img id="beginningYearOrLastYearCompareImg" :src="upImg" />
          </div>
          <div class="beginningOfYearRateValue">
            <span id="beginningYearOrLastYearCompareRate" class="customFont" value="0.00">0.00%</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 同期 -->
    <div class="beginningOfYearAndSameTime" id="samePeriod">
      <div class="beginningOfYearAndSameTimeBorder">
        <div class="beginningAndSameTimeName">

          <div class="beginningOfYearName">比同期</div>

        </div>

        <div id="compareSamePeriodVal" class="beginningAndSameTimeValue customFont" value="0.00">0.00</div>
        
        <div class="beginningAndSameTimeRate">
          <div class="beginningOfYearRateImg">
            <img id="compareSamePeriodImg" :src="upImg" />
          </div>
          <div class="beginningOfYearRateValue">
            <span id="compareSamePeriodRate" class="customFont" value="0.00">0.00%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="chart">
    <!-- 单位 -->
    <div class="blank"></div>
    <div class="currencyAndUnit">
      <div class="currencyUnit">
        <div class="currencyUnitDiv">
          币种：折人民币
        </div>
      </div>
      <div class="currencyUnit">
        <div class="currencyUnitDiv" id="unitId">
          单位：
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <!-- 图表 -->
    <div class="assetChartContainer">
      <div id="assetChart" class="assetChartContent"></div>
      <div id="assetXBlackBg" class="xBlackBg">
        <div id="monthUpperId" class="xAxisDivUper"></div>
      </div>

    </div>
  </div>

  <!-- 环形图组件 -->
  <div>
    <!-- <piechart :params="pieChartParams"></piechart> -->
    <div id="pieChartId" class="pieChartClass"> 
    </div>
  </div>

  <!--计划完成和实际完成单位组件-->
  <div v-if="showPlanandChart">
     <div class="blank"></div>
     <div class="blank"></div>
     <planandmarkunit></planandmarkunit>
     <div class="blank"></div>
     <div class="blank"></div>
  </div>
  
<!-- 双曲线图表组件 -->
<div v-if="showPlanandChart">
  <hyperbolachartmoude :hyperbolachartparams="hyperbolachartParams"></hyperbolachartmoude>
  <div class="blank"></div>
  <div class="blank"></div>
</div> 

 
 <!-- 季度完成与计划组件 -->
 <div v-if="showPlanandChart">
   <planandcomplete :params="planCompleteParams"></planandcomplete>
 </div>
 <!-- 线上销售一 -->
  <div v-show="showPieChartComposition">
      <salecomposition :params="onlineSaleParams"></salecomposition>
  </div>
  <!-- 关注 -->
  <div class="attention">
    <div class="attentionBtn" @click="attention($event)">取消关注</div>
  </div>
</template>

<script>

import Vue from 'vue'
import router from 'src/routers';
import Params from 'src/routersParam'
import ParamsData from 'src/js/params_data'
// import $ from 'jquery'
// import Header from '../Common/CommonHeader.vue'
// import ModuleHeader from '../Common/ModuleHeader.vue'
// //计划完成组件
// import PlanComplete from '../Common/PlanComplete.vue'
// //销售额组件（名称，值，颜色比例）
// import Sale from '../Common/Sale.vue'
// //线上销售一
// import SaleComposition from '../Common/SaleComposition.vue'
// import PieChart from './PieChart'
// // import datePicker from '../../js/datePicker'
// import DatePicker from './DatePicker'
// import assetChartModule from './assetChart'
// // import HyperbolaChart from './HyperbolaChart'
// //双曲线图表组件
// import HyperbolaChartMoude from '../Common/HyperbolaChartMoude.vue'
// //季度计划组建
// import planAndComplete from '../Common/planAndComplete.vue'
// //计划完成和实际完成单位组建
// import MarkAndUnit from '../Common/MarkAndUnit.vue'

var m_title = "资产总额";

var theSelectData;
//页面传值指标编码
var indexNo;
//页面传值指标名称
var indexName;
//日历日期（昨天及选择日期）
// var date;
//指标值单位
// var unit = 100000000;
//是否已关注状态
var attentionState;
//上升下降三角形图片
var downTrrigleArrowImg;
var upTrrigleArrowImg;
var allThis;
let allRptResultAppUrl = ParamsData.method().allRptResultApp();
let unit = 100000000;
var currentUnit;

/*
当前用户所在机构层级为0
若当前用户有子机构则子机构层级为1
若当前用户有子机构下属机构则子机构下属机构层级为2
 */
var orgLevel = 0;


function removeEvent(event) {
    event.preventDefault();
}

export default {
  data () {
    return {
      calendarButton: {
        title:'', icon: require('../../assets/images/calendar.png')
      },
      downImg: require('../../assets/images/arrow_down.png'),
      upImg: require('../../assets/images/arrow_up.png'),
      chartImg: {
        icon: require('../../assets/images/test.png')
      },
      headerParams: {title:m_title, ltitle:'首页', llink:''},
      moduleHeaderParams: [],
      arrowButton: {icon: require('../../assets/images/arrow_bottom_white.png'), link: ''},
      planCompleteValue: {name:'', value:'0.00',planValues:'planComplete'},
      CompletionRate: {name:'', value:'0.00%',planValues:'CompletionRate'},

      planCompleteParams: [],

      showPlanandChart:false,
      hyperbolachartParams:{},


      //是否显示饼图组件
      showSale: false,
      showSalePlan: false,
      showPieChart: false,
      showPieChartComposition: false,   

      //销售组件数据
      salesParams: [{name:'', value:'0.00', rate:'0%'},{name:'', value:'0.00', rate:'0%'}],

      //环形图部分总额组件
      salePlanParams: {name:'', value:'0%'},
      
      //环形图组件
      // pieChartParams: {saleArray:[], name:''},

      //线上销售组成部分
      onlineSaleParams: [],

      callback: { chart: requestInitData },
    }
  },
  watch: {
    'showSale': function (val, oldValue) {
      console.log(val, oldValue);
    }
  },
  created() {
    console.log('created');
    //在此方法做数据请求
    console.log(document.querySelector(".val_area"));
    console.log(this.$route.params.pointNo,'\n',
                this.$route.params.pointName,'\n',
                this.$route.params.attention,'\n',
                this.$route.params.status,'\n',
                this.$route.params.organazation,'\n',
                this.$route.params.backName,'\n',
                this.$route.params.authorityNo,'\n',
                this.$route.params.hiddenModuleSwitch,'\n',     
    );
    // this.fetchData();
    //页面传值(路由配置文件中配置)
    // console.log(this.$route.params.pointNo);
    indexNo = this.$route.params.pointNo;
    indexName = this.$route.params.pointName;
    this.headerParams.ltitle = this.$route.params.backName;
  },
  //在编译开始前调用
  beforeCompile() {
    console.log('beforeCompile');
    console.log(document.querySelector(".val_area"));
  },
  //在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新。但是不担保 $el 已插入文档
  compiled() {
    console.log('compiled');
    console.log(document.querySelector(".val_area"));

    // if (this.$route.params.hiddenModuleSwitch == 'true') {
    //   alert();
    //   $("#assets_moduleheader").hide();
    // }
  },
  methods: {
    // fetchData:function(textCount){
    //     var url = ParamsData.method().getSearchIndexList();
    //     $.post(url,null,function(result){
    //       console.log('moduleTitle',result);
    //       var pointArray = result[0].retBody;  
    //       var allPointNameArray = [];
    //       for (var i = pointArray.length - 1; i >= 0; i--) {
    //         if (pointArray[i].indexName.length>textCount) {
    //           pointArray[i].indexName = pointArray[i].indexName.substring(0,textCount-3) + '...';
    //         }
    //          allPointNameArray.push(pointArray[i]);
    //       }
    //       allPointNameArray.reverse(); 
    //       _this.moduleHeaderParams = allPointNameArray;

    //     }, 'json');
    // },
    getPointData: function(_this,textCount){
        var data = ParamsData.method().getModuleHeaderParams();
        if(data.length == 0) {
          var url = ParamsData.method().getSearchIndexList();
          $.post(url,null,function(result){
            var pointArray = result[0].retBody;  
            var allPointNameArray = [];
            for (var i = pointArray.length - 1; i >= 0; i--) {
              // if (pointArray[i].indexName.length>textCount) {
              //   pointArray[i].indexName = pointArray[i].indexName.substring(0,textCount) + '...';
              // }
               allPointNameArray.push(pointArray[i]);
            }
            allPointNameArray.reverse();
            ParamsData.method().setModuleHeaderParams(allPointNameArray);
            _this.moduleHeaderParams = ParamsData.method().getModuleHeaderParams();
          }, 'json');
        }
        else {
          _this.moduleHeaderParams = ParamsData.method().getModuleHeaderParams();
        }        
    },
    // getDetailRequest: function() {
    //     getDetailRequestData(indexNo,theSelectData);
    // },
    onSelected: function(event,index,link) {

    },
    toSearch: function($event) {
      router.go({ name: 'search'});

      // $(".cctitle").html('搜索');
      // $(".assetsFixed").hide();
      // $(".tabbarFixed").hide();
      // $(".ccline").hide();
    },
    //日期选择
    calendarSelect: function() {
      // console.log('calendarSelect');
      // console.log(datePicker);
    },
    //关注
    attention: function(event) {
      if (attentionState == 1) {//取消关注
        $(".module_poper_timer").fadeIn();
         var url = ParamsData.method().getCloseAttentionUrl();
         var data = {userNo:window.localStorage.userid,indexNos:indexNo};    //key/value参数
         // console.log(data);
        $.post(url,data,(result)=>{
          $(".module_poper_timer").fadeOut();
          $("#prompt").text('取消关注成功')
          $("#prompt").fadeIn();
          setTimeout(()=>{
             $("#prompt").fadeOut();
          },1000)

          setTimeout(() => {
             $(".attentionBtn").text('关注');
             attentionState = 0;

          }, 0)

        },'json');
      }else{//添加关注
         $(".module_poper_timer").fadeIn();
          var addAttentionUlr = ParamsData.method().getAddAttentionUrl();

          var params = {userNo:window.localStorage.userid, indexNos:indexNo}; 
          $.post(addAttentionUlr, params, function(result){
            $(".module_poper_timer").fadeOut();
            $("#prompt").text('关注成功')
            $("#prompt").fadeIn();
            setTimeout(()=>{
              $("#prompt").fadeOut();
            },1000)
            setTimeout(() => {
              $(".attentionBtn").text('取消关注');
                attentionState = 1;

              }, 0)
                        
          },'json');
      }
      
    },

    //跳转至分支行选择器页面
    goPicker: function(event) {
      console.log('picker',indexNo,indexName);
      this.$route.params.pointNo = indexNo;
      this.$route.params.pointName = indexName;
      console.log(this.$route.params.pointNo,this.$route.params.pointName);

      var pointName = this.$route.params.pointName;
      var pointNo = this.$route.params.pointNo;
      var attentionState = this.$route.params.attentionState;
      var status = this.$route.params.status;
      var orgNo = this.$route.params.orgNo;
      var backName = this.$route.params.backName;
      var authorityNo = this.$route.params.authorityNo;
      var hiddenModuleSwitch = this.$route.params.hiddenModuleSwitch;

      console.log(hiddenModuleSwitch);
      console.log(backName);
      console.log(this.$route.params);
      console.log(orgNo);


      //接口根据用户ID取当前机构的子机构（当前为总行返回分支行，当前为分支行返回一级支行）
      var url = ParamsData.method().getOrg();
      
      //参数
      var params = {userNo:window.localStorage.userid, indexNo:indexNo};

      console.log(url);
      console.log(params);

      //若未请求当前机构子机构数据则进行请求
      console.log(ParamsData.method().getChildOrgParams());
      if (ParamsData.method().getChildOrgParams().length == 0) {
        $.post(url,params,function(result) {
          console.log(result);
          if (result[0].retState == true) {
            orgLevel += 1;
            console.log(orgLevel);
            ParamsData.method().setChildOrgParams(result[0].retBody);
            console.log(ParamsData.method().getChildOrgParams());
            router.go({name:'picker',
              params:{
              pointName:indexName,
              pointNo:indexNo,
              attentionState:attentionState,
              orgNo:orgNo,
              backName:backName,
              authorityNo:authorityNo,
              hiddenModuleSwitch: null
            }});
          }
        }, 'json');
      }
      else {
        router.go({name:'picker',
          params:{
          pointName:indexName,
          pointNo:indexNo,
          attentionState:attentionState,
          orgNo:orgNo,
          backName:backName,
          authorityNo:authorityNo,
          hiddenModuleSwitch: null
        }});
      }
      


      // if (hiddenModuleSwitch == true) {
      //   alert();
      // }

      //根据机构编号（机构是总行还是分支行还是一级支行）与指标权限判断是否下钻
      //判断是否跳转到分支行机构
      // switch(status) {
      //   case '0': {
      //     console.log('全部可见');
      //     router.go({name:'picker',
      //       params:{
      //       pointName:indexName,
      //       pointNo:indexNo,
      //       attentionState:attentionState,
      //       orgNo:organazationNo,
      //       backName:backName,
      //       authorityNo:authorityNo,
      //       hiddenModuleSwitch: null
      //     }});
      //     break;
      //   }
      //   case '1': {
      //     console.log('仅总行可见');
      //     router.go({name:'picker',
      //       params:{
      //       pointName:indexName,
      //       pointNo:indexNo,
      //       attentionState:attentionState,
      //       orgNo:organazationNo,
      //       backName:backName,
      //       authorityNo:authorityNo,
      //       hiddenModuleSwitch: null
      //     }});
      //     break;
      //   }
      //   case '2': {
      //     console.log('仅分行可见');
      //     break;
      //   }
      //   case '3': {
      //     console.log('全部不可见');
      //     break;
      //   }
      //   case '4': {
      //     console.log('一级支行可见');
      //     break;
      //   }
      //   default :
      //   console.log('新增加权限');
      // }

      // var isDrillDown = true;
      // if (isDrillDown) {
      //   router.go({name:'picker',
      //     params:{
      //     pointName:indexName,
      //     pointNo:indexNo,
      //     attentionState:attentionState,
      //     orgNo:organazationNo,
      //     backName:backName,
      //     authorityNo:authorityNo,
      //     hiddenModuleSwitch: null
      //   }});
      // }
      // else {

      // }
      
    },

  },
  ready() {

    //当从子机构进入详情页面时隐藏模块切换组件
    if (this.$route.params.hiddenModuleSwitch == 'true') {
      console.log('当从子机构进入详情页面时隐藏模块切换组件');
      $("#assets_moduleheader").hide();
    }


    allThis = this;
    console.log(this.$children);
    $("body").css('position', 'relative');
    window.removeEventListener('scroll', this.handleScroll, false);
    // $(".beginningOfYearAndSameTime").hide();
    
    $('body').css({'overflow-y': 'auto'});
    //获取客户端设备DOM宽高
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    //上升下降三角形图片
    downTrrigleArrowImg = this.downImg;
    upTrrigleArrowImg = this.upImg;
    
    var _this = this;
    this.getPointData(_this);  

    //年初，去年同期宽高字体等样式随设配适配兼容
    setCompareStyle();
  
    //模块标题适配

    var moduleTitleWidth = parseInt($(".module_switcher_title").css('width'))*0.8;
    var moduleTitleFont = parseInt($(".module_switcher_title").css('font-size'));
    // console.log(moduleTitleWidth);
    // console.log(moduleTitleFont);
    var mouduleTitleCount = parseInt(moduleTitleWidth/moduleTitleFont);
    // console.log(mouduleTitleCount);
    var indexNameTitle;
    if (indexName.length>mouduleTitleCount) {
      indexNameTitle = indexName.substring(0,mouduleTitleCount-1)+'...';
      console.log(indexNameTitle);
      $(".moduleName").text(indexNameTitle);
    }
    else {
      $(".moduleName").text(indexName);
    }

    $(".name").html(indexName);

    
    $(".cccommontitle").text(ParamsData.method().getAppTitle());

    
    //平台兼容性处理
    var areaHeight = 0;
    var areaMargin = 0;

    //安卓机
    if(ParamsData.method().getMobileSystem() != 1) {
      areaHeight = width/3.3;
      areaMargin = areaHeight*0.03;

      $(".val_area").css("font-size", areaHeight + "px");
      $(".val_area div").css("height", areaHeight + "px");
      $(".val_area div").css("line-height", areaHeight + "px");
      $(".val_area div").css("margin-top", areaMargin * 2);
      $(".val_area div").css("margin-bottom", areaMargin + "px");
    }
    //ios机
    else {
      areaHeight = width/3.9;
      areaMargin = areaHeight*0.1;

      var areaLineHeight = areaHeight+areaHeight*0.25;
      $(".val_area").css("font-size", areaHeight + "px");
      $(".val_area div").css("height", areaHeight + "px");
      $(".val_area div").css("line-height", areaLineHeight + "px");
      $(".val_area div").css("margin-top", areaMargin * 2);
      $(".val_area div").css("margin-bottom", areaMargin + "px");
    }
    
    //获取当前日期
    // getDay();
    
    //比上日，比上月，比年初，比同期渲染
    setTrrigleArrowStyle();
    //初始化日历并注册日历
    initCalender();
    
    //首页或搜索跳转至详情页面初始请求数据
    requestInitData(indexNo, indexName);
    //判断是否隐藏比上日，比上月，比年初，比同期
    ParamsData.method().getHideIdNameFromeIndexNo(indexNo);

    // $(".beginningOfYearAndSameTime").show();
    
  }
}

//新详情初始接口数据请求
function requestInitData(pIndexNo, pIndexName) {
  console.log('----------------------app总进口，所有的模块切换都会来到这里');
  $(".module_poper_timer").fadeIn();
  
  indexNo = pIndexNo;
  indexName = pIndexName;
  //若跳转到详情页的指标为以下则增加提示行
  if (ParamsData.method().isAddPromptLine(indexNo)) {
      $(".prompTexplain").html("<p>该指标为月度指标，显示上月月底数据</p>");
  }
  else{
      $(".prompTexplain").text('');
  }
  // var allRptResultAppUrl = ParamsData.method().allRptResultApp();
  var params = {userNo:window.localStorage.userid,indexNo:indexNo,idxType:'M',currency:'CN',type:0};
  //根据传入指标编码判读详情是那种类型（计划类型/环形图类型/资产类型）
  var detailChartType = ParamsData.method().getDetailChartType(indexNo);
  //首先进来全部隐藏所有组件，根据指标显示组件
  allThis.showPlanandChart = false;
  allThis.showPieChart = false;
  allThis.showSale = false;
  allThis.showSalePlan = false;
  allThis.showPieChartComposition = false;
  $(".timePoint").show();
  $(".chart").show();
  $(".pieUnit").hide();
  console.log(detailChartType);

  switch(detailChartType) {
    case 'plan':
      // allThis.showPlanandChart = true;
      $(".timePoint").hide();
      $(".chart").hide();
      $(".pieChartClass").hide();

      console.log('详情图表为曲线图类型');
      console.log(indexNo);
      
      $(".module_poper_timer").fadeOut();
      params = {userNo:window.localStorage.userid,indexNo:indexNo,idxType:'M',currency:'CN',type:0};
      break;
    case 'sale':
      console.log('详情图表为环形图类型');
      //隐藏比上日，上月，年初，同期
      $(".timePoint").hide();
      $(".chart").hide();
      // allThis.showSale = true;
      $(".pieChartClass").show();

      //单位
      if (indexNo == ParamsData.data().dt || indexNo == ParamsData.data().di) {
        $(".pieUnit").show();
      }
      
      //进入详情页面初始化显示数据
      console.log(detailChartType);
      var piePointName = ParamsData.method().getSecondaryPointName(indexNo);
      var secondaryIndexName = piePointName[0];
      var pieSeriesName = piePointName[1];

      console.log(secondaryIndexName);
      allThis.salesParams[0].name = secondaryIndexName[0].name;
      allThis.salesParams[1].name = secondaryIndexName[1].name;

      // allThis.salesParams = secondaryIndexName;

      allThis.salePlanParams.name = indexName;

      allThis.onlineSaleParams = pieSeriesName;
      console.log('-----------');
      
      //环形图初始化（传入指标名称）
      var initPieData = [{value:1}];
      //判断是否为对私管理
      if (pIndexNo == ParamsData.data().dk || pIndexNo == ParamsData.data().dt) {
        console.log('对私管理资产线上销售比例');
        
        allThis.showSale = true;
      }
      if (pIndexNo == ParamsData.data().dk) {
        allThis.showSalePlan = true;
      }
      initPieData = [{value:1},{value:1},{value:1}];
      console.log(initPieData);
      allThis.showPieChartComposition = true;

      //个人保本理财年度销售额
      if (pIndexNo == ParamsData.data().dt) {
        initPieData = [{value:1}, {value:1}, {value:1}, {value:1}];

      }

      PieChart.method().init(initPieData,indexName);
          
      $(".module_poper_timer").fadeIn();

      params = {userNo:window.localStorage.userid,indexNo:indexNo,idxType:'M',currency:'CN',type:0};
      console.log(params);

      break;

    case 'normal':
      console.log('详情图表为通用类型');
      //切换模块和进入详情界面时刷新是否取消按钮。
      ParamsData.method().getHideIdNameFromeIndexNo(indexNo);
      //不良贷款不传单位
      var showCordonIndexNos = ParamsData.data().showCordonIndexNos;
      if (showCordonIndexNos.indexOf(indexNo) != -1) {
        params = {userNo:window.localStorage.userid,indexNo:indexNo,idxType:'M',currency:'CN',type:0};
      }
      
      $(".module_poper_timer").fadeIn();
      assetChartModule.method().init();
      //
      $(".pieChartClass").hide();

      if (indexNo == ParamsData.data().ev) {
        $(".pieChartClass").show();
        var initPieData = [{value:1},{value:1},{value:1}];
        PieChart.method().init(initPieData,indexName);

        allThis.showPieChartComposition = true;
        var piePointName = ParamsData.method().getSecondaryPointName(indexNo);
        var secondaryIndexName = piePointName[0];
        var pieSeriesName = piePointName[1];

        console.log(secondaryIndexName);
        allThis.onlineSaleParams = pieSeriesName;

      }
      break;

    default :
      console.log('default',detailChartType);
  }

  $.post(allRptResultAppUrl, params, function(result){
    console.log(result);
    $(".module_poper_timer").fadeOut();
        if(result[0].retBody == null){
          // $("#prompt").text('该指标尚未完成跑批');
          // $("#prompt").fadeIn();
          //     setTimeout(()=>{
          //        $("#prompt").fadeOut();
          //     },1000)
          // $(".module_poper_timer").fadeOut();
          return;
        }
        if (result[0].retBody.indexNoState == 1) {
          $(".attentionBtn").text('取消关注');
          attentionState = 1;
        }
        else if(result[0].retBody.indexNoState == 0){
          $(".attentionBtn").text('关注');
          attentionState = 0;
        }

        $(".module_poper_timer").fadeOut();
        // console.log('新详情数据：',result);
        //详情页比上日数组数据
        if (result[0].retState) {
          console.log(result[0].retBody);
          var detailArray = result[0].retBody;
          var downArray = detailArray.downIndex;
          var upArray = detailArray.upIndex;
          if (typeof(upArray) == 'undefined' || typeof(downArray) == 'undefined') {
            console.log('upArrayUndefined');
            console.log('downArrayUndefined');
          }
          else {
            var latestDate = upArray[upArray.length-1].date
            console.log(upArray[upArray.length-1].date);
            var latestFormatDate = latestDate.substring(0,4) + '-' + latestDate.substring(4,6) + '-' + latestDate.substring(6,8);
            $("#calendar").text(latestFormatDate);
            
            if(typeof result[0].retBody.upIndex != 'undefined') {
              currentUnit = result[0].retBody.upIndex[0].unit;
              console.log(currentUnit);
            }

            //信用卡及消费金融收入
            if (indexNo == ParamsData.data().ev) {
              if (result[0].retBody.pie) {
                var pieseries = result[0].retBody.pie;
                assetChartModule.method().setData(indexNo, upArray, downArray, currentUnit, allThis, pieseries);
                console.log(latestDate);
                console.log(pieseries[pieseries.length-1]);
                var pieLatestSeries = pieseries[pieseries.length-1];
                console.log(pieLatestSeries);
                var pieSeries = [];
                for (var i = 0; i < pieLatestSeries.length; i++) {
                  pieSeries.push(pieLatestSeries[i][0].value);
                  var spliceData = ParamsData.method().subTwoDecimal(pieLatestSeries[i][0].value);
                  if (spliceData == 0) {
                    spliceData = '0.00';
                  }
                  var spliceRateData = ParamsData.method().subTwoDecimal(pieLatestSeries[i][1].value);
                  if (spliceRateData == 0) {
                    spliceRateData = '0.00';
                  }

                  allThis.onlineSaleParams[i].value = spliceData;
                  allThis.onlineSaleParams[i].rate = spliceRateData + '%';

                  console.log(pieLatestSeries[i][0].value);
                  console.log(pieLatestSeries[i][1].value);
                }
                console.log(pieSeries);
                PieChart.method().setData(pieSeries);
              }
            }
            else {
              assetChartModule.method().setData(indexNo, upArray, downArray, currentUnit, allThis);
            }
          }

          

        }
        else {
          // $("#prompt").text('该指标尚未完成跑批')
          //     $("#prompt").fadeIn();
          //     setTimeout(()=>{
          //        $("#prompt").fadeOut();
          //     },1000)
          // console.log('无数据');
        } 


      
        //环形图请求数据后赋值
        showPieData(result);
          //计划完成率请求数据后赋值
        showPlanandChartData(result);

        //比上日，比上月，比年初，比同期渲染
        //setTrrigleArrowStyle();
        //初始化日历并注册日历
        // initCalender();
      }, 'json');

  //日历指标点名称换行判断
    var dateNameWidth = parseInt($(".name").css('width'));
    var dateNameHeight = parseInt($(".name").css('height'));

    var dateNameFont = parseInt($(".name").css('font-size'));
    var dateNameCount = parseInt(dateNameWidth/dateNameFont);
    var dateNameLineHeight = dateNameHeight/2 + 'px';
    //two lines
    if (pIndexName.length>dateNameCount) {
      $(".name").css('line-height',dateNameLineHeight);
    }
    else {
      // alert();
      $(".name").css('line-height','');
    }

}

//环形图请求数据后赋值
function showPieData(result) {

  console.log('result',result);
  console.log(indexNo);

  if (ParamsData.data().financialSales.indexOf(indexNo) != -1) {

    var pieResult = result[0].retBody;

    var sd = result[0].retBody.sd;

    var bar = result[0].retBody.var;

    var zb = result[0].retBody.zb;

    var pie = result[0].retBody.pie;

    //判断是否有环形图数据对象
    if (pieResult != null) {
      //日期
      var pieDate = pieResult.var[0].date;
      console.log(pieDate);
      if (pieDate == null) {
        pieDate = '00000000';
      }
      var pieDate = pieDate.substring(0,4) + '-' + pieDate.substring(4,6) + '-' + pieDate.substring(6,8);
      $("#calendar").text(pieDate);

      //时点值
      var assetVal;
      //主指标值筛选
      for (var i = 0; i < sd.length; i++) {
        if (sd[i].indexNo == indexNo) {
          assetVal = sd[i].value.toFixed(2);
          console.log(assetVal,sd[i],sd);
          break;
        }
      }
      if (indexNo == ParamsData.data().dk) {
        for (var i = 0; i < sd.length; i++) {
          if (sd[i].indexNo == ParamsData.data().di) {
            assetVal = sd[i].value.toFixed(2);
            break;
          }
        }
      }

      //条状图
      //个人保本
      var personSale;
      if (bar[0] != null) {
        // assetVal = pieResult.sd[0].value.toFixed(2);
        personSale = bar[0].value.toFixed(2);
      }
      console.log(personSale);


      //销售总额
      var saleTotal;
      if (bar[1] != null) {
        saleTotal = bar[1].value.toFixed(2);
      }


      //个人保本理财销售额占比
      var personRate;
      if (zb != null) {
        var personRate = zb[0].value.toFixed(2) + '%';
        if (zb[0].value == 0 || zb[0].value == null || typeof(zb[0].value) == 'undefined') {
          personRate = '0.00%';
        }
      }

      allThis.salesParams[0].value = personSale;
      allThis.salesParams[1].value = saleTotal;

      var saleRadiusDiv = $(".saleRadiusDiv");

      if (indexNo == ParamsData.data().dk) {

        
        allThis.salesParams[0].rate = '100%';
        

        var saleRate = parseInt((pieResult.sd[0].value / pieResult.sd[1].value)*100);

        var salePercentage = saleRate + '%';

        if (saleTotal == 0 || isNaN(saleRate)) {
          console.log('--------');
          salePercentage = '0.00%';
        }
        
        saleRadiusDiv[0].style.width = '100%';
        if (saleTotal == '0.00') {
          saleRadiusDiv[0].style.width = '0.00%';
        }
        saleRadiusDiv[1].style.width = personRate;

        allThis.salePlanParams.value = personRate;
      }
      else if (indexNo == ParamsData.data().dt) {
        if (bar[0].value > bar[1].value) {
          saleRadiusDiv[0].style.width = '100%';
          saleRadiusDiv[1].style.width = ((bar[1].value / bar[0].value)*100).toFixed(2) + '%';
        }
        else if (bar[0].value < bar[1].value) {
          saleRadiusDiv[0].style.width = ((bar[0].value / bar[1].value)*100).toFixed(2) + '%';
          saleRadiusDiv[1].style.width = '100%';
          console.log(((bar[0].value / bar[1].value)*100).toFixed(2) + '%');
        }
        else if (bar[0].value == bar[1].value && bar[0].value > 0) {
          saleRadiusDiv[0].style.width = '100%';
          saleRadiusDiv[1].style.width = '100%';
        }
        else if (bar[0].value == 0 && bar[1].value == 0) {
          saleRadiusDiv[0].style.width = '0%';
          saleRadiusDiv[1].style.width = '0%';
        }
        else {
          
        }
      }
      else {

      }
      

      //对私管理资产线上销售比例环形图数据
      var pieSeries = [];
      if (pieResult.pie[0] != null) {
        for (var i = 0; i < pieResult.pie.length; i++) {
          console.log(pieResult.pie[i][0].value);
          allThis.onlineSaleParams[i].value = pieResult.pie[i][0].value.toFixed(2);
          allThis.onlineSaleParams[i].rate = pieResult.pie[i][1].value.toFixed(2) + '%';
          pieSeries.push(pieResult.pie[i][1].value);
        }
        // pieSeries.reverse();
        console.log(pieSeries);
        PieChart.method().setData(pieSeries);
      }
      

      $("#asset_val").attr('value', assetVal);
      var asset_val = parseFloat($("#asset_val").attr('value'));
      $("#asset_val").text(assetVal);       
       
    }
  }
  
}

//计划完成率请求数据后赋值
function showPlanandChartData(result){
  if (indexNo == ParamsData.data().retailLoan || indexNo == ParamsData.data().savingsDeposit || indexNo == ParamsData.data().da || indexNo == ParamsData.data().dg) {
    // allThis.showPlanandChart = true;

    var jhwcArray = result[0].retBody.planChart;
    var jhwclArray = result[0].retBody.jhwcl;
    var jhwcArrayY = result[0].retBody.jhwc;
    var wclArray = result[0].retBody.wcl;
    var sdArray = result[0].retBody.sd;
    var datepointArray = result[0].retBody.datepoint;
    var chartArray = result[0].retBody.chart;
    var sdChartArray = result[0].retBody.SD_Chart;
    

    var secondaryIndexName = ParamsData.method().getSecondaryPointName(indexNo);
    console.log(secondaryIndexName);

    allThis.showPlanandChart = true;
    allThis.planCompleteValue.name = secondaryIndexName[0][0].name;
    allThis.CompletionRate.name = secondaryIndexName[0][1].name;

    var calendarTime = datepointArray[0].date.substring(0,4) + '-' + datepointArray[0].date.substring(4,6) + '-' + datepointArray[0].date.substring(6,8);
 
    $("#calendar").text(calendarTime);
    $("#asset_val").text(datepointArray[0].value.toFixed(2))
    var quarterTimeArray = ['第一季度计划','第二季度计划','第三季度计划','第四季度计划'];
    var planCompleteParamsArray = [];
    for (var i = 0; i < chartArray.length; i++) {
       var planCompleteParamsObj = {quarterTime:quarterTimeArray[i],planVal:jhwcArray[i].value.toFixed(2),planCompleteVal:chartArray[i].value.toFixed(2)+'%'};
       planCompleteParamsArray.push(planCompleteParamsObj);
    };

    var planIndexName = jhwcArray[0].indexName.substring(0,6);
    
    allThis.planCompleteValue.value  = jhwcArrayY[3].value.toFixed(2);
    allThis.CompletionRate.value = datepointArray[0].value.toFixed(2)+'%';
    allThis.hyperbolachartParams = {jhwc:jhwcArrayY,jhwcl:chartArray,sd:sdChartArray};
    allThis.planCompleteParams = planCompleteParamsArray;

  }
  
}

//日历注册
function initCalender() {
  var today=new Date();

  var todayYear = today.getFullYear();
  var todayMon = today.getMonth();
  var todayDay = today.getDate()-1;
  var yesterday = new Date(todayYear, todayMon, todayDay);

  var strYear=yesterday.getFullYear(); 

  var strDay=yesterday.getDate();
  var strMonth=yesterday.getMonth()+1;
  var year = yesterday.getFullYear();
  year = year - 2;
  var startDate = year + "-01" + "-01";

  if(strMonth<10)   
  {   
    strMonth="0"+strMonth;   
  }
  if (strDay<10) {
    strDay="0"+strDay;
  }   
  var strYesterday=strYear+"-"+strMonth+"-"+strDay;   
  
  theSelectData = strYesterday;
  var vdp = window.datePicker;
  console.log(vdp);
  var cal = new vdp();
  console.log(cal);
  cal.init({
    'trigger': '#dateClick', /*按钮选择器，用于触发弹出插件*/
    'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
    'minDate':'2015-01-01',/*最小日期*/
    'maxDate':theSelectData,/*最大日期*/
    'onSubmit':function(){/*确认时触发事件*/
      
      theSelectData=cal.trigger.value;
      //按下确定按钮根据时间与当前用户ID，指标点ID请求数据
      // console.log('按下确定按钮后的时间',theSelectData);
      var selectDate = theSelectData.substring(0,4)+theSelectData.substring(5,7)+theSelectData.substring(8,10);
      selectDateRequestData(selectDate,indexNo);
      
    },
    'onClose':function(){/*取消时触发事件*/
      // console.log('取消时触发事件');
    }
  });
  console.log(cal);
}

//20170101时间转换成2017-01-01格式
// function dateFormate(date) {
//   var formateDate = date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8);
//   console.log(formateDate);
//   return formateDate;
// }

function selectDateRequestData(selectDate, selectedIndexNo) {

  indexNo = selectedIndexNo;

  var params = {userNo:window.localStorage.userid,indexNo:indexNo,idxType:'M',currency:'CN',type:0,date:selectDate};
  var showCordonIndexNos = ParamsData.data().showCordonIndexNos;
  if (showCordonIndexNos.indexOf(indexNo) != -1) {
    params = {userNo:window.localStorage.userid,indexNo:indexNo,idxType:'M',currency:'CN',type:0,date:selectDate};
  }

  $(".module_poper_timer").fadeIn();
  $.post(allRptResultAppUrl, params, function(result){
    $(".module_poper_timer").fadeOut();
    console.log('selectDateRequestData新详情数据：',result);
    //详情页比上日数组数据
    if (result[0].retState) {
      var downArray = result[0].retBody.downIndex;
      var upArray = result[0].retBody.upIndex;
      if (typeof(downArray) == 'undefined' || typeof(upArray) == 'undefined') {
        console.log('请求数据为D,E版数据');
        // //环形图请求数据后赋值
        
      }
      else {
        assetChartModule.method().init();
        assetChartModule.method().setData(indexNo, upArray, downArray, currentUnit);//HyperbolaChart
      }  

      //环形图请求数据后赋值
      showPieData(result);

    }
    else {
      // console.log('无数据');
    }
  }, 'json');
}

//比上日，上月，年初，同期渲染
function setTrrigleArrowStyle() {
  //设置三角箭头居中
      var comValueHeight = $(".beginningOfYearName").height();
      $(".beginningOfYearRateImg img").css("top", (comValueHeight-10)/2);
      $(".beginningOfYearRateImg img").css("right", 0);

      var colWidth = $(".beginningOfYearAndSameTime").width() / 3;
      var rightWidth = $(".beginningOfYearRateValue").width();
      var rightMargin = parseFloat($(".beginningOfYearRateValue").css("margin-right"));
      var curWidth = colWidth-rightWidth-rightMargin;
      $(".beginningOfYearRateImg").css("width", curWidth);

      
      var asset_val = parseFloat($("#asset_val").attr('value'));
      var lday_val = parseFloat($("#lastDayCompareVal").attr('value'));
      var lmonth_val = parseFloat($("#lastMonthCompareVal").attr('value'));
      var year_val = parseFloat($("#beginningYearOrLastYearCompareVal").attr('value'));
      var samePeriod_val = parseFloat($("#compareSamePeriodVal").attr('value'));


      var lday_rate = parseFloat($("#lastDayCompareRate").attr('value'));
      var lmonth_rate = parseFloat($("#lastMonthCompareRate").attr('value'));
      var year_rate = parseFloat($("#beginningYearOrLastYearCompareRate").attr('value'));
      var samePeriod_rate = parseFloat($("#compareSamePeriodRate").attr('value'));


      $("#asset_val").text(asset_val.toFixed(2));

      $("#lastDayCompareVal").text(Math.abs(lday_val).toFixed(2));
      $("#lastMonthCompareVal").text(Math.abs(lmonth_val).toFixed(2));
      $("#beginningYearOrLastYearCompareVal").text(Math.abs(year_val).toFixed(2));
      $("#compareSamePeriodVal").text(Math.abs(samePeriod_val).toFixed(2));

      if(currentUnit == '人' || currentUnit == '张') {
        $("#asset_val").text(asset_val.toFixed(0));
        $("#lastDayCompareVal").text(Math.abs(lday_val).toFixed(0));
        $("#lastMonthCompareVal").text(Math.abs(lmonth_val).toFixed(0));
        $("#beginningYearOrLastYearCompareVal").text(Math.abs(year_val).toFixed(0));
        $("#compareSamePeriodVal").text(Math.abs(samePeriod_val).toFixed(0));
      }

      $("#lastDayCompareRate").text(Math.abs(lday_rate).toFixed(2) + '%');
      $("#lastMonthCompareRate").text(Math.abs(lmonth_rate).toFixed(2) + '%');
      $("#beginningYearOrLastYearCompareRate").text(Math.abs(year_rate).toFixed(2) + '%');
      $("#compareSamePeriodRate").text(Math.abs(samePeriod_rate).toFixed(2) + '%');

      if(lday_val < 0) {//下降绿色
        $("#lastDayCompareVal").css("color", '#32ffff');
        $("#lastDayCompareRate").css("color", '#32ffff');
        $("#lastDayCompareImg").attr("src", downTrrigleArrowImg);
      }
      else if(lday_val >= 0) {//上升粉色
        $("#lastDayCompareVal").css("color", '#ffaaf0');
        $("#lastDayCompareRate").css("color", '#ffaaf0');
        $("#lastDayCompareImg").attr("src", upTrrigleArrowImg);
      }
      else {
        $("#lastDayCompareVal").css("color", '#ffffff');
        $("#lastDayCompareRate").css("color", '#ffffff');
      }

      if(lmonth_val < 0) {//下降绿色
        $("#lastMonthCompareVal").css("color", '#32ffff');
        $("#lastMonthCompareRate").css("color", '#32ffff');
        $("#lastMonthCompareImg").attr("src", downTrrigleArrowImg);
      }
      else if(lmonth_val >= 0) {//上升粉色
        $("#lastMonthCompareVal").css("color", '#ffaaf0');
        $("#lastMonthCompareRate").css("color", '#ffaaf0');
        $("#lastMonthCompareImg").attr("src", upTrrigleArrowImg);
      }
      else {
        $("#lastMonthCompareVal").css("color", '#ffffff');
        $("#lastMonthCompareRate").css("color", '#ffffff');
      }

      if(year_val < 0) {//下降绿色
        $("#beginningYearOrLastYearCompareVal").css("color", '#32ffff');
        $("#beginningYearOrLastYearCompareRate").css("color", '#32ffff');
        $("#beginningYearOrLastYearCompareImg").attr("src", downTrrigleArrowImg);
      }
      else if(year_val >= 0) {//上升粉色
        $("#beginningYearOrLastYearCompareVal").css("color", '#ffaaf0');
        $("#beginningYearOrLastYearCompareRate").css("color", '#ffaaf0');
        $("#beginningYearOrLastYearCompareImg").attr("src", upTrrigleArrowImg);
      }
      else {
        $("#beginningYearOrLastYearCompareVal").css("color", '#ffffff');
        $("#beginningYearOrLastYearCompareRate").css("color", '#ffffff');
      }

      if(samePeriod_val < 0) {//下降绿色
        $("#compareSamePeriodVal").css("color", '#32ffff');
        $("#compareSamePeriodRate").css("color", '#32ffff');
        $("#compareSamePeriodImg").attr("src", downTrrigleArrowImg);
      }
      else if(samePeriod_val >= 0) {//上升粉色
        $("#compareSamePeriodVal").css("color", '#ffaaf0');
        $("#compareSamePeriodRate").css("color", '#ffaaf0');
        $("#compareSamePeriodImg").attr("src", upTrrigleArrowImg);
      }
      else {
        $("#compareSamePeriodVal").css("color", '#ffffff');
        $("#compareSamePeriodRate").css("color", '#ffffff');
      }
}

//年初，去年同期宽高兼容
function setCompareStyle() {
    //获取当前设备屏幕窗口的高宽
    var viewHeight = document.documentElement.clientHeight;
    // console.log(viewHeight);
    var viewWidth = document.documentElement.clientWidth;
    // console.log(viewWidth);

    var bodyHeight = viewHeight - 64;
    var cellHeight = bodyHeight * (135/1330);
    // console.log(cellHeight);
    
    //指标名
    var computerSwitcherH = parseFloat(bodyHeight*(110/1330));
    $(".module_switcher").height(computerSwitcherH);
    var computerSwitcherTitleH = parseFloat($(".module_switcher_title").height());
    $(".module_switcher_title").css('margin-top',(computerSwitcherH-computerSwitcherTitleH)/2);

    //日历
    $(".dateBorder").css('height',cellHeight);
    var dateAreaLineHeight = cellHeight + 'px';
    $(".dateBorder").css('line-height',dateAreaLineHeight);
    var dateFontSize = cellHeight/2;
    var dateFontSizeScale = cellHeight/2*0.9;
    var dateFontSizeIconScale = cellHeight/2*0.75;
    $(".date_area").css('font-size',dateFontSizeScale);
    $("#calendar").css('font-size','22px');
    $(".date_area div.date img").css('width',dateFontSizeIconScale);
    $(".date_area div.date img").css('height',dateFontSizeIconScale*0.9);

    //指标值区域

    var valueFontSize = cellHeight/2*0.8;
    //年初
    $(".beginningOfYearAndSameTime").css('font-size',dateFontSize);
    //更改值区域字体大小
    $(".beginningAndSameTimeValue").css('font-size',valueFontSize);
    $(".beginningOfYearRateValue").css('font-size',valueFontSize);
    $(".beginningOfYearRateValue").css('width',1/3*viewWidth*0.8);


    $(".beginningOfYearAndSameTimeBorder").css('height',cellHeight);
    $(".beginningAndSameTimeName").css('width',1/3*viewWidth);
    var beginningName = cellHeight + 'px';
    var beginningLine;
    if(ParamsData.method().getMobileSystem() == 1) {//andriod
      beginningLine = (cellHeight + 6) + 'px';
    }
    else {//ios
      beginningLine = (cellHeight + 2) + 'px';
    }
    $(".beginningAndSameTimeName").css('line-height',beginningName);
    //年初指标值
    $(".beginningAndSameTimeValue").css('width',0.725/3*viewWidth);
    $(".beginningAndSameTimeValue").css('height',beginningName);
    $(".beginningAndSameTimeValue").css('line-height',beginningLine);
    //比率
    $(".beginningAndSameTimeRate").css('width',1/3*viewWidth);
    $(".beginningAndSameTimeRate").css('height',cellHeight);
    $(".beginningAndSameTimeRate").css('line-height',beginningName);

    //单位
    $(".blank").css('height',(35/1330)*bodyHeight);
    $(".currencyAndUnit").css('height',(40/1330)*bodyHeight);
    $(".currencyUnit").css('width',1/3*viewWidth);
    $(".currencyUnit").css('line-height',(40/1330)*bodyHeight+'px');
    var currencyUnitFontSize = (40/1330)*bodyHeight/1.5;
    // console.log(currencyUnitFontSize);
    $(".currencyUnit").css('font-size',currencyUnitFontSize);
    
    var assetChartContainerHeight = viewHeight - 64 - 2*cellHeight - parseFloat($(".unit").css('height')) - parseFloat($(".moduleheader").css('height')) - parseFloat($(".date_area").css('height')) - parseFloat($(".val_area").css('height'));
    // console.log(assetChartContainerHeight);

    $(".assetChartContainer img").css('width',viewWidth);
    var offTop = $(".assetChartContainer").offset().top;
    // console.log(offTop);
    var chartImgHeight = viewHeight-offTop;
    // console.log(chartImgHeight);
    var assetChartHeight = (450/1330)*bodyHeight;
    $(".assetChartContainer").css('height',assetChartHeight);

    //关注
    $(".attention").css('height',(150/1330)*bodyHeight);
}

</script>

<style>
.dateBorder {
  height: 100%;
  border-bottom: 1px solid #737c88;
}

.beginningOfYearAndSameTime {
  width: 100%;
  font-size: 0px;
}
.beginningOfYearAndSameTimeBorder {
  /*border-bottom: 1px solid #737c88;*/
  border-bottom: 1px solid #4d5766;
}
.beginningAndSameTimeName {
  float: left;
  font-size: 20px;
  /*margin-left: 8px;*/
}
.beginningOfYearName {
  margin-left: 8px;
}
.beginningAndSameTimeValue {
  float: left;
  text-align: right;
  padding-right: 0px;
  font-size: 20px;
}
.beginningAndSameTimeRate {
  float:right;
  color:pink;
  /*margin-right: 4%;*/
}
.beginningOfYearRateImg {
  width: 20%;
  height: 100%;
  text-align: right;
  vertical-align: middle;
  float: left;
  position: relative;
}
.beginningOfYearRateImg img {
  width: 12px;
  height: 10px;
  position: absolute;
}
.beginningOfYearRateValue {
  width: 84px;
  height: 100%;
  text-align: right;
  font-size: 20px;
  margin-right: 8%;
  float: right;  
}
.beginningOfYearRateValue span {
  text-align: right;
}
.assetChartContainer {
  width: 100%;
  height: 150px;
  position: relative;
}
.assetChartContent {
  width: 100%;
  height: 100%;
}
.blank {
  width: 100%;
}
.currencyAndUnit {
  width: 100%;
  height: 18px;
}
.currencyUnit {
  width: 100px;
  line-height: 18px;
  font-size: 0px;
  float: left;
}
.currencyUnitDiv {
  margin-left: 8px;
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

.assetShadow {
  position: absolute;
  bottom: 25px;
  left: 12%;
  width: 84%;
  height: 50px;
  background-image: url(../../assets/images/shadow.png);
  background-size: 100%;
  opacity: .6;
}

.calendarImgDiv {
  float: right;
  margin-top: 1px;
}

.attentionBtn {
  position: absolute;
  text-align: center;
  width: 45%;
  height: 28px;
  line-height: 28px;
  margin:5% 27.5% 0;
  font-size: 20px;
  border-radius: 16px;
  background-color: #916f9d;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
}

.pieChartClass {
  width: 100%;
  height: 250px;
  border-bottom:0.5px solid #737c88;
}

.pieUnit {
  float:right;
  width:15px;
  height:15px;
  margin-top: -45px;
  margin-right: 20px;
  color:white;
  font-size:14px;
  /*z-index: 50;*/
}

</style>