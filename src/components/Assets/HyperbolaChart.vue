<script type="text/javascript">
import Echart from 'echarts'
import Data from '../../js/data'
import $ from 'jquery'
import ParamsData from '../../js/params_data'

var assetChartMapContainer;
  var myChartAsset;
  let unit = 100000000;
  var symbolClick = 'image://'+require('../../assets/images/point_color/circle_tail_day_common.png');
  // var symbolClick = 'path://M0,0 L0,1 L1,1 L1,0 L0,0 z';
  var symbol = 'image://'+require('../../assets/images/point_color/circle_tail_plan.png');
  var symbolCpmpareLastMonth = 'image://'+require('../../assets/images/point_color/circle_tail_day2.png');
  var symbolCompareLastDay = 'image://'+require('../../assets/images/point_color/circle_tail_day3.png');
  var option;
  var isFirst = true;
  var showMaxValue = 0;

  var downTrrigleArrowImg = require('../../assets/images/arrow_down.png');
  var upTrrigleArrowImg = require('../../assets/images/arrow_up.png');

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
      left: '10%',
       top:'2%',
      orient: 'horizontal',
      data: [{
          name: '资产',
          // 强制设置图形为圆。
          icon: 'circle',
          // 设置文本为红色
          textStyle: {
              color: 'white'
          }
      },
      {
          name: 'haha',
          // 强制设置图形为圆。
          icon: 'circle',
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
            console.log(value,index);
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
	assetChartMapContainer = document.getElementById('HyperbolaChartMoude');
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

function setData(planCompletedDownArray,actualcomPletionDownArray,sdArray,newAddArray) {
  console.log('4444');
  console.log(planCompletedDownArray);
  console.log(newAddArray);
	var xInterval = 1;
  var planCompletedValArray = [];
  var actualcomPletionValArray =[];

  // var  planCompletedDownArray = [{date:'20160331',indexNos:'',value:0},{date:'20160431',indexNos:'',value:1000.5},{date:'20160531',indexNos:'',value:2000},{date:'20160531',indexNos:'',value:3000}];

  // var  actualcomPletionDownArray = [{date:'20160331',indexNos:'',value:0},{date:'20160431',indexNos:'',value:28},{date:'20160531',indexNos:'',value:36},{date:'20160631',indexNos:'',value:67}];
  var timeArray = [];
  var dateArray = [];
  if(typeof planCompletedDownArray != 'undefined') {
    for (var i = actualcomPletionDownArray.length - 1; i >= 0; i--) {
      timeArray[i] = actualcomPletionDownArray[i].date.substring(0,4) + '-' + actualcomPletionDownArray[i].date.substring(4,6) + '-' + actualcomPletionDownArray[i].date.substring(6,8);
    }
    for (var i = planCompletedDownArray.length - 1; i >= 0; i--) {
      dateArray[i] = planCompletedDownArray[i].date.substring(0,4) + '-' + planCompletedDownArray[i].date.substring(4,6) + '-' + planCompletedDownArray[i].date.substring(6,8);
    }
    
    console.log(timeArray);
  	for (var i = planCompletedDownArray.length - 1; i >= 0; i--) {
      planCompletedValArray[i] = parseFloat(planCompletedDownArray[i].value);
     
      
    }
    for (var i = actualcomPletionDownArray.length - 1; i >= 0; i--) {
   
      actualcomPletionValArray[i] = parseFloat(actualcomPletionDownArray[i].value);
    } 
    console.log('33333')

  	console.log(planCompletedValArray,actualcomPletionValArray);
  }

	// var valArray = [1,2,3,4,5,6,7,6,5,2,6,7,3];
  // timeArray = ['2016-01-31','2016-02-29','2016-03-31', '2016-04-30', '2016-05-31', '2016-06-30', '2016-07-31', '2016-08-31', '2016-09-30', '2016-10-31', '2016-11-30', '2016-12-31', '2017-01-31'];
  var sourceTimeArray = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
  var timeArrays = [];
  for (var i = 0; i < timeArray.length; i++) {
    var showMonthIndex = parseInt(timeArray[i].split('-')[1])-1;;
    timeArrays.push(sourceTimeArray[showMonthIndex]);
  };

  console.log('timeArrays',timeArrays);


  var markPointDataArray = markPoint(actualcomPletionValArray,timeArrays,symbol);

  var markPointData = markPointDataArray;
  
  var interval;
	var minVal = planCompletedValArray[0];
	var maxVal = planCompletedValArray[0];
	for (var i = 0; i < planCompletedValArray.length; i++) {
		if (planCompletedValArray[i]<minVal) {
			minVal = planCompletedValArray[i];
		}
		if (planCompletedValArray[i]>maxVal) {
			maxVal = planCompletedValArray[i];
		}
	}
	console.log(minVal,maxVal);
	var gap = maxVal - minVal;
	console.log('gap',gap);
	interval = parseInt(gap / 3);
	console.log('interval',interval);
  var min = parseInt(minVal) - 3*interval;
  var max = parseInt(maxVal) + interval;

  console.log('showMaxValue',showMaxValue);
  console.log('minVal   maxVal  interval',minVal,maxVal,interval);

  if (min <= 0) {
    min = 0;
    interval = parseInt(maxVal/6);
    max = 7*interval;
    showMaxValue = max;
  }
  console.log(minVal,maxVal,interval);
  // var secondeInterval = parseInt(120/(max/interval));
  var secondeInterval;
  var secondeMinVal = actualcomPletionValArray[0];
  var secondeMaxVal = actualcomPletionValArray[0];
  for (var i = 0; i < actualcomPletionValArray.length; i++) {
    if (actualcomPletionValArray[i]<secondeMinVal) {
      secondeMinVal = actualcomPletionValArray[i];
    }
    if (actualcomPletionValArray[i]>secondeMaxVal) {
      secondeMaxVal = actualcomPletionValArray[i];
    }
  }
  console.log(minVal,maxVal);
  var secondeGap = maxVal - minVal;
  console.log('secondeGap',secondeGap);
  secondeInterval = parseInt(secondeGap / 3);
  console.log('secondeInterval',secondeInterval);
  var secondeMin = parseInt(secondeMinVal) - 3*secondeInterval;
  var secondeMax = parseInt(secondeMaxVal) + secondeInterval;

  if (secondeMin <= 0) {
    secondeMin = 0;
    secondeInterval = parseInt(secondeMax/6);
    secondeMax = 7*secondeInterval;
    showMaxValue = secondeMax;
  };
 
  console.log(secondeMin,secondeMax,secondeInterval);

  // var secondeInterval = parseInt(120/7);
  filterMonthTimeArray(timeArray,sourceTimeArray,planCompletedDownArray);

	myChartAsset.setOption(assetChartOption);
        option = {
          grid: {
            // show: true,
            // backgroundColor: 'rgb(255,0,0)',
            //grid距离容器上方距离为0
            top: '3%',
            bottom: '0%',
            left: '1%',
            right: '-6%',
          },
         
          xAxis: [{
            // type: 'time',
            axisLabel : {
              show: true,
              interval: xInterval,
              textStyle : {
                color : '#b9babc',
                align : 'center'
              },
              formatter: function (value, index) {
                // var day;
                // if(value.split('-').length != 0) {
                //   day = parseInt(value.split('-').pop());
                // }
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
            position:'left',
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

              
                // if (value%100 == 50) {
                //   val = null;
                // }    
                 if (index%2 == 0) {
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
          },
          {//右边y轴
            type: 'value',
            position:'right',
            min: secondeMin,
            max: secondeMax,
            interval: secondeInterval,
            offset: 0,
            boundaryGap: ['50','50%'],
            splitArea: {
                // show: true,
                // areaStyle: {
                //   color: ['red']
                // }
            },
            splitLine: {
              show: false,
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
                margin: 0,
                textStyle : {
                  color : '#ffb3f9',
                  align : 'right',
                  fontSize: 13
              },
              formatter: function(value,index) {
                console.log(value,index);
                var val = value.toString();
                var re = /(?=(?!\b)(\d{3})+$)/g;
                val = val.replace(re, ',');
                val = val+'%';
              
                if (index%2==0) {
                  val = null
                };
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
              filterMonthTimeArray(timeArray, sourceTimeArray,planCompletedDownArray, null, params[0].dataIndex);
              if (typeof(timeArray[params[0].dataIndex]) !='undefined' ) {
                var name = timeArray[params[0].dataIndex];
                var date = name.substring(0,4)+name.substring(5,7)+name.substring(8,10);
                $("#calendar").text(name);
                setDetail(sdArray[params[0].dataIndex],planCompletedDownArray[params[0].dataIndex],actualcomPletionDownArray[params[0].dataIndex],newAddArray[params[0].dataIndex]);
              }
              
            },
            backgroundColor: "#010102",
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
         
          series: [{
            z: 5,
            name: '计划完成',
            yAxisIndex:'0',
            type: 'line',
            smooth: false,
            // smoothMonotone: 'x',
            stack: '资产',
            lineStyle:{
              normal:{
                width:2,
                color: '#6c86a2',
              },
            },
            label: {
              normal: {
                  show: true,
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
                color: '#384355',     
              }
            },
          
            showSymbol: false,
            showAllSymbol: false,
            symbol: symbolClick,
            symbolSize: [16,16],
            legendHoverLink: false,
            data: planCompletedValArray,

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
                    if(params.dataIndex == planCompletedValArray.length-1) {
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
                    if(params.dataIndex == planCompletedValArray.length-1) {
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
              data: []

            }

          },//第二根曲线
          {
            z: 5,
            name: '实际完成',
            type: 'line',
            smooth: false,
            yAxisIndex:'1',
            // smoothMonotone: 'x',
            stack: '',
            lineStyle:{
              normal:{
                width:2,
                color: '#ffb3f9',
              },
            },
            label: {
              normal: {
                  show: true,
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
  
                color: '#384355',
                      
              }
            },
          
            showSymbol: false,
            showAllSymbol: false,
            symbol: symbolClick,
            symbolSize: [16,16],
            legendHoverLink: false,
            data: actualcomPletionValArray,

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

          },],
          animation: true,      //是否开启动画效果    
          animationThreshold : 2000,
          animationDuration: 500,    //初始动画的时长
        };
        myChartAsset.setOption(option);
}

function addxAxisDiv(months, isBad, curIndex)
{
    if(isNaN(curIndex) || typeof(curIndex) == 'undefined' || curIndex == null) {
      curIndex = 3;
    }

    var itemWidth = 0;
    var paddingLeft = 0;
    paddingLeft = 1.35;

    var marginLeft = 0;
    var tempWidth = 0;
    if(showMaxValue < 100) {
      marginLeft = 9.0;
      console.log('showMaxValue',showMaxValue);
    }
    else if(showMaxValue < 1000) {
      marginLeft = 10.5;
      console.log('showMaxValue',showMaxValue);
    }
    else {
      marginLeft = 10.0;
    }

    var left = 0.1;
    itemWidth = (100-left-paddingLeft*2)/(months.length);
    if(isBad) {
      left = 0.6;
      var offset = (100 - 95.7);
      itemWidth = (100-left-offset)/(months.length);
    }
   console.log('marginLeft',marginLeft);
    var newWidth = (100-marginLeft);
    $("#HyperbolaChartMoudeXBlackBg").css({
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
      if(i==curIndex) {
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



function filterMonthTimeArray(timeArray,sourceTimeArray,planCompletedDownArray,isBad, curIndex)
{
  var  months = [];
  var tmpMonths = ['第一季度','第二季度','第三季度','第四季度'];
    for (var i = 0; i < planCompletedDownArray.length; i++) {
      months.push(tmpMonths[i]);
    };
  var xAXisDIV1 = addxAxisDiv(months,isBad,curIndex);
  $("#HyperbolaChartMoudeMonthUpperId").html(xAXisDIV1); 
   

}

//用于序列中有markPoint
function markPoint(valArray,timeArrays,symbol) {
  var markPointDataArray = [];
  for (var i = 0; i < valArray.length; i++) {
    markPointDataArray[i] = {coord: [i,valArray[i]],symbol: symbol,symbolSize: [12,120],symbolOffset: [0,56]};
  }
  console.log(markPointDataArray)
  return markPointDataArray;
  
}

function setDetail(sd,plan,completionRate,newAdd){  
   if (typeof(sd) != 'undefined') {
    $("#asset_val").text(sd.value.toFixed(2));
   }
   else {
    $("#asset_val").text('0.00');
   }
   if (typeof(plan) != 'undefined') {
    $("#planComplete").text(plan.value.toFixed(2));
   }
   else {
    $("#planComplete").text('0.00');
   }
   if (typeof(newAdd) != 'undefined') {
    $("#newAddNumber").text(newAdd.value.toFixed(2));
   }
   else {
    $("#newAddNumber").text('0.00');
   }   
   if (typeof(completionRate) != 'undefined') {
      $("#CompletionRate").text(completionRate.value.toFixed(2)+'%')
   }else{
      $("#CompletionRate").text('0.00');
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
		}
	},
}

</script>