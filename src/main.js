// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import  './style/index.css'
import '@/style/element-ui.css' // global css
import './style/map.css'
import './assets/rem'
import './assets/font/iconfont.css'
import timelinepick from "vue-timelinepick"
import "vue-timelinepick/dist/vue-timelinepick.css"
import echarts from 'echarts'


Vue.use(timelinepick);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

axios.defaults.baseURL='http://47.52.57.26:3000/';
Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.$https = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
