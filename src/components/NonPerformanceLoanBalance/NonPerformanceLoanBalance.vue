<template>
  <div id="assets_commonheader" class="header">
    <cccommonheader :params="headerParams"></cccommonheader>
  </div>
  <div id="assets_moduleheader" class="moduleheader">
    <ccmoduleheader :params="moduleHeaderParams" :callback="callback"></ccmoduleheader>
  </div>
  <div id="dateClick" class="date_area">
    <div class="dateBorder">
      <div class="name">{{headerParams.title}}</div>
      <div class="date">
        <span id="calendar">2017-02-02</span>
        <div class="calendarImgDiv">
        <img :src="calendarButton.icon" id="calendarImg">
        </div>
      </div>
    </div>
  </div>
  <div class="val_area">
    <div id="asset_val" class="customFont" value="0.00">0.00</div>
  </div>
  <!-- 上日 -->
  <div class="beginningOfYearAndSameTime">
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
  <div class="beginningOfYearAndSameTime">
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
  <div class="beginningOfYearAndSameTime">
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
  <div class="beginningOfYearAndSameTime">
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
  <!-- 单位 -->
  <div class="blank"></div>
  <div class="currencyAndUnit">
    <div class="currencyUnit">
      <div class="currencyUnitDiv">
        币种：折人民币
      </div>
    </div>
  </div>
  <div class="currencyAndUnit">
    <div class="currencyUnit">
      <div class="currencyUnitDiv">
        单位：亿元
      </div>
    </div>
  </div>
  <div class="blank"></div>
  <!-- 图表 -->
  <div class="assetChartContainer">
    <div id="NPLChart" class="assetChartContent"></div>
    <!-- <div id="uperBgId" class="bg"></div> -->
    <div id="assetXBlackBg" class="xBlackBg">
      <div id="monthUpperId" class="xAxisDivUper"></div>
    </div>
   <!--  <div class="assetShadow">
    </div> -->
    <!-- <img :src="chartImg.icon"> -->
  </div>
  <!-- 关注 -->
  <div class="attention">
    <div class="attentionBtn" @click="attention($event)">取消关注</div>
  </div>
</template>

<script>

import Vue from 'vue'
import router from '../../routers';
import Params from '../../routersParam'
import ParamsData from '../../js/params_data'
import $ from 'jquery'
import Header from '../Common/CommonHeader.vue'
import ModuleHeader from '../Common/ModuleHeader.vue'
// import datePicker from '../../js/datePicker'
import DatePicker from '../Assets/DatePicker'
import NonPerformanceLoanBalanceChartModule from './NonPerformanceLoanBalanceChart'

var m_title = "资产总额";

var theSelectData;
//页面传值指标编码
var indexNo;
//页面传值指标名称
var indexName;
//日历日期（昨天及选择日期）
// var date;
//指标值单位
var unit = 1;
//是否已关注状态
var attentionState;
//上升下降三角形图片
var downTrrigleArrowImg;
var upTrrigleArrowImg;

// var cal = new datePicker();
//   console.log(cal);
// cal.init({
//   'trigger': '#demo1', /*按钮选择器，用于触发弹出插件*/
//   'type': 'date',模式：date日期；datetime日期时间；time时间；ym年月；
//   'minDate':'1900-1-1',最小日期
//   'maxDate':'2100-12-31',/*最大日期*/
//   'onSubmit':function(){/*确认时触发事件*/
//     var theSelectData=cal.value;
//   },
//   'onClose':function(){/*取消时触发事件*/
//   }
// });


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
      callback: { data: getDetailRequestData, chart: postChartData },
    }
  },
  methods: {
    getDetailRequest: function() {
        getDetailRequestData(indexNo,theSelectData);
    },
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
        $(".timer").fadeIn();
         var url = ParamsData.method().getCloseAttentionUrl();
         var data = {userNo:window.localStorage.userid,indexNos:indexNo};    //key/value参数
         // console.log(data);
        $.post(url,data,(result)=>{
          $(".timer").fadeOut();
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
         $(".timer").fadeIn();
          var addAttentionUlr = ParamsData.method().getAddAttentionUrl();

          var params = {userNo:window.localStorage.userid, indexNos:indexNo}; 
          $.post(addAttentionUlr, params, function(result){
            $(".timer").fadeOut();
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
      

    }
  },
  ready() {
    console.log('33333')
    $('body').css({'overflow-y': 'auto'});
    //获取客户端设备DOM宽高
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    //上升下降三角形图片
    downTrrigleArrowImg = this.downImg;
    upTrrigleArrowImg = this.upImg;
    
    var allPointNameArray = [];
    //模块切换页面item文本可显示个数
    var itemWidth = parseInt(width*0.84*0.8);
    var itemFont = parseInt($(".switcher_item").css('font-size'));
    var textCount = parseInt(itemWidth/itemFont);

    //页面传值(路由配置文件中配置)
    // console.log(this.$route.params.pointNo);
    indexNo = this.$route.params.pointNo;
    indexName = this.$route.params.pointName;
    attentionState = this.$route.params.attentionState;
    if (attentionState == 1) {
         $(".attentionBtn").text('取消关注')
    }
    else{
      $(".attentionBtn").text('关注')
    }

    //模块标题适配

    var moduleTitleWidth = parseInt($(".module_switcher_title").css('width'))*0.6;
    var moduleTitleFont = parseInt($(".module_switcher_title").css('font-size'));
    // console.log(moduleTitleWidth);
    // console.log(moduleTitleFont);
    var mouduleTitleCount = parseInt(moduleTitleWidth/moduleTitleFont);
    // console.log(mouduleTitleCount);
    if (indexName.length>mouduleTitleCount) {
      indexName = indexName.substring(0,mouduleTitleCount)+'...';
    }

    var nameTitleWidth = parseInt($(".name").css('width'));
    var nameFont = parseInt($(".name").css('font-size'));
    var nameCount = parseInt(nameTitleWidth/nameFont);
    // console.log(nameCount);
    if (indexName.length>nameCount) {
      indexName = indexName.substring(0,mouduleTitleCount)+'...';
    }  
    $(".moduleName").text(indexName);

    $(".name").html(indexName);

    
    $(".cccommontitle").text(ParamsData.method().getAppTitle());

    
    //平台兼容性处理
    var areaHeight = 0;
    var areaMargin = 0;

    if(ParamsData.method().getMobileSystem() != 1) {
      areaHeight = width/3.3;
      areaMargin = areaHeight*0.03;

      $(".val_area").css("font-size", areaHeight + "px");
      $(".val_area div").css("height", areaHeight + "px");
      $(".val_area div").css("line-height", areaHeight + "px");
      $(".val_area div").css("margin-top", areaMargin + "px");
      $(".val_area div").css("margin-bottom", areaMargin + "px");
    }
    else {
      areaHeight = width/3.8;
      areaMargin = areaHeight*0.1;
      var areaLineHeight = areaHeight+areaHeight*0.25;

      $(".val_area").css("font-size", areaHeight + "px");
      $(".val_area div").css("height", areaHeight + "px");
      $(".val_area div").css("line-height", areaLineHeight + "px");
      $(".val_area div").css("margin-top", areaMargin + "px");
      $(".val_area div").css("margin-bottom", areaMargin + "px");
    }
    
    //获取当前日期
    getDay();
    //年初，去年同期宽高字体等样式随设配适配兼容
    setCompareStyle();
    //比上日，比上月，比年初，比同期渲染
    setTrrigleArrow();
    //比上日，比上月，比年初，比同期数据请求及显示
    getDetailRequestData(indexNo,theSelectData);
    //模块切换页面数据请求
    var url = ParamsData.method().getQueryIndexListUrl();
    $.post(url,null,function(result){
      // console.log(result);
      // console.log(result[0]);
      var pointArray = result[0].retBody;     
      for (var i = pointArray.length - 1; i >= 0; i--) {
        if (pointArray[i].indexName.length>textCount) {
          pointArray[i].indexName = pointArray[i].indexName.substring(0,textCount-3) + '...';
        }
        allPointNameArray.push(pointArray[i]);
      }
      allPointNameArray.reverse();    
    }, 'json');
    this.moduleHeaderParams = allPointNameArray;

    postChartData(indexNo, theSelectData);

  }
}
   
function postChartData(selectedNo, date) {
    //请求数据
    var findUrl = ParamsData.method().queryIndexList();
    // var url = 'http://localhost:8088/FASS00066';
    var postDates = ParamsData.method().generateFormatDateFrom13Months(new Date(date));
    var postData = {userNo:window.localStorage.userid,indexNos:selectedNo,currency:'CN',dates: postDates};
    // console.log("postDates:");console.log(postData);
    NonPerformanceLoanBalanceChartModule.method().init();

    $.post(findUrl, postData, function(resultData) {
      NonPerformanceLoanBalanceChartModule.method().setData(resultData, postData);
      getDetailRequestData(indexNo,theSelectData);

    },'json');
}

//获取当前日期
// function getNowFormatDate() {
//     var date = new Date();
//     var seperator1 = "-";
//     var seperator2 = ":";
//     var month = date.getMonth() + 1;
//     var strDate = date.getDate();
//     if (month >= 1 && month <= 9) {
//         month = "0" + month;
//     }
//     if (strDate >= 0 && strDate <= 9) {
//         strDate = "0" + strDate;
//     }
//     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

//     // var currentDate = getNowFormatDate();
//     $("#calendar").text(currentdate);
//     //📅
//     var vdp = window.datePicker;
//     // console.log(vdp);
//     var cal = new vdp();
//     // console.log(cal);
//     cal.init({
//       'trigger': '#dateClick', /*按钮选择器，用于触发弹出插件*/
//       'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
//       'minDate':'1997-1-1',/*最小日期*/
//       'maxDate':currentdate,/*最大日期*/
//       'onSubmit':function(){/*确认时触发事件*/
//         theSelectData=cal.value;

//       },
//       'onClose':function(){/*取消时触发事件*/
//       }
//     });
//     // return currentdate;
// }

//获取当前日期前一天日期
function getDay(downImg,upImg) {   
    var today=new Date();      
    var yesterday_milliseconds=today.getTime()-1000*60*60*24;    

    var yesterday=new Date();      
    yesterday.setTime(yesterday_milliseconds);      
        
    var strYear=yesterday.getFullYear(); 

    var strDay=yesterday.getDate();
    // console.log(yesterday,strDay);   
    var strMonth=yesterday.getMonth()+1;
    // console.log(yesterday,strMonth); 
    var year = yesterday.getFullYear();
    year = year - 2;
    // console.log(year);
    var startDate = year + "-01" + "-01";
    // console.log(startDate);

    if(strMonth<10)   
    {   
      strMonth="0"+strMonth;   
    }
    if (strDay<10) {
      strDay="0"+strDay;
    }   
    var strYesterday=strYear+"-"+strMonth+"-"+strDay;   
    
    $("#calendar").text(strYesterday);
    theSelectData = strYesterday;
    
    //📅
    var vdp = window.datePicker;
    // console.log(vdp);
    var cal = new vdp();
    // console.log(cal);
    cal.init({
      'trigger': '#dateClick', /*按钮选择器，用于触发弹出插件*/
      'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
      'minDate':startDate,/*最小日期*/
      'maxDate':strYesterday,/*最大日期*/
      'onSubmit':function(){/*确认时触发事件*/
        theSelectData=cal.trigger.value;
        //按下确定按钮根据时间与当前用户ID，指标点ID请求数据
        // console.log('按下确定按钮后的时间',theSelectData);
        // getDetailRequestData(indexNo,theSelectData);
        
        postChartData(indexNo, theSelectData);
        //月份数据请求
        // var url = 'http://localhost:8088/FASS00066';

        // assetChartModule.method().init();
        // assetChartModule.method().setData();

      },
      'onClose':function(){/*取消时触发事件*/
        // console.log('取消时触发事件');
      }
    });
}

//
function getMonthLastDayDate(year,month) {
  var new_year = year;  //取当前的年份     
  var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）     
  if(month>12)      //如果当前大于12月，则年份转到下一年     
  {     
    new_month -=12;    //月份减     
    new_year++;      //年份增     
  }     
  var new_date = new Date(new_year,new_month,1);        //取当年当月中的第一天     
  return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期 
}

//比上日，上月，年初，同期数据请求（indexNo:指标编号，date:日期）
function getDetailRequestData(indexNo, paramDate) {
    //比上日，比上月，比年初，比同期
    console.log('getDetailRequestData:');

    var url = ParamsData.method().getFindByConditionUrl();
    var pdate = paramDate.substring(0,4)+paramDate.substring(5,7)+paramDate.substring(8,10);
    // var tmpDate = paramDate.replace(/-/g, '');
    var postData = {userNo:window.localStorage.userid, indexNo:indexNo, currency:'CN', date:pdate, supervise:12};

    console.log("555:");
    console.log(paramDate);
    $.post(url, postData, function(resultData){
      // $(".timer").fadeOut();

      console.log(resultData);
      $("#asset_val").attr('value', resultData[0].retBody.idxVal);
      $("#lastDayCompareVal").attr('value', resultData[0].retBody.compaerUpDate);
      $("#lastDayCompareRate").attr('value', resultData[0].retBody.upDatePercent);
      $("#lastMonthCompareVal").attr('value', resultData[0].retBody.compaerUpMonth);
      $("#lastMonthCompareRate").attr('value', resultData[0].retBody.upMonthPercent);
      $("#beginningYearOrLastYearCompareVal").attr('value', resultData[0].retBody.compaerUpYear);
      $("#beginningYearOrLastYearCompareRate").attr('value', resultData[0].retBody.upYearPercent);
      $("#compareSamePeriodVal").attr('value', resultData[0].retBody.compaerUpTime);
      $("#compareSamePeriodRate").attr('value', resultData[0].retBody.upTimePercent);
      setTrrigleArrow();
      
    },'json');
}

//比上日，上月，年初，同期渲染
function setTrrigleArrow() {
  //设置三角箭头居中
      var comValueHeight = $(".beginningOfYearName").height();
      $(".beginningOfYearRateImg img").css("top", (comValueHeight-10)/2);
      $(".beginningOfYearRateImg img").css("right", 0);

      var colWidth = $(".beginningOfYearAndSameTime").width() / 3;
      var rightWidth = $(".beginningOfYearRateValue").width();
      var rightMargin = parseFloat($(".beginningOfYearRateValue").css("margin-right"));
      var curWidth = colWidth-rightWidth-rightMargin;
      $(".beginningOfYearRateImg").css("width", curWidth);

      // $("#lastDayCompareVal").attr('value',result[0].retBody.compareUpDate);
      // $("#lastMonthCompareVal").attr('value',result[0].retBody.compareUpMonth);
      // $("#beginningYearOrLastYearCompareVal").attr('value',result[0].retBody.compareUpYear);
      // $("#compareSamePeriodVal").attr('value',result[0].retBody.compareUpTime);
      var asset_val = parseFloat($("#asset_val").attr('value'));
      var lday_val = parseFloat($("#lastDayCompareVal").attr('value'));
      var lmonth_val = parseFloat($("#lastMonthCompareVal").attr('value'));
      var year_val = parseFloat($("#beginningYearOrLastYearCompareVal").attr('value'));
      var samePeriod_val = parseFloat($("#compareSamePeriodVal").attr('value'));

      // console.log('asset_val',asset_val);
      // console.log('lday_val',lday_val);
      // console.log('lmonth_val',lmonth_val);
      // console.log('year_val',year_val);
      // console.log('samePeriod_val',samePeriod_val);

      var lday_rate = parseFloat($("#lastDayCompareRate").attr('value'));
      var lmonth_rate = parseFloat($("#lastMonthCompareRate").attr('value'));
      var year_rate = parseFloat($("#beginningYearOrLastYearCompareRate").attr('value'));
      var samePeriod_rate = parseFloat($("#compareSamePeriodRate").attr('value'));

      // console.log('lday_rate',lday_rate);
      // console.log('lmonth_rate',lmonth_rate);
      // console.log('year_rate',year_rate);
      // console.log('samePeriod_rate',samePeriod_rate);

      $("#asset_val").text(Math.abs(asset_val).toFixed(2));
      $("#lastDayCompareVal").text(Math.abs(lday_val).toFixed(2));
      $("#lastMonthCompareVal").text(Math.abs(lmonth_val).toFixed(2));
      $("#beginningYearOrLastYearCompareVal").text(Math.abs(year_val).toFixed(2));
      $("#compareSamePeriodVal").text(Math.abs(samePeriod_val).toFixed(2));

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
    var cellHeight = bodyHeight * (100/1330);
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
    $("#calendar").css('font-size',dateFontSize);
    $(".date_area div.date img").css('width',dateFontSizeIconScale);
    $(".date_area div.date img").css('height',dateFontSizeIconScale);

    //指标值区域

    var valueFontSize = cellHeight/2*1.1;
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
    

    // console.log($(".moduleheader").css('height'));
    // console.log($(".date_area").css('height'));
    // console.log($(".val_area").css('height'));
    // console.log($(".unit").css('height'));
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
  /*height:40px;*/
  /*border-bottom:1px solid #737c88;*/
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
  position: relative;
  height: 150px;
}
.assetChartContent {
  width: 100%;
  height: 100%;
}
.blank {
  width: 100%;
}
.currencyAndUnit {
  
}
.currencyUnit {
  float: right;
}
.currencyUnitDiv {
  margin-left: 10%;
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
</style>