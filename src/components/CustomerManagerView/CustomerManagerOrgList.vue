<template>
	<div id="customer_commonheader" class="header">
		<pickerheader :params="headerParams"></pickerheader>
	</div>
	<!-- <div>picker</div> -->
  <div class="pickerBack">
    <!-- <div> -->
      <div class="pickerBody">
        <div class="pickerIndividual cell-{{$index}}" v-for="item in branchBankOrganazation" @click="toBranchOrgDetail($event, $index, item)">
          <div class="organazationNameStyle cell-{{index}}" v-touch:swipeleft="showCancelAttention($event,$index,1)" v-touch:swiperight="hideCancelAttention($event,$index,-1)">
            <div class="organazationTitle">{{item.name}}</div>
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
//客户经理视图界面展示服务
import CustomerViewService from 'components/CustomerManagerView/CustomerViewService.vue'

//详情页面传值指标名称
var indexName;
//详情页面传值指标编号
var indexNo;
var self;
var m_title = "";
let customerViewOrgFinderListUrl = ParamsData.method().customerViewOrgFinderListUrl();
var vueTouch = require('vue-touch')
vueTouch.config = {"swipe":{ direction: 'horizontal' }};
Vue.use(vueTouch)

var currentSwipe;
var count = 0;
var currentClassName;
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
      branchBankOrganazation: [],
      dayList: [],
      renderListDay: [],
    }
  },
  //计算属性
  computed: {
    dayList () {
        let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate();
        let daylist = Array.from({length: currentMonthLength}, (value, index) => {
            return index + 1
        });
        return daylist
    },
    yearList() {},
    monthList() {},
    hourList() {},
    minuteList() {},
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
    toBranchOrgDetail: function(event, index, item) {
      var pointNo = self.$route.params.pointNo;
      var pointName = self.$route.params.pointName;
      var status = self.$route.params.status;
      var orgNo = self.$route.params.orgNo;
      var backName = '返回';
      var unit = self.$route.params.unit;
      console.log(self.$route.params);
      if (item.isUser == 'YES') {
        router.go({name:'index_assets',params:{
          userNo:item.username,
          pointNo:pointNo,
          pointName:pointName,
          status:status,
          orgNo:item.branchInnerCode,
          backName:backName,
          unit:unit,
          isFromeOrgListJump:'YES',
        }});
       return;
      }
      router.go({name:'customer_org_list_second',params:{
        pointNo:pointNo,
        pointName:pointName,
        branch_innerCode:item.branchInnerCode,
        status:status,
        orgNo:orgNo,
        backName:backName,
        unit:unit,
      }});
   
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
    this.headerParams.title = '机构列表';
    
  },
  ready() {
    self = this;
    requestCustomerViewOrgFinderList();
    console.log(this.$route.params.pointNo,this.$route.params.pointName);
    var pickerBackHeight = this.height - 64;
    console.log(pickerBackHeight);
    $(".pickerBack").css('height',pickerBackHeight);

    console.log(history.length);
  }
}


function requestCustomerViewOrgFinderList(item){
  var branch_innerCode  = self.$route.params.branch_innerCode;
  var indexNo = self.$route.params.pointNo;
  console.log(self.$route.params);
  var orgFinderListParams = {userNo:window.localStorage.userid,branchInnerCode:'',indexNo:indexNo};
  if (branch_innerCode != 'undefined' && typeof(branch_innerCode) != 'undefined' && branch_innerCode.length != 0) {
    orgFinderListParams = {userNo:window.localStorage.userid,branchInnerCode:branch_innerCode,indexNo:indexNo};
  }
  $(".module_poper_timer").fadeIn();
  $.post(customerViewOrgFinderListUrl,orgFinderListParams,(result)=> {
    $(".module_poper_timer").fadeOut();
    // 如果下级机构还有分支则继续下钻，否则就到了客户经理
    var orgArray = [];
    if(result[0].retState == true && result[0].retBody.branch) {

      orgArray = result[0].retBody.branch;
    }

    var userArrary = [];
    if(result[0].retState == true && result[0].retBody.user) 
    {
      self.headerParams.title = '客户经理列表';
      
      var users = result[0].retBody.user;
      for (var i = 0; i < users.length; i++) {
        var newUserObj = {name:users[i].realname,branchInnerCode:users[i].branchInnerCode,username:users[i].username,isUser:'YES'};
        userArrary.push(newUserObj);
      };
    }
    self.branchBankOrganazation.splice(0,self.branchBankOrganazation.length);//清空数组 
    self.branchBankOrganazation =  orgArray.concat(userArrary);


  }, 'json');
 
  
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