import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import "./assets/css/iconfont.css"

import { Button,Sticky,Image,Icon,Swipe,SwipeItem,Cell,CellGroup,Tag,Notify,NavBar } from 'vant';

Vue.use(VueClipboard)
Vue.use(Button);
Vue.use(Sticky);
Vue.use(VueRouter);
Vue.use(Image);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tag);
Vue.use(Notify);
Vue.use(NavBar);
const router = new VueRouter({
  routes,
})

axios.defaults.baseURL='https://58jz.com.cn';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

