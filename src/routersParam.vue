<script>
	
	var moduleData = {
		"day": "day",
		"month": "month",
		"month_index": "month_index",
		"monthCustomer":"monthCustomer",
		"month_save": "month_save",
		"month_loan": "month_loan",
		"month_customers": "month_customers",
		"month_business":"month_business",
		"month_branchProfitAndLoss": "month_branchProfitAndLoss",
        "organization_save":"organization_save",
		"month_profit": "month_profit",
		
		"orgcontrast": "orgcontrast",
		"orgcontrastmain": "orgcontrastmain",
		"orgcontrastsave": "orgcontrastsave",
		"login": "login",
		"building": "building",


		//手机端路由参数
		"home": "home",
		"latest": "latest",
		"mine": "mine",
		"search": "search",
		"index_column":"index_column",
		"customer_org_list":"customer_org_list",
		"customer_org_list_second":"customer_org_list_second",
		"index_assets": "index_assets",
		"picker": "picker",
		"branchpicker": "branchpicker",
		"branch_detail": "branch_detail",
		"index_nonPerformanceLoanRatio":"index_nonPerformanceLoanRatio",
		"index_nonPerformanceLoanBalance":"index_nonPerformanceLoanBalance",
		"exit": "exit"
	};

	// var monthHeadLimitsPage = ["month_index", "month_customer"];
	// var monthHeadLimitsPage = ["month_index", "month_profit","month_customers"];
	var monthHeadLimitsPage = ["month_index", "month_profit", "month_customers"];
	var monthBranchLimitsPage = ["month_save","month_loan","month_business"];
	// var monthBranchLimitsPage = ["month_save","month_loan"];
	var monthLimitsPage;
	var monthModuleNum = 0;
	var orgMainModuleNum = 0;

	var organizationHeadLimitsPage = ["orgcontrastmain","orgcontrastsave"];
	var organizationBranchLimitsPage = [];
	var organizationLimitsPage;

	export default {
		data: moduleData,
		monthModuleNum: monthModuleNum,
		orgMainModuleNum:orgMainModuleNum,
		limits() {
			return {
				month(debugModel) {
					var storage = window.localStorage;
				    var limits = storage.limits;
				    if(limits == 1) {
				      	monthLimitsPage = monthHeadLimitsPage;
				    }
				    else if(limits == 2) {
				      	monthLimitsPage = monthBranchLimitsPage;
				    }

				    if(typeof(debugModel) != 'undefined') {
						monthLimitsPage = monthBranchLimitsPage;
					}

				    return monthLimitsPage;
				},
				organization(debugModel) {
					var storage = window.localStorage;
				    var limits = storage.limits;
				    if(limits == 1) {
				      	organizationLimitsPage = organizationHeadLimitsPage;
				    }
				    else if(limits == 2) {
				      	organizationLimitsPage = organizationBranchLimitsPage;
				    }

				    if(typeof(debugModel) != 'undefined') {
						organizationLimitsPage = organizationBranchLimitsPage;
					}

				    return organizationLimitsPage;
				}
			}
		}
	}

</script>