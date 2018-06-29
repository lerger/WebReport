<script type="text/javascript">
import Echart from 'echarts'
import Data from '../../js/data'
import $ from 'jquery'

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

  var assetChartOption = {
    color: ['#106df4'],
    grid: {
      show: true,
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
        min: '2000',
        max: '3000',
        interval: 200,
        splitArea: {
            // show: true,
            // areaStyle: {
            //   color: ['red']
            // }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#394048']
          }
        },
        axisLabel : {
            show : true,
            textStyle : {
              color : '#b9babc',
              align : 'right'
          },
          lineStyle: {

          }
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
          interval: 0
        }
    }]
  };


function init() {
	assetChartMapContainer = document.getElementById('NPLChart');
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

function setData(postData, data) {
	console.log(postData);
  
    console.log('0000000------')
    
  	 
   var resultData = postData[0].retBody;

    var xInterval = 1;
    var valArray = [];

    // var timeArray = ['2016-03-31', '2016-04-30', '2016-05-31', '2016-06-30', '2016-07-31', '2016-08-31', '2016-09-30', '2016-10-31', '2016-11-30', '2016-12-31', '2017-01-31', '2017-02-28', '2016-03-31'];

   

    // for (var i = resultData.length - 1; i >= 0; i--) {
    //   valArray[i] = (resultData[i].value/unit).toFixed(2);
    //   if (resultData[i].value == null) {
    //     valArray[i] = 0.00;
    //   }
    // }
    var timeArray = [];
  var splitDateArray = data.dates.split(',');
  for (var i = splitDateArray.length - 1; i >= 0; i--) {
    timeArray[i] = splitDateArray[i].substring(0,4) + '-' + splitDateArray[i].substring(4,6) + '-' + splitDateArray[i].substring(6,8);
  }
  console.log(timeArray);
  for (var i = resultData.length - 1; i >= 0; i--) {
    valArray[i] = (resultData[i].value/unit).toFixed(2);
    if (resultData[i].value == null) {
      valArray[i] = 0.00;
    }
  }
    
    
    // timeArray = ['2016-01-31','2016-02-29','2016-03-31', '2016-04-30', '2016-05-31', '2016-06-30', '2016-07-31', '2016-08-31', '2016-09-30', '2016-10-31', '2016-11-30', '2016-12-31', '2017-01-31'];
    var sourceTimeArray = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
    var timeArrays = [];
    for (var i = 0; i < timeArray.length; i++) {
      var showMonthIndex = parseInt(timeArray[i].split('-')[1])-1;;
      timeArrays.push(sourceTimeArray[showMonthIndex]);
    };

    console.log('timeArrays',timeArrays);

    //计算图表两种颜色所占比例

    var janararyIndex = timeArrays.selectIndex('一月');
    if (timeArrays[0] == '一月') {
      janararyIndex = 12;
    }



	// var valArray = [2100,2110,2200,2220,2200,2210,2220,2230,2250,2200,2110,2200,2220];
	// var timeArray = ['2016-03-31', '2016-04-30', '2016-05-31', '2016-06-30', '2016-07-31', '2016-08-31', '2016-09-30', '2016-10-31', '2016-11-30', '2016-12-31', '2017-01-31', '2017-02-28', '2016-03-31'];
  // timeArray = ['2016-01-31','2016-02-29','2016-03-31', '2016-04-30', '2016-05-31', '2016-06-30', '2016-07-31', '2016-08-31', '2016-09-30', '2016-10-31', '2016-11-30', '2016-12-31', '2017-01-31'];
  // var sourceTimeArray = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
  // var timeArrays = [];
  // for (var i = 0; i < timeArray.length; i++) {
  //   var showMonthIndex = parseInt(timeArray[i].split('-')[1])-1;;
  //   timeArrays.push(sourceTimeArray[showMonthIndex]);
  // };

  console.log('timeArrays',timeArrays);

  //计算图表两种颜色所占比例

  // var janararyIndex = timeArrays.selectIndex('一月');
  // if (timeArrays[0] == '一月') {
  //   janararyIndex = 12;
  // }
  console.log('janararyIndex',janararyIndex);
  var blueRate = (janararyIndex+1)/13;
  console.log('blueRate',blueRate);

  blueRate = blueRate.toFixed(6);
  console.log('blueRate',blueRate);

  // blueRate = parseFloat(blueRate);
  // console.log('blueRate',blueRate);
  
  var markPointDataArray = markPoint(valArray,timeArrays,symbol);

  filterMonthTimeArray(timeArray,sourceTimeArray);

  var interval =400;
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
	console.log(minVal,maxVal);
	var gap = maxVal - minVal;
	console.log('gap',gap);
	interval = parseInt(gap / 3);
	console.log('interval',interval);
  minVal = parseInt(minVal) - 3*interval;
  maxVal = parseInt(maxVal) + interval;

    console.log(valArray,timeArray,timeArrays);
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
            min: 0,
            max: maxVal,
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
                console.log(value,index);
                var val = value.toString();
                var re = /(?=(?!\b)(\d{3})+$)/g;
                val = val.replace(re, ',');
                if (value%100 == 50) {
                  val = null;
                }    
                return val;
              },
              lineStyle: {

              }
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
              filterMonthTimeArray(timeArray, sourceTimeArray, null, params[0].dataIndex);
              console.log('++++++');
            },
            backgroundColor: "#010102",
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          series: [{
            z: 5,
            name: '净利润',
            type: 'bar',
            smooth: true,
            // smoothMonotone: 'x',
            stack: '资产',
            itemStyle:{
              normal:{
                color:function(params){
                  var itemColor;
                  console.log('params',params);
                  if (params.dataIndex <janararyIndex - 1) {
                      itemColor = '#32ffff';
                  }
                  else{
                    itemColor = '#ffb3f9';
                  }
                  return itemColor;
                }
              }
            },
            label: {
              normal: {
                  show: false,
                  position: 'top',
                  formatter: function(params, ticket, callback) {
                    console.log('params',params);
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
                    console.log(params.data);
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
                // color: new Echart.graphic.LinearGradient(0, 0, 1, 0, [
                //       {
                //         offset:0, color: '#acd0f3'
                //       },
                //       {
                //         offset: blueRate,color: '#acd0f3'
                //       },
                //       {
                //         offset: blueRate,color: '#ffb3f9'
                //       },
                //       {
                //         offset: 1,color: '#ffb3f9'
                //       },
                //       ], false),


                opacity: 0.1
              }
            },
          
            showSymbol: false,
            showAllSymbol: false,
            symbol: 'none',
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
              // data: markPointDataArray
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

function addxAxisDiv(months, isBad, curIndex)
{
    if(isNaN(curIndex) || typeof(curIndex) == 'undefined' || curIndex == null) {
      curIndex = 12;
    }

    var itemWidth = 0;
    var paddingLeft = 0;
    paddingLeft = 1.75;

    var marginLeft = 0;
    var tempWidth = 0;
    if(showMaxValue < 100) {
      marginLeft = 10.5;
    }
    else if(showMaxValue < 1000) {
      marginLeft = 4.79;
    }
    else {
      marginLeft = 6.1;
    }

    var left = 0.1;
    itemWidth = (100-left-paddingLeft*2)/(months.length);
    if(isBad) {
      left = 0.6;
      var offset = (100 - 95.7);
      itemWidth = (100-left-offset)/(months.length);
    }

    var newWidth = (100-marginLeft);
    $("#assetXBlackBg").css({
      "margin-left": `${marginLeft}%`,
      "width": `${newWidth}%`
    });

    let xAxisDiv = "";
   
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

function filterMonthTimeArray(timeArray,sourceTimeArray,isBad, curIndex)
{
    console.log(timeArray)
    console.log('hahahahahahha')
    var months = [];
    var yearArray = [];
    var yearnumArray = [0, 0];

    for (var i = 0; i < timeArray.length; i++) 
    {
        if (i % 2 == 0) {
          var showMonthIndex = parseInt(timeArray[i].split('-')[1])-1;;
          months.push(sourceTimeArray[showMonthIndex]);
        }
        let curyear = parseInt(timeArray[i].slice(0,4));
        if (!yearArray.includes(curyear)) 
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
  var xAXisDIV1 = addxAxisDiv(months,isBad,curIndex);
  $("#monthUpperId").html(xAXisDIV1); 
  console.log('----');    

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
		}
	},
}

</script>