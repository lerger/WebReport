<script>
	import Vue from 'vue'
	import VueRouter from 'vue-router'
	import Params from './routersParam'

	Vue.use(VueRouter);

	const router = new VueRouter({

	});

	var exVue = Vue.extend({
	  	methods: {
		  a: function () {
		  	router.go({name:'foo', params:{userId:3}});
		      console.log(1);
		  },
		  b: function () {
		    router.go({name:'bar', params:{userId:4}});
		    console.log(2);
		  }
		}
	});

	var DayChart = exVue.extend({
	  template: '<p @click="a()">this is foo! </p>'
	});

	var MonthChart = exVue.extend({
	  template: '<p @click="b()">this is bar!</p>'
	});

	router.map({
	  // '/day': { 
	  //   name: Params.data.day,
	  //   component: function(dayCallback) {
	  //     require(['./App.vue'], dayCallback);
	  //   }
	  // },
	  // '/month': {
	  //   name: Params.data.month,
	  //   component: function(monthCallback) {
	  //     require(['./components/MonthAttension/month.vue'], monthCallback);
	  //   }
	  // },
	  // '/month/month_index': {
	  //   name: Params.data.month_index,
	  //   component: function(monthCallback) {
	  //     // require(['./components/MonthAttension/month_index.vue'], monthCallback);
	  //     require(['./components/MonthAttension/MonthIndex/month_index.vue'], monthCallback);
	  //   }
	  // },
   //    '/organization/organization_save': {
	  //   name: Params.data.organization_save,
	  //   component: function(organizationCallback) {
	  //   require(['./components/OrganizationContrast/OrgContrastItem/organization_save.vue'], organizationCallback);
	  //   }
	  // },

	  // '/month/month_save': {
	  //   name: Params.data.month_save,
	  //   component: function(monthCallback) {
	  //     require(['./components/MonthAttension/MonthSave/month_save.vue'], monthCallback);
	  //   }
	  // },
	  // '/month/month_loan': {
	  //   name: Params.data.month_loan,
	  //   component: function(monthCallback) {
	  //     require(['./components/Branch/MonthAttension/MonthLoan/month_loan.vue'], monthCallback);
	  //   }
	  // },
	  // '/month/month_profit': {
	  //   name: Params.data.month_profit,
	  //   component: function(monthCallback) {
	  //     require(['./components/MonthAttension/MonthProfit/month_profit.vue'], monthCallback);
	  //   }
	  // },
	  // '/month/month_customers': {
	  //   name: Params.data.month_customers,
	  //   component: function(monthCallback) {
	  //     require(['./components/MonthAttension/MonthCustomer/month_customers.vue'], monthCallback);
	  //   }
	  // },

	  // '/month/month_branchProfitAndLoss': {
	  //   name: Params.data.month_branchProfitAndLoss,
	  //   component: function(monthCallback) {
	  //     require(['./components/MonthAttension/MonthProfitAndLoss/month_branchProfitAndLoss.vue'], monthCallback);
	  //   }
	  // },

	  // '/month/month_business': {
	  //   name: Params.data.month_business,
	  //   component: function(monthCallback) {
	  //     require(['./components/MonthAttension/MonthBusiness/month_business.vue'], monthCallback);
	  //   }
	  // },


	  // '/login': {
	  //   name: Params.data.login,
	  //   component: function(loginCallback) {
	  //     require(['./components/Login.vue'], loginCallback);
	  //   }
	  // },
	  // '/building': {
	  //   name: Params.data.building,
	  //   component: function(buildingCallback) {
	  //     require(['./components/Building.vue'], buildingCallback);
	  //   }
	  // },
	  // '/orgcontrast': {
	  //   name: Params.data.orgcontrast,
	  //   component: function(monthCallback) {
	  //     require(['./components/OrganizationContrast/orgcontrast.vue'], monthCallback);
	  //   }
	  // },
	  // '/orgcontrast/orgcontrast_main': {
	  // 	name: Params.data.orgcontrastmain,
	  // 	component: function(buildingCallback) {
	  // 		require(['./components/OrganizationContrast/OrgContrastMain/orgcontrast_main'], buildingCallback);
	  // 	}
	  // },
	  // '/orgcontrast/orgcontrast_save': {
	  // 	name: Params.data.orgcontrastsave,
	  // 	component: function(buildingCallback) {
	  // 		require(['./components/OrganizationContrast/OrgContrastItem/organization_save'], buildingCallback);
	  // 	}
	  // },
	  // '/exit': {
	  //   name: Params.data.exit,
	  //   component: function(exitCallback) {
	      
	  //   }
	  // },
	  // '*': { 
	  //   component: function(dayCallback) {
	  //     require(['./App.vue'], dayCallback);
	  //   }
	  // },
	  //手机端
	  '/home/': {
	  	name: Params.data.home, 
	    component: function(dayCallback) {
	      require(['./components/Home.vue'], dayCallback);
	    },
	    meta: {
	    	keepAlive:true
	    }
	  },
	  '/mine': {
	  	name: Params.data.mine, 
	    component: function(dayCallback) {
	      require(['./components/Mine.vue'], dayCallback);
	    }
	  },
	  '/search/:index_type': {
	  	name: Params.data.search, 
	    component: function(dayCallback) {
	      require(['./components/searchController.vue'], dayCallback);
	    }
	  },
	  '/index_column': {
	  	name: Params.data.index_column, 
	    component: function(dayCallback) {
	      require(['./components/CustomerManagerView/IndexColumn.vue'], dayCallback);
	    }
	  },
	  '/customer_org_list/:pointName/:pointNo/:attentionState/:orgNo/:backName/:firstBranchName/:hiddenModuleSwitch/:orgLevel/:identify/:drillDown/:unit/:cascFlag/:branch_innerCode': {
	  	name: Params.data.customer_org_list, 
	    component: function(dayCallback) {
	      require(['./components/CustomerManagerView/CustomerManagerOrgList.vue'], dayCallback);
	    }
	  },
	  '/customer_org_list_second/:pointName/:pointNo/:attentionState/:orgNo/:backName/:firstBranchName/:hiddenModuleSwitch/:orgLevel/:identify/:drillDown/:unit/:cascFlag/:branch_innerCode': {
	  	name: Params.data.customer_org_list_second, 
	    component: function(dayCallback) {
	      require(['./components/CustomerManagerView/CustomerManagerOrgListSecond.vue'], dayCallback);
	    }
	  },
	  /**
	   * pointName			指标名
	   * pointNo			指标编码
	   * attentionState		是否关注
	   * orgNo		机构编号
	   * hiddenModuleSwitch	是否隐藏详情切换模块
	   */
	  '/index_assets/:pointName/:pointNo/:attentionState/:orgNo/:backName/:firstBranchName/:hiddenModuleSwitch/:orgLevel/:identify/:drillDown/:unit/:cascFlag/:userNo/:isFromeOrgListJump': {
	  	name: Params.data.index_assets, 
	    component: function(dayCallback) {
	      require(['./components/Assets/Assets.vue'], dayCallback);
	    }
	  },
	  '/picker/:pointName/:pointNo/:attentionState/:orgNo/:backName/:firstBranchName/:hiddenModuleSwitch/:orgLevel/:identify/:drillDown/:cascFlag': {
	  	name: Params.data.picker, 
	    component: function(dayCallback) {
	      require(['./components/Branch/Picker.vue'], dayCallback);
	    }
	  },
	  '/branchpicker/:pointName/:pointNo/:attentionState/:orgNo/:backName/:firstBranchName/:hiddenModuleSwitch/:orgLevel/:identify': {
	  	name: Params.data.branchpicker, 
	    component: function(dayCallback) {
	      require(['./components/Branch/BranchPicker.vue'], dayCallback);
	    }
	  },
	  '/branch_detail/:pointName/:pointNo/:attentionState/:orgNo/:backName/:hiddenModuleSwitch': {
	  	name: Params.data.branch_detail, 
	    component: function(dayCallback) {
	      require(['./components/Branch/BranchDetail.vue'], dayCallback);
	    }
	  },
	  '/index_nonPerformanceLoanRatio': {
	  	name: Params.data.index_nonPerformanceLoanRatio, 
	    component: function(dayCallback) {
	      require(['./components/NonPerformanceLoanRatio/NonPerformanceLoanRatio.vue'], dayCallback);
	    }
	  },
	  '/index_nonPerformanceLoanBalance/:pointName/:pointNo/:attentionState': {
	  	name: Params.data.index_nonPerformanceLoanBalance, 
	    component: function(dayCallback) {
	      require(['./components/NonPerformanceLoanBalance/NonPerformanceLoanBalance.vue'], dayCallback);
	    }
	  },
	  '/exit': {
		name: Params.data.exit,
		component: function(exitCallback) {

		}
	  },
	})

	export default router;

</script>