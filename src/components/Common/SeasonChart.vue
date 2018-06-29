<script type="text/javascript">
import Echart from 'echarts'
import Data from 'src/js/data'
import Vue from 'vue'
import $ from 'jquery'
import ParamsData from 'src/js/params_data'

var assetChartMapContainer;
var myChartAsset;

//季度图表初始日期
var seasonInitDateArray = ['2016-06-30', '2016-09-30', '2016-12-31', '2017-03-31', '2017-06-30'];
//
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
	    data: seasonInitDateArray,
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

var seasonchart = Vue.extend({
	template: `
		<div id="seasonChart" style="width:300px;height:200px;">
			123
		</div>
	`,
	data() {
		return {
			
		}
	},
	props: [],
	computed: {

	},
	methods: {
		init: function() {
			console.log('init');
			assetChartMapContainer = document.getElementById('seasonChart');
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
		        data: [0]
		      }]
		    });
		},
		setData: function() {
			console.log('setData');
			var xInterval = 1;
			var timeArrays = [];
			var timeArray = ['2016-06-30', '2016-09-30', '2016-12-31', '2017-03-31', '2017-06-30'];
			var min;
			var max;
			var interval;
			var outOfRange = {color:'#acd0f3'};
  			var pieces = [ {gt:0,lte:0}];
  			var chartType = 'line';
  			var CordonyAxis = -20;
  			var lineStyleNormal = {width:2};
  			var isShowLable = true;
  			var Issymbol = 'image://'+require('src/assets/images/point_color/circle_tail_day_common.png');
  			var valArray = [];
  			var option;

			
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
	                console.log(value,index);
	                var val = value.toString();
	                var re = /(?=(?!\b)(\d{3})+$)/g;
	                val = val.replace(re, ',');

	                // if (isNonRatio||isProvision) {
	                //     val = Math.abs(val).toFixed(1)
	                //     val = val+'%';
	                // }
	                // // if (value%100 == 50) {
	                // //   val = null;
	                // // }    

	                // if (index%2 == 0 &&isNonRatio == false) {
	                //   val = null;
	                // }    

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
	              console.log('showMaxValue',showMaxValue);
	              filterMonthTimeArray(timeArray, sourceTimeArray, null, params[0].dataIndex);
	             
	              console.log('tooltip',params);
	              var name = params[0].name;
	              console.log(name);
	              var date = name.substring(0,4)+name.substring(5,7)+name.substring(8,10);
	              console.log(date);
	              setTimeout(()=>{
	                $("#calendar").text(name);
	              },1200);
	              //日期同步
	              console.log();
	              setDetail(upArray[params[0].dataIndex]);

	              //信用卡及消费金融收入
	              if (selectedNo == ParamsData.data().ev) {
	                console.log(allThis);
	                console.log(allThis.onlineSaleParams);
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
	                console.log(pieSeries);
	                PieChart.method().setData(pieSeries);
	              }
	              //对公结算户
	              else if (selectedNo == ParamsData.data().fwa) {
	                console.log(seriesArray);

	                //年度新增对公结算户
	                var centerSeriesValue = seriesArray[0];
	                //对公结算客户数较年初增幅
	                var centerSeriesRate = seriesArray[1];

	                console.log(centerSeriesValue);
	                console.log(centerSeriesRate);

	                var spliceData = ParamsData.method().subTwoDecimal(centerSeriesValue[params[0].dataIndex].value);
	                if (centerSeriesValue[centerSeriesValue.length-1] == 0) {
	                  spliceData = '0.00';
	                }

	                var spliceRateData = ParamsData.method().subTwoDecimal(centerSeriesRate[params[0].dataIndex].value);
	                if (spliceRateData == 0) {
	                  spliceRateData = '0.00';
	                }

	                console.log(spliceData);
	                console.log(spliceRateData);
	                allThis.publicAccountValue.value = spliceData;
	                allThis.publicAccountRate.value = spliceRateData + centerSeriesRate[centerSeriesRate.length-1].unit;
	              }
	              else {
	                console.log(selectedNo);
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
	                  console.log('params',params);
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
	                    show:false
	                  }
	                },
	                data: [ {
	                    yAxis: CordonyAxis
	                }],
	                lineStyle:{
	                  normal:{
	                    type:'solid',
	                    width:1.5,
	                    color:'#798592',
	                    left:20
	                  }
	                }
	            },

	            lineStyle:{
	              normal:lineStyleNormal
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
	              ,
	            },
	            label: {
	              normal: {
	                  show: isShowLable,
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
	              // data: markPointData
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
		},
	},
	created() {

	},
	ready() {
		this.init();
		this.setData();
	}
});

Vue.component('seasonchart', seasonchart);
</script>