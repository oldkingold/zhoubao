<template>
  <div>
    <van-sticky :offset-top="0">
      <div class="nav-dc">
        <div class="flex_row dcicon">
          <!-- <van-image width="120" height="auto" :src="require('../../assets/zhoubao.png')" /> -->
          <van-image width="160" height="auto" src="http://58jz.com.cn/image/zhoubao/icon/df-1.png" />
        </div>
        
        <div class="flex_row" >
          <div class="nav_right" v-on:click="towxarticle('https://appmswvvg7z7791.h5.xiaoeknow.com/')">
            <van-icon size="18px" name="http://58jz.com.cn/image/zhoubao/icon/zhibos.png" />
            <div>直播课</div>
          </div>
          <div class="nav_right" v-on:click="towxarticle('http://wx.58jz.com.cn/fine')">
            <van-icon size="18px" name="http://58jz.com.cn/image/zhoubao/icon/wangxiaos.png" />
            <div>网课</div>
          </div>
          <router-link to='/contact'>
          <div class="nav_right" to="/contact">
            <van-icon size="18px" name="http://58jz.com.cn/image/zhoubao/icon/phones.png" />
            <div>咨询</div>
          </div>
          </router-link>
        </div>
      </div>
    </van-sticky>
    
    <div class="news" > 
      <div style="padding-bottom: 25px;" v-for="(list,label,i) in lists" :key="label">
        <!-- 分类 -->
        <div class="flex_row item_fl">
          <van-icon size="18px" class="iconfont" class-prefix="zhobao" name="benshubooks13" color="#ff884d"/>
          <div>{{label}}实时|<span v-if="i==0">{{stage}}</span></div>
        </div>
        <!-- 文章 -->
        <div class="item_panel" v-for="article in list" :key="article.id" v-on:click="towxarticle(article.wx_url,'article',article.id)">
          <div class="item_title">
            <van-icon size="16px" class="iconfont" class-prefix="zhobao" name="yuan" color="#ff9900"/>
            {{article.title}}
          </div>
          <div class="item_content">
            {{article.content}}
          </div>
        </div>
      </div>
      <div class="zhibo" >
        <van-icon size="16px" name="http://58jz.com.cn/image/zhoubao/icon/zhibo.png" />
        <div>近期课程</div>
      </div>
      
      <van-swipe :autoplay="2500" indicator-color="white">
        <van-swipe-item v-for="(image,index) in liveimgs" :key="index" v-on:click="towxarticle(image.url,'meeting',image.id)">
            <img
              :src="image.img"
            />
        </van-swipe-item>
      </van-swipe>
    </div>
    
    <div class="disclaimer">
      <div>免责声明：</div>
      <div>
        声明：本周刊仅限信息分享使用！部分内容或图片来源于网络，版权归原作者所有，如有侵权敬请后台联系，我们将及时处理！联系邮箱：scy@58jz.com.cn
      </div>
    </div>
  </div>
</template>

<script>
import Storage from '../../utils/storage'
import wxApi from '../../utils/wxapi'

export default {
  name: 'Zhoubao',
  props: {
    
  },
  data() {
    return {
      lists:[],
      stage:"",
      liveimgs:[
        
      ],
      num:""
    }
  },
  created() {
    var that = this;
    that.num  = this.$route.query.page ? this.$route.query.page : ""
    var unique = Storage.get("58jzweekonly")
    this.axios.post('zhoubao/58jzweekonly',{num:that.num,unique:unique})
    .then(res => {
      Storage.set("58jzweekonly",res.data.str)
      wxApi.wxRegister(res.data.wx,res.data.option)
      console.log(res)
    }).catch(err => {
      console.error(err); 
    })
  },
  mounted() {
    var that = this;
    
    this.axios.post('zhoubao/stage',{num:that.num})
    .then(res => {
      console.log(res)
      that.lists = res.data.data;
      that.stage = res.data.stage;
    })
    .catch(err => {
      console.error(err); 
    })
    this.axios.post('zhoubao/meetingsimg',{num:that.num})
    .then(res => {
      console.log(res)
      that.liveimgs = res.data;
    })
    .catch(err => {
      console.error(err); 
    })

    
  },
  methods: {
    towxarticle: function(wx_url,type="",id="") {
      var unique = Storage.get("58jzweekonly")
      if(type!="" && id!="" && unique!="") {
        this.axios.post('zhoubao/clickstatistics',{num:this.num,type:type,id:id,unique:unique})
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.error(err); 
        })
      }
      if(wx_url) {
        window.location.href = wx_url
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-dc {
  /* height: 48px; */
  box-shadow: 0 1px 20px 0 rgba(119, 121, 111, 0.4);
  display: flex;
  justify-content: space-between;
  background-color: rgb(180, 33, 13);
}
.nav-dc .dcicon {
  padding: 9px 6px 4px 0px;
}
.nav-dc .van-image {
  margin-top: -7px;
}
.flex_row {
  display: flex;
}
.nav-dc .nav_right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-left: 1px solid #f1eeee;
  height: 100%;
  width: 48px;
  /* color: #a4a4a5; */
  color: #fff;
}
.nav_right .van-icon {
  margin-bottom: 6px;
}
.nav-dc .nav_mid {
  color: #787b7e;
  line-height: 48px;
  font-weight: bold;
  font-size: 20px;
  /* margin-left: -3px; */
}
.news {
  padding: 0 20px;
  padding-top:20px;
}
.item_fl {
  font-size: 16px;
  align-items: flex-end;
  padding-bottom: 20px;
  color: #333537;
  line-height: 22px;
}
.item_fl span {
    font-size: 14px;
    color: #888;
    padding-left: 8px;
    margin-left: 8px;
    border-left: 1px solid #dddddd;
    line-height: 22px;
}
.item_fl .iconfont {
  margin-bottom: 1px;
  margin-right: 5px;
}
.item_panel {
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #d7d7d7;
  box-shadow: 0 0 20px 0 rgba(187,188,191,0.4);
  -moz-box-shadow: 0 0 20px 0 rgba(187,188,191,0.4);
  -webkit-box-shadow: 0 0 20px 0 rgba(187,188,191,0.4);
  padding: 25px 20px 16px;
  margin-bottom: 11px;
}
.item_panel .item_title {
  font-size: 17px;
  color: #333536;
  font-weight: bold;
  word-break: break-all;
  padding-bottom: 11px;
}

.item_panel .item_content {
  font-size: 15px;
  color: #4a4a4a;
  word-break: break-all;
  text-align: justify;
}
.disclaimer {
  padding: 22px;
  font-size: 12px;
  color: #838a8d;
}
.van-swipe-item img {
  width: 100%;
}
.zhibo {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  margin-bottom: 10px;
  /* margin-left: 10px; */
}
.zhibo .van-icon {
  margin-right: 6px;
  margin-bottom: 2px;
}
.my-swipe {
  width: 30px;
}
</style>