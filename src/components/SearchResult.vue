<script>
import Vue from 'vue'
import $ from 'jquery'
import router from '../routers';
var searchresult = Vue.extend({
  template: `
    <div class="searchresult">
      <div class="searchresultContainer">
        <div  v-for="listItem in params">
          <div class="result_list listItem-{{$index}}"  @click="onSelected(listItem)">
              <div class="num_logo">
                <img :src="rightLogo"/>
              </div>
              <div class="num_name" id="resultName-{{listItem.indexNo}}">{{listItem.indexName}}</div>
          </div>
        </div> 
      </div>
    </div>
  `,
  data: function() {
    return { 
         rightLogo: require('../assets/images/arrow_right.png'),

    }
  },
  props: [
    'params'
  ],

  methods: {
    onSelected:function(listItem){
      var orgNo = window.localStorage.orgNo;
      router.go({name:'index_assets', params:{pointName:listItem.indexName,pointNo:listItem.indexNo,attentionState:listItem.attentionState,orgNo:orgNo,backName:'搜索'}});
    }
  },

});

Vue.component('searchresult', searchresult);

export default {
  data () {
    return {
      
    }
  },
  ready: {
    
    
  },

  methods: {
   
 
  },

  
}
</script>