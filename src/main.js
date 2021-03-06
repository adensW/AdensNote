import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/css/index.less'
import VueHotkey from 'v-hotkey'
import AdensUI from './components/index.js'
Vue.use(AdensUI);
Vue.use(VueHotkey)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
