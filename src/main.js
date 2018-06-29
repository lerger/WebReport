import Vue from 'vue'
import router from './routers';
import Login from './components/Login'
import Bar from './components/Bar'
import ParamsData from './js/params_data'
import $ from 'jquery'
import LoginData from './data/loginData'

var userid = getQueryString("userid");
var list = LoginData.data().LoginList.data;
var limits = 0;
var orgNo = "";
var orgName = "";
var orgLevel = "";

// var isInclude = false;
//获取权限列表
// for(let obj of list) {
//   if(userid == obj.userId) {
//     isInclude = true;
//     break;
//   }
// }

var storage = window.localStorage;
storage.userid = userid;

var loginUrl = ParamsData.method().getLoginUrl(userid);

var u = navigator.userAgent;
// console.log("uuu:");console.log(u);alert(u);
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// var isAndroid = navigator.userAgent.match(/Android/i) ? true : false;
// alert(isAndroid);
// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isiOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; //ios终端
if(typeof(isiOS) == 'undefined' || isiOS == null ) {
	isiOS = false;
}

var mobileSystem = isiOS ? 1 : 2;
ParamsData.method().setMobileSystem(mobileSystem);

// console.log('是否是iOS：'+ParamsData.method().getMobileSystem());

// function openDB (name) {
//             var request=window.indexedDB.open(name);
//             request.onerror=function(e){
//                 console.log('OPen Error!');
//             };
//             request.onsuccess=function(e){
//                 myDB.db=e.target.result;
//             };
//         }

// var myDB={
//     name:'test',
//     version:1,
//     db:null
// };
// openDB(myDB.name);

// function openDB (name,version) {
//             var version=version || 1;
//             var request=window.indexedDB.open(name,version);
//             request.onerror=function(e){
//                 console.log(e.currentTarget.error.message);
//             };
//             request.onsuccess=function(e){
//                 myDB.db=e.target.result;
//                 console.log(e);
//             };
//             request.onupgradeneeded=function(e){
//                 console.log('DB version changed to '+version);
//             };
//         }

// var myDB={
//     name:'test',
//     version:3,
//     db:null
// };
// openDB(myDB.name,myDB.version);

// // 关闭数据库可以直接调用数据库对象的close方法

// function closeDB(db){
//             db.close();
//         }
// // 删除数据库使用indexedDB对象的deleteDatabase方法

// function deleteDB(name){
//             indexedDB.deleteDatabase(name);
//         }

// setTimeout(function(){
// 			console.log(myDB.db);
//             closeDB(myDB.db);
//             // deleteDB(myDB.name);
//         },500);

// 注释登录权限获取
$.post(loginUrl, null, function(result) {
		limits = result[0].retBody.flag;
		orgNo = result[0].retBody.orgNo;
		orgName = result[0].retBody.orgName;
		orgLevel = result[0].retBody.orgLevel;

		if(typeof(orgNo) == 'undefined') {
			orgNo = "000000";
			orgName = "长沙银行";
		}
 
		if(limits == 1 || limits == 2 || limits == 4 || limits == 5 || limits == 6) {//分别表示总行权限，分支行权限，一级支行权限及网点权限
			storage.limits = limits;
			storage.orgNo = orgNo;
			storage.orgName = orgName;
			storage.orgLevel = orgLevel;
			router.start(Bar, '#entry');
			// router.start(Home, '#entry');
			// router.start(SearchController, '#entry');
			// router.start(Bar, '#entry');

			
		}
		else {
			router.start(Login, '#entry');
		}

	}, 'json'
);
// 

// router.start(Bar, '#entry');
// storage.limits = 1;
// storage.orgNo = '000000';
// storage.orgName = '长沙银行';

// console.log(loginUrl);
// console.log("****");

// var url = window.location.href.replace("http://", '');
// var main = url.split('/')[0];
// var toUrl = 'login';      
// router.go({ name: `${toUrl}` });

// if(!isInclude) {
// 	router.start(Login, '#entry');
// }
// else {
// 	router.start(Bar, '#entry');
// }

function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); return null; 
}