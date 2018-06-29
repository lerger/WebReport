<script type="text/javascript">
	import Vue from 'vue'
  import $ from 'jquery'
  import Echart from 'echarts'

  var myGaugeChart;
  var gaugeOption = {
    tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
    },
    grid:{
        width:300,
        height:200,
        top:'35%',
        bottom:10
    },
    series: [{
        name: '外围刻度',
        type: 'gauge',
        radius: '75%',
        center: ['50%', '60%'],
        startAngle: 180,
        endAngle: 0,
        min:0,
        max:3.2,
        splitNumber:3,
        axisLine: {
            lineStyle: {
                width:4,
                color:[[0.2, '#91c7ae'], [0.8, '#fff'], [1, '#c23531']]
            },
        },
        splitLine: {
            length: -6,
            lineStyle:{
                color:'red',
                width:4
            }
        },
        axisLabel: {
            show:false
        },
        axisTick:{
            splitNumber:1,
            lineStyle:{
                opacity:0,
            }
        },
        detail:{
            show:false
        },
        pointer:{
            show:false
        }
    },{
        name: '内层数据刻度',
        type: 'gauge',
        radius: '70%',
        center: ['50%', '60%'],
        width:'100%',
        height:'80%',
        startAngle: 180,
        endAngle: 0,
        min:0,
        max:3,
        splitNumber:3,
        axisLine: {
            length: -10,
            lineStyle: {
                opacity:0
            },
        },
        splitLine: {
            length: 10,
        },
        axisLabel: {
            distance: -45,
            fontSize:34,
            textStyle: {       // 属性lineStyle控制线条样式  
               fontWeight: 'bolder',  
               fontSize : 16,  
               color: '#fff'  
            },
            formatter:function(param){
                if ((param % 1)==0) {
                    return param
                }
            }
        },
        detail: {
            show: true,
            formatter: function (value) {
                return value + '%';
            },
            textStyle: {
               fontWeight: 'bolder',  
               fontSize : 28,  
               color: '#fff'  
            },
            offsetCenter: [0, '40%'],
            // backgroundColor:'#fff',
        },
        itemStyle:{//
            normal:{
                color:'cyan'
            }
        },
        pointer:{//指针
            width:8,
            length:'90%'
        },
        data: [{
            value:'0',
            name:''
        }]
    
    },{
        name: '最内层线',
        type: 'gauge',
        radius: '35%',
        center: ['50%', '60%'],
        startAngle: 180,
        endAngle: 0,
        min:0,
        max:3,
        splitNumber:3,
        axisLine: {
            lineStyle: {
                width:4,
                color:[[1,'cyan']]
            },
        },
        splitLine: {
            length: -6,
            lineStyle:{
                opacity:0
            }
        },
        axisLabel: {
            show:false
        },
        axisTick:{
            splitNumber:1,
            lineStyle:{
                opacity:0,
            }
        },
        detail:{
            show:false,
        },
        pointer:{
            show:false
        }
    }]
    // },{
    //     name: '饼图',
    //     tooltip:{
    //         show:false
    //     },
    //     type: 'pie',
    //     radius: ['0%', '34%'],
    //     hoverAnimation:false,
    //     itemStyle:{
    //         normal:{
    //             color:'#384355'
    //         },
    //         emphasis:{
    //             color:'#333'
    //         }
    //     },
    //     labelLine:{
    //         normal:{
    //             show:false
    //         }
    //     },
    //     animation:false,
    //     data: [1]
    // }]
}


  function init(initPieData,initTitle) {

	var gaugeChartContainer = document.getElementById('gaugeChartId');

	myGaugeChart = Echart.init(gaugeChartContainer);

	myGaugeChart.setOption(gaugeOption);
}

function setData(assetVal){
    gaugeOption.series[1].data = [{value:assetVal,name:''}];
    myGaugeChart.setOption(gaugeOption);
}
export default{
	data() {
		return {

		}
	},
	method() {
		return {
			init: init,
            setData:setData
		}
	}
}
</script>