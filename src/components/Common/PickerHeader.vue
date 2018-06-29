<script type="text/javascript">
import Vue from 'vue'
import $ from 'jquery'
import router from '../../routers'

var pickerheader = Vue.extend({
  template: `
    <div class="pickcommonheader">
      <div class="pickcommonheaderContainer">
        <div class="pickbackbutton">
          <div @click="back()">
            <div>
              <img :src="backButton.icon" />
              <span>{{params.ltitle}}</span>
            </div>
          </div>
        </div>
        <div class="pickcommontitle">{{params.title}}</div>
        <div class="pickcommonrightbutton">
          <a v-link="{ name: commonrightbutton.link, params:{userId:1} }">
            <div>
              
            </div>
          </a>
        </div>
      </div>
    </div>
  `,

  // template: `
  //   <div class="pickcommonheader">
  //     <div class="pickcommonheaderContainer">
  //       <div class="pickbackbutton">
  //         <div @click="back()">
  //           <div>
  //             <img :src="backButton.icon" />
  //             <span>{{params.ltitle}}</span>
  //           </div>
  //         </div>
  //       </div>
  //       <div class="pickcommontitle">{{params.title}}</div>
  //       <div class="pickcommonrightbutton">
  //         <a v-link="{ name: commonrightbutton.link, params:{userId:1} }">
  //           <div>
  //             <img :src="commonrightbutton.icon" />
  //           </div>
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // `,

  // template: `
  //   <div class="cccommonheader">
  //     <div class="cccommonheaderContainer">
  //       <div class="backbutton">
  //         <a v-link="{ name: backButton.link, params:{userId:1} }">
  //           <div>
  //             <img :src="backButton.icon" />
  //             <span>{{params.ltitle}}</span>
  //           </div>
  //         </a>
  //       </div>
  //       <div class="cccommontitle">{{params.title}}</div>
  //       <div class="cccommonrightbutton">
  //         <a v-link="{ name: commonrightbutton.link, params:{userId:1} }">
  //           <div>
              
  //           </div>
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // `,
  data: function() {
    return { 

      backButton: {icon: require('../../assets/images/back.png'), link: 'index_assets'},
      commonrightbutton: {icon: require('../../assets/images/threebar.png'), link: ''}

    }
  },
  methods: {
    
    back: function() {
    	console.log('pickerheader');
      history.go(-1);
      // router.go({name:'index_assets'});
    }
  },
  props: [
    'params'
  ],
  ready () {
    // $(".timer").fadeOut();
  }
});

Vue.component('pickerheader', pickerheader);

export default {
  data () {
    return {
      
    }
  }
}
</script>

<style type="text/css">
.pickcommonheader {
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #3f4a5b;
  z-index: 99;
}

.pickcommonheaderContainer {
  position: relative;
  width: 100%;
  height: 44px;
  padding-top: 20px;
}

.pickcommonrightbutton {
  position: absolute;
  top:30px;
  right:8px;
  width:70px;
  height:32px;
  line-height:32px;
  text-align:right;
}

.pickcommontitle {
  /*width: 100%;*/
  height: 100%;
  line-height: 44px;
  color: #ffffff;
  text-align: center;
  font-size: 22px;
  background-color: #394456;
  z-index: 99;
  padding: 0 50px;
  /*文本超出部分隐藏显示...*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pickcommonrightbutton a {
  text-decoration: none;
}

.pickcommonrightbutton a div {
  width: 100%;
  height: 100%;
}

.pickcommonrightbutton img {
  width:25px;
  height:18px;
  line-height:18px;
}

.pickbackbutton {
  position: absolute;
  top:27px;
  left:8px;
  width:110px;
  height:32px;
  line-height:32px;
}

.pickbackbutton a {
  text-decoration: none;
}

.pickbackbutton a div {
  width: 100%;
  height: 100%;
}

.pickbackbutton img {
  width:11px;
  height:20px;
  line-height:20px;
}

.pickbackbutton span {
  color:white;
  padding-left:3px;
  font-size:22px;
  vertical-align:2px;
}
</style>