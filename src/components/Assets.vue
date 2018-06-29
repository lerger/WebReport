<template>

  <div id="assets_header">
      <ccheader></ccheader>
  </div>
 
</template>

<script>

import Vue from 'vue'
import router from '../../routers';
import Params from '../../routersParam'
import ParamsData from '../../js/params_data'
import $ from 'jquery'
import assetsCss from '../HomeCss.css'
import Header from '../Common/CommonHeader.vue'

export default {
  data () {
    return {
      assetsList: [
        {title:'资产总额', icon: require('../assets/icon/assets_icon_1.png'),val:'2282.75',unit:'亿元'}, 
      ],
      funcButton: {
        title:'添加关注', icon: require('../assets/plus_green.png')
      }
    }
  }, 
  methods: {
    onSelected: function(event,index,link) {
      console.log(event,index,link);
    },
    toSearch: function($event) {
      console.log(event);

      router.go({ name: 'search'});

      // $(".cctitle").html('搜索');
      // $(".assetsFixed").hide();
      // $(".tabbarFixed").hide();
      // $(".ccline").hide();
    },
  },
  ready() {
      

  }
}


</script>

<style type="text/css">

</style>
