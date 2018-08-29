// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  './style/index.css'
import '@/style/element-ui.css' // global css
import './style/map.css'
import './assets/rem'
import './assets/iconfont.css'
import timelinepick from "vue-timelinepick"
import "vue-timelinepick/dist/vue-timelinepick.css"

Vue.use(timelinepick)

import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
