<template>
<div class="barContainer">
	<commonindicator></commonindicator>
	<commonpromptbox></commonpromptbox>
	<!--  -->
	<!-- <div class="barContent"> -->
      <router-view></router-view>    
    <!-- </div> -->
	
	<!-- tabbar -->
	<!-- <footer class="tabbarFixed">
		<div class="tabBar">
			<div class="tabBarItem item-{{$index}}" v-for="item in barTitle">
				<a v-link="{ name: item.link, params:{userId:1} }" @click="onSelected($event, $index, item.title, item.link)">
		          <img :src="item.icon" />
		          <div class="tabbarSubtitle">{{item.title}}</div>
		        </a>
			</div>
		</div>
	</footer> -->
	<!-- <ccfooter></ccfooter> -->

	
</div>
</template>

<script type="text/javascript">

import Vue from 'vue'
import router from '../routers';
import Params from '../routersParam'
import ParamsData from '../js/params_data'
import $ from 'jquery'
import Home from '../components/Home'
import HomeCss from '../assets/css/HomeCss.css'
import CommonIndicator from './Common/CommonIndicator'
import CommonPromptBox from './Common/CommonPromptBox'
import FontCss from '../assets/css/fontCss.css'

//动态加载css文件
function loadStyles(url) {
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
}

//动态加载css脚本
function loadStyleString(cssText) {
	var style = document.createElement("style");
	style.type = "text/css";
	try{
		style.appendChild(document.createTextNode(cssText));
	}catch(ex) {
		style.styleSheet.cssText = cssText;
	}
	document.getElementsByTagName("head")[0].appendChild(style);
}

export default {
	data() {
		return {
		
		}
	},
	methods: {
		
	},
	ready() {
		//设置字体
		if(ParamsData.method().getMobileSystem() == 1) {
		    var css = ".customFont { font-family: 'HelveticaNeueLTPro-Th'; }";
		    loadStyleString(css);
		}
		else {
		    var css = ".customFont { font-family: 'DS-DIGI'; }";
		    loadStyleString(css);
		}

		//获取当前设备屏幕的像素
		var viewHeight = document.documentElement.clientHeight;
		console.log(viewHeight);
		var viewWidth = document.documentElement.clientWidth;
		console.log(viewWidth);

		//tabbar位置设置
		var tabBarTop = viewHeight - 105;
		console.log(tabBarTop);
        
		console.log(router);
		router.go({ name: 'home'});

		$(".tabBarItem").removeClass('tabbarSubselected');
	    $(".tabBarItem").eq(0).addClass('tabbarSubselected');
	},
	method() {
		return {

		}
	}
}

</script>