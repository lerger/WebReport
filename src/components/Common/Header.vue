<script>
import Vue from 'vue'
import $ from 'jquery'
import ParamsData from 'src/js/params_data'

var header = Vue.extend({
  template: `
    <div class="ccindexheader">
      <div class="ccindexheaderContainer">
        <div class="backbutton">
          <a v-link="{ name: backButton.link, params:{userId:1} }">
            <div>
              <img :src="backButton.icon" />
              <span style="font-family: 'Arial';">{{backButton.title}}</span>
            </div>
          </a>
        </div>
        <div class="cctitle ccindexheaderbg">App Title</div>
        <div class="indexrightbutton">
          <a v-link="{ name: rightButton.link, params:{userId:1} }">
            <div>
              <img v-if="isNewPoint" :src="redIcon" class="flash"/>
              <img v-else :src="rightButton.icon" />
              <span>{{rightButton.title}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return { 
      backButton: {title:'OA', icon: require('../../assets/images/back.png'), link: 'exit'},
      rightButton: {title:'', icon: require('../../assets/images/column.png'), link: 'index_column'},
      isNewPoint: false,
      redIcon: require('../../assets/images/column_new.png'),
    }
  },
  methods: {
    getModuleHeaderData: function(){
        //获取客户端设备DOM宽高
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        
        var data = ParamsData.method().getModuleHeaderParams();

        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        var day = currentDate.getDate();
        console.log(year,month,day);
        var date = ParamsData.method().generateFormatDate(year,month,day);
        date = parseInt(date);
        console.log(date);

        if(data.length == 0) {
          var url = ParamsData.method().getSearchIndexList();
          var params = {userNo:window.localStorage.userid};
          $.post(url,params,(result)=>{
            var pointArray = result[0].retBody;  
            var allPointNameArray = [];
            //当有新指标时首页右上角消息图标显示红色，无新指标时显示白色            
            console.log(this.isNewPoint);
            for (var i = pointArray.length - 1; i >= 0; i--) {
               allPointNameArray.push(pointArray[i]);
               console.log(parseInt(pointArray[i].topEndDate));
               if (pointArray[i].topEndDate.length > 0) {
                  if (date <= parseInt(pointArray[i].topEndDate)) {
                      this.isNewPoint = true;
                   };
               }
               // else {
               //  this.isNewPoint = false;
               // }
            }
            console.log(this.isNewPoint);
            allPointNameArray.reverse();
            ParamsData.method().setModuleHeaderParams(allPointNameArray);
          }, 'json');
        } 

        for (var i = data.length - 1; i >= 0; i--) {
          console.log(data[i]);
          if (date <= parseInt(data[i].topEndDate)) {
            this.isNewPoint = true;
          }
        }
    },
  },
  created() {
    
  },
  ready () {
    $("body").css('position', 'relative');
    setTimeout(function(){
        $('.flash').addClass('flash');
    }, 1000);
    this.getModuleHeaderData();
    console.log(this.isNewPoint);
  }
});

Vue.component('ccheader', header);

export default {
  data () {
    return {
      
    }
  }
}
</script>
