<script type="text/javascript">
import Echart from 'echarts'
import Data from 'src/js/data'
import $ from 'jquery'
import ParamsData from 'src/js/params_data'
import PieChart from './PieChart'
import retailManage from 'src/js/retailBusinessBranchManage.vue'
//客户经理视图界面展示服务
import CustomerViewService from 'components/CustomerManagerView/CustomerViewService.vue'
var assetChartMapContainer;
  var myChartAsset;
  let unit = 100000000;
  var symbolClick = 'image://'+require('../../assets/images/point_color/circle_tail_day_common.png');
  // var symbolClick = 'path://M0,0 L0,1 L1,1 L1,0 L0,0 z';
  var symbol = 'image://'+require('../../assets/images/point_color/circle_tail_day1.png');
  var symbolCpmpareLastMonth = 'image://'+require('../../assets/images/point_color/circle_tail_day2.png');
  var symbolCompareLastDay = 'image://'+require('../../assets/images/point_color/circle_tail_day3.png');
  var option;
  var isFirst = true;
  var showMaxValue = 0;
  var currentUnit;

  var downTrrigleArrowImg = require('../../assets/images/arrow_down.png');
  var upTrrigleArrowImg = require('../../assets/images/arrow_up.png');

//季度图表初始日期
var seasonInitDateArray = ['2016-06-30', '2016-09-30', '2016-12-31', '2017-03-31', '2017-06-30'];

  var assetChartOption = {
    color: ['#106df4'],
    grid: {
      show: true,
      top: '3%',
      bottom: '0%',
      left: '1%',
      right: '3%',
      // backgroundColor:'transparent',
      backgroundColor: 'rgb(255,0,0)',
      borderColor:'transparent'
    },
    legend: {
      show: false,
      right: '0%',
      bottom: '10%',
      orient: 'horizontal',
      data: [{
          name: '资产',
          // 强制设置图形为圆。
          icon: 'line',
          // 设置文本为红色
          textStyle: {
              color: 'white'
          }
      }]
    },
    calculable: true,
    grid: {
        left: '3%',
        right: '0%',
        bottom: '3%',
        top: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        axisLabel : {
          show: true,
          interval: 4,
          textStyle : {
            color : '#b9babc',
            align : 'center'
          },
          formatter: function (value, index) {
            // var date = new Date(value);
            // var texts = [(date.getMonth() + 1), date.getDate()];
            // if (index === 0) {
            //     texts.unshift(date.getYear());
            // }
            // return texts.join('/');
            var day = parseInt(value.split('-').pop());
            return day;
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#474c4e']
          }
        },
        axisLine: {
          //不显示X轴
          show: false,
        },
        boundaryGap: true,
        axisTick: {
          show: false,
          alignWithLabel: true,
          interval: 0
        },
        data: ['2016-08-15', '2016-08-16', '2016-08-17', '2016-08-18', '2016-08-19', '2016-08-20', '2016-08-21', '2016-08-22', '2016-08-23', '2016-08-24', '2016-08-25', '2016-08-26', '2016-08-27', '2016-08-28', '2016-08-29', 
          '2016-08-30', '2016-09-01', '2016-09-02', '2016-09-03', '2016-09-04', '2016-09-05', '2016-09-06', '2016-09-07', '2016-09-08', '2016-09-09', '2016-09-10', '2016-09-11', '2016-09-12', '2016-09-13', '2016-09-14']
    }],
    yAxis: [{
        type: 'value',
        min: '1950',
        max: '2300',
        interval: 50,
        boundaryGap: ['50','50%'],
        splitArea: {
            // show: true,
            // areaStyle: {
            //   color: ['red']
            // }
        },
        splitLine: {
          show: true,
          lineStyle: {
            //分割线颜色
            color: ['#3f4c5e']
          }
        },
        splitArea: {
          show: false,
          areaStyle: {
            // color: ['rgba(44,51,61,0.5)','rgba(0,0,0,0.8)']
            color: ['rgb(31,40,47)','rgb(24,33,40)'],
            // color: ['rgb(33,39,40)','rgb(26,32,40)'],
          }
        },
        axisLine: {
          //不显示Y轴
          show: false,
        },
        axisLabel : {
          show : true,
          margin: 5,
          textStyle : {
            color : '#ffffff',
            align : 'right',
            fontSize: 13
          },
          // lineStyle: {

          // },
          formatter: function(value,index) {
            // console.log(value,index);
            var val = value.toString();
            var re = /(?=(?!\b)(\d{3})+$)/g;
            val = val.replace(re, ',');
            if (index%2 == 0) {
              val = null;
            }  
            return val;
          },
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
          interval: 0
        }
    }]
  };


function init() {
  // console.log('init');
	assetChartMapContainer = document.getElementById('assetChart');
    myChartAsset = Echart.init(assetChartMapContainer);
    myChartAsset.setOption(assetChartOption);
    myChartAsset.setOption({
      tooltip : {
        show: false,
        showContent: true,
        trigger: 'axis',
        triggerOn: 'click',
        alwaysShowContent: true,
        position: ['50%','0%'],
        formatter: function (params, ticket, callback) {

          
          // var showUnitDiv = showSeriesInfo('0.00','116df4');
          // $(".assetUnitDiv").html(showUnitDiv);

          // return 0; 
        },
        backgroundColor: "#010102",
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      series: [{
        name: '资产',
        type: 'line',
        smooth: true,
        stack: '资产',
        label: {
          normal: {
              show: false,
              position: 'top',
              formatter: function(params, ticket, callback) {
                var curDate = new Date();
                var curMonth = curDate.getMonth();  //获取当前月份(0-11,0代表1月)
                var curDay = curDate.getDate();  //获取当前日(1-31)
                var selectDate = params.name;
                var selectMonth = selectDate.split('-')[1];
                var selectDay = selectDate.split('-')[2];
                selectMonth = parseInt(selectMonth);
                selectDay = parseInt(selectDay);
                return selectMonth + "月" + selectDay + "日";
              },
              textStyle: {
                color: '#ffffff',
                fontSyle: 'normal',
                fontWeight: 'bold',
                fontSize: 16,
                fontFamily: 'Arial'
              }
          }
        },
        areaStyle: {
          normal: {
            color: '#000000',
            opacity: 0.4
          }
        },
        lineStyle: {
          normal:{
            curveness: 0
          }
        },
        // showSymbol: false,
        // symbol: 'image://'+Data.data().click_show,
        // symbolSize: [18, 18],
        // legendHoverLink: true,
        data: [0]
      }]
    });
}

function setData(selectedNo, upArray, downArray, unitName, allThis, seriesArray, identify,alarm_val,criticalVal,wclArray,pmArray,zsArray,cascFlag) {

  //季度指标根据返回的最近日期显示在日历上
  var backDate = upArray[upArray.length-1].date;
  var backSubDate = backDate.substring(0,4) + '-' + backDate.substring(4,6) + '-' + backDate.substring(6,8);
  if (identify == 1 || identify == 0) {
    setTimeout(()=>{
      $("#calendar").text(backSubDate);
    },1200);
  }
  currentUnit = unitName;
  // console.log(currentUnit);
	// console.log('upArray', upArray);
  // console.log('downArray', downArray);
  // console.log('currentUnit', currentUnit);
  // console.log('identify', identify);
  setDetail(upArray[upArray.length-1]);
	var xInterval = 1;
  var valArray = [];
  var unit = downArray[0].unit;
  // console.log('232323232',unit)
  $("#unitId").text('单位：'+unit);
  if (unit == '亿'||unit =='万' ) {
    $("#unitId").text('单位：'+unit+ '元');
  }
  
  // var timeArray = ['2016-03-31', '2016-04-30', '2016-05-31', '2016-06-30', '2016-07-31', '2016-08-31', '2016-09-30', '2016-10-31', '2016-11-30', '2016-12-31', '2017-01-31', '2017-02-28', '2016-03-31'];
  var timeArray = [];
  // var splitDateArray = data.dates.split(',');
  for (var i = downArray.length - 1; i >= 0; i--) {
    timeArray[i] = downArray[i].date.substring(0,4) + '-' + downArray[i].date.substring(4,6) + '-' + downArray[i].date.substring(6,8);
  }
  // console.log(timeArray);
	for (var i = downArray.length - 1; i >= 0; i--) {
    valArray[i] = parseFloat(downArray[i].value);
    if (downArray[i].value == null) {
      valArray[i] = 0.00;
    }
  }
	// console.log(valArray);
	// var valArray = [1,2,3,4,5,6,7,6,5,2,6,7,3];
  // timeArray = ['2016-01-31','2016-02-29','2016-03-31', '2016-04-30', '2016-05-31', '2016-06-30', '2016-07-31', '2016-08-31', '2016-09-30', '2016-10-31', '2016-11-30', '2016-12-31', '2017-01-31'];
  var sourceTimeArray = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
  var timeArrays = [];
  for (var i = 0; i < timeArray.length; i++) {
    var showMonthIndex = parseInt(timeArray[i].split('-')[1])-1;;
    timeArrays.push(sourceTimeArray[showMonthIndex]);
  };

  // console.log('timeArrays',timeArrays);

  //计算图表两种颜色所占比例

  var blueRate;

  var janararyIndex = timeArrays.selectIndex('一月');
  if (identify == 1) {
    janararyIndex = timeArrays.selectIndex('十二月');
    if (timeArrays[0] == '十二月') {
      janararyIndex = 4;
    }
    blueRate = (janararyIndex+1)/5;
  }
  else {
    if (timeArrays[0] == '一月') {
      janararyIndex = 12;
    }
    blueRate = (janararyIndex+1)/13;
  }
  
  // console.log('janararyIndex',janararyIndex);
  // var blueRate = (janararyIndex+1)/13;
  // console.log('blueRate',blueRate);

  blueRate = blueRate.toFixed(6);
  // console.log('blueRate',blueRate);

  // blueRate = parseFloat(blueRate);
  // console.log('blueRate',blueRate);
  
  var markPointDataArray = markPoint(valArray,timeArrays,symbol);

  var chartType = 'line';
  var isShowLable = true;
  var Issymbol = symbolClick;
  var markPointData = markPointDataArray;
  var CordonyAxis = -20;

  var opacity = 0;
  var isShowOpacityLable = false;
  var regulatoryIndexArray =  CustomerViewService.data().regulatoryIndexArray;
   //如果属于监管类指标则要加上警戒线
   console.log('监管类指标加上警戒线');
  console.log(selectedNo,alarm_val,criticalVal)
  if (regulatoryIndexArray.indexOf(selectedNo) != -1) {
    opacity = 1;
    isShowOpacityLable = true;
    if (typeof(alarm_val) == 'undefined' || typeof(criticalVal) == 'undefined') {
      alarm_val = 2;
      criticalVal = 2;
      opacity = 0;
      isShowOpacityLable = false;
    }

  }
  else {
    alarm_val = 2;
    criticalVal = 2;
    opacity = 0;
    isShowOpacityLable = false;
  }
  
  var isNonRatio = false;
  var isProvision = false;
  var lineStyleNormal = {width:2,color: new Echart.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                       offset: 0,color: '#acd0f3'
                      },
                      {
                       offset: blueRate,color: '#acd0f3'
                      },
                      {
                       offset: blueRate,color: '#ffb3f9'
                      },
                      {
                       offset: 1,color: '#ffb3f9'
                      },
                      ], false),}
  var pieces = [ {gt:0,lte:0}]
  var outOfRange = {};
  var postIndexNos = ParamsData.data().postIndexNos;
  var showCordonIndexNos = ['RCRL_GG005','RCRL_GG006'];
  //如果是客户经理视图的b类指标，则显示柱状图
  var customerViewIndexs_B = CustomerViewService.data().customerViewIndexs_B;
  if (postIndexNos.indexOf(selectedNo) != -1 || customerViewIndexs_B.indexOf(selectedNo) != -1) {
    chartType = 'bar';  
    isShowLable = false;
    Issymbol = 'none';
    markPointData = [];
  } 
  if (showCordonIndexNos.indexOf(selectedNo) != -1) {
      if (selectedNo == 'RCRL_GG005') {
        isNonRatio =true; 
        CordonyAxis = 5;
        lineStyleNormal = {width:2,color: new Echart.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                       offset: 0,color: '#acd0f3'
                      },
                      {
                       offset: blueRate,color: '#acd0f3'
                      },
                      {
                       offset: blueRate,color: '#ffb3f9'
                      },
                      {
                       offset: 1,color: '#ffb3f9'
                      },
                      ], false),};
        pieces = [ {gt:5,lte:10,color: '#ffb3f9'}];
        outOfRange = {color:'#acd0f3'};
    }
    if (selectedNo == 'RCRL_GG006') {
      isProvision = true;
    };    
  }

  var interval;
  var minVal = valArray[0];
  var maxVal = valArray[0];
  for (var i = 0; i < valArray.length; i++) {
    if (valArray[i]<minVal) {
      minVal = valArray[i];
    }
    if (valArray[i]>maxVal) {
      maxVal = valArray[i];
    }
  }
  var gap = maxVal - minVal;
  interval = parseInt(gap / 3);
  var min = parseInt(minVal) - 3*interval;
  var max = Math.ceil(maxVal) + interval;
  showMaxValue = max;
  // console.log(min,max,interval);
  //若数组最大值小于5数据精度取一位小数
  if (maxVal < 5) {
    max = parseFloat(maxVal.toFixed(1)) + 0.1;
    min = parseFloat(minVal.toFixed(1)) - 0.1;
    max = max.toFixed(2);
    if (min < 0) {
      min = 0;
    }
    gap = max - min;
    interval = parseFloat(parseFloat(gap / 5).toFixed(4));
  }

  if (min < 0) {
    min = 0;
    interval = Math.ceil(maxVal/6);
    max = parseInt(maxVal)+interval;
    showMaxValue = max;
  }
  // console.log(min,max,interval);

  if(maxVal <= 1.4) {
    max = 1.4;
    min = 0;
    interval = 0.2;
  }

  if (minVal < 0) {
    // min = parseFloat(minVal).toFixed(2);
    // interval = 0;
    min = parseFloat(minVal).toFixed(2);
    var tmpInterval =  (Math.abs(maxVal - minVal))/5;
    interval = Math.ceil(tmpInterval);
    max = parseFloat(maxVal).toFixed(2);
  }

  if (isNonRatio) {
    min = 0;
    interval = 2.5;
    max = 7.5;
  }
  // console.log('ffffffff');
  // console.log(min,max,interval);
  // console.log(pieces,outOfRange,lineStyleNormal);    
  filterMonthTimeArray(timeArray,sourceTimeArray,null,null,identify);

	myChartAsset.setOption(assetChartOption);
        option = {
          grid: {
            // show: true,
            // backgroundColor: 'rgb(255,0,0)',
            //grid距离容器上方距离为0
            top: '3%',
            bottom: '0%',
            left: '1%',
            right: '3%',
          },
          xAxis: [{
            // type: 'category',
            axisLabel : {
              show: false,
              interval: xInterval,
              textStyle : {
                color : '#b9babc',
                align : 'center'
              },
              formatter: function (value, index) {
                var day = parseInt(value.split('-').pop());
                return timeArrays[index];
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#474c4e']
              }
            },
            // splitArea: {
            //   show: true,
            // },
            axisLine: {
              //不显示X轴
              show: false,
            },
            //折线左右两侧不留白
            boundaryGap: true,
            axisTick: {
              show: false,
              alignWithLabel: true,
              interval: 0
            },
            data: timeArray
          }],
          yAxis: [{
            type: 'value',
            min: min,
            max: max,
            interval: interval,
            offset: 0,
            boundaryGap: ['50','50%'],
            splitArea: {
                // show: true,
                // areaStyle: {
                //   color: ['red']
                // }
            },
            splitLine: {
              show: true,
              lineStyle: {
                //分割线颜色
                color: ['#3f4c5e']
              }
            },
            splitArea: {
              show: false,
              areaStyle: {
                // color: ['rgba(44,51,61,0.5)','rgba(0,0,0,0.8)']
                color: ['rgb(31,40,47)','rgb(24,33,40)'],
                // color: ['rgb(33,39,40)','rgb(26,32,40)'],
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel : {
                show : true,
                margin: 5,
                textStyle : {
                  color : '#ffffff',
                  align : 'right',
                  fontSize: 13
              },
              formatter: function(value,index) {
                // console.log(value,index);
                var val = value.toString();
                var re = /(?=(?!\b)(\d{3})+$)/g;
                val = val.replace(re, ',');

                if (isNonRatio||isProvision) {
                    val = Math.abs(val).toFixed(1)
                    val = val+'%';
                }
                // if (value%100 == 50) {
                //   val = null;
                // } 

                if (selectedNo == ParamsData.data().fm) {
                    val = Math.abs(val).toFixed(2)
                };   

                if (index%2 == 0 &&isNonRatio == false) {
                  val = null;
                }    

                return val;
              },
              // lineStyle: {

              // }
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
              interval: 0
            }
          }],
          tooltip : {
            show: true,
            showContent: true,
            trigger: 'axis',
            triggerOn: 'click',
            // showDelay: 3000,
            alwaysShowContent: true,
            position: ['50.5%','0%'],
            transitionDuration: 0,
            formatter: function (params, ticket, callback) {
              // if(params[0].dataIndex != valArray.length-1)
              // {
              //    myChartAsset.dispatchAction({ 
              //     type: 'downplay',
              //     componentType: 'markPoint',
              //     seriesType: 'line',
              //     seriesIndex: 0,
              //     dataIndex: valArray.length-1
              //   });
              // }
              // console.log('showMaxValue',showMaxValue);
              filterMonthTimeArray(timeArray, sourceTimeArray, null, params[0].dataIndex, identify);
             
              // console.log('tooltip',params);
              var name = params[0].name;
              // console.log(name);
              var date = name.substring(0,4)+name.substring(5,7)+name.substring(8,10);
              // console.log(date);
              setTimeout(()=>{
                $("#calendar").text(name);
              },1200);
              //日期同步
              // console.log();
              setDetail(upArray[params[0].dataIndex]);
              //客户经理视图的指标需要完成率排名
               var retailBusinessBranchIndex = retailManage.data().retailBusinessBranchIndex;
              if (retailBusinessBranchIndex.indexOf(selectedNo) != -1) {
                if (selectedNo == 'RPT1968_02') {//如果为"网均储蓄存款时期增长达标率
                retailManage.method().showPreviousSeason(selectedNo,wclArray,pmArray,zsArray[params[0].dataIndex],cascFlag);
                }
                else{
                  retailManage.method().showPreviousSeason(selectedNo,wclArray[params[0].dataIndex],pmArray[params[0].dataIndex],zsArray,cascFlag);
                }
              }
              //信用卡及消费金融收入
              if (selectedNo == ParamsData.data().ev) {
                // console.log(allThis);
                // console.log(allThis.onlineSaleParams);
                var selectPieseries = seriesArray[params[0].dataIndex];
                var pieSeries = [];
                for (var i = 0; i < selectPieseries.length; i++) {
                  // pieSeries.push(selectPieseries[i][0].value);
                  // allThis.onlineSaleParams[i].value = selectPieseries[i][0].value.toFixed(2);
                  // allThis.onlineSaleParams[i].rate = selectPieseries[i][1].value.toFixed(2) + '%';
                  var spliceData = ParamsData.method().subTwoDecimal(selectPieseries[i][0].value);
                  pieSeries.push(spliceData);
                  if (spliceData == 0) {
                    spliceData = '0.00';
                  }
                  var spliceRateData = ParamsData.method().subTwoDecimal(selectPieseries[i][1].value);
                  if (spliceRateData == 0) {
                    spliceRateData = '0.00';
                  }

                  allThis.onlineSaleParams[i].value = spliceData;
                  allThis.onlineSaleParams[i].rate = spliceRateData + '%';
                }
                // console.log(pieSeries);
                PieChart.method().setData(pieSeries);
              }
              //对公结算户
              else if (selectedNo == ParamsData.data().fwa) {
                // console.log(seriesArray);

                //年度新增对公结算户
                var centerSeriesValue = seriesArray[0];
                //对公结算客户数较年初增幅
                var centerSeriesRate = seriesArray[1];

                // console.log(centerSeriesValue);
                // console.log(centerSeriesRate);

                var spliceData = ParamsData.method().subTwoDecimal(centerSeriesValue[params[0].dataIndex].value);
                if (centerSeriesValue[centerSeriesValue.length-1] == 0) {
                  spliceData = '0.00';
                }

                var spliceRateData = ParamsData.method().subTwoDecimal(centerSeriesRate[params[0].dataIndex].value);
                if (spliceRateData == 0) {
                  spliceRateData = '0.00';
                }

                // console.log(spliceData);
                // console.log(spliceRateData);
                allThis.publicAccountValue.value = spliceData;
                allThis.publicAccountRate.value = spliceRateData + centerSeriesRate[centerSeriesRate.length-1].unit;
              }
              else {
                // console.log(selectedNo);
              }

            },
            backgroundColor: "#010102",
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          // visualMap: {
          //   show:false,
          //   pieces: pieces,
          //   outOfRange: outOfRange
          // },
          series: [{
            z: 5,
            name: '资产',
            type: chartType,
            smooth: true,
            // smoothMonotone: 'x',
            stack: '资产',
            itemStyle:{
              normal:{
                color:function(params){
                  var itemColor;
                  // console.log('params',params);
                  if (params.dataIndex <janararyIndex) {
                      itemColor = '#32ffff';
                  }
                  else{
                    itemColor = '#ffb3f9';
                  }
                  return itemColor;
                }
              }
            },
            markLine: {
                // show:false,
                silent: true,
                symbol:'none',
                label:{
                  normal:{
                    show:true

                  }
                },
                //CordonyAxis
                //,alarm_val,criticalVal
                data: [ {
                  yAxis: alarm_val,
                  // label:{
                  //   normal:{
                  //     show:true,
                  //     position:'middle',
                  //   }
                  // },
                  lineStyle:{
                    normal:{
                      type:'solid',
                      width:1.5,
                      // color:'#798592',
                      color:'yellow',
                      left:20,
                      opacity:opacity,
                    }
                  }
                },{
                  yAxis: criticalVal,
                  lineStyle:{
                    normal:{
                      type:'solid',
                      width:1.5,
                      // color:'#798592',
                      color:'red',
                      left:20,
                      opacity:opacity,
                  }
                  
                }  
                }],
                label:{
                  normal:{
                    show:isShowOpacityLable,
                    position:'middle',
                    formatter:function(itme){
                        return itme.value+'%'
                      }
                  }
                },
                // lineStyle:{
                //   normal:{
                  
                //     type:'solid',
                //     width:1.5,
                //     // color:'#798592',
                //     color:'red',
                //     left:20
                //   }
                  
                // }
            },

            lineStyle:{
              normal:lineStyleNormal,
                // width:2,
                //折线渐变颜色
                // color: new Echart.graphic.LinearGradient(0, 0, 1, 0, [
                //       {
                //       	offset: 0,color: '#acd0f3'
                //       },
                //       {
                //       	offset: blueRate,color: '#acd0f3'
                //       },
                //       {
                //       	offset: blueRate,color: '#ffb3f9'
                //       },
                //       {
                //       	offset: 1,color: '#ffb3f9'
                //       },
                //       ], false),
            },
            label: {
              normal: {
                  show: isShowLable,
                  position: 'top',
                  formatter: function(params, ticket, callback) {
                    // console.log('params',params);
                    var curDate = new Date();
                    var curMonth = curDate.getMonth();  //获取当前月份(0-11,0代表1月)
                    var curDay = curDate.getDate();  //获取当前日(1-31)
                    var selectDate = params.name;
                    var selectMonth = selectDate.split('-')[1];
                    var selectDay = selectDate.split('-')[2];
                    selectMonth = parseInt(selectMonth);
                    selectDay = parseInt(selectDay);

                    var sue = selectMonth + "月" + selectDay + "日";
                    // if(params.dataIndex == valArray.length-1) {
                    //   sue = selectMonth + "月" + selectDay;
                    // }
                    // console.log(params.data);
                    return sue;
                  },
                  textStyle: {
                    color: '#ffffff',
                    fontSyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: 12,
                    fontFamily: 'Arial'
                  }
              }
            },
            areaStyle: {
              normal: {
                // color: new Echart.graphic.LinearGradient(0, 0, 1, 0, [{
                //   offset: 0, color: '#00ffff' // 0% 处的颜色
                // }, {
                //   offset: 0.5, color: '#00ffff' // 0% 处的颜色
                // }, {
                //   offset: 0.5, color: '#ffaaf0' // 0% 处的颜色
                // }, {
                //   offset: 1, color: '#ffaaf0' // 100% 处的颜色
                // }], false),

                // color: new Echart.graphic.LinearGradient(0, 0, 0, 1, [{
                //   offset: 0, color: '#00ffff' // 0% 处的颜色
                // },{
                //   offset: 1, color: 'rgba(25,32,40,0.2)' // 100% 处的颜色
                // }], false),

                // color: new Echart.graphic.RadialGradient(0.5, 0.5, 0.5, [{
                //   offset: 0, color: '#00ffff' // 0% 处的颜色
                // },{
                //   offset: 1, color: 'rgba(25,32,40,0.2)' // 100% 处的颜色
                // }], false),


                // color: new Echart.graphic.LinearGradient(0, 0, 1, 0, [{
                //   offset: 0, color: '#00ffff' // 0% 处的颜色
                // }, {
                //   offset: 0.5, color: '#00ffff' // 0% 处的颜色
                // }, {
                //   offset: 0.5, color: '#ffaaf0' // 0% 处的颜色
                // }, {
                //   offset: 1, color: '#ffaaf0' // 100% 处的颜色
                // },{
                //   offset: 0, color: '#00ffff' // 0% 处的颜色
                // }, {
                //   offset: 1, color: 'rgba(25,32,40,0.2)' // 100% 处的颜色
                // }], false),
                color: new Echart.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset:0, color: '#acd0f3'
                      },
                      {
                        offset: blueRate,color: '#acd0f3'
                      },
                      {
                        offset: blueRate,color: '#ffb3f9'
                      },
                      {
                        offset: 1,color: '#ffb3f9'
                      },
                      ], false),


                opacity: 0.1
              }
            },
          
            showSymbol: false,
            showAllSymbol: false,
            symbol: Issymbol,
            symbolSize: [16,16],
            legendHoverLink: false,
            data: valArray,

            markPoint: {
              //此处放标注图片
              symbol: 'none',
              // symbolSize: [18,18],
              // symbolRotate: ,
              // symbolOffset: ,
              silent: true,
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  formatter: function(params) {
                    // console.log('params',params);
                    var curDate = new Date();
                    var curMonth = curDate.getMonth();  //获取当前月份(0-11,0代表1月)
                    var curDay = curDate.getDate();  //获取当前日(1-31)
                    var selectDate = timeArray[timeArray.length-1];
                    var selectMonth = selectDate.split('-')[1];
                    var selectDay = selectDate.split('-')[2];
                    selectMonth = parseInt(selectMonth);
                    selectDay = parseInt(selectDay);

                    var sue = selectMonth + "月" + selectDay + "日";
                    if(params.dataIndex == valArray.length-1) {
                      sue = selectMonth + "月" + selectDay + "日";
                    }
                    return sue;
                  },
                  textStyle: {
                    color: '#fff',
                    //文字字体的风格 可选：'normal','italic','oblique'
                    fontStyle: 'normal',      
                    //文字字体的粗细 可选：,'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    fontWeight: 'normal',
                    //[ default: 'Arial' ],文字的字体系列
                    fontFamily: 'Arial',
                    //[ default: 12 ],文字的字体大小
                    fontSize: 12,
                  }
                },
                emphasis: {
                  show: false,
                  position: 'top',
                  formatter: function(params) {
                    // console.log('params',params);
                  },
                  formatter: function(params) {
                    // console.log('params',params);
                    var curDate = new Date();
                    var curMonth = curDate.getMonth();  //获取当前月份(0-11,0代表1月)
                    var curDay = curDate.getDate();  //获取当前日(1-31)
                    var selectDate = timeArray[timeArray.length-1];
                    var selectMonth = selectDate.split('-')[1];
                    var selectDay = selectDate.split('-')[2];
                    selectMonth = parseInt(selectMonth);
                    selectDay = parseInt(selectDay);

                    var sue = selectMonth + "月" + selectDay + "日";
                    if(params.dataIndex == valArray.length-1) {
                      sue = selectMonth + "月" + selectDay + "日";
                    }
                    return "";
                  },
                  textStyle: {
                    color: '#fff',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'Arial',
                    fontSize: 12,
                  }
                }
              },
              itemStyle: {
                normal: {

                },
                emphasis: {

                }
              },
              data: markPointData
              // data: {
              //   coord: [valArray.length-3,valArray[valArray.length-3]],
              //   symbol: 'pin',
              //   symbolSize: [28,28],
              // }
              // data: {
              //   x: valArray.length-1,
              //   y: valArray[valArray.length-1]
              // }
            }

          }],
          animation: true,      //是否开启动画效果    
          animationThreshold : 2000,
          animationDuration: 500,    //初始动画的时长
        };
        myChartAsset.setOption(option);
}

function addxAxisDiv(months, isBad, curIndex, identify)
{  
    var itemWidth = 0;
    var paddingLeft = 0;
    paddingLeft = 1.35;

    var marginLeft = 0;
    var tempWidth = 0;
    if(showMaxValue < 100) {
      marginLeft = 9.0;
      // console.log('showMaxValue',showMaxValue);
    }
    else if(showMaxValue < 1000) {
      marginLeft = 10.5;
      // console.log('showMaxValue',showMaxValue);
    }
    else {
      marginLeft = 12.0;
    }

    var left = 0.1;
    itemWidth = (100-left-paddingLeft*2)/(months.length);
    if(isBad) {
      left = 0.6;
      var offset = (100 - 95.7);
      itemWidth = (100-left-offset)/(months.length);
    }
   // console.log('marginLeft',marginLeft);
    var newWidth = (100-marginLeft);
    $("#assetXBlackBg").css({
      "margin-left": `${marginLeft}%`,
      "width": `${newWidth}%`
    });

    let xAxisDiv = "";  

    if (identify == 1) {
      if(isNaN(curIndex) || typeof(curIndex) == 'undefined' || curIndex == null) {
        curIndex = 4;
      }
      for (var i = 0; i < months.length; i++) {
        let leftPadding = i*itemWidth;
    
        var divLayer = `<div style= "width:${itemWidth}%;float:left;position:absolute;
                                   top:0%;font-size:12px;height:14px;line-height:14px;margin-top:4px;
                                   z-index:1111;left:${leftPadding}%;
                                   color:#d3d7da;text-align:center">${months[i]}
                                   </div>`;
          // curIndex = 4;
          if(i==curIndex && curIndex%1==0) {
            // console.log();
            var circle_line = $("#circle_line").attr('src');
            var offset_x = -45;
            if(months[i].length > 2) {
              offset_x += -6;
            }
            divLayer = `<div style= "width:${itemWidth}%;float:left;position:absolute;border-radius:30px;border:1px;background-color:#338ea9;
                                     top:0%;font-size:12px;height:14px;line-height:14px;margin-top:4px;
                                     z-index:1111;left:${leftPadding}%;
                                     color:#d3d7da;text-align:center"><div style="position:relative">${months[i]}</div>
                                     </div>`;
          }
        
        xAxisDiv += divLayer;
      };
    }
    else {
      if(isNaN(curIndex) || typeof(curIndex) == 'undefined' || curIndex == null) {
        curIndex = 12;
      }
      for (var i = 0; i < months.length; i++) {
        let leftPadding = i*itemWidth;
    
        var divLayer = `<div style= "width:${itemWidth}%;float:left;position:absolute;
                                   top:0%;font-size:12px;height:14px;line-height:14px;margin-top:4px;
                                   z-index:1111;left:${leftPadding}%;
                                   color:#d3d7da;text-align:center">${months[i]}
                                   </div>`;
        if(i==Math.floor((curIndex+1)/2) && curIndex%2==0) {
          var circle_line = $("#circle_line").attr('src');
          var offset_x = -45;
          if(months[i].length > 2) {
            offset_x += -6;
          }
          divLayer = `<div style= "width:${itemWidth}%;float:left;position:absolute;border-radius:30px;border:1px;background-color:#338ea9;
                                   top:0%;font-size:12px;height:14px;line-height:14px;margin-top:4px;
                                   z-index:1111;left:${leftPadding}%;
                                   color:#d3d7da;text-align:center"><div style="position:relative">${months[i]}</div>
                                   </div>`;
        }

        xAxisDiv += divLayer;
      };
    }
    


  return xAxisDiv;
}

function addBg(lastYearNum,monthsNum,isBad)
{
    let isShowBg = lastYearNum==0?'none':'inline';

    //参数1，距左边坐标轴百分比，参数2，距左边坐标轴百分比加上距右边坐标轴百分比
    var marginLeft = 0;
    var paddingLeft = 0;
    var marginRight = 0;
    var tempWidth = 0;
    if(showMaxValue < 100) {
      marginLeft = 3.8;
      paddingLeft = 1.75 + (lastYearNum-1)*(lastYearNum / 3 * 0.038);

      if(lastYearNum==1) {
        tempWidth = paddingLeft * 2;
      }
      else {
        tempWidth = paddingLeft * 2 + (lastYearNum - 1)*(100-marginLeft-paddingLeft*2)/monthsNum;
      }
    }
    else if(showMaxValue < 1000) {
      marginLeft = 4.79;
      paddingLeft = 1.75 + (lastYearNum-1)*(lastYearNum / 3 * 0.038);

      if(lastYearNum==1) {
        tempWidth = paddingLeft * 2;
      }
      else {
        tempWidth = paddingLeft * 2 + (lastYearNum - 1)*(100-marginLeft-paddingLeft*2)/monthsNum;
      }
    }
    else {
      marginLeft = 6.1;
      paddingLeft = 1.75 + (lastYearNum-1)*(lastYearNum / 3 * 0.038);

      if(lastYearNum==1) {
        tempWidth = paddingLeft * 2;
      }
      else {
        tempWidth = paddingLeft * 2 + (lastYearNum - 1)*(100-marginLeft-paddingLeft*2)/monthsNum;
      }
    }    

    if(isBad) {
      marginLeft = 3.8;
      var offset = 100 - 95.7;
      paddingLeft = (100-marginLeft-offset)/monthsNum/2;

      tempWidth = paddingLeft * 2 + (lastYearNum - 1)*(100-marginLeft-offset)/monthsNum-paddingLeft;

      // marginLeft = 93.4 + 2.3;
      // tempWidth = 4.4;
    }

    let bg = `<div style= 'width:${tempWidth}%;
                          height:92%;
                          display:${isShowBg};
                          margin-left: ${marginLeft}%;
                          filter:alpha(opacity=50);
                          -moz-opacity:0.05;
                          -khtml-opacity: 0.05; opacity: 0.05;
                          background-color:white;
                          z-index:0;position:absolute;
                          pointer-events:none;'></div>`;
    return bg;
}

function filterMonthTimeArray(timeArray,sourceTimeArray,isBad, curIndex, identify)
{
    var months = [];
    var yearArray = [];
    var yearnumArray = [0, 0];

    for (var i = 0; i < timeArray.length; i++) 
    {

        

        if (identify == 1) {
          var showMonthIndex = parseInt(timeArray[i].split('-')[1])-1;;
          months.push(sourceTimeArray[showMonthIndex]);
        }
        else {
          if (i % 2 == 0) {
            var showMonthIndex = parseInt(timeArray[i].split('-')[1])-1;;
            months.push(sourceTimeArray[showMonthIndex]);
          }
        }

        let curyear = parseInt(timeArray[i].slice(0,4));

        var isInclude = false;
        for(var j = 0; j < yearArray.length; j++) {
          if(yearArray[i] == curyear) {
            isInclude = true;
            break;
          }
        }

        if (!isInclude) 
        {
            yearArray.push(curyear);
        };

        //统计数据中去年与今年月数的个数
         if(curyear == yearArray[0]) 
         {
           yearnumArray[0]++;
         }
         else if(curyear == yearArray[1])
         {
           yearnumArray[1]++;
         }
    };

    if (yearArray[0]&&yearArray[1]) 
    {
      var monthsNum =  yearnumArray[0]+yearnumArray[1];
      if (yearArray[0]<yearArray[1]) 
      {
        $("#uperBgId").html(addBg(yearnumArray[0],monthsNum,isBad));
      }
      else if (yearArray[0]>yearArray[1])
        { 
          $("#uperBgId").html(addBg(yearnumArray[1],monthsNum,isBad));
        }
    }else
    {
      $("#uperBgId").html(addBg(0,monthsNum,isBad));
    };
  var xAXisDIV1 = addxAxisDiv(months,isBad,curIndex,identify);
  $("#monthUpperId").html(xAXisDIV1); 
  // console.log('----');    

}

//用于序列中有markPoint
function markPoint(valArray,timeArrays,symbol) {
  //曲线标注
  // var symbol = 'image://'+require('../../assets/echart_click_circle_bluishness.png');
  var markPointDataArray = [];
  if (timeArrays[0] == '一月') {
    for (var i = 0; i < valArray.length; i++) {
      markPointDataArray[i] = {coord: [i,valArray[i]]};
      if (i == 0) {
        markPointDataArray[i] = {coord: [i,valArray[i]],symbol: symbol,symbolSize: [14,140],symbolOffset: [0,64]};
      }
      else if (i == valArray.length - 1) {
        markPointDataArray[i] = {coord: [i,valArray[i]],symbol: symbolCpmpareLastMonth,symbolSize: [14,140],symbolOffset: [0,64]};
      }
    }
  }
  else {
    for (var i = 0; i < valArray.length; i++) {
      var ncIndex = timeArrays.selectIndex('一月');
      markPointDataArray[i] = {coord: [i,valArray[i]]};
      if (i == 0) {
        markPointDataArray[i] = {coord: [i,valArray[i]],symbol: symbol,symbolSize: [14,140],symbolOffset: [0,64]};
      }
      else if (i==ncIndex) {
        markPointDataArray[i] = {coord: [i,valArray[i]],symbol: symbolCpmpareLastMonth,symbolSize: [14,140],symbolOffset: [0,64]};
      }
      else if (i==valArray.length-1) {
        markPointDataArray[i] = {coord: [i,valArray[i]],symbol: symbolCompareLastDay,symbolSize: [14,140],symbolOffset: [0,64]};
      }
    }
  }
  return markPointDataArray;
}

function setDetail(upArray) {
  // console.log(upArray.idxVal);
  var idxVal = parseFloat(upArray.idxVal).toFixed(2);
  // var compaerUpDate = ParamsData.method().subTwoDecimal(upArray.compaerUpDate);
  // var upDatePercent = ParamsData.method().subTwoDecimal2(upArray.upDatePercent);
  // var compaerUpMonth = ParamsData.method().subTwoDecimal(upArray.compaerUpMonth);
  // var upMonthPercent = ParamsData.method().subTwoDecimal2(upArray.upMonthPercent);
  // var compaerUpYear = ParamsData.method().subTwoDecimal(upArray.compaerUpYear);
  // var upYearPercent = ParamsData.method().subTwoDecimal2(upArray.upYearPercent);
  // var compaerUpTime = ParamsData.method().subTwoDecimal(upArray.compaerUpTime);
  // var upTimePercent = ParamsData.method().subTwoDecimal2(upArray.upTimePercent);
  // var compaerUpSeason = ParamsData.method().subTwoDecimal(upArray.compaerUpSeason);
  // var upSeasonPercent = ParamsData.method().subTwoDecimal2(upArray.upSeasonPercent);
  var compaerUpDate = parseFloat(upArray.compaerUpDate).toFixed(2);
  var upDatePercent = parseFloat(upArray.upDatePercent).toFixed(2);
  var compaerUpMonth = parseFloat(upArray.compaerUpMonth).toFixed(2);
  var upMonthPercent = parseFloat(upArray.upMonthPercent).toFixed(2);
  var compaerUpYear = parseFloat(upArray.compaerUpYear).toFixed(2);
  var upYearPercent = parseFloat(upArray.upYearPercent).toFixed(2);
  var compaerUpTime = parseFloat(upArray.compaerUpTime).toFixed(2);
  var upTimePercent = parseFloat(upArray.upTimePercent).toFixed(2);
  var compaerUpSeason = parseFloat(upArray.compaerUpSeason).toFixed(2);
  var upSeasonPercent = parseFloat(upArray.upSeasonPercent).toFixed(2);
  // console.log(upArray.upSeasonPercent);
  // console.log(idxVal);
  $("#asset_val").attr('value', idxVal);
  $("#lastDayCompareVal").attr('value', compaerUpDate);
  $("#lastDayCompareRate").attr('value', upDatePercent);
  $("#lastMonthCompareVal").attr('value', compaerUpMonth);
  $("#lastMonthCompareRate").attr('value', upMonthPercent);
  $("#beginningYearOrLastYearCompareVal").attr('value', compaerUpYear);
  $("#beginningYearOrLastYearCompareRate").attr('value', upYearPercent);
  $("#compareSamePeriodVal").attr('value', compaerUpTime);
  $("#compareSamePeriodRate").attr('value', upTimePercent);
  $("#lastSeasonCompareVal").attr('value', compaerUpSeason);
  $("#lastSeasonCompareRate").attr('value', upSeasonPercent);
  setTrrigleArrow();
}

function setTrrigleArrow() {
  //设置三角箭头居中
      // var comValueHeight = $(".beginningOfYearName").height();
      // $(".beginningOfYearRateImg img").css("top", (comValueHeight-10)/2);
      // $(".beginningOfYearRateImg img").css("right", 0);

      // var colWidth = $(".beginningOfYearAndSameTime").width() / 3;
      // var rightWidth = $(".beginningOfYearRateValue").width();
      // var rightMargin = parseFloat($(".beginningOfYearRateValue").css("margin-right"));
      // var curWidth = colWidth-rightWidth-rightMargin;
      // $(".beginningOfYearRateImg").css("width", curWidth);

      // $("#lastDayCompareVal").attr('value',result[0].retBody.compareUpDate);
      // $("#lastMonthCompareVal").attr('value',result[0].retBody.compareUpMonth);
      // $("#beginningYearOrLastYearCompareVal").attr('value',result[0].retBody.compareUpYear);
      // $("#compareSamePeriodVal").attr('value',result[0].retBody.compareUpTime);
      var asset_val = $("#asset_val").attr('value');
      // console.log(asset_val);
      var lday_val = parseFloat($("#lastDayCompareVal").attr('value'));
      var lmonth_val = parseFloat($("#lastMonthCompareVal").attr('value'));
      var year_val = parseFloat($("#beginningYearOrLastYearCompareVal").attr('value'));
      var samePeriod_val = parseFloat($("#compareSamePeriodVal").attr('value'));
      var lastSeason_val = parseFloat($("#lastSeasonCompareVal").attr('value'));

      // console.log('asset_val',asset_val);
      // console.log('lday_val',lday_val);
      // console.log('lmonth_val',lmonth_val);
      // console.log('year_val',year_val);
      // console.log('samePeriod_val',samePeriod_val);

      var lday_rate = parseFloat($("#lastDayCompareRate").attr('value'));
      var lmonth_rate = parseFloat($("#lastMonthCompareRate").attr('value'));
      var year_rate = parseFloat($("#beginningYearOrLastYearCompareRate").attr('value'));
      var samePeriod_rate = parseFloat($("#compareSamePeriodRate").attr('value'));
      var lastSeason_rate = parseFloat($("#lastSeasonCompareRate").attr('value'));

      // console.log('lday_rate',lday_rate);
      // console.log('lmonth_rate',lmonth_rate);
      // console.log('year_rate',year_rate);
      // console.log('samePeriod_rate',samePeriod_rate);
      // console.log('lastSeason_rate',lastSeason_rate);

      $("#asset_val").text(asset_val);
      $("#lastDayCompareVal").text(Math.abs(lday_val).toFixed(2));
      $("#lastMonthCompareVal").text(Math.abs(lmonth_val).toFixed(2));
      $("#beginningYearOrLastYearCompareVal").text(Math.abs(year_val).toFixed(2));
      $("#compareSamePeriodVal").text(Math.abs(samePeriod_val).toFixed(2));
      $("#lastSeasonCompareVal").text(Math.abs(lastSeason_val).toFixed(2));

      if(currentUnit == '人' || currentUnit == '张' || currentUnit == '户') {
        $("#asset_val").text(parseInt(asset_val));
        $("#lastDayCompareVal").text(Math.abs(lday_val).toFixed(0));
        $("#lastMonthCompareVal").text(Math.abs(lmonth_val).toFixed(0));
        $("#beginningYearOrLastYearCompareVal").text(Math.abs(year_val).toFixed(0));
        $("#compareSamePeriodVal").text(Math.abs(samePeriod_val).toFixed(0));
        $("#lastSeasonCompareVal").text(Math.abs(lastSeason_val).toFixed(0));
      }

      $("#lastDayCompareRate").text(Math.abs(lday_rate).toFixed(2) + '%');
      $("#lastMonthCompareRate").text(Math.abs(lmonth_rate).toFixed(2) + '%');
      $("#beginningYearOrLastYearCompareRate").text(Math.abs(year_rate).toFixed(2) + '%');
      $("#compareSamePeriodRate").text(Math.abs(samePeriod_rate).toFixed(2) + '%');
      $("#lastSeasonCompareRate").text(Math.abs(lastSeason_rate).toFixed(2) + '%');

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
      // console.log(lastSeason_val);
      if(lastSeason_val < 0) {//下降绿色
        $("#lastSeasonCompareVal").css("color", '#32ffff');
        $("#lastSeasonCompareRate").css("color", '#32ffff');
        $("#lastSeasonCompareImg").attr("src", downTrrigleArrowImg);
      }
      else if(lastSeason_val >= 0) {//上升粉色
        $("#lastSeasonCompareVal").css("color", '#ffaaf0');
        $("#lastSeasonCompareRate").css("color", '#ffaaf0');
        $("#lastSeasonCompareImg").attr("src", upTrrigleArrowImg);
      }
      else {
        $("#lastSeasonCompareVal").css("color", '#ffffff');
        $("#lastSeasonCompareRate").css("color", '#ffffff');
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

//查找数组中指定值的索引(第一个指定值索引)
Array.prototype.selectIndex = function(val) {
    var index;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            index=i;
            break;
        }
    }
    return index;
}

export default {
	data() {
		return {

		}
	},
	method() {
		return {
			init: init,
			setData: setData,
      setDetail:setDetail,
		}
	},
}

</script>