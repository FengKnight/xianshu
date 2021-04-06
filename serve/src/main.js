import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(echarts)
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client';
Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://localhost:8088",
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
