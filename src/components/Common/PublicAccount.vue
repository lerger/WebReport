<script type="text/javascript">
import Vue from 'vue'
import $ from 'jquery'
import router from '../../routers'
import ParamsData from 'src/js/params_data'

let allRptResultAppUrl = ParamsData.method().allRptResultApp();

var publicaccount = Vue.extend({
	template: `
	<div class="publicAccountNameDiv">
		<label class="publicAccountName">{{params.name}}</label>
	</div>
	<div class="publicAccountValueDiv customFont">
		<label class="publicAccountValue">{{params.value}}</label>
	</div>
	`,
	data: function() {
		// body...
		return {
			param: '年度新增对公结算户年度新增对公结算户',
			initValue: 0,
		}
	},
	computed: {
		value: function() {
			// console.log(allRptResultAppUrl)
			// var data = {userNo:window.localStorage.userid,indexNo:'PFIN00045_ND',idxType:'M',currency:'CN',type:0};
			// console.log(data);
			// $.post(allRptResultAppUrl, data, function(result){
			// 	console.log('publicaccount',result);
			// 	return result.retState;
			// }, 'json');
			// return this.initValue;
		}
	},
	methods: {

	},
	props: [
		'params'
	],
	mounted() {
		console.log('mounted');
	},
	created() {
		console.log('created');
	},
	ready() {
		console.log(this.params.name,this.params.indexNo);
		// var url = 'http://redmooncn.cn:8080/mobile_board/rptIdxResultApp/allRptResultApp';
		console.log(allRptResultAppUrl)
		var data = {userNo:window.localStorage.userid,indexNo:this.params.indexNo,idxType:'M',currency:'CN',type:0};
		console.log(data);
		// $.post(allRptResultAppUrl, data, function(result){
		// 	console.log('publicaccount',result);
		// }, 'json');
	}
});

Vue.component('publicaccount',publicaccount);

export default {
	data() {
		return {

		}
	},
	methods: {

	},
	ready() {

	}
}

</script>

<style type="text/css">

.publicAccountNameDiv {
	border-bottom: 1px solid #4d5766;
}

.publicAccountName {
	height: 40px;
	width: 100%;
	margin-left: 8px;
	font-size: 20px;
	line-height: 40px;
	/*border-bottom: 1px solid #123456;*/
}

.publicAccountValueDiv {
	border-bottom: 1px solid #4d5766;
}

.publicAccountValue {
	height: 40px;
	width: 100%;
	margin-left: 8px;
	font-size: 20px;
	line-height: 40px;
	/*border-bottom: 1px solid #123456;*/
	color: rgb(255, 170, 240);
}
</style>