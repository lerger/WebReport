<script type="text/javascript">
  import $ from 'jquery'
  var riseImg = require('../assets/images/rise.png');
  var dropImg = require('../assets/images/drop.png');

  var RPT1968_01 = "RPT1968_01";//储蓄存款时期数
  var RPT1968_02 = "RPT1968_02";//网均储蓄存款时期增长达标率
  var RPT1968_03 = "RPT1968_03";//零售客户开户数
  var RPT1968_04 = "RPT1968_04";//全口径有效客户数
  var RPT1968_05 = "RPT1968_05";//零售贷款余额
  var RPT1968_06 = "RPT1968_06";//信用卡有效标卡发卡量
  var RPT1968_07 = "RPT1968_07";//信用卡标卡发卡量
  var RPT1968_08 = "RPT1968_08";//信用卡标卡收入
  var RPT1968_09 = "RPT1968_09";//财富客户对私管理资产余额
  var RPT1968_10 = "RPT1968_10";//对私管理资产销售额
  var RPT1968_11 = "RPT1968_11";//网络有效客户数
  var RPT1968_12 = "RPT1968_12";//金融生态圈商户数
  // 零售分支行考核指标显示线图和比上季数据数组
  var retailBusinessBranchIndex = [RPT1968_01,RPT1968_02,RPT1968_03,RPT1968_04,RPT1968_05,RPT1968_06,RPT1968_07,RPT1968_08,RPT1968_09,RPT1968_10,RPT1968_11,RPT1968_12];
  function showPreviousSeason(indexNo,wclArray,pmArray,zsArray,cascFlag){
    console.log('==============================');
    console.log(cascFlag);
    $("#quarterlyCompletionRate").hide()//季度完成率
    $("#annualCompletionRate").hide()//年度完成率
    $(".rankingContent").hide();//完成率排名
    $("#yjzhzs").hide();
    $("#dbyjzhzs").hide();
    if (retailBusinessBranchIndex.indexOf(indexNo) == -1) {//如果包含在这个数组内，则显示零售分支行界面，否则就显示比同期，以保证模块切换时不显示比同期数据
      $("#samePeriod").show();//比同期
      return;
    }
    if (indexNo == RPT1968_02) {//如果为网均储蓄存款时期增长达标率
      $("#previousDay").hide();//比上日
      $("#previousMonth").hide();//比上季度
      $("#previousSeason").hide();//比上季度
      $("#Early").hide();//比年初
      $("#samePeriod").hide();//比同期
      $("#yjzhzs").show();
      $("#dbyjzhzs").show();
    }else{
      $("#previousDay").show();//比上日
      $("#previousMonth").show();//比上季度
      $("#previousSeason").show();//比上季度
      $("#Early").show();//比年初
      $("#samePeriod").hide();//比同期
      $("#quarterlyCompletionRate").show()//季度完成率
      $("#annualCompletionRate").show()//年度完成率
      $(".rankingContent").show();//完成率排名
    }
    
    setTrrigleArrowStyle(wclArray,pmArray,zsArray,cascFlag);
  }
  // 数据样式同期渲染
  function setTrrigleArrowStyle(wclArray,pmArray,zsArray,cascFlag){
    var  quarterlyCompletionRate_val;
    var  annualCompletionRate_val;
    if (typeof(wclArray) != 'undefined') {
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
    
    var UP_YPM;
    var QPM;
    var YPM;
    var UP_UP_YPM;
    var UP_QPM;
    var UP_YPM_RAL;
    var upOrgName;
    if (typeof(pmArray) != 'undefined') {
      for (var j = 0; j < pmArray.length; j++) {
        if (typeof(upOrgName) == 'undefined') {
          upOrgName = pmArray[j].upOrgName;
        }
        if (pmArray[j].type == 'UP_Y') {//表示比年初排名
            UP_YPM = pmArray[j].value;
            UP_UP_YPM = pmArray[j].up_value;
        }
        else if(pmArray[j].type == 'Q'){//表示季度完成排名
          QPM = pmArray[j].value
          UP_QPM = pmArray[j].up_value;
        }
        else if(pmArray[j].type == 'Y'){//表示年度完成率排名
          YPM = pmArray[j].value;
          UP_YPM_RAL = pmArray[j].up_value;
        }
      }
      //完成率排名赋值
      // QPM = 4;
      // UP_QPM = 0;
      // YPM = 4;
      // UP_YPM_RAL = 0;
      console.log('rrrrrr+0000');
      console.log(QPM,UP_QPM,YPM,UP_YPM_RAL);
      if (upOrgName.length > 8) {
        $("#quarterlyCompletionRateRankings").css('font-size','14px');
        $("#annualCompletionRateRankings").css('font-size','14px')
      }
      $("#quarterlyCompletionRateRankings").text('季度完成率排名:'+upOrgName+'TOP'+QPM);
      $("#annualCompletionRateRankings").text('年度完成率排名:'+upOrgName+'TOP'+YPM);
      $("#rankingFirstImg").show();
      $("#rankingSecondeImg").show();
      if (QPM < UP_QPM && UP_QPM != 0) {//当前排名大于昨日排名用上升箭头

        $("#rankingFirstImg").attr("src", riseImg);
      }
      else if (QPM == UP_QPM || UP_QPM == 0) {//不变就不用箭头
        $("#rankingFirstImg").hide();
        $("#quarterlyCompletionRateRankings").text('季度完成率排名:'+upOrgName+'TOP'+QPM + ' --');
      }
      else{//用下降箭头
        $("#rankingFirstImg").attr("src", dropImg);
      }

      if (YPM < UP_YPM_RAL && UP_UP_YPM != 0) {//当前排名大于昨日排名用上升箭头
        $("#rankingSecondeImg").attr("src", riseImg);
      }
      else if (YPM == UP_YPM_RAL || UP_UP_YPM == 0) {//不变就不用箭头
        $("#rankingSecondeImg").hide();
        $("#annualCompletionRateRankings").text('年度完成率排名:'+upOrgName+'TOP'+YPM  + ' --');
      }
      else
      {//用下降箭头
        $("#rankingSecondeImg").attr("src", dropImg);
      }
      var userOrgLevel = parseInt(window.localStorage.orgLevel);
      if (userOrgLevel == 1 && typeof(cascFlag) == 'undefined' || userOrgLevel == 1 && cascFlag == 0) 
      {//如果当前用户为总行用户。且是总行指标就不要排名
        $(".rankingContent").hide();//完成率排名
      }
      if (cascFlag == 2 || cascFlag == 3 || userOrgLevel == 3 || userOrgLevel == 4) {//表示一级支行或者网点
        $("#quarterlyCompletionRate").hide()//季度完成率
        $("#annualCompletionRate").hide()//年度完成率
        $("#annualCompletionRateRankingsContent").hide();
        $("#rankingFirstImg").show();
        $("#quarterlyCompletionRateRankings").text('比年初新增数排名:'+upOrgName+'TOP'+UP_YPM);
        if (UP_YPM < UP_UP_YPM) {//当前排名大于昨日排名用上升箭头
         $("#rankingFirstImg").attr("src", riseImg);
        }
        else if (UP_YPM == UP_UP_YPM) {//不变就不用箭头
          $("#rankingFirstImg").hide();
          $("#quarterlyCompletionRateRankings").text('比年初新增数排名:'+upOrgName+'TOP'+UP_YPM + ' --');
        }
        else{//用下降箭头
          $("#rankingFirstImg").attr("src", dropImg);
        }
      }
    }
    
    var ZS;
    var DBZS;
    if (typeof(zsArray) != 'undefined') {
      for (var k = 0; k < zsArray.length; k++) {
        if (zsArray[k].type == 'ZS') {
          ZS = zsArray[k].value;
        }
        else if(zsArray[k].type == 'DBZS'){
          DBZS = zsArray[k].value;
        }
      }
      //网均储蓄存款时期增长达标率赋值dbyjzhzsv
      //一级支行总数
      var zsVal = parseInt(ZS);
      $("#yjzhzsv").attr('value', zsVal);
      var zs_val = parseFloat($("#yjzhzsv").attr('value'));
      $("#yjzhzsv").text(parseInt(zs_val));
      $("#yjzhzsv").css("color", '#fff');
      //达标总数
      var dbZsVal = parseInt(DBZS);
      $("#dbyjzhzsv").attr('value', dbZsVal);
      var db_zs_val = parseFloat($("#dbyjzhzsv").attr('value'));
      $("#dbyjzhzsv").text(parseInt(db_zs_val));
      $("#dbyjzhzsv").css("color", '#fff');
    }
  }
  export default {
    method () {
      return {
        showPreviousSeason:showPreviousSeason,
      }
    },
    data (){
      return {
        retailBusinessBranchIndex:retailBusinessBranchIndex
      }
    }
  }
</script>