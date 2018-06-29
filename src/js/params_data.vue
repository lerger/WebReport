<script>
	import $ from 'jquery'
	import CustomerViewService from 'components/CustomerManagerView/CustomerViewService.vue'
	//生产环境设置为0, 90或122测试服务器设为1，本机调试设为2，nodejs环境数据调试为3, 外网测试服务器为4;
	var isDebug = 4;
	// var isDebug = 0;

	var nodeIP = 'http://localhost:8080';

	//正式服务器
	var server = 'http://rpt.mis.bcs:8080';
	//调试服务器
	var debugServer = 'http://162.16.4.90:8080';
	var redServer = '';
	// var debugServer = 'http://162.16.4.122:8080';

	// isDebug = 0;
    // nodeIP = 'http://162.16.106.251:8088';
	if(isDebug == 4) {
		nodeIP = 'http://39.105.83.228:8080';
		// nodeIP = 'http://report.redmooncn.cn';
		// redServer = 'http://redmooncn.cn:8080';
		// redServer = 'http://162.16.4.90:8880';
		// redServer = 'http://162.16.4.90:8080';
		redServer = 'http://39.105.83.228:8080';
		// redServer = 'http://localhost:8080';
	}
	else if(isDebug == 3) {
		//162.16.106.98
		nodeIP = 'http://localhost:8088';
		redServer = 'http://redmooncn.cn:8080';
	}

	//服务器接口路径
	// var serverPath = '/rpt-web/report/frame/datashow/idx/getIdxResultForApp?';
	var serverBase = `/rpt-app/rptShowApp`;
	var serverPath = `${serverBase}/getIdxResultForApp?`;


	var mobileServerBase = `/mobile_board`;
    var searchIndexList = `${mobileServerBase}/rptIndexInfo/queryIndexList`;
	var closeAttentionUrl = `${mobileServerBase}/rptIndexInfo/closeAttention.do`;
	var addAttentionUrl = `${mobileServerBase}/rptIndexInfo/addAttention.do`;
	var findByConditionUrl = `${mobileServerBase}/rptIdxResultApp/findByCondition`;
	var getIndexList = `${mobileServerBase}/rptIdxResultApp/getIndexList`;
	var decideAttention = `${mobileServerBase}/rptIndexInfo/decideAttention`;
    var queryHomePage = `${mobileServerBase}/bdHomePageInfo/queryHomePage`;
    var resetAttention = `${mobileServerBase}/rptIndexInfo/resetAttention.do`;
	var queryIndexList = `${mobileServerBase}/rptIdxResultApp/queryIndexList`;
	//新详情（比上日，比上月，比年初，比同期及图表数据）
	var allRptResultApp = `${mobileServerBase}/rptIdxResultApp/allRptResultApp`;
	//客户经理视图指标详情数据接口
    var customerViewUrl = `${mobileServerBase}/rptIdxKfjlResultApp/allRptIdxKfjlResult`;
    var customerViewOrgFinderListUrl = `${mobileServerBase}/fRptMdlCmpZduser/findListOrgByUserNo`;
	//调试环境测试数据
    var debugPoint = 'http://report.redmooncn.cn/IFMPS00001';
	var nodeDataPoint = `${nodeIP}/IFMPS00001`;
	//登录验证接口
    var loginPath  = `${mobileServerBase}/login/loginInt?`;
    //置顶接口
    var stickTop = `${mobileServerBase}/bdHomePageInfo/addTop`;

    /**
     * 二期接口
     */
    
    //子级机构接口，若当前机构无子级机构返回null
    var branchOrg = `${mobileServerBase}/rptUserInfo/findListOrgByUserNo`;


	//手机端一期指标编码(编码变量名)
	var netSavingsDepositBalance = 'FLIA00054';		//净储蓄存款余额
	var personalGuaranteedFinancialBalance = 'FLIA00055';		//个人保本理财余额	
	var personalLoan = 'PLOA00047';		//个人消费类贷款与个人经营类贷款合并
	var theAmountOfPersonalInsuranceProductsSales = 'PFIN00045'			//个人保本理财产品销售金额
	var theAmountOfSalesOfPersonalNonGuaranteedFinancialProducts = 'PFIN00048'			//个人非保本理财产品销售金额		
	var salesOfFinancialProducts = 'PFIN00077_WY'	//理财产品销售金额	
	var PFIN00077_EQZ = 'PFIN00077_EQZ'	//理财产品销售金额	L		理财产品销售金额		0	亿
	var PFIN00077_WX = 'PFIN00077_WX'	//理财产品销售金额	L		理财产品销售金额		0	亿
	var numberOfCustomers = 'CCLA_GG001'		//客户数	K		客户数		0	亿
	var numberOfIndividualDeposits = 'CCLA00047'			//个人存款客户数	G		个人存款客户数	home_icon_customernumber.png	0	亿
	var numberOfPublicDeposits = 'CCLA00040'			//对公存款客户数	D		对公存款客户数	home_icon_customernumber.png	0	亿
	var numberOfIndividualLoanCustomers = 'CCLA00050'			//个人贷款客户数	G		个人贷款客户数（余额大于0）		0	亿
	var numberOfPublicLoanCustomers = 'CCLA00049'			//对公贷款客户数	D		对公贷款客户数（余额大于0）		0	亿
	var numberOfPrivateValueCustomers = 'CCEX00006'			//对私价值客户数	D		对私价值客户数		0	亿
	var numberOfPrivateCustomers = 'CCEX00010'			//对私有效客户数	D		对私有效客户数		0	亿
	var numberOfActiveCustomers = 'CCEX00028'			//网络活跃客户数	W		网络活跃客户数		0	亿
	var creditCardValidTag = 'PLOA00187'			//信用卡有效标卡	X		信用卡有效标卡（考核）		0	亿
	var creditCardIncome = 'PLOA00188'			//信用卡收入	X		信用卡收入（考核）		0	亿
	var totalAssets = 'FASS00046'			//资产总额	Z		资产总额	home_icon_asset.png	0	亿
	var balanceInTheFormOfCredit = 'FASS00068'			//表内授信余额	B		表内授信余额		0	亿
	var bondAssets = 'FASS_GG001'		//债券资产	Z		债券资产		0	亿
	var interbankAssets = 'FASS_GG002'		//同业资产	T		同业资产		0	亿
	var balanceOfPublicLoan = 'FASS00086'			//对公贷款余额	D		对公贷款余额（不包含信用卡垫款）		0	亿
	var retailLoanBalance = 'FASS00082'			//零售贷款余额	L		零售贷款余额（包含单位信用卡垫款）	home_icon_retailloan.png	0	亿
	var totalLiabilities = 'FLIA00013'			//负债总额	F		负债总额	home_icon_debttotal.png	0	亿
	var generalDepositBalance = 'FLIA00024'			//一般性存款余额	Y		一般性存款余额（人行）	home_icon_generaldeposit.png	0	亿
	var interbankLiabilitiesBalance = 'FLIA00053'			//同业负债余额	T		同业负债余额（不包含非银同业）	home_icon_samedebt.png	0	亿
	var theBalanceOfPublicDeposits = 'FLIA00034'			//对公存款余额	D		对公存款余额（资金头寸）	home_icon_publicdeposit.png	0	亿
	var savingsDepositBalance = 'FLIA00022'			//储蓄存款余额	C		储蓄存款余额	home_icon_savingsdeposit.png	0	亿
	var nonBankDeposits = 'FLIA00043'			//非银同业存款余额	F		非银同业存款余额（不包含同业存单）	home_icon_nonsilverindustry.png	0	亿
	var interbankBalance = 'FLIA00015'			//同业存放余额	T		同业存放余额（不包含非银同业）		0	亿
	var sellTheRepurchaseBalance = 'FLIA00051'			//卖出回购余额	M		卖出回购余额		0	亿
	var interbankBalances = 'FLIA00014'			//同业存单余额	T		同业存单余额（资产负债简表）		0	亿
	var ownersEquity = 'FEQU00003'			//所有者权益	S		所有者权益		0	亿
	var theTotalProfit = 'FPRO00057'			//利润总额	L		利润总额		0	亿
	var netProfit = 'FPRO00008'			//净利润	J		净利润		0	亿
	var intermediateBusinessIncome = 'FCOR00040'			//中间业务收入	Z		中间业务收入	home_icon_businessincome.png	0	亿
	var nonperformingLoanBalance = 'RCRL_GG001'			//不良贷款余额	B		不良贷款余额		0	亿
	var subprimeLoanLoanBalance = 'RCRL_GG002'			//次级类贷款客户贷款余额	C		次级类贷款客户贷款余额		0	亿
	var suspiciousLoanLoanBalance = 'RCRL_GG003'			//可疑类贷款客户贷款余额	K		可疑类贷款客户贷款余额		0	亿
	var lossLoanLoanBalance = 'RCRL_GG004'			//损失类贷款客户贷款余额	S		损失类贷款客户贷款余额		0	亿
	var nonperformingLoanRate = 'RCRL_GG005'			//不良贷款率	B		不良贷款率		0	亿
	var provisionCoverage = 'RCRL_GG006'		//拨备覆盖率	B		拨备覆盖率		0	亿
	var liquidityRatio = 'RLRL_GG001'		//流动性比例	L		流动性比例		0	亿


	//手机端D，E版指标编码
    /*
    1.新增储蓄存款计划完成率
    */
    var newSavingsDeposits = 'GG0003_LRP';
    //储蓄存款计划完成数
    var savingsDeposit = 'GG0002_LRP';
	//新增储蓄存款时点
	var da = 'PDEP_GG001';
	//新增储蓄存款完成率
	var db = 'PDEP_WCL01';
	var newSavingsDeposit = [da, db];

	/*
	2.净储蓄存款计划完成率
	*/
	var netSavingsDeposits = '1';
	//净储蓄存款时点
	var dc = 'PDEP00029'	//净储蓄存款年日均额（不含结构性存款）
	//净储蓄存款完成率
	var dd = 'PDEP_WCL02';
	var netSavingsDeposit = [dc, dd]; 

	/*
	3.保本理财计划完成率
	*/
	var capitalPreservation = '2';
	//保本理财时点
	var de = 'PFIN00075'	//个人保本理财年日均余额（管理机构）
	//保本理财完成率	
	var df = 'PFIN_WCL01';
	var guaranteedFinancial = [de,df];

	/*
	4.新增加零售贷款时点数计划完成率
	*/
	var newRetailLoan = 'GG0008_LRP';
	//零售贷款计划完成数
	var retailLoan = 'GG0007_LRP';
	//新增加零售贷款时点数
	var dg = 'PLOA_GG001';		
	//新增加零售贷款时点数完成率
	var dh = 'PLOA_WCL01';
	var newRetailLoans = [dg, dh];

	/*
	5.对私管理资产线上销售比例
	*/
	//对私管理资产销售总额时点
	var di = 'POPE_GG001';
	//对私管理资产线上销售总额时点	
	var dj = 'POPE_GG002';
	//对私管理资产线上销售占比
	var dk = 'POPE_GG002_ZB';
	//对私管理资产线上销售组成
	var dl = 'POPE_EQZ';		//E钱庄对私管理资产销售额
	var dm = 'POPE_WY';			//网银对私管理资产销售额
	var dn = 'POPE_WX';			//微信对私管理资产销售额
	//对私管理资产线上销售组成占比
	var dp = 'POPE_EQZ_ZB';		//E钱庄对私管理资产销售占比
	var dq = 'POPE_WY_ZB';		//网银对私管理资产销售占比
	var dr = 'POPE_WX_ZB';		//微信对私管理资产销售占比
	var  privateManagement = [di, dj, dk, dl, dm, dn, dp, dq, dr];

	/*
	对私管理资产销售额
	*/
	var daa = 'PFIN00051';			//个人理财 			个人理财产品销售金额
	var dab = 'PFIN00073';			//余额理财			余额理财年化日均
	var dac = 'PFIN00034';			//个人保险 			个人保险销售量
	var dad = 'PFIN00051_ZB';		//个人理财占比 		个人保本理财占对私管理资产销售额占比
	var dae = 'PFIN00073_ZB';		//余额理财占比		余额理财占对私管理资产销售额占比
	var daf = 'PFIN00034_ZB';		//个人保险占比		个人保险占对私管理资产销售额占比
	var dag = [di, daa, dab, dac, dad, dae, daf];


	/*
	个人保本理财年度销售额
	*/
	var dah = '';				//个人保本理财年度销售额时点			个人保本理财年度销售额
	var dai = 'PFIN00045';					//个人保本理财销售额时点    		个人保本理财产品销售金额
	var daj = 'PFIN00048';					//个人非保本理财销售额时点 			个人非保本理财产品销售金额
	var dak = 'PFIN00043';					//柜面销售年累计额 				个人保本理财产品柜面销售金额
	var dal = 'PFIN00050_EQZ';				//E钱庄销售年累计额 				个人保本理财产品E钱庄年累计销售金额
	var dam = 'PFIN00050_WY';				//网银销售年累计额 				个人保本理财产品网银年累计销售金额
	var dan = 'PFIN00045_QTWD';				//其他销售年累计额 				个人保本理财产品其他渠道年累计销售金额
	var dao = 'PFIN00043_ZB';				//柜面销售年累计额占比 				个人保本理财柜面销售年累计额占比
	var dap = 'PFIN00050_EQZ_ZB';			//E钱庄销售年累计额占比 			个人保本理财E钱庄销售年累计额占比
	var daq = 'PFIN00050_WY_ZB';			//网银销售年累计额占比 				个人保本理财网银销售年累计额占比
	var dar = 'PFIN00045_QTWD_ZB';			//其他销售年累计额占比 				个人保本理财其他销售年累计额占比
	var das = [dah, dai, daj, dak, dal, dam, dan, dao, dap, daq, dar];

	/*
	6.个人保本理财销售额
	*/
	//个人理财销售额时点
	var ds = 'PFIN00045';	//个人保本理财产品销售金额
	//个人理财销售总额时点
	var dt = 'PFIN00051';	//个人理财产品销售金额
	//个人保本理财销售额占比
	var du = 'PFIN00045_ZB';
	var personalGuaranteed = [ds, dt, du];
		
	/*
	7.个人非保本理财销售额
	*/
	//个人非保本理财销售额时点
	var dv = 'PFIN00048';	//个人非保本理财产品销售金额
	//个人理财销售总额时点
	var dw = 'PFIN00051';	//个人理财产品销售金额
	//个人非保本理财销售额占比
	var dx = 'PFIN00048_ZB';
	var personalNonGuaranteed = [dv, dw, dx];
	
	/*
	8.网银对私管理资产销售比例
	*/
	//网银对私管理资产销售额时点
	var ea = 'POPE_WY';
	//对私管理资产销售总额时点
	var eb = 'POPE_GG001';
	//网银对私管理资产销售比例
	var ec = 'POPE_WY_ZB';
	var onlineBanking = [ea, eb, ec];
	
	/*
	9.E钱庄对私管理资产销售比例
	*/
	//E钱庄对私管理资产销售额时点
	var ed = 'POPE_EQZ';
	//对私管理资产销售总额时点
	var ee = 'POPE_GG001';
	//E钱庄对私管理资产销售比例	
	var ef = 'POPE_EQZ_ZB';
	var eBank = [ed, ee, ef];
	
	/*
	10.微信银行对私管理资产销售比例
	*/
	//微信银行总额时点
	var eg = 'POPE_WX';
	//对私管理资产销售总额时点
	var eh = 'POPE_GG001';
	//微信银行对私管理资产销售比例	
	var ei = 'POPE_WX_ZB';
	var microbloggingBank = [eg, eh, ei];
	
	/*
	11.新增价值客户数
	*/
	//新增价值客户数时点
	var ej = 'CCEX00006';	//对私价值客户数
	//新增价值客户数比年初比例
	var ek = 'CCEX00006_NC_BL';
	//新增价值客户数比去年同期比例
	var el = 'CCEX00006_TQ_BL';
	var numberOfNewCustomers = [ej, ek, el];

	/*
	12.新增有效客户数
	*/
	//新增有效客户数时点
	var em = 'CCEX00010';	//对私有效客户数
	//新增有效客户数比年初比例
	var en = 'CCEX00010_NC_BL';
	//新增有效客户数比去年同期比例
	var eo = 'CCEX00010_TQ_BL';
	var addValidCustomers = [em, en, eo];

	/*
	13.新增网络活跃客户数
	*/
	//新增网络活跃客户数时点
	var ep = 'CCEX00028';	//网络活跃客户数
	//新增网络活跃客户数比年初比例
	var eq = 'CCEX00028_NC_BL';
	//新增网络活跃客户数比去年同期比例
	var er = 'CCEX00028_TQ_BL';
	var addedNetworkCustomers = [ep, eq, er];
	
	/*
	14.新增信用卡有效标卡
	*/
	//新增信用卡有效标卡时点	
	// var es = 'PLOA00187';	//信用卡有效标卡（考核）
	//新增信用卡有效标卡比年初比例
	var et = 'PLOA00187_NC_BL';
	//新增信用卡有效标卡比去年同期比例
	var eu = 'PLOA00187_TQ_BL';
	var addCreditCard = [creditCardValidTag, et, eu];
	
	/*
	15.信用卡及消费金融收入
	*/
	//信用卡及消费金融收入时点
	var ev = 'PLOA_XYK001';
	//信用卡及消费金融收入比年初比例	
	var ew = 'PLOA_XYK001_NC_BL';
	//信用卡及消费金融收入比去年同期比例
	var ex = 'PLOA_XYK001_TQ_BL';
	var creditCardAndConsumer = [ev, ew, ex];
	
	/*
	16.融意通卡及消费金融收入
	*/
	//融意通卡及消费金融收入时点
	var ey = 'PLOA_XYK002';	//信用卡收入（考核）
	//融意通卡及消费金融收入比年初比例
	var ez = 'PLOA_XYK002_NC_BL';
	//融意通卡及消费金融收入比去年同期比例
	var eaa = 'PLOA_XYK002_TQ_BL';
	var financialCardAndConsumer = [ey, ez, eaa];
	
	/*
	17.心意通卡及消费金融收入
	*/
	//心意通卡及消费金融收入时点
	var eab = 'PLOA_XYK003';	//信用卡收入（考核）
	//心意通卡及消费金融收入比年初比例
	var eac = 'PLOA_XYK003_NC_BL';	
	//心意通卡及消费金融收入比去年同期比例
	var ead = 'PLOA_XYK003_TQ_BL';
	var mindCardAndConsumer = [eab, eac, ead];

	/*
	18.新增特约商户数
	*/
	var newAddSpecialMerchants = '4';


	/*
	二期指标
	 */
	
	var fa = 'FPRO00074';		//营业收入
	var fb = 'FPRO00073';		//营业支出
	var fc = 'FPRO00022';		//手续费及佣金收入
	var fd = 'FPRO00023';		//手续费及佣金支出
	var fe = 'FASS00076';		//银行汇票
	var ff = 'FASS00077';		//保函
	var fg = 'FASS00059';		//信用证
	var fh = 'FASS00075';		//委托贷款
	var fi = 'FASS00055';		//发行表外理财

	var fj = 'FFAN00017';		//净利差		--月度指标--
	var fk = 'FFAN00019';		//净息差		--月度指标--
	var fl = 'RLRL00014';		//存贷比（人民币）		--月度指标--
	var fm = 'RCRL00033';		//贷款拨备率		--月度指标--

	var fn = 'RCRL00039';		//核心一级资本充足率		--季度指标--
	var fo = 'RCRL00048';		//一级资本充足率		--季度指标--
	var fp = 'RCRL00054';		//资本充足率		--季度指标--
	var fq = 'RCRL00049';		//逾期90天以上贷款与不良贷款比例		--季度指标--
	var fr = 'FFAN00004';		//成本收入比率		--季度指标--
	var fs = 'RLRL00009';		//流动性覆盖率		--季度指标--
	var ft = 'RLRL00010';		//流动性缺口率		--季度指标--
	var fu = 'RLRL00002';		//核心负债依存度	--季度指标--
	var fv = 'RMRL00001';		//累计外汇敞口头寸比例		--季度指标--

	var fwa = 'OPER00023'		//对公结算户 			--季度指标--
	var fw = 'OPER_0023';		//年度新增对公结算户		--季度指标--
	var fx = 'OPER_0023F';		//对公结算客户数较年初增幅		--季度指标--

	var fy = 'RCRL00053';		//正常类贷款		--月度指标--
	var fz = 'RCRL00038';		//关注类贷款		--月度指标--


	//一二期柱状图数组
	var postIndexNos = [nonperformingLoanBalance,subprimeLoanLoanBalance,suspiciousLoanLoanBalance,lossLoanLoanBalance,numberOfActiveCustomers,creditCardValidTag,ev,ey,eab];

	//二期季度指标数组
	var seasonIndexArray = [fn,fo,fp,fq,fr,fs,ft,fu,fv];

     
	//不要年初指标数组
    var hideEarlyIndexNos = [ownersEquity, theTotalProfit, netProfit, intermediateBusinessIncome];
    //不要比上日数值数组
    var hidePreviousDayIndexNos = [nonperformingLoanRate, provisionCoverage, liquidityRatio, nonperformingLoanBalance, subprimeLoanLoanBalance, suspiciousLoanLoanBalance, lossLoanLoanBalance,fj,fk,fl,fm,fy,fz];
    //跳转到详情页的指标为以下指标则增加提示行
    var isAddPromptLine = [nonperformingLoanBalance, subprimeLoanLoanBalance, suspiciousLoanLoanBalance, lossLoanLoanBalance, nonperformingLoanRate, provisionCoverage, liquidityRatio,fj,fk,fl,fm,fy,fz];
    //首页单位处理
    var rateIndexNoArray = [nonperformingLoanRate, provisionCoverage];


    //详情页百分比图表单位
  	var showCordonIndexNos = [nonperformingLoanRate,provisionCoverage,liquidityRatio];
 	
    //模块切换
    var moduleHeaderParams = [];
    var customerViewModuleHeaderParams = []

    //搜索数据
    var searchModule = [];

    //机构数据
    var childOrgPick = [];//直属支行数据数组
    var grandchildOrgPick = [];//一级支行数据
    var dotOrgPick = [];//网点机构数组

    


	//单位为百分比指标
	var percentUnit = [di,dk,dt,fl,fm,fn,fo,fp,fq,fr,fs,ft,fu,fv,fy,fz];


	//资产类型详情图表指标数组(曲线)
	var assetsLine = [ej, em];
	//计划完成率类型详情图表指标数组
	var planCompleteRate = [newSavingsDeposits, savingsDeposit, netSavingsDeposits, capitalPreservation, newRetailLoan, retailLoan, da, dg];
	//销售额销售比例类型详情图表指标数组
	var financialSales = [di, dk, dt];
	//资产类型详情图表指标数组(柱状)
	var assetsBar = [ep, creditCardValidTag, ev, ey, eab, newAddSpecialMerchants];

    //判断指标编码属于哪类详情图表(D,E版)
    function getDetailChartType(indexNo) {
    	if (planCompleteRate.indexOf(indexNo) != -1) {
    		//D-E-P表示计划完成率详情类型
    		return 'plan';
    	}
    	else if (financialSales.indexOf(indexNo) != -1) {
    		//D-E-F表示销售额销售比例详情类型
    		return 'sale';
    	}
    	else {
    		return 'normal'
    	}
    }

	function getLoginUrl(userid) {
		var currentServer = '';
	 	if(isDebug == 0) {
	 		currentServer = server;
	 	}
	 	else if(isDebug == 1) {
	 		currentServer = debugServer;
	 	}
	 	else if(isDebug == 2) {
	 		return `${nodeIP}/login`;
	 	}
	 	else if(isDebug == 3) {
	 		return `${nodeIP}/login`;
	 	}
	 	else if (isDebug == 4) {
	 		currentServer = redServer;
	 	}
    	var generateUrl = `${currentServer}${loginPath}userNo=${userid}`;
    	return generateUrl;
	}


	Date.prototype.format = function(format) {
	    var o = {
	    "M+" : this.getMonth()+1, //month
	    "d+" : this.getDate(),   //day
	    "h+" : this.getHours(),  //hour
	    "m+" : this.getMinutes(), //minute
	    "s+" : this.getSeconds(), //second
	    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
	    "S" : this.getMilliseconds() //millisecond
	    }
	    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	    for(var k in o)if(new RegExp("("+ k +")").test(format))
	    format = format.replace(RegExp.$1,
	    RegExp.$1.length==1 ? o[k] :
	    ("00"+ o[k]).substr((""+ o[k]).length));
	    return format;
    }

    function generateFormatDate(year, month, date) {
	    var seperator1 = "";
	    var realYear = year;
	    var realMonth = month + 1;
	    var realDate = date;
	    if (realMonth >= 1 && realMonth <= 9) {
	        realMonth = "0" + realMonth;
	    }
	    if (realDate >= 0 && realDate <= 9) {
	        realDate = "0" + realDate;
	    }
	    var currentdate = realYear + seperator1 + realMonth + seperator1 + realDate;
	    return currentdate;
  	}

  	function generateFormatDateFromDays() {
  		var curTime = new Date();
  		//取31天数据;
		var days = 31;

		var iToYear = curTime.getFullYear();
		var iToMon = curTime.getMonth();
		var iToDay = curTime.getDate()-1;
		var toDate = new Date(iToYear, iToMon, iToDay);

		var iFromYear = toDate.getFullYear();
		var iFromMon = toDate.getMonth()-1;
		var iFromDay = toDate.getDate();
		var fromDate = new Date(iFromYear, iFromMon, iFromDay);

		var strResult = `${fromDate.format('yyyyMMdd')}-${toDate.format('yyyyMMdd')}`;
	    return strResult;
  	}

  	function generateFormatDateFromMonths(monthCount) {
  		var curTime = new Date();
  		//取13个月数据;12表示区间;
		var months = 12;

		var iToYear = curTime.getFullYear();
		var iToMon = curTime.getMonth();
		var iToDay = 0;
		var toDate = new Date(iToYear, iToMon, iToDay);

		var iFromYear = toDate.getFullYear();
		var iFromMon = toDate.getMonth()-months;
		var iFromDay = 1;

		var fromDate = new Date(iFromYear, iFromMon, iFromDay);

		var strResult = `${fromDate.format('yyyyMMdd')}-${toDate.format('yyyyMMdd')}`;
	    return strResult;
  	}

  	function generateFormatDateFrom13Months(desTime) {
  		// console.log("ttt:");
  		// console.log(desTime);
  		var curTime = desTime;
  		//取13个月数据;12表示区间;
		var months = 12;

		var iToYear = curTime.getFullYear();
		var iToMon = curTime.getMonth();//取当前月份
		var iToDay = curTime.getDate();//日期从昨日开始计算
		var toDate = new Date(iToYear, iToMon, iToDay);

		var iFromYear = toDate.getFullYear();
		var iFromMon = toDate.getMonth()-months;
		var iFromDay = curTime.getDate();
		// var iFromDay = new Date().getDate();

		var fromDate = new Date(iFromYear, iFromMon, iFromDay);
		var formatStr = '';
		var tmpDateArray = [];
		var dateArray = [];

		var tmpDate = new Date(iToYear, iToMon, 1);
		for(var i=0; i<=months-2; i++) {
			tmpDate = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 0);
			formatStr = tmpDate.format('yyyyMMdd');
			tmpDateArray.push(formatStr);
		}
		for(var j=0; j<=months-2; j++) {
			dateArray.push(tmpDateArray.pop());
		}
		formatStr = dateArray.slice();

		var strResult = `${fromDate.format('yyyyMMdd')},${formatStr},${toDate.format('yyyyMMdd')}`;
	    return strResult;
  	}

  	function getHideIdNameFromeIndexNo(indexNo){
         for (var i = hideEarlyIndexNos.length - 1; i >= 0; i--) {
         	if (hideEarlyIndexNos[i] == indexNo) {
         		console.log(indexNo);
         		$("#Early").hide();
         		break;
         	}
         	else{
         		$("#Early").show();
         	}
         }

         for (var i = hidePreviousDayIndexNos.length - 1; i >= 0; i--) {
         	if (hidePreviousDayIndexNos[i] == indexNo) {
         		console.log(indexNo);
         		$("#previousDay").hide();
         		break;
         	}
         	else{
         		$("#previousDay").show();
         	}
         }

         // for (var i = seasonIndexArray.length - 1; i >= 0; i--) {
         // 	if (seasonIndexArray[i] == indexNo) {
         // 		console.log(indexNo);
         // 		$("#previousDay").hide();
         // 		$("#previousMonth").hide();
         // 		$("#samePeriod").hide();
         // 	} 
         // 	else {
         // 		console.log(indexNo);
         // 	}
         // }

  	}

  	//截取两位小数不进行四舍五入
	function subTwoDecimal(digital) {
	  if (digital != null) {
	    var num = digital.toString();
	    if ((num).indexOf('.') != -1) {
	      console.log('字符串数字中有.字符');
	      // var num = digital;
	      console.log(num);
	      //截取小数点后两位（不四舍五入）
	      var num2 = num.split('.');
	      console.log('num2',num2);
	      var num4;
	      if (num2.length == 2) {
	        var num3 = num2[1].split('');
	        console.log('num3',num3);
	        if (num3.length >= 2) {
	          num4 = num2[0] + '.' + num3[0] + num3[1];
	          // console.log('num4',num4);
	        }
	        else {
	          num4 = num2[0] + '.' + num2[1] + '0';
	        }
	      }
	      else {
	        num4 = num2[0];
	      }
	      console.log('num4',num4);
	      return num4;
	    }
	    else {
	      console.log('字符串数字中无.字符');
	      return num + '.00';
	    }
	  }
	  else {
	    // alert('数据NaN或undefined,异常');
	  }
	}

	//截取两位小数不进行四舍五入
	function subTwoDecimal2(digital) {
	  if (digital != null) {
	  	digital = digital.replace('%', '');
	  }
	  console.log(digital);
	  var sub = subTwoDecimal(digital);
	  return sub;
	}

	//这个函数可以深拷贝 对象和数组
    function deepClone(obj){
        var str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
        } else {
            for(var i in obj){
                newobj[i] = typeof obj[i] === 'object' ? 
                cloneObj(obj[i]) : obj[i]; 
            }
        }
        return newobj;
    }

  	//搜索数据请求
  	function getSearchData() {
  		var url = getServerUrl(searchIndexList);//http://redmooncn.cn:8080/board-web/rptIndexInfo/queryIndexList
  		if (searchModule.length == 0) {
  			$.post(url, null, function(result){
	  			console.log('搜索数据请求', result);
	  			searchModule = result[0].retBody;
  			}, 'json');
  		}
  	}

  	//系统：1-ios, 2-andriod
  	var mobileSystem = 0;
  	//首页关注状态提示
    var attentionState = 0;

    function getServerUrl(sUrl) {
    	var postUrl = '';
		if(isDebug == 0) {
	   		postUrl = server + sUrl;
	    }
	    else if(isDebug == 1) {
	 		postUrl = debugServer + sUrl;
	 	}    
	    else if(isDebug == 2) {
	   		postUrl = debugServer + sUrl;
	    }
	    else if(isDebug == 3) {
	   		postUrl = redServer + sUrl;
	    }
	    else if(isDebug == 4) {
	   		postUrl = redServer + sUrl;
	    }
      	return postUrl;
    }

	export default {
	  method () {
	    return {
	      getAppTitle: function() {
	      	return "魔数狮";
	      },
	      setMobileSystem: function(value) {
	      	mobileSystem = value;
	      },
	      getMobileSystem: function() {
	      	return mobileSystem;
	      },
	      getAttentionState: function() {
	      	return attentionState;
	      },
 		  setAttentionState: function(value) {
	      	attentionState = value;
	      },
	      getSearchIndexList: function() {
	      	var postUrl = getServerUrl(searchIndexList);
	      	return postUrl;
		  },
		  getStickTop: function() {
		  	var postUrl = getServerUrl(stickTop);
		  	return postUrl;
		  },
	      getCloseAttentionUrl: function() {
	        var postUrl = getServerUrl(closeAttentionUrl);
	      	return postUrl;
	      },
	      getAddAttentionUrl: function() {
	      	var postUrl = getServerUrl(addAttentionUrl);
	      	return postUrl;
	      },
	      getFindByConditionUrl: function() {
	      	var postUrl = getServerUrl(findByConditionUrl);
	      	return postUrl;
	      },
	      getIndexList: function() {
	      	var postUrl = getServerUrl(getIndexList);
	      	return postUrl;
	      },
	      decideAttentionState: function() {//queryHomePage

	        var postUrl = getServerUrl(decideAttention);

	      	return postUrl;
	      },
	      queryHomePage: function() {//resetAttention

	      	var postUrl = getServerUrl(queryHomePage);

	      	return postUrl;
	      },
	      resetAttention: function() {//resetAttention

	      	var postUrl = getServerUrl(resetAttention);

	      	return postUrl;
	      },
	      //曲线数据查询接口
	      queryIndexList: function() {
	      	var postUrl = getServerUrl(queryIndexList);
	      	return postUrl;
	      },
	      allRptResultApp: function() {
	      	var postUrl = getServerUrl(allRptResultApp);
	      	return postUrl;
	      },
	      customerViewUrl:function(){
            var postUrl = getServerUrl(customerViewUrl);
	      	return postUrl;
	      },
	      customerViewOrgFinderListUrl:function(){
            var postUrl = getServerUrl(customerViewOrgFinderListUrl);
            return postUrl;
	      },
	      setModuleHeaderParams: function(value) {
	        moduleHeaderParams = value;
	      },
	      getModuleHeaderParams: function() {
	      	return moduleHeaderParams;
	      },
	      setCustomerViewModuleHeaderParams: function(value) {
	        customerViewModuleHeaderParams = value;
	      },
	      getCustomerViewModuleHeaderParams: function() {
	      	return customerViewModuleHeaderParams;
	      },
	      isAddPromptLine: function(indexNo) {
	      	var isAdd = isAddPromptLine.indexOf(indexNo) != -1?true:false;
            return isAdd;
	      },
	      //根据indexName编码判断二级指标名称（详情页面初始展示二级指标名数据）
	      getSecondaryPointName: function(indexNo) {
	      	var secondaryIndexName;
	      	var pieSeriesName;
	      	switch(indexNo) {
	      		case da:
	      			console.log('1.新增储蓄存款计划完成率');
	      			secondaryIndexName = [{name:'储蓄存款计划数'}, {name:'储蓄存款完成率'}, {name:'储蓄存款新增数'}];
	      			break;
	      		// case netSavingsDeposits:
	      		// 	console.log('2.净储蓄存款计划完成率');
	      			
	      		// 	break;
	      		// case capitalPreservation:
	      		// 	console.log('3.保本理财计划完成率');
	      		// 	break;
	      		case dg:
	      			console.log('4.新增加零售贷款时点数计划完成率');
	      			secondaryIndexName = [{name:'零售贷款计划数'}, {name:'零售贷款完成率'}, {name:'零售贷款新增数'}];
	      			break;
	      		case di:
	      			console.log('.对私管理资产销售额');
	      			secondaryIndexName = [{name:'', value:'0.00', rate:'0%'}, {name:'', value:'0.00', rate:'0%'}, {name:'', value:'0.00', rate:'0%'}];
	      			pieSeriesName = [{name:'个人理财', value:'0.00', rate:'0%'}, {name:'余额理财', value:'0.00', rate:'0%'}, {name:'个人保险', value:'0.00', rate:'0%'}];
	      			break;
	      		case dt:
	      			console.log('.个人保本理财年度销售额');
	      			secondaryIndexName = [{name:'个人保本', value:'0.00', rate:'0%'}, {name:'个人非保本', value:'0.00', rate:'0%'}];
	      			pieSeriesName = [{color:'#ffd687', name:'柜面销售额', value:'0.00', rate:'0%'}, {color:'#87ffb7', name:'E钱庄销售额', value:'0.00', rate:'0%'}, {color:'#87b7ff', name:'网银销售额', value:'0.00', rate:'0%'}, {color:'#87b7ff', name:'其他销售额', value:'0.00', rate:'0%'}];
	      			break;
	      		case dk:
	      			console.log('5.对私管理资产线上销售比例');
	      			secondaryIndexName = [{name:'销售总额', value:'0.00', rate:'100%'}, {name:'线上销售', value:'0.00', rate:'0%'}];
	      			pieSeriesName = [{name:'网银销售额', value:'0.00', rate:'0%'}, {name:'E钱庄销售额', value:'0.00', rate:'0%'}, {name:'微信销售额', value:'0.00', rate:'0%'}];
	      			break;
	      		case ds:
	      			console.log('6.个人保本理财销售额');
	      			secondaryIndexName = [{name:'销售总额'}, {name:'个人保本'}];
	      			break;
	      		case dv:
	      			console.log('7.个人非保本理财销售额');
	      			secondaryIndexName = [{name:'销售总额', value:'0.00', rate:'100%'}, {name:'个人非保', value:'0.00', rate:'0%'}];
	      			break;
	      		case ec:
	      			console.log('8.网银对私管理资产销售比例');
	      			secondaryIndexName = [{name:'对私管理', value:'0.00'}, {name:'网银', value:'0.00'}];
	      			break;
	      		case ef:
	      			console.log('9.E钱庄对私管理资产销售比例');
	      			secondaryIndexName = [{name:'对私管理', value:'0.00'}, {name:'E钱庄', value:'0.00'}];
	      			break;
	      		case ei:
	      			console.log('10.微信银行对私管理资产销售比例');
	      			secondaryIndexName = [{name:'对私管理', value:'0.00'}, {name:'微信银行', value:'0.00'}];
	      			break;
	      		// case ej:
	      		// 	console.log('11.新增价值客户数');
	      		// 	break;
	      		// case em:
	      		// 	console.log('12.新增有效客户数');
	      		// 	break;
	      		// case ep:
	      		// 	console.log('13.新增网络活跃客户数');
	      		// 	break;
	      		// case et:
	      		// 	console.log('14.新增信用卡有效标卡');
	      		// 	break;
	      		case ev:
	      			console.log('15.信用卡及消费金融收入');
	      			pieSeriesName = [{name:'融意通卡占比', value:'0.00', rate:'0%'}, {name:'心意通卡占比', value:'0.00', rate:'0%'}, {name:'其它占比', value:'0.00', rate:'0%'}];
	      			break;
	      		// case ey:
	      		// 	console.log('16.融意通卡及消费金融收入');
	      		// 	break;
	      		// case eab:
	      		// 	console.log('17.心意通卡及消费金融收入');
	      		// 	break;
	      		// case newAddSpecialMerchants:
	      		// 	console.log('18.新增特约商户数');
	      		// 	break;
	      		default :
	      			console.log();
	      	}
	      	return [secondaryIndexName, pieSeriesName];
	      },
	      //机构
	      getOrg: function() {
	      	var postUrl = getServerUrl(branchOrg);
	      	return postUrl;
	      },
	      //子机构
	      setChildOrgParams: function(value) {
	      	childOrgPick = value;
	      },
	      getChildOrgParams: function() {
	      	return childOrgPick;
	      },
	      //子机构下属机构
	      setGrandchildOrgParams: function(value) {
	      	grandchildOrgPick = value;
	      },
	      getGrandchildOrgParams: function() {
	      	return grandchildOrgPick;
	      },
	      newSetChildOrgParams:function(value,cascFlag){
	      	if (cascFlag == 1) {
               childOrgPick = value;
	      	}else if (cascFlag == 2) {
               grandchildOrgPick = value;
	      	}else if (cascFlag == 3) {
               dotOrgPick = value;
	      	}
	      },
	      newGetChildOrgParams:function(cascFlag){
             if (cascFlag == 1) {
               return childOrgPick;
	      	}else if (cascFlag == 2) {
              return grandchildOrgPick;
	      	}else if (cascFlag == 3) {
               return dotOrgPick;
	      	}
	      },
	      getDetailChartType: getDetailChartType,
	      getLoginUrl: getLoginUrl,
	      // getUrl: getUrl,
	      generateFormatDate: generateFormatDate,
	      generateFormatDateFromDays: generateFormatDateFromDays,
	      generateFormatDateFromMonths: generateFormatDateFromMonths,
	      generateFormatDateFrom13Months: generateFormatDateFrom13Months,
	      getHideIdNameFromeIndexNo:getHideIdNameFromeIndexNo,
	      subTwoDecimal: subTwoDecimal,
	      subTwoDecimal2: subTwoDecimal2,
	      deepClone: deepClone,
	      getSearchData:getSearchData
		}
	  },
	  data () {
	  	//获取本地测试数据
	  	if(isDebug == 2 || isDebug >= 3) {

	  		
		}

	  	return {
	  		isDebug: isDebug,
	  		rateIndexNoArray: rateIndexNoArray,
	  		showCordonIndexNos: showCordonIndexNos,
	  		financialSales: financialSales,
	  		//D,E版指标编码
	  		newSavingsDeposits: newSavingsDeposits,
	  		savingsDeposit: savingsDeposit,
	  		netSavingsDeposits: netSavingsDeposits,
	  		capitalPreservation: capitalPreservation,
	  		newRetailLoan: newRetailLoan,
	  		retailLoan: retailLoan,
	  		dk: dk,
	  		ds: ds,
	  		dv: dv,
	  		ec: ec,
	  		ef: ef,
	  		ei: ei,
	  		ej: ej,
	  		em: em,
	  		ep: ep,
	  		et: et,
	  		//信用卡及消费金融收入接口入口指标
	  		ev: ev,
	  		ey: ey,
	  		eab: eab,
	  		newAddSpecialMerchants: newAddSpecialMerchants,
	  		
	  		da: da,
	  		dg: dg,
	  		di: di,
	  		dj: dj,
	  		dk: dk,
	  		dw: dw,	//
	  		dx: dx,	//
	  		dt: dt,

	  		fm,
	  		fwa: fwa,
	  		//一期柱状图指标数组
	  		postIndexNos: postIndexNos,
	  		//二期季度指标
	  		seasonIndexArray: seasonIndexArray,
	  		//单位为百分比指标
	  		percentUnit: percentUnit
	  	}
	  }
	}

</script>