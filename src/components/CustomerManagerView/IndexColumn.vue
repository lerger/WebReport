<template>
  <div id="search_header" class="header">
    <ccsearchheader></ccsearchheader>
  </div>
  <div class="searchBoxDiv">
    <input id="searchBox" class="searchBox" placeholder="" v-model="items" @focus="touchSearch" @blur="touchSearchOut">
    <div @click="touchSearch" class="searchSue"><div class="searchImg"><img src="../../assets/images/searcher.png" /></div><div class="searchTitle">搜索</div></div>
  </div>
   <!-- <div id="Main">  -->
  <div class="parent">
    <div class="classifiedContentBg">
      <div class="classifiedContent">
        <div class="column manage" @click="indexClassificationClick($event,'1')">
          <img src='../../assets/images/supervise.png'>
          <span>监管</span>
        </div>
        <div class="column supervise" @click="indexClassificationClick($event,'2')">
          <img src='../../assets/images/manage.png'>
          <span>经营</span>
        </div>
          <div class="column assess" @click="indexClassificationClick($event,'3')">
            <img src='../../assets/images/assess.png'>
            <span>考核</span>
          </div>
          <div class="column personage" @click="indexClassificationClick($event,'4')">
            <img src='../../assets/images/personge.png'>
            <span>个人业绩</span>
          </div>
      </div>
    </div>
  </div>
   <!--   <div class="index1-div">
         <span style="height:150px; line-height:150px; display:block; color:#FFF; text-align:center">盈利类指标</span>
     </div>
     <div class="index2-div">
         <span style="height:150px; line-height:150px; display:block; color:#FFF; text-align:center">亏损类指标</span>
     </div> -->
	<!-- <p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p> 
	<p>www.baidu.com</p><p>www.baidu.com</p><p>www.baidu.com</p>  -->
  <!-- </div>  -->
<!-- <div id="ToolBar">关注</div> -->
</template>
<script type="text/javascript">
import Vue from 'vue'
import router from 'src/routers';
import Params from 'src/routersParam'
import ParamsData from 'src/js/params_data'
import $ from 'jquery'
import searchJs from '../../components/searchJs'
import SearchHeader from '../Common/SearchHeader'
import SearchResult from '../SearchResult'

export default {
    data() {
        return {
            // targetList:[],
            // checkbox: require('../assets/images/searcher_checkbox.png'),
            // selecteLogo: require('../assets/images/searcher_checkbox_s.png'),
            // searchParams:searchParams,
            // items:searchParams,
        }
    },
    watch:{
        // items:{
        //    handler:function(val,oldval){
        //      // console.log(this.$els.texttype.value);
        //     var filterTargetList =  filterTarget(this.items);
          
        //     var resultPrompt = $(".resultPrompt");
        //     if (filterTargetList.length == 0) {
        //         resultPrompt.fadeIn();
        //     }
        //     else{
        //         resultPrompt.fadeOut();
        //     }
        //     this.searchParams = filterTargetList;

        //     $(".searchLayer").fadeIn();
        //     $(".cancelBtn").fadeIn();
        //     $(".searchContainer").css('position','fixed');

        //     $(".initials").fadeOut();
        //     $(".rightbutton").fadeOut();
            
        //    },
        //    deep:true
        // }
    },
    methods: {
        indexClassificationClick:function(event,index_type){
            var limits = window.localStorage.limits;
            if (limits == 6 ) {
                if (index_type == 1 || index_type == 2 || index_type == 3) {
                    alert('您没有权限查看此类指标');
                    return;
                }
            }
            router.go({ name: 'search',params:{index_type:index_type}});
        },
        resetCss() {
          var viewHeight = document.documentElement.clientHeight;
          var viewWidth = document.documentElement.clientWidth;
          var columnImgWidth = viewWidth*(1/3);
          $(".column>img").css('width',columnImgWidth);
          $(".column>img").css('height',columnImgWidth +10);
          var subTitleNum_nameFontSizeAdjust  = viewWidth * (7/24)* (4.5/10)/2.2;
          $(".column>span").css('font-size',subTitleNum_nameFontSizeAdjust)
        },
        // selecBboxClick:function(indexNo){},
        // setData:function(_this){
        //     $(".module_poper_timer").fadeIn();
        //     var searchIndexListUrl = ParamsData.method().getSearchIndexList();
        //     var params = {userNo:window.localStorage.userid};
        //     $.post(searchIndexListUrl, params, function(result){
        //         console.log(result);
        //          _this.getAttentionList(_this,result);
                              
        //     },'json');
        // },
        // getAttentionList:function(_this,searchListResult){
        //     var attentionUrl = ParamsData.method().queryHomePage();
        //     var params = {userNo:window.localStorage.userid,currency:'CN',date:20160331};
        //     $.post(attentionUrl, params, function(result){
        //         var attentionArray = result[0].retBody;
        //         $(".module_poper_timer").fadeOut();
        //         targetList = restructure(searchListResult,attentionArray);
        //         searchJs.method().createLetter(targetList);
        //          _this.targetList = targetList;
        //         setTimeout(() => {
        //             $(".sort_box").fadeIn(100);
        //              resetCss();
        //             $(".最新指标>div").css('color','#ffb3f9')
        //             indexNos = indexNos||[];
        //             indexNos.splice(0,indexNos.length); 
        //             for (var i = 0; i < attentionArray.length; i++) {
        //                 if (indexNos.indexOf(attentionArray[i].indexNo) == -1) {
        //                  indexNos.push(attentionArray[i].indexNo);
        //                 }
        //                 var imgSelectId = '#img-'+indexNos[i];
        //                 var image = $(imgSelectId);
        //                 image[0].src = _this.selecteLogo;
        //             }  
        //         }, 0);
        //     },'json');
        // },
        // onSelected: function(event, index, name, index2, indexNo) {
        //     var imgSelectId = '#img-'+indexNo;
        //         var image = $(imgSelectId);
        //         image[0].src = this.selecteLogo;
        //         indexNos = indexNos ||[];
        //         if (indexNos.indexOf(indexNo) == -1) {
        //             indexNos.push(indexNo);
        //         }else{//取消选中
        //             image[0].src = this.checkbox;
        //             indexNos.splice($.inArray(indexNo, indexNos), 1);
        //             console.log(indexNos);
        //         }
        //     console.log('indexNos',indexNos);
        // },
     
        // cancelBtnClick:function(enve){
        //     $(".searchSue").fadeIn(200);
        //     $(".searchLayer").fadeOut();
        //     $(".cancelBtn").fadeOut();

        //     $(".initials").fadeIn();
        //     $(".searchContainer").css('position','relative');
        //     $("#searchBox")[0].value = null;
        //     $(".rightbutton").fadeIn();
        // },
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

        if(window.navigator.onLine==true){
            var _this = this;
            // this.setData(_this);
        }
        else{
            // $("#prompt").text('网络连接异常')
            // $("#prompt").fadeIn();
            // $(".module_poper_timer").fadeOut();
            // setTimeout(()=> {
            //    $("#prompt").fadeOut();
            // },1000)
         }
          this.resetCss();
        scrollTo(0,0);
        $(".searchBox").focus(function(){
            console.log('焦点');
     
         });

        $(".cctitle").text(ParamsData.method().getAppTitle());
        $(".rightbutton").css('font-size','22px');
        $(".rightbutton").text('');
        $(".rightbutton").hide();
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
                var params = {userNo:window.localStorage.userid,indexNos:uploadIndexNo}; 
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

</script>
<style type="text/css"> 
html,body { 
width:100%; 
height:100%; 
margin:0px; 
padding:0px; 
/*overflow:hidden; */
} 
#Main { 
position:absolute;
bottom:65px; 
left:0px; 
width:100%; 
height:100%; 
overflow:auto; 
/*z-index:1; */
} 
#ToolBar { 
position:absolute; 
bottom:0px; 
width:100%; 
height:64px; 
text-align:center; 
background-image: url(http://img03.tooopen.com/uploadfile/downs/images/20110714/sy_20110714135215645030.jpg);
/*background-image: url(http://hi.csdn.net/attachment/201101/18/7494075_1295323598v2Ii.png);*/
/*BACKGROUND-IMAGE: url(http://hi.csdn.net/attachment/201101/18/7494075_1295323598v2Ii.png); */
z-index:2; 
overflow:hidden; 
/*background-color: red;*/
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
.parent{position:absolute;width:100%;top: 94px;/*height:100%;*/background-size:100% 100%;/*margin-top:0px;*/bottom: 0px;/*top:0px*/;background-image: url(../../assets/images/fenlei_bg.png)}
.classifiedContentBg{
  position: absolute;
  width:100%;
  top: 0px;
  bottom:0px;
}
.classifiedContent{position: absolute;margin: auto;width: 100%;height: 450px;top: 0;left: 0;right: 0;bottom: 0;}
.column{/*margin-top:40px;*/margin-bottom:40px;/*float:left;*//*width:180px;height:150px;*//*margin-left:50px;*//*margin-top:40px*/;/*box-sizing:border-box;*//*background-color:#EE00EE;*/ /*border-radius:10px*/;
 }

 .column img{
    width: 140px;/*140px*/
    height: 150px;/*150px*/
 }
.column span{
    height:30px; line-height:30px; display:block; color:#FFF; text-align:center;font-size: 24px;
}
.manage{
    float: left;
    margin-left: 10%;
}
.supervise{
    float: right;
    margin-right: 10%;
}
.assess{
   float: left;
   margin-left: 10%;
   
}
.personage{
   float: right;
   margin-right: 10%;
}
</style>