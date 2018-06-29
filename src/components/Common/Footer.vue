<script>
import Vue from 'vue'

var footer = Vue.extend({
  template: ` 
    <footer class="tabbarFixed">
      <div class="tabBar">
        <div class="tabBarItem item-{{$index}}" v-for="item in barTitle">
          <a v-link="{ name: item.link, params:{userId:1} }">
            <img :src="item.icon" />
            <div class="tabbarSubtitle">{{item.title}}</div>
          </a>
        </div>
      </div>
    </footer>
  `,
  data: function() {
    return { 
      barTitle: [
        {title:'首页', icon: require('../../assets/images/day_attention.png'), link: 'home'}, 
        {title:'最新', icon: require('../../assets/images/month_attention.png'), link: 'latest'}, 
        {title:'我的', icon: require('../../assets/images/plan_complete.png'), link: 'mine'}
      ]
    }
  }
});

Vue.component('ccfooter', footer);

export default {
  data() {
    return {
     
    }
  },
  methods: {
    onSelected: function(event, index, title, name) {
      $(".tabBarItem").removeClass('tabbarSubselected');
      $(".tabBarItem").eq(index).addClass('tabbarSubselected');
      $(".homeHeader").text(title);
      console.log(title);
      var storage = window.localStorage;
      //logout
      if(name == 'exit') {
        storage.clear();
      }
    },
  },
  ready() {
    
  },
  method() {
    return {

    }
  }
}
</script>

<style>

footer {
  width: 100%;
  height: 49px;
}

footer.tabbarFixed {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #22344a;
  z-index: 99;
  border-top:0.5px solid #4c5866;
}

footer img {
  padding: 2px 0;
  width: 26px;
}

.tabbarSubtitle {
  color:#e3e5e8;
  font-size:13px;
  margin-top:0px;
  height:12px;
  line-height:12px;
}

.tabBar {
  top:200px;
  left:0;
  width:100%;
  height:100%;
  font-size:20px;
  overflow: hidden;
  text-align: center;
}

.tabBar div {
  height: 100%;
  text-align: center;
}

.tabBarItem {
  float: left;
  width: 33.3%;
  height: 100%;
}

.tabBarItem a {
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.tabbarSubselected {
  /*background-image: url(../assets/arrow_left_top.png);*/
  /*background-color: #020202;*/
  background-repeat: no-repeat;
  background-size: 16px 17px;
}

</style>