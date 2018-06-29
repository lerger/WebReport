<script>
import Vue from 'vue'
import $ from 'jquery'

var cccommonheader = Vue.extend({
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
  //             <img :src="commonrightbutton.icon" />
  //           </div>
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // `,
  template: `
    <div class="cccommonheader">
      <div class="cccommonheaderContainer">
        <div class="backbutton">
          <div @click="back()">
            <div>
              <img :src="backButton.icon" />
              <span>{{params.ltitle}}</span>
              <img :src="backButton.icon" v-show="params.isShowFirstBranchOrgName" />
              <span v-show="params.isShowFirstBranchOrgName">{{params.firstBranchOrgName}}</span>
            </div>
          </div>
        </div>
        <div class="cccommontitle">{{params.title}}</div>
        <div class="cccommonrightbutton">
          
          <div @click="toPicker()">
            <div>
              <img :src="commonrightbutton.icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return { 

      backButton: {icon: require('../../assets/images/back.png'), link: 'home'},
      commonrightbutton: {icon: require('../../assets/images/magnifier.png'), link: ''}

    }
  },
  methods: {
    
    back: function() {
      history.go(-1);
    },
    toPicker: function() {
      // alert();
      this.$emit('change');
    }
  },
  props: [
    'params'
  ],
  ready () {
    // $(".timer").fadeOut();
  }
});

Vue.component('cccommonheader', cccommonheader);

export default {
  data () {
    return {
      
    }
  }
}
</script>