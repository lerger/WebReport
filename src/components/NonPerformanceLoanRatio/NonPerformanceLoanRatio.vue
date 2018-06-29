<template>
  <div id="assets_commonheader" class="header">
    <cccommonheader :params="headerParams"></cccommonheader>
  </div>
  <div id="assets_moduleheader" class="moduleheader">
    <ccmoduleheader :params="moduleHeaderParams"></ccmoduleheader>
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
    <div id="asset_val" class="customFont">2788.00</div>
  </div>
  <!-- 上日 -->
  <div class="beginningOfYearAndSameTime">
    <div class="beginningOfYearAndSameTimeBorder">
      <div class="beginningAndSameTimeName">
        <div class="beginningOfYearName">比上日</div>
      </div>

      <div id="lastDayCompareVal" class="beginningAndSameTimeValue customFont" value="+115.38">0.00</div>

      <div class="beginningAndSameTimeRate">
        <div class="beginningOfYearRateImg">
          <img id="lastDayCompareImg" :src="upImg" />
        </div>
        <div class="beginningOfYearRateValue">
          <span id="lastDayCompareRate" class="customFont">117.35%</span>
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

      <div id="lastMonthCompareVal" class="beginningAndSameTimeValue customFont" value="+18.00">0.00</div>
      
      <div class="beginningAndSameTimeRate">
        <div class="beginningOfYearRateImg">
          <img id="lastMonthCompareImg" :src="upImg" />
        </div>
        <div class="beginningOfYearRateValue">
          <span id="lastMonthCompareRate" class="customFont">23.35%</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 同期 -->
  <div class="beginningOfYearAndSameTime">
    <div class="beginningOfYearAndSameTimeBorder">
      <div class="beginningAndSameTimeName">

        <div class="beginningOfYearName">比年初</div>

      </div>

      <div id="beginningYearOrLastYearCompareVal" class="beginningAndSameTimeValue customFont" value="-8.00">0.00</div>
      
      <div class="beginningAndSameTimeRate">
        <div class="beginningOfYearRateImg">
          <img id="beginningYearOrLastYearCompareImg" :src="upImg" />
        </div>
        <div class="beginningOfYearRateValue">
          <span id="beginningYearOrLastYearCompareRate" class="customFont">1.35%</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 监管 -->
  <div class="beginningOfYearAndSameTime">
    <div class="beginningOfYearAndSameTimeBorder">
      <div class="beginningAndSameTimeName">
        <div class="beginningOfYearName">监管</div>
      </div>
      <div class="beginningAndSameTimeRate">
        <div class="beginningOfYearRateValue">
          <span id="beginningYearOrLastYearCompareRate" class="customFont">1.35%</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 不良贷款率 -->
  <div class="beginningOfYearAndSameTime">
    <div class="beginningOfYearAndSameTimeBorder">
      <div class="beginningAndSameTimeName">
        <div class="beginningOfYearName">不良贷款率</div>
      </div>
      <div class="beginningAndSameTimeRate">
        <div class="beginningOfYearRateValue">
          <span id="beginningYearOrLastYearCompareRate" class="customFont">1.35%</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 单位 -->
  <!-- <div class="blank"></div>
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
  <div class="blank"></div> -->
  <!-- 图表 -->
  <div class="assetChartContainer">
    <div id="assetChart" class="assetChartContent"></div>
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
    <div class="attentionBtn" @click="attention($event)">关注</div>
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
// import datePicker from '../../datePicker'
import DatePicker from '../Assets/DatePicker'
import NonPerformanceLoanRatioChart from './NonPerformanceLoanRatioChart'

var m_title = "不良贷款";
var m_heardTitle = "不良贷款率";
var theSelectData;
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
      moduleHeaderParams: {title:m_title, allmodule:["资产总额", "每日关注", "每月关注", "存款客户数", "贷款客户数", "不良贷款余额", "不良贷款率"], alllink:['index_assets']}
    }
  }, 
  methods: {
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
      console.log('calendarSelect');
      console.log(datePicker);
    },
    //关注
    attention: function(event) {
      console.log(event);
    }
  },
  ready() {
    $(".cccommontitle").text(m_heardTitle);

    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
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
    GetDay();
    suit();

    //设置三角箭头居中
    var comValueHeight = $(".beginningOfYearName").height();
    $(".beginningOfYearRateImg img").css("top", (comValueHeight-10)/2);
    $(".beginningOfYearRateImg img").css("right", 0);

    var colWidth = $(".beginningOfYearAndSameTime").width() / 3;
    var rightWidth = $(".beginningOfYearRateValue").width();
    var rightMargin = parseFloat($(".beginningOfYearRateValue").css("margin-right"));
    var curWidth = colWidth-rightWidth-rightMargin;
    $(".beginningOfYearRateImg").css("width", curWidth);

    var lday_val = parseFloat($("#lastDayCompareVal").attr('value'));
    var lmonth_val = parseFloat($("#lastMonthCompareVal").attr('value'));
    var year_val = parseFloat($("#beginningYearOrLastYearCompareVal").attr('value'));

    $("#lastDayCompareVal").text(Math.abs(lday_val).toFixed(2));
    $("#lastMonthCompareVal").text(Math.abs(lmonth_val).toFixed(2));
    $("#beginningYearOrLastYearCompareVal").text(Math.abs(year_val).toFixed(2));

    if(lday_val < 0) {//下降绿色
      $("#lastDayCompareVal").css("color", '#32ffff');
      $("#lastDayCompareRate").css("color", '#32ffff');
      $("#lastDayCompareImg").attr("src", this.downImg);
    }
    else if(lday_val > 0) {//上升粉色
      $("#lastDayCompareVal").css("color", '#ffaaf0');
      $("#lastDayCompareRate").css("color", '#ffaaf0');
      $("#lastDayCompareImg").attr("src", this.upImg);
    }
    else {
      $("#lastDayCompareVal").css("color", '#ffffff');
      $("#lastDayCompareRate").css("color", '#ffffff');
    }

    if(lmonth_val < 0) {//下降绿色
      $("#lastMonthCompareVal").css("color", '#32ffff');
      $("#lastMonthCompareRate").css("color", '#32ffff');
      $("#lastMonthCompareImg").attr("src", this.downImg);
    }
    else if(lmonth_val > 0) {//上升粉色
      $("#lastMonthCompareVal").css("color", '#ffaaf0');
      $("#lastMonthCompareRate").css("color", '#ffaaf0');
      $("#lastMonthCompareImg").attr("src", this.upImg);
    }
    else {
      $("#lastMonthCompareVal").css("color", '#ffffff');
      $("#lastMonthCompareRate").css("color", '#ffffff');
    }

    if(year_val < 0) {//下降绿色
      $("#beginningYearOrLastYearCompareVal").css("color", '#32ffff');
      $("#beginningYearOrLastYearCompareRate").css("color", '#32ffff');
      $("#beginningYearOrLastYearCompareImg").attr("src", this.downImg);
    }
    else if(year_val > 0) {//上升粉色
      $("#beginningYearOrLastYearCompareVal").css("color", '#ffaaf0');
      $("#beginningYearOrLastYearCompareRate").css("color", '#ffaaf0');
      $("#beginningYearOrLastYearCompareImg").attr("src", this.upImg);
    }
    else {
      $("#beginningYearOrLastYearCompareVal").css("color", '#ffffff');
      $("#beginningYearOrLastYearCompareRate").css("color", '#ffffff');
    }
    // drawTriangle();

    //请求数据
    var url = 'http://localhost:8088/month210'
    var pointId = 'FILA00021';
    // $.post(url,null,function(result){
    //   console.log(result);
    // },'json');

    NonPerformanceLoanRatioChart.method().init();
    NonPerformanceLoanRatioChart.method().setData(url,pointId);
    console.log();

  }
}

//获取当前日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

    // var currentDate = getNowFormatDate();
    $("#calendar").text(currentdate);
    //📅
    var vdp = window.datePicker;
    console.log(vdp);
    var cal = new vdp();
    console.log(cal);
    cal.init({
      'trigger': '#dateClick', /*按钮选择器，用于触发弹出插件*/
      'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
      'minDate':'1997-1-1',/*最小日期*/
      'maxDate':currentdate,/*最大日期*/
      'onSubmit':function(){/*确认时触发事件*/
        var theSelectData=cal.value;
      },
      'onClose':function(){/*取消时触发事件*/
      }
    });
    // return currentdate;
}

//获取当前日期前一天日期
function GetDay() {   
    var today=new Date();      
    var yesterday_milliseconds=today.getTime()-1000*60*60*24;    

    var yesterday=new Date();      
    yesterday.setTime(yesterday_milliseconds);      
        
    var strYear=yesterday.getFullYear(); 

    var strDay=yesterday.getDate();
    console.log(yesterday,strDay);   
    var strMonth=yesterday.getMonth()+1;
    console.log(yesterday,strMonth); 
    var year = yesterday.getFullYear();
    year = year - 2;
    console.log(year);
    var startDate = year + "-01" + "-01";
    console.log(startDate);

    if(strMonth<10)   
    {   
      strMonth="0"+strMonth;   
    }
    if (strDay<10) {
      strDay="0"+strDay;
    }   
    var strYesterday=strYear+"-"+strMonth+"-"+strDay;   
    
    $("#calendar").text(strYesterday);
    //📅
    var vdp = window.datePicker;
    console.log(vdp);
    var cal = new vdp();
    console.log(cal);
    cal.init({
      'trigger': '#dateClick', /*按钮选择器，用于触发弹出插件*/
      'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
      'minDate':startDate,/*最小日期*/
      'maxDate':strYesterday,/*最大日期*/
      'onSubmit':function(){/*确认时触发事件*/
        theSelectData=cal.trigger.value;
        //按下确定按钮根据时间与当前用户ID，指标点ID请求数据
        console.log('按下确定按钮后的时间',theSelectData);
        var url = 'http://localhost:8088/month210'
        var pointId = 'FILA00021';
        NonPerformanceLoanRatioChart.method().init();
        NonPerformanceLoanRatioChart.method().setData();
      },
      'onClose':function(){/*取消时触发事件*/
        console.log('取消时触发事件');
      }
    });
}

//年初，去年同期宽高兼容
function suit() {
    //获取当前设备屏幕窗口的高宽
    var viewHeight = document.documentElement.clientHeight;
    console.log(viewHeight);
    var viewWidth = document.documentElement.clientWidth;
    console.log(viewWidth);

    var bodyHeight = viewHeight - 64;
    var cellHeight = bodyHeight * (100/1330);
    console.log(cellHeight);
    
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
    $(".date_area").css('font-size',dateFontSize);
    $(".date_area div.date img").css('width',dateFontSize);
    $(".date_area div.date img").css('height',dateFontSize);

    //指标值区域


    //年初
    $(".beginningOfYearAndSameTime").css('font-size',dateFontSize);

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
    console.log(currencyUnitFontSize);
    $(".currencyUnit").css('font-size',currencyUnitFontSize);
    

    console.log($(".moduleheader").css('height'));
    console.log($(".date_area").css('height'));
    console.log($(".val_area").css('height'));
    console.log($(".unit").css('height'));
    var assetChartContainerHeight = viewHeight - 64 - 2*cellHeight - parseFloat($(".unit").css('height')) - parseFloat($(".moduleheader").css('height')) - parseFloat($(".date_area").css('height')) - parseFloat($(".val_area").css('height'));
    console.log(assetChartContainerHeight);

    $(".assetChartContainer img").css('width',viewWidth);
    var offTop = $(".assetChartContainer").offset().top;
    console.log(offTop);
    var chartImgHeight = viewHeight*0.2729;
    // var chartImgHeight = 200;
    console.log(chartImgHeight);
    $(".assetChartContainer").css('height',chartImgHeight);

    //关注
    $(".attention").css('height',(150/1330)*bodyHeight);
}

//画三角形
function drawTriangle() {
    var canvas=document.getElementById("canvas");
    var cxt=canvas.getContext("2d");
    cxt.fillStyle="pink";

    // cxt.beginPath();
    // cxt.moveTo(25,5);
    // cxt.lineTo(100,5);
    // cxt.lineTo(62.5,68.75);
    // cxt.closePath();//填充或闭合 需要先闭合路径才能画
    //空心三角形
    // cxt.strokeStyle="red";
    // cxt.stroke();
    //实心三角形向下箭头
    cxt.beginPath();
    cxt.moveTo(85,45);
    cxt.lineTo(185,45);
    cxt.lineTo(135,100);
    cxt.closePath();
    cxt.fill();

    //去年同期指示箭头图形
    var canvas=document.getElementById("canvasLastYear");
    var cxt=canvas.getContext("2d");
    cxt.fillStyle="#32ffff";
    cxt.beginPath();
    cxt.moveTo(85,45);
    cxt.lineTo(185,45);
    cxt.lineTo(135,100);
    cxt.closePath();
    cxt.fill();
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
  top:91%;
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
  height: 32px;
  line-height: 32px;
  margin:4% 27.5% 0;
  font-size: 20px;
  border-radius: 16px;
  background-color: #90719c;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
}
</style>