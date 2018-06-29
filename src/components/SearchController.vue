<template>
    <div id="search_header" class="header">
        <ccsearchheader></ccsearchheader>
    </div>
    <div class="searchBoxDiv">
        <input id="searchBox" class="searchBox" placeholder="" v-model="items" @focus="touchSearch" @blur="touchSearchOut">
        <div @click="touchSearch" class="searchSue"><div class="searchImg"><img src="../assets/images/searcher.png" /></div><div class="searchTitle">搜索</div></div>
    </div>
    <div class="cancelBtn" @click="cancelBtnClick($event)"><img src="../assets/images/delete.png" /></div>
    <div class="searchLayer">
        <div class="searchResultList">
           <div class="resultPrompt">没有搜索到相关指标</div>
           <searchresult :params="searchParams"></searchresult>
        </div>
    </div>
    <div class="searchContainer">
        <div class="search_container">
            <div id="letter" ></div>
            <div class="sort_box">
              <div v-for="item in targetList" id="{{item.letter}}">
                <div class="sort_letter" >{{item.letter}}</div>
                <div  v-for="listItem in item.lisit" class="{{item.letter}}">
                  <div class="select_logo" @click="selecBboxClick(listItem.indexNo)">
                      <img :src="checkbox" class="imageClass" id="img-{{listItem.indexNo}}" />
                  </div>
                  <div class="sort_list listItem-{{$index}}"  @click="onSelected($event, $index, listItem.indexName,$parent.$index, listItem.indexNo, listItem.status,listItem.identify,listItem.drillDown,listItem.unit)">
                    <div class="num_logo" id="next_right">
                      <img src="../assets/images/arrow_right.png" alt="">
                    </div>
                    <div class="num_name" id="name-{{listItem.indexNo}}">{{listItem.indexName}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="initials">
              <ul>
                <li><img src="../assets/images/new3.png"/></li>
              </ul>
            </div> 

        </div>
    </div>
</template>


<script type="text/javascript">

import Vue from 'vue'
import router from '../routers';
import Params from '../routersParam'
import ParamsData from '../js/params_data'
import $ from 'jquery'
import searchJs from '../components/searchJs'
import SearchHeader from './Common/SearchHeader'
import SearchResult from './SearchResult'
var self;
var indexNos;
var index_type;
var targetList = []
var searchParams = []
var limits;
export default {
    data() {
        return {
            targetList:[],
            checkbox: require('../assets/images/searcher_checkbox.png'),
            selecteLogo: require('../assets/images/searcher_checkbox_s.png'),
            searchParams:searchParams,
            items:searchParams,
        }
    },
    watch:{
        items:{
           handler:function(val,oldval){
             // console.log(this.$els.texttype.value);
            var filterTargetList =  filterTarget(this.items);
          
            var resultPrompt = $(".resultPrompt");
            if (filterTargetList.length == 0) {
                resultPrompt.fadeIn();
            }
            else{
                resultPrompt.fadeOut();
            }
            this.searchParams = filterTargetList;

            $(".searchLayer").fadeIn();
            $(".cancelBtn").fadeIn();
            $(".searchContainer").css('position','fixed');

            $(".initials").fadeOut();
            $(".rightbutton").fadeOut();
            
           },
           deep:true
        }
    },
    methods: {
        selecBboxClick:function(indexNo){},
        setData:function(_this,index_type){
            $(".module_poper_timer").fadeIn();
            
            if (typeof(index_type) == "undefined" || index_type == '') { 
              alert("undefined"); 
            }  
            if (index_type.type == 'undefined') {
                index_type = '';
            };
            var searchIndexListUrl = ParamsData.method().getSearchIndexList();
            var params = {userNo:window.localStorage.userid,indexType:index_type};
            console.log('ttttttttt111'+index_type,params);
            console.log(typeof(index_type));
            $.post(searchIndexListUrl, params, function(result){
                console.log(result);
                 _this.getAttentionList(_this,result,index_type);
                              
            },'json');
        },
        getAttentionList:function(_this,searchListResult,index_type){
            var attentionUrl = ParamsData.method().queryHomePage();
            var params = {userNo:window.localStorage.userid,currency:'CN',date:20160331,indexType:index_type};
            $.post(attentionUrl, params, function(result){
                var attentionArray = result[0].retBody;
                $(".module_poper_timer").fadeOut();
                targetList = restructure(searchListResult,attentionArray);
                searchJs.method().createLetter(targetList);
                 _this.targetList = targetList;
                setTimeout(() => {
                    $(".sort_box").fadeIn(100);
                     resetCss();
                    $(".最新指标>div").css('color','#ffb3f9')
                    indexNos = indexNos||[];
                    indexNos.splice(0,indexNos.length); 
                    for (var i = 0; i < attentionArray.length; i++) {
                        if (indexNos.indexOf(attentionArray[i].indexNo) == -1) {
                         indexNos.push(attentionArray[i].indexNo);
                        }
                        var imgSelectId = '#img-'+indexNos[i];
                        var image = $(imgSelectId);
                        image[0].src = _this.selecteLogo;
                    }  
                    //如果从客户经理进来且为不是客户经理隐藏打勾选中  且隐藏右上角确认按钮
                    if (index_type == 4 && limits != 6) {
                        $(".rightbutton").hide();
                        $(".imageClass").hide();
                    }else{
                        $(".num_logo").hide();
                    }
                }, 0);
            },'json');
        },
        onSelected: function(event, index, name, index2, indexNo, status, identify,drillDown,unit) {
            var limits = window.localStorage.limits;
            console.log(limits);
            if (index_type == 4 && limits != 6) {
                if (drillDown == null || drillDown == '') {
                    drillDown = 0;
                };
                var backName = '返回';
                var firstBackName = '';
                var authorityNo = 0;
                var hiddenModuleSwitch = false;
                //机构级别
                var orgLevel = 0;
                var orgNo = window.localStorage.orgNo;
                var indexUnit = unit;
                console.log(index, name, index2, indexNo, status, identify,drillDown,unit);
                console.log(self.$route.params);
                router.go({ name:'index_assets',
                  params:{
                    pointName:name,   //指标名称
                    pointNo:indexNo,    //指标编码
                    attentionState:1,    //关注状态
                    status:status,
                    orgNo:orgNo,    //机构编号
                    backName:backName,     //导航返回标题名
                    firstBackName: firstBackName,
                    hiddenModuleSwitch: hiddenModuleSwitch,
                    orgLevel: orgLevel,
                    // identify: '',
                    drillDown: drillDown,
                    unit: indexUnit,
                    cascFlag: 0
                  }});
                console.log(self.$route.params);
                return;
            }
            var imgSelectId = '#img-'+indexNo;
                var image = $(imgSelectId);
                image[0].src = this.selecteLogo;
                indexNos = indexNos ||[];
                if (indexNos.indexOf(indexNo) == -1) {
                    indexNos.push(indexNo);
                }else{//取消选中
                    image[0].src = this.checkbox;
                    indexNos.splice($.inArray(indexNo, indexNos), 1);
                    console.log(indexNos);
                }
            console.log('indexNos',indexNos);
        },
     
        cancelBtnClick:function(enve){
            $(".searchSue").fadeIn(200);
            $(".searchLayer").fadeOut();
            $(".cancelBtn").fadeOut();

            $(".initials").fadeIn();
            $(".searchContainer").css('position','relative');
            $("#searchBox")[0].value = null;
            $(".rightbutton").fadeIn();
        },
        touchSearch: function() {
           
            $(".searchSue").fadeOut(200);
            $("#searchBox").focus();

        },
        touchSearchOut: function() {
            if ($("#searchBox")[0].value == "") {
                $(".searchSue").fadeIn(200);
                $(".searchLayer").fadeOut();
                $(".cancelBtn").fadeOut();
                $(".initials").fadeIn();
                $(".searchContainer").css('position','relative');
                $(".rightbutton").fadeIn();
            }
            // $("#searchBox").blur();
        }
    },
    ready() { 
        self = this;
        limits = window.localStorage.limits;
        if(window.navigator.onLine==true){
            var _this = this;
            index_type = this.$route.params.index_type;
            this.setData(_this,index_type);
        }
        else{
            $("#prompt").text('网络连接异常')
            $("#prompt").fadeIn();
            $(".module_poper_timer").fadeOut();
            setTimeout(()=> {
               $("#prompt").fadeOut();
            },1000)
         }
        scrollTo(0,0);
        $(".searchBox").focus(function(){
            console.log('焦点');
     
         });

        $(".cctitle").text(ParamsData.method().getAppTitle());
        $(".rightbutton").css('font-size','22px');
        $(".rightbutton").text('确认');
        $(".rightbutton").click(function(){
            var _this = $(this);
            if (indexNos != undefined  &&_this.html() =='确认') {
                $(".module_poper_timer").fadeIn();
                var addAttentionUlr = ParamsData.method().resetAttention();
                var uploadIndexNo = '';
                for (var i = 0; i < indexNos.length; i++) {
                    if (i != indexNos.length - 1) {
                         uploadIndexNo = uploadIndexNo + indexNos[i]+',';
                     }
                     else{
                         uploadIndexNo = uploadIndexNo + indexNos[i];
                     }
                }
                var params = {userNo:window.localStorage.userid,indexNos:uploadIndexNo,indexType:index_type}; 
                $.post(addAttentionUlr, params, function(result){
                    $(".module_poper_timer").fadeOut();
                    var attentionState;
                    if (result[0].retState) {
                       attentionState = 1;
                    }
                    else{
                       attentionState = 0;
                    }
                    router.go({ name: 'home'});
                    ParamsData.method().setAttentionState(attentionState);
                    indexNos.splice(0,indexNos.length);              
                },'json');
            }
       });
        $(".ccheader").css('background-color','#3b4757');
        $(".cctitle").css('background-color','#3b4757');      
    }
}

function restructure(result,attentionArray){
    var dataList = result[0].retBody;
    var cellArrays = []
    var letterList = [];
    var topList = [];
    indexNos = indexNos||[];
    for (var i = 0; i < dataList.length; i++) {
        if (checkTime(dataList[i].topEndDate) == 1) {
            topList.push(dataList[i]);//如果是置顶最新指标则加入到置顶数组中
        }
        else if (letterList.indexOf(dataList[i].indexOrder) == -1 && checkTime(dataList[i].topEndDate) == 0) {
            letterList.push(dataList[i].indexOrder);
        }
    }
    for (var i = 0; i < letterList.length; i++) {
        var lisit = [];
        var obj;
        for (var j = 0; j < dataList.length; j++) {
            if (letterList[i] == dataList[j].indexOrder && checkTime(dataList[j].topEndDate) == 0) {
                lisit.push(dataList[j])
            }
        }
        obj = {letter:letterList[i],lisit:lisit}
        cellArrays.push(obj);
    }
    if (topList.length > 0) {
       var topObj = {letter:'最新指标',lisit:topList};
       cellArrays.unshift(topObj);
    }
    console.log(cellArrays)
    return cellArrays;
}
//验证当前日期是否在规定时间之前， 
function checkTime(topEndDate)
{  
    console.log(topEndDate)
    var check = 0;        
    var nowDate = new Date();  
    var topEndYear =  topEndDate.substr(0,4);
    var topEndMonth = topEndDate.substr(4,2);
    var topEndDa = topEndDate.substr(6,2);   
    // var time_split2 = new Array();  

    // time_split2 = topEndDate.split(" ");  
    // var time_split = new Array();         
    // time_split = time_split2[0].split("-"); 
    if(nowDate.getFullYear() > topEndYear)  
    {  
        check = 0;  
    }  
    else if(nowDate.getFullYear()==topEndYear )  
    {  

        if(nowDate.getMonth()+1 > topEndMonth)  
        {  
            check = 0;   
        }  
        else if(nowDate.getMonth()+1 == topEndMonth)  
        {   
            if(nowDate.getDate() > topEndDa)  
            {  
                check = 0;  
            }  
            else  
            {     
                check = 1;  
            }  
        }  
        else  
        {  
            check = 1;  
        }  
    }  
    else  
    {  
        check = 1;  
    } 

    return check;  
}
function resetCss(){
    var windowHeight = document.documentElement.clientHeight;

    var windowWith = document.documentElement.clientWidth;

    var fontSize = windowWith/20;
  
    var listHeight = (windowHeight - 64)/14;
    $(".ccheader").css('background-color','#3b4757');
    $(".cctitle").css('background-color','#3b4757');
    $(".sort_list").height(listHeight);
    $(".sort_list").css('line-height',listHeight+'px');
    $(".num_name").height(listHeight);
    $(".num_name").css('line-height',listHeight+'px');
    $(".num_name").css('font-size',fontSize+'px');
    $(".sort_letter").height(listHeight);
    $(".sort_letter").css('line-height',listHeight+'px');
    $(".sort_letter").css('font-size', fontSize+'px');
    $(".num_logo").height(listHeight);
    $(".num_logo").css('line-height',listHeight+'px');
    $(".select_logo").height(listHeight);
    $(".select_logo").css('line-height',listHeight+'px');
    var promptWidth = $("#prompt").width();
    var leftPadding = (windowWith - promptWidth)/2;
    $("#prompt").css('left',leftPadding + 'px');
   

} 
function filterTarget(value){
  var filterTargetList = [];
  for (var i = 0; i < targetList.length; i++) {
      var list = targetList[i].lisit;

      for (var j = 0; j < list.length; j++) {
             if (indexNos.indexOf(list[j].indexNo) == -1) {//不包含即为未关注。
                 list[j].attentionState = 0;
             }else{
                list[j].attentionState = 1;
             }
        if (list[j].indexName.indexOf(value) !=-1 && value != '') {
            filterTargetList.push(list[j]);
        }
      }
  }

  return filterTargetList;    
}

</script>

<style type="text/css">
ul,li,ol,input,textarea,p,dl,dt,dd{
    margin:0;
    padding:0;
    font-family: "Microsoft YaHei, Arial, sans-serif";
   
}

ul li{
    list-style: none;
    font-family: "Microsoft YaHei, Arial, sans-serif";
}

a{
    text-decoration: none;
    cursor: pointer;
    font-family: "Microsoft YaHei, Arial, sans-serif";
}

html{
    height: 100%;
    font-family: "Microsoft YaHei, Arial, sans-serif";
}

body{
    /*height: 100%;/*/
    background: #3b4757;
    font-family: "Microsoft YaHei, Arial, sans-serif";
    font-color:white;
    max-width: 640px;
    margin:auto;
}

a,input,img,textarea,span,div{
    outline: 0;
    -webkit-tap-highlight-color:rgba(255,0,0,0);
}
.search_container{
    width: 100%;
    padding-top: 0px;
    padding-bottom: 0px;
}

/*header{
    width:100%;
    height: 45px;
    background: #161b22;
    border-bottom: 1px solid #474c4e;
}



header.fixed{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
}
.header{
    margin:0 20px;
    text-align: center;
    color: rgb(255,255,255);
    font-size: 1.5em;
    height: 45px;
    line-height: 45px;
    position: relative;
}*/

#letter{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    font-size: 75px;
    color: #555;
    text-align: center;
    line-height: 100px;
    background: rgba(145,145,145,0.6);
    position: fixed;
    left: 50%;
    top: 50%;
    margin:-50px 0px 0px -50px;
    z-index: 99;
    display: none;
}
#letter img{
    width: 50px;
    height: 50px;
    float: left;
    margin:25px 0px 0px 25px;
}

.sort_box{
    position: relative;
    width: 100%;
    display: none;
    padding-top: 35px;
}
.sort_list{
    margin:0px 8.45% 0px 4.83%;
    padding:0px 0px 0px 0px;
    position: relative;
    height: 49px;
    line-height: 50px;
    color: #ffffff;
    border-bottom:0.5px solid #737d89; 
}
.result_list{
    margin:0px 4.83% 0px 4.83%;
    padding:0px 0px 0px 0px;
    position: relative;
    height: 49px;
    line-height: 50px;
    color: #ffffff;
    border-bottom:0.5px solid #737d89;
}

.num_logo{
    width: 11px;
    height: 50px;
    line-height: 48px;
    position: absolute;
    padding-top: 1.25%;
    right: 5px;
    display: block;
}
.select_logo{
    width: 20px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    display: inline;
    /*left: 20px;*/
    right: 10%;
    padding-top: 1.25%;
    /*padding:2% 0 2% 0;*/
    /*z-index: 88;*/
}
.select_logo img{
    width: 20px;
    height: 20px;

}
 .num_logo img{
    width: 11px;
    height: 20px;
    /*line-height: 50px;*/
}
.num_name{
    /*color: #ffffff;*/
     font-size: 20px;

}

/*分区头样式*/
.sort_letter{
    margin:0px 8.45% 0px 4.83%;
    height: 49px;
    line-height: 50px;
    padding-left: 0px;
    color: rgb(255,255,255);
    font-size: 18px;
    font-weight: normal;
    font-family: "Microsoft YaHei, Arial, sans-serif";
    border-bottom:0.5px solid #737d89;
}
.initials{
    position: fixed;
    top: 117px;
    right: 0px;
    height: auto;
    width: 15px;
    padding-right: 2.415%;
    text-align: center;
    font-size: 12px;
    color: white;
    z-index: 99;
}
.initials li img{
    width: 14px;

}
.listSelected{
    color: #ffffff;
}
.font-size-type{
    font-size: 12px;
}
.search-header{
    background-color: #737d89;
}

input::-webkit-input-placeholder { /* WebKit browsers */
    color:white;
    font-size:16px;
}
input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:white;
    font-size:16px;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:white;
    font-size:16px;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:white;
    font-size:16px;
}
.searchBoxDiv {
/*    position: fixed;*/
    position: absolute;
    top: 64px;
    left: 0;    
    margin:0px 2% 0px 2%;
    width: 96%;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 16px;
    background-color: #56606e;
    text-align: center;
    color: #ffffff;
    outline: none;
    z-index: 10;
}
.searchBox {
    position: relative;
    font-size: 16px;
    width: 94%;
    height: 30px;
    line-height: 30px;
    padding: 0 3%;
    border: 0 solid white;
    background-color: transparent;
    color: white;
    /*display: none;*/
    /*outline-color:red;*/
}
.searchSue {
    position: absolute;
    top: 0px;
    margin:1px 25%;
    width: 50%;
    height: 25px;
    text-align: center;
}
.searchSue img {
    width: 20px;
    height: 20px;
    vertical-align: -4px;
}
.searchSue .searchImg {
    float: left;
    width: 47%;
    text-align: right;
    padding-right: 3%;
}
.searchSue .searchTitle {
    float: left;
    width: 47%;
     
    text-align: left;
    padding-left: 3%;
    font-size: 20px;
}
.searchLayer{
    width: 100%;
    height: 100%;
    line-height: 50px;
    position: fixed          ;
    display: none;
    /*left: 20px;*/
    background-color: #3b4757;
    right: 0px;
    margin-top: 45px;
    z-index: 110;
    overflow: auto;
}
.searchResultList{
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 50px;
    z-index: 112;
}

.searchresult{
    margin-top: 0px;

}
.cancelBtn {
    position: absolute;
    z-index: 10;
    right: 12px;
    color: #ffffff;
    width: 26px;
    height: 26px;
    display: none;
}
.cancelBtn img {
    width: 16px;
    height: 16px;
    margin-top: 7px;
}
.resultPrompt{
    position: fixed;
    width: 100%;
    height: 50px;
    display: none;
    text-align: center;
    margin-top: 50%;
    font-size: 22px;
}
</style>