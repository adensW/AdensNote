import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/styles/theme/default/default.less'
import VueHotkey from 'v-hotkey'

Vue.use(VueHotkey)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
