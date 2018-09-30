// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.css'
import '@/style/element-ui.css' // global css
import './style/map.css'
import './auth/auth'

import './assets/rem'
import './assets/font/iconfont.css'
import './assets/animate.css'
import timelinepick from "vue-timelinepick"
import "vue-timelinepick/dist/vue-timelinepick.css"
import echarts from 'echarts'


Vue.use(timelinepick);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

axios.defaults.baseURL = 'http://115.159.124.199:3000';
axios.defaults.timeout =  5*60*1000;
// axios.defaults.baseURL = 'http://localhost:3000/';




Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.$https = axios;

Vue.prototype.formatDate = function (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
router.beforeEach((to, from, next) => {
  const currentUser = Vue.prototype.getCookie('userToken')
  if (to.path === '/login') {
    next()
  } else {
    if (currentUser) {
      next()
    }
    else {
      next({path: '/login'})
    }
  }
});



/* eslint-disable no-new */
window.myMv = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
})
