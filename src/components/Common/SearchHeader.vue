<script>
import Vue from 'vue'

var ccsearchheader = Vue.extend({
  template: `
    <div class="ccheader">
      <div class="ccheaderContainer">
        <div class="backbutton"  @click="back()">
        
            <div>
              <img :src="backButton.icon" />
              <span>{{backButton.title}}</span>
            </div>
          
        </div>
        <div class="cctitle ccheaderbg">搜索</div>
        <div class="rightbutton">
          <a v-link="{ name: rightButton.link, params:{userId:1} }">
            <div>
              <img :src="rightButton.icon" />
              <span>{{rightButton.title}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return { 
      backButton: {title:'返回', icon: require('../../assets/images/back.png'), link: 'home'},
      rightButton: {title:'关注', icon: require('../../assets/images/attention.png'), link: ''}

    }
  },
  methods: {
    back: function() {
      history.go(-1);
    }
  }
});

Vue.component('ccsearchheader', ccsearchheader);

export default {
  data () {
    return {
      
    }
  },
  ready: {
    
  },
  
}
</script>