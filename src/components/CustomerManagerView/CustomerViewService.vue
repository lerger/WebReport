<script type="text/javascript">
	import $ from 'jquery'
  var YBXCKSDS_Y               = 'YBXCKSDS_Y';     //A类指标   一般性存款时点数
  var YBXCKSQS_Y               = 'YBXCKSQS_Y';     //A类指标   一般性存款时期数
  var JCCKSDS_Y                = 'JCCKSDS_Y';      //A类指标   基础存款时点数
  var JCCKSQS_Y                = 'JCCKSQS_Y';      //A类指标   基础存款时期数
  var DGCKSDS_Y                = 'DGCKSDS_Y';      //A类指标   对公存款时点数
  var DGCKSQS_Y                = 'DGCKSQS_Y';      //A类指标   对公存款时期数
  var CXCKSDS_Y                = 'CXCKSDS_Y';      //A类指标   储蓄存款时点数
  var CXCKSQS_Y                = 'CXCKSQS_Y';      //A类指标   储蓄存款时期数
  var DGDKSDS_Y                = 'DGDKSDS_Y';      //A类指标   对公贷款时点数
  var DGDKSQS_Y                = 'DGDKSQS_Y';      //A类指标   对公贷款时点数
  var LSDKSDS_Y                = 'LSDKSDS_Y';      //A类指标   零售贷款时点数
  var LSDKSQS_Y                = 'LSDKSQS_Y';      //A类指标   零售贷款时期数


  var JCXCKSDS_Y               = 'JCXCKSDS_Y';     //A1类指标  净储蓄存款时点数
  var JCXCKSQS_Y               = 'JCXCKSQS_Y';     //A1类指标  净储蓄存款时期数
  var DGHQCKSDS_Y              = 'DGHQCKSDS_Y';     //A1对公活期存款时点数
  var DGHQCKSQS_Y              = 'DGHQCKSQS_Y';     //A1类指标  对公活期存款时期数
  var DGDQCKSDS_Y              = 'DGDQCKSDS_Y';     //A1类指标  对公定期存款时点数
  var DGDQCKSQS_Y              = 'DGDQCKSQS_Y';     //A1类指标  对公定期存款时期数
  var HQJCXCKSDS_Y             = 'HQJCXCKSDS_Y';     //A1类指标  活期净储蓄存款时点数
  var HQJCXCKSQS_Y             = 'HQJCXCKSQS_Y';     //A1类指标  活期净储蓄存款时期数
  var DQJCXCKSDS_Y             = 'DQJCXCKSDS_Y';     //A1类指标  定期净储蓄存款时点数
  var DQJCXCKSQS_Y             = 'DQJCXCKSQS_Y';     //A1类指标  定期净储蓄存款时期数
  var GSBBLCSDS_Y              = 'GSBBLCSDS_Y';     //A1类指标  公司保本理财时点数
  var GSBBLCSQS_Y              = 'GSBBLCSQS_Y';     //A1类指标  公司保本理财时期数
  var GRBBLCSDS_Y              = 'GRBBLCSDS_Y';     //A1类指标  个人保本理财时点数
  var GRBBLCSQS_Y              = 'GRBBLCSQS_Y';     //A1类指标  个人保本理财时期数
  var ZBZXQYDKYE               = 'ZBZXQYDKYE';     //A1类指标  中小企业贷款余额-主办经理
  var ZXQYDKYE                 = 'ZXQYDKYE';     //A1类指标  中小企业贷款余额-创利分成


  var ZYKFSLCRJE               = 'ZYKFSLCRJE';     //B类指标   自营封闭式理财销售额
  var ZYKFSLCXSE               = 'ZYKFSLCXSE';     //B类指标   自营开放式理财销售额
  var XYKBKYXKFK               = 'XYKBKYXKFK';     //B类指标   信用卡标卡有效卡发卡
  var XYKBKFK                  = 'XYKBKFK';     //B类指标   信用卡标卡发卡
  var KLZCBL                   = 'KLZCBL';     //B类指标   快乐智存办理（随手存/随心取
  var DXSWGJSYW                = 'DXSWGJSYW';     //B类指标   代销实物贵金属业务
  var DXJJYW                   = 'DXJJYW';     //B类指标   代销基金业务
  var DLBXYW                   = 'DLBXYW';     //B类指标   代理保险业务
  var SFCGQYHS                 = 'SFCGQYHS';     //B类指标   三方存管签约户数
  var JJDTQYHS                 = 'JJDTQYHS';     //B类指标   基金定投签约户数
  var ETCQY                    = 'ETCQY';     //B类指标   ETC签约
  var QYWYQYHS                 = 'QYWYQYHS';     //B类指标   企业网银签约户数
  var WLYHHYKHS                = 'WLYHHYKHS';     //B类指标   网络银行活跃客户数
  var XZJRSTQSH                = 'XZJRSTQSH';     //B类指标   新增金融生态圈商户
  var JGXCK                    = 'JGXCK';     //B类指标   结构性存款
  var KLFQSR                   = 'KLFQSR';     //B类指标   快乐分期收入
  var GJYWJSL                  = 'GJYWJSL';     //B类指标   国际业务结算量
  var DGSXKHS                  = 'DGSXKHS';     //B类指标   新增对公授信客户数


  var XZLSDKYE                 = 'XZLSDKYE';     //C类指标   新增零售贷款余额
  var XZQKJYXKH                = 'XZQKJYXKH';     //C类指标   新增全口径有效客户


  var DGBLDKL                  = 'DGBLDKL';     //D类指标   对公不良贷款率
  var LSBLDKL                  = 'LSBLDKL';     //D类指标   零售不良贷款率
  var DGYQDKL                  = 'DGYQDKL';     //D类指标   对公逾期贷款率
  var LSYQDKL                  = 'LSYQDKL';     //D类指标   零售逾期贷款率

  //监管类指标
  var RCRL00048                = 'RCRL00048';   // 一级资本充足率
  var RCRL_GG005               = 'RCRL_GG005';   //不良贷款率
  var FFAN00017                = 'FFAN00017';   //净利差
  var FFAN00019                = 'FFAN00019';   //净息差
  var RLRL00014                = 'RLRL00014';   //存贷比（人民币）
  var FFAN00004                = 'FFAN00004';   //成本收入比率
  var RCRL_GG006               = 'RCRL_GG006';   // 拨备覆盖率
  var RCRL00039                = 'RCRL00039';   //核心一级资本充足率
  var RLRL00002                = 'RLRL00002';   //核心负债依存度
  var RLRL_GG001               = 'RLRL_GG001';   // 流动性比例
  var RLRL00010                = 'RLRL00010';   //流动性缺口率
  var RLRL00009                = 'RLRL00009';   //流动性覆盖率
  var RMRL00001                = 'RMRL00001';   //累计外汇敞口头寸比例
  var RCRL00033                = 'RCRL00033';   //贷款拨备率
  var RCRL00054                = 'RCRL00054';   //资本充足率
  var RCRL00049                = 'RCRL00049';   //逾期90天以上贷款与不良贷款比例
  //监管类指标数组
  var regulatoryIndexArray = [RCRL00048,RCRL_GG005,FFAN00017,FFAN00019,RLRL00014,FFAN00004,RCRL_GG006,RCRL00039,RLRL00002,RLRL_GG001,RLRL00010,RLRL00009,RMRL00001,RCRL00033,RCRL00054,RCRL00049];


	//客户经理所有指标数组
	var customerViewIndexs_all = [YBXCKSDS_Y,YBXCKSQS_Y,JCCKSDS_Y,JCCKSQS_Y,DGCKSDS_Y,DGCKSQS_Y,CXCKSDS_Y,CXCKSQS_Y,   CXCKSQS_Y,DGDKSDS_Y,DGDKSQS_Y,LSDKSDS_Y,LSDKSQS_Y,JCXCKSDS_Y,JCXCKSQS_Y,DGHQCKSDS_Y,DGHQCKSQS_Y,DGDQCKSDS_Y,DGDQCKSQS_Y,HQJCXCKSDS_Y,HQJCXCKSQS_Y,DQJCXCKSDS_Y,DQJCXCKSQS_Y,GSBBLCSDS_Y,GSBBLCSQS_Y,GRBBLCSDS_Y,GRBBLCSQS_Y,ZBZXQYDKYE,ZXQYDKYE,ZYKFSLCRJE,ZYKFSLCXSE,XYKBKYXKFK,XYKBKFK,KLZCBL,DXSWGJSYW,DXJJYW,DLBXYW,SFCGQYHS,JJDTQYHS,ETCQY,QYWYQYHS,WLYHHYKHS,XZJRSTQSH,JGXCK,KLFQSR,GJYWJSL,DGSXKHS,XZLSDKYE,XZQKJYXKH,DGBLDKL,LSBLDKL,DGYQDKL,LSYQDKL];
  //A类指标数组
	var customerViewIndexs_A  = [YBXCKSDS_Y,YBXCKSQS_Y,JCCKSDS_Y,JCCKSQS_Y,DGCKSDS_Y,DGCKSQS_Y,CXCKSDS_Y,CXCKSQS_Y,   CXCKSQS_Y,DGDKSDS_Y,DGDKSQS_Y,LSDKSDS_Y,LSDKSQS_Y];
  //A1类指标数组
	var customerViewIndexs_A1 = [JCXCKSDS_Y,JCXCKSQS_Y,DGHQCKSDS_Y,DGHQCKSQS_Y,DGDQCKSDS_Y,DGDQCKSQS_Y,HQJCXCKSDS_Y,HQJCXCKSQS_Y,DQJCXCKSDS_Y,DQJCXCKSQS_Y,GSBBLCSDS_Y,GSBBLCSQS_Y,GRBBLCSDS_Y,GRBBLCSQS_Y,ZBZXQYDKYE,ZXQYDKYE];
  //B类指标数组
	var customerViewIndexs_B  = [ZYKFSLCRJE,ZYKFSLCXSE,XYKBKYXKFK,XYKBKFK,KLZCBL,DXSWGJSYW,DXJJYW,DLBXYW,SFCGQYHS,JJDTQYHS,ETCQY,QYWYQYHS,WLYHHYKHS,XZJRSTQSH,JGXCK,KLFQSR,GJYWJSL,DGSXKHS];
  //C类指标数组
	var customerViewIndexs_C  = [XZLSDKYE,XZQKJYXKH];
  //D类指标数组
	var customerViewIndexs_D  = [DGBLDKL,LSBLDKL,DGYQDKL,LSYQDKL];


	var customerViewOrgFinderList = [];
	function showCustomerView(indexNo,pmArray,wclArray,mbsArray){
		console.log('来到客户经理试图')
    $("#gaugeChartId").hide();//仪表盘
		$(".rankingContent").hide();//排名盒子
		$("#quarterlyCompletionRateRankingsContent").hide();//新增数排名
    $("#annualCompletionRateRankingsContent").hide();//季度完成率排名
    $("#quarterlyTargetId").hide();//季度目标值
    $("#annualTargetId").hide();//年度目标值
    $("#quarterlyCompletionRate").hide()//季度完成率
    $("#annualCompletionRate").hide()//年度完成率
    
    if (customerViewIndexs_all.indexOf(indexNo) != -1) {
    	$("#previousSeason").hide();//比上季度
       $("#samePeriod").hide();//比同期
    }else{
    	$("#previousSeason").show();//比上季度
    	$("#samePeriod").show();//比同期
    }
    // 如果属于A1类指标只显示完成数排名，不显示完成率排名
    if (customerViewIndexs_A1.indexOf(indexNo) != -1) {
     	console.log('属于A1类指标')
     	$(".rankingContent").show()//排名盒子
      $("#quarterlyTargetId").hide();//季度目标值
      $("#annualTargetId").hide();//年度目标值
      $("#quarterlyCompletionRateRankingsContent").show();//新增数排名
      $("#annualCompletionRateRankingsContent").hide();//季度完成率排名
      $("#quarterlyCompletionRate").hide()//季度完成率
      $("#annualCompletionRate").hide()//年度完成率
    }
    else if (customerViewIndexs_A.indexOf(indexNo) != -1) {
     	console.log('属于A类指标')
      $("#quarterlyTargetId").show();//季度目标值
      $("#annualTargetId").show();//年度目标值
     	$("#quarterlyCompletionRate").show()//季度完成率
      $("#annualCompletionRate").show()//年度完成率
      $(".rankingContent").show()//排名盒子
      $("#quarterlyCompletionRateRankingsContent").show();//新增数排名
      $("#annualCompletionRateRankingsContent").show();//季度完成率排名
        
    }
    else if (customerViewIndexs_B.indexOf(indexNo) != -1) {
    	$("#Early").hide();//比年初
    	$("#quarterlyTargetId").show();//季度目标值
      $("#annualTargetId").show();//年度目标值
      $("#quarterlyCompletionRate").show()//季度完成率
      $("#annualCompletionRate").show()//年度完成率
    	$(".rankingContent").show()//排名盒子
    	$("#quarterlyCompletionRateRankings").show();//新增数排名
      $("#annualCompletionRateRankings").show();//季度完成率排名
    }
    else if (customerViewIndexs_C.indexOf(indexNo) != -1) {
       
    }
    else if (customerViewIndexs_D) {
      $("#gaugeChartId").show();//仪表盘组件

      $(".rankingContent").hide()//排名盒子
      $("#quarterlyTargetId").hide();//季度目标值
      $("#annualTargetId").hide();//年度目标值
      $("#quarterlyCompletionRateRankingsContent").hide();//新增数排名
      $("#annualCompletionRateRankingsContent").hide();//季度完成率排名
      $("#quarterlyCompletionRate").hide()//季度完成率
      $("#annualCompletionRate").hide()//年度完成率
    }
    setTrrigleArrowStyle(indexNo,pmArray,wclArray,mbsArray);
	}

	function setTrrigleArrowStyle(indexNo,pmArray,wclArray,mbsArray){
   
    var quarterlyTarget_val;//季度目标值
    var annualTarget_val;//年度目标值
    if (typeof(mbsArray) != 'undefined' && mbsArray.length > 0) {
   	  for (var i = 0; i < mbsArray.length; i++) {
        if (mbsArray[i].type == 'Q') {//表示季度完成率
          quarterlyTarget_val = mbsArray[i].value;
        }
        else if(mbsArray[i].type == 'Y'){
          annualTarget_val = mbsArray[i].value
        }
      }
      // 季度目标数赋值
      var quarterlyTargetVal = parseFloat(quarterlyTarget_val.toFixed(2));
      $("#quarterlyTargetValueId").attr('value', quarterlyTargetVal);
      var quarterlyTarget_value = parseFloat($("#quarterlyTargetValueId").attr('value'));
      $("#quarterlyTargetValueId").text(Math.abs(quarterlyTarget_value).toFixed(2));
      $("#quarterlyTargetValueId").css("color", '#fff');

      //年度目标数赋值
      var annualTargetVal = parseFloat(annualTarget_val.toFixed(2));
      $("#annualTargetValueId").attr('value', annualTargetVal);
      var annualTarget_value = parseFloat($("#annualTargetValueId").attr('value'));
      $("#annualTargetValueId").text(Math.abs(annualTarget_value).toFixed(2));
      $("#annualTargetValueId").css("color", '#fff');
    }


		var  quarterlyCompletionRate_val;
    var  annualCompletionRate_val;
    if (typeof(wclArray) != 'undefined' && wclArray.length > 0) {
      for (var i = 0; i < wclArray.length; i++) {
        if (wclArray[i].type == 'Q') {//表示季度完成率
          quarterlyCompletionRate_val = wclArray[i].value;
        }
        else if(wclArray[i].type == 'Y'){
          annualCompletionRate_val = wclArray[i].value
        }
      }
      // 季度完成率赋值
      var quarterlyCompletionRateVal = parseFloat(quarterlyCompletionRate_val.toFixed(2));
      $("#quarterlyCompletionRateVal").attr('value', quarterlyCompletionRateVal);
      var quarterly_rate = parseFloat($("#quarterlyCompletionRateVal").attr('value'));
      $("#quarterlyCompletionRateVal").text(Math.abs(quarterly_rate).toFixed(2) + '%');
      $("#quarterlyCompletionRateVal").css("color", '#fff');

      //年度完成率赋值
      var annualCompletionRateVal = parseFloat(annualCompletionRate_val.toFixed(2));
      $("#annualCompletionRateVal").attr('value', annualCompletionRateVal);
      var annualCompletion_rate = parseFloat($("#annualCompletionRateVal").attr('value'));
      $("#annualCompletionRateVal").text(Math.abs(annualCompletion_rate).toFixed(2) + '%');
      $("#annualCompletionRateVal").css("color", '#fff');
    }
		var WCSPM;
		var UP_WCSPM;
    var QPM;
    var UP_QPM;
    var orgName;
    if (typeof(pmArray) != 'undefined' && pmArray.length > 0) {
      for (var j = 0; j < pmArray.length; j++) {
        if (typeof(orgName) == 'undefined') {
          orgName = pmArray[j].orgName;
        }
        if (pmArray[j].type == 'WCS') {//完成数排名
           WCSPM = pmArray[j].value;
           UP_WCSPM = pmArray[j].up_value;
        }
        else if(pmArray[j].type == 'Q'){//表示季度完成排名
          QPM = pmArray[j].value
          UP_QPM = pmArray[j].up_value;
        }
       
      }
      orgName = '株洲分行'
      if (orgName.length > 8) {
        $("#quarterlyCompletionRateRankings").css('font-size','14px');
        $("#annualCompletionRateRankings").css('font-size','14px')
      }
      $("#quarterlyCompletionRateRankings").text('新增数排名:'+orgName+'TOP'+WCSPM);
      $("#annualCompletionRateRankings").text('完成率排名:'+orgName+'TOP'+QPM);
      if (WCSPM < UP_WCSPM) {//当前排名大于昨日排名用上升箭头
        $("#rankingFirstImg").attr("src", riseImg);
      }
      else if (WCSPM == UP_WCSPM) {//不变就不用箭头
        $("#rankingFirstImg").hide();
        $("#quarterlyCompletionRateRankings").text('新增数排名:'+orgName+'TOP'+WCSPM + ' --');
      }
      else{//用下降箭头
        $("#rankingFirstImg").attr("src", dropImg);
      }

      if (QPM < UP_QPM) {//当前排名大于昨日排名用上升箭头
        $("#rankingSecondeImg").attr("src", riseImg);
      }
      else if (QPM == UP_QPM) {//不变就不用箭头
        $("#rankingSecondeImg").hide();
        $("#annualCompletionRateRankings").text('完成率排名:'+orgName+'TOP'+QPM  + ' --');
      }
      else
      {//用下降箭头
        $("#rankingSecondeImg").attr("src", dropImg);
      } 
    }
	}

	function setCustomerViewOrgFinderList(value){
     customerViewOrgFinderList = value;
	}

	function getCustomerViewOrgFinderList(){
		return customerViewOrgFinderList;
	}
	export default {
	  method () {
	    return {
	    	showCustomerView:showCustomerView,
	    	setCustomerViewOrgFinderList:setCustomerViewOrgFinderList,
	    	getCustomerViewOrgFinderList:getCustomerViewOrgFinderList
	    }
	  },
	  data (){
	  	return{
        regulatoryIndexArray:regulatoryIndexArray,
	  		customerViewIndexs_all:customerViewIndexs_all,
	  		customerViewIndexs_A:customerViewIndexs_A,
	  		customerViewIndexs_A1:customerViewIndexs_A1,
	  		customerViewIndexs_B:customerViewIndexs_B,
	  		customerViewIndexs_C:customerViewIndexs_C,
	  		customerViewIndexs_D:customerViewIndexs_D
	  	}
	  }
	}
</script>