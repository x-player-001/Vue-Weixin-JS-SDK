import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'
// import {initWx} from './weixin/weixin.js'

Vue.config.productionTip = false

// initWx();

new Vue({
  render: h => h(App),
}).$mount('#app')