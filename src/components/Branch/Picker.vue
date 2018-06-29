<template>
	<div id="branchPicker_commonheader" class="header">
		<pickerheader :params="headerParams"></pickerheader>
	</div>
	<!-- <div>picker</div> -->
  <div class="pickerBack">
    <!-- <div> -->
      <div class="pickerBody">

        <div class="pickerIndividual cell-{{$index}}" v-for="item in branchBankOrganazation" @click="toBranchOrgDetail($event, $index, item.orgName, item.orgNo)">
          <div class="organazationNameStyle cell-{{index}}" v-touch:swipeleft="showCancelAttention($event,$index,1)" v-touch:swiperight="hideCancelAttention($event,$index,-1)">
            <div class="organazationTitle">{{item.orgName}}</div>
            <div class="organazationIdicator">
              <div class="organazationImage">
                <img :src="organazationArrow.icon">
              </div>
            </div>  
          </div>
        </div>
        
      </div>
      <!-- <div class="pickerOrganazation">
        
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import router from 'src/routers'
import $ from 'jquery'
import Header from 'components/Common/PickerHeader.vue'
import ParamsData from 'src/js/params_data'

//详情页面传值指标名称
var indexName;
//详情页面传值指标编号
var indexNo;

var m_title = "";

var vueTouch = require('vue-touch')
vueTouch.config = {"swipe":{ direction: 'horizontal' }};
Vue.use(vueTouch)

var currentSwipe;
var count = 0;
var currentClassName;
// var homeList = [];

document.addEventListener('dragstart',function(event){
  console.log(event);
});

export default {
  data () {
    return {
      headerParams: {title:m_title, ltitle:'', llink:''},
      organazationArrow: {icon: require('../../assets/images/arrow_right.png')},
      width: '',
      height: '',
      branchBankOrganazation: [
        // {orgName:'湘江新区支行', orgNo:'000000'},
        // {orgName:'南城支行', orgNo:'000001'},
        // {orgName:'星城支行', orgNo:'000002'},
        // {orgName:'总行营业部', orgNo:'000003'},
        // {orgName:'银德支行', orgNo:'000004'},
        // {orgName:'汇丰支行', orgNo:'000005'},
        // {orgName:'望城支行', orgNo:'000006'},
        // {orgName:'湘江新区支行', orgNo:'000007'},
        // {orgName:'南城支行', orgNo:'000008'},
        // {orgName:'星城支行', orgNo:'000009'},
        // {orgName:'总行营业部', orgNo:'000010'},
        // {orgName:'银德支行', orgNo:'000011'},
        // {orgName:'汇丰支行', orgNo:'000012'},
        // {orgName:'望城支行', orgNo:'000013'}
      ],
      dayList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      renderListDay: [
        {value:1},
        {value:2},
        {value:3},
        {value:4},
        {value:5},
        {value:6},
        {value:7},
        {value:8},
        {value:9},
        {value:10},
      ],
    }
  },
  //计算属性
  computed: {
    dayList () {
      /* get currentMonthLenght */
        let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate();
      /* get currentMonth day */
        let daylist = Array.from({length: currentMonthLength}, (value, index) => {
            return index + 1
        });
        return daylist
    },
    // renderListDay(){
    //     let list = [];
    //     for (let k = this.spin.day.head; k <= this.spin.day.last; k++) {
    //         let obj = {
    //             value: this.getData(k, 'day'),
    //             index: k,
    //         };
    //         list.push(obj)
    //     }
    //     return list
    // },
    yearList() {

    },
    monthList() {

    },
    hourList() {

    },
    minuteList() {

    },
  },
  methods: {
    //左滑显示取消关注按钮
    showCancelAttention: function(event, index) {
      console.log('滑动', event, index);
      
    },
    //右滑隐藏取消关注按钮
    hideCancelAttention: function(event, index) {
      $(currentClassName).animate({left:0});
      count = 0;
    },
    //点击事件触发方法（跳转至对应分支行的该指标）
    toBranchOrgDetail: function(event, index, orgName, orgNo) {
      //
      console.log('toBranchOrgDetail',event, index, orgName, orgNo);
      getQueryRange(orgNo);

      console.log(this.$route.params.backName);

      var backName = '分支行';
      var authorityNo = 0;
      var isHiddenModuleSwitch = true;
      
      this.$route.params.hiddenModuleSwitch = true;
      var orgLevel = this.$route.params.orgLevel;
      var drillDown = this.$route.params.drillDown;
      console.log('hhhhhhhhhhhhhhhhh');
      console.log(this.$route.params);
      // var identify = this.$route.params.identify;
      console.log(this.$route.params.orgLevel);
      // console.log(this.$route.params.identify);
      var firstBranchName = ' ';

      console.log(orgLevel);

      router.go({name:'index_assets',
        params:{
          pointName:indexName,
          pointNo:indexNo,
          attentionState:null,
          orgNo:orgNo,
          backName:orgName,
          firstBranchName:firstBranchName,
          // authorityNo: authorityNo,
          hiddenModuleSwitch: isHiddenModuleSwitch,
          orgLevel: orgLevel,
          drillDown: drillDown,
          // identify: identify
        }
      });

      // router.go({name:'branch_detail',
      //   params:{
      //     pointName:indexName,
      //     pointNo:indexNo,
      //     attentionState:null,
      //     orgNo:orgNo,
      //     backName:backName,
      //     authorityNo: authorityNo,
      //     hiddenModuleSwitch: isHiddenModuleSwitch
      //   }
      // });

    },
  },
  created() {
    //获取客户端设备DOM宽高
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    console.log('created',this.width,this.height);
    console.log(this.$route.params.backName);
    console.log(this.$route.params.firstBranchName);
    console.log(this.$route.params.pointName,this.$route.params.pointNo);
    indexName = this.$route.params.pointName;
    indexNo = this.$route.params.pointNo;

    //详情页面跳转至分支行机构选择页面传值（指标名称与指标编号等）设置页面导航标题
    this.headerParams.title = this.$route.params.pointName;
    console.log(this.headerParams.title);

    //接口根据用户ID取当前机构的子机构（当前为总行返回分支行，当前为分支行返回一级支行）
    var url = ParamsData.method().getOrg();
    
    //参数
    var params = {userNo:window.localStorage.userid, indexNo:indexNo};

    console.log(url);
    console.log(params);
    var cascFlag = this.$route.params.cascFlag;
    // this.branchBankOrganazation = ParamsData.method().getChildOrgParams();
    this.branchBankOrganazation = ParamsData.method().newGetChildOrgParams(cascFlag);

    // $.post(url,params,(result)=>{
    //   console.log(result);
    //   this.branchBankOrganazation = result[0].retBody;
    //   console.log(this.branchBankOrganazation);
    // }, 'json');
    // $.getJSON(url,params,function(result) {
    //   console.log(result);
    // });
  },
  ready() {
    console.log(this.$route.params.pointNo,this.$route.params.pointName);
    var pickerBackHeight = this.height - 64;
    console.log(pickerBackHeight);
    $(".pickerBack").css('height',pickerBackHeight);

    console.log(history.length);
  }
}

//分支行机构编码后四位为0000
function getQueryRange(organazationNo) {
  console.log(organazationNo);
  var branch = organazationNo.slice(2);
  console.log(branch);
}


</script>

<style type="text/css">
.pickerBack {
  /*position: fixed;*/
  width: 100%;
  height: 600px;
}

.pickerBody {
  width: 100%;
  height: 100%;
  font-size: 20px;
  /*overflow-y: auto;*/
}

.pickerIndividual {
  color: white;
  width: 100%;
}

.organazationNameStyle {
  height: 43px;
  line-height: 43px;
  border-bottom: 1px solid #737c88;
  /*text-align: left;*/
  /*margin-left: 7%;
  margin-right: 2%;
  margin-top: 2%;
  margin-bottom: 2%;*/
}

.organazationTitle {
  width: 68%;
  height: 100%;
  /*line-height: 100%;*/
  vertical-align: center;
  margin-left: 7%;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.organazationIdicator {
  float: right;
  width: 25%;
  height: 100%;
  margin-right: 0%;
  /*text-align: center;*/
  /*display: table-cell;
  vertical-align: middle;*/
}

.organazationImage {
  float: right;
  width: 25px;
  height: 100%;
}

.organazationImage img {
  /*float: right;*/
  /*margin-left: 20%;*/
  /*margin-right: 20%;*/
  /*margin-top: 40%;*/
  /*margin-bottom: 15%;*/
  /*width: 50%;*/
  /*height: 50%;*/
  height: 18px;
  width: 11px;
  vertical-align: middle;
}

.pickerOrganazation {
  position: relative;
  top: 2em;
  width: 100%;
  height: 2em;
  margin: 0;
  box-sizing: border-box;
  z-index: 0;
  border-top: 1px solid #abaeb5;
  border-bottom: 1px solid #abaeb5;
}


.day-wheel{
  position: absolute;
  overflow: visible;
  height: 100px;
  font-size: 20px;
  top: 180px;
  left: 0;
  right: 0;
  color:$unchecked-date;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  
}

.wheel-div{
  height: 20px;
  line-height: 20px;
  /*position: absolute;*/
  top:0;
  width: 100%;
  text-align: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /*transform: rotate3d(1, 0, 0, 80deg) translate3d(0px, 0px, 2.5rem);*/
}


</style>