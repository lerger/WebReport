<!-- 指标维度组件 -->
<script type="text/javascript">
import Vue from 'vue'
import $ from 'jquery'
import router from 'src/routers'
import ParamsData from 'src/js/params_data'

var indexdimension = Vue.extend({
  template: `
    <div>
		<div class="dimension customFont">
			<div class="dimensionName">比上季</div>
			<div class="dimensionValue">
				<div :class="{dimensionUpClass: compaerUpSeason>=0,dimensionDownClass: compaerUpSeason<0}" value="{{compaerUpSeason}}">{{lastSeasonValue}}</div>
			</div>
			<div class="dimensionImg">
				<div v-show="lastSeasonRateValue>=0">
					<img :src="upImg"/>
				</div>
				<div v-else>
					<img :src="downImg"/>
				</div>
			</div>
			<div class="dimensionRate">
				<div :class="{dimensionUpClass: lastSeasonRateValue>=0,dimensionDownClass: lastSeasonRateValue<0}" value="{{lastSeasonRateValue}}">{{lastSeasonRate}}</div>
			</div>
		</div>


		<div class="dimension customFont">
			<div class="dimensionName">比年初</div>
			<div class="dimensionValue">
				<div :class="{dimensionUpClass: compaerUpYear>=0,dimensionDownClass: compaerUpYear<0}" value="{{compaerUpYear}}">{{earlyYearValue}}</div>
			</div>
			<div class="dimensionImg">
				<div v-show="earlyYearRateValue>=0">
					<img :src="upImg"/>
				</div>
				<div v-else>
					<img :src="downImg"/>
				</div>
			</div>
			<div class="dimensionRate">
				<div :class="{dimensionUpClass: earlyYearRateValue>=0,dimensionDownClass: earlyYearRateValue<0}" value="{{earlyYearRateValue}}">{{earlyYearRate}}</div>
			</div>
		</div>


		<div class="dimension customFont">
			<div class="dimensionName">比同期</div>
			<div class="dimensionValue">
				<div :class="{dimensionUpClass: compaerUpTime>=0,dimensionDownClass: compaerUpTime<0}" value="{{compaerUpTime}}">{{samePeriodValue}}</div>
			</div>
			<div class="dimensionImg">
				<div v-show="samePeriodRateValue>=0">
					<img :src="upImg"/>
				</div>
				<div v-else>
					<img :src="downImg"/>
				</div>
			</div>
			<div class="dimensionRate">
				<div :class="{dimensionUpClass: samePeriodRateValue>=0,dimensionDownClass: samePeriodRateValue<0}" value="{{samePeriodRateValue}}">{{samePeriodRate}}</div>
			</div>
		</div>
    </div>
  `,
  data: function() {
    return { 
    	downImg: require('src/assets/images/arrow_down.png'),
      	upImg: require('src/assets/images/arrow_up.png'),
      	//比上日
		compaerUpDate: this.params.compaerUpDate,	
		upDatePercent: this.params.upDatePercent,
		//比上月
		compaerUpMonth: this.params.compaerUpMonth,
		upMonthPercent: this.params.upMonthPercent,
      	//比上季
      	compaerUpSeason: this.params.compaerUpSeason,
      	upSeasonPercent: this.params.upSeasonPercent,
      	//比年初
      	compaerUpYear: this.params.compaerUpYear,
      	upYearPercent: this.params.upYearPercent,
      	//比同期
      	compaerUpTime: this.params.compaerUpTime,
      	upTimePercent: this.params.upTimePercent,
      	
      	date: this.params.date,
      	//主值
		idxVal: this.params.idxVal,
		//指标名称
		indexName: this.params.indexName,
		//指标单位
		unit: this.params.unit,
		//所属机构	
		orgNo: this.params.orgNo,
		
		
    }
  },
  computed: {
  	// 比上季
  	'lastSeasonValue': function() {
  		var abs = Math.abs(this.compaerUpSeason);
  		var subValue = ParamsData.method().subTwoDecimal(abs);
  		console.log(abs,subValue);
  		return subValue;
  	},
  	'lastSeasonRate': function() {		
  		var subRate = ParamsData.method().subTwoDecimal(this.upSeasonPercent);
  		var abs = Math.abs(subRate);
  		console.log(abs);
  		return abs;
  	},
  	'lastSeasonRateValue': function() {
  		var subRate = ParamsData.method().subTwoDecimal(this.upSeasonPercent);
  		console.log(this.params.upSeasonPercent,subRate);
  		return subRate;
  	},
  	//比年初
  	'earlyYearValue': function() {
  		var abs = Math.abs(this.compaerUpYear);
  		var subValue = ParamsData.method().subTwoDecimal(abs);
  		console.log(abs,subValue);
  		return subValue;
  	},
  	'earlyYearRate': function() {		
  		var subRate = ParamsData.method().subTwoDecimal(this.upYearPercent);
  		var abs = Math.abs(subRate);
  		console.log(abs);
  		return abs;
  	},
  	'earlyYearRateValue': function() {
  		var subRate = ParamsData.method().subTwoDecimal(this.upYearPercent);
  		console.log(this.params.upYearPercent,subRate);
  		return subRate;
  	},
  	//比同期
  	'samePeriodValue': function() {
  		var abs = Math.abs(this.compaerUpTime);
  		var subValue = ParamsData.method().subTwoDecimal(abs);
  		console.log(abs,subValue);
  		return subValue;
  	},
  	'samePeriodRate': function() {		
  		var subRate = ParamsData.method().subTwoDecimal(this.upTimePercent);
  		var abs = Math.abs(subRate);
  		console.log(abs);
  		return abs;
  	},
  	'samePeriodRateValue': function() {
  		var subRate = ParamsData.method().subTwoDecimal(this.upTimePercent);
  		console.log(this.params.upYearPercent,subRate);
  		return subRate;
  	},
  },
  methods: {
    
  },
  props: [
    'params'
  ],
  filters: {

  },
  ready () {
    console.log(this.params.name,this.params.compaerUpSeason,this.params.rate,this.params.compaerUpSeason);
    console.log(this.params.compaerUpSeason);
  }
});

Vue.component('indexdimension', indexdimension);

export default {
  data () {
    return {
      
    }
  }
}
</script>

<style type="text/css">
.dimension {
	height: 50px;
	width: 100%;
	vertical-align: middle;
	font-size: 20px;
	line-height: 50px;
	border-bottom: 1px solid #4d5766;
}

.dimensionName {
	float: left;
	width: 25%;
	margin-left: 2.5%;

}

.dimensionValue {
	float: left;
	width: 30%;
	text-align: right;
}

.dimensionUpClass {
	color: #ffaaf0;
}

.dimensionDownClass {
	color: #32ffff;
}

.dimensionImg {
	float: left;
	height: 100%;
	width: 13%;
	text-align: right;
	vertical-align: middle;
}

.dimensionImg img {
	width: 12px;
	height: 10px;
}

.dimensionRate {
	float: right;
	height: 100%;
	width: 27%;
	margin-right: 2.5%;
	text-align: right;
}
</style>