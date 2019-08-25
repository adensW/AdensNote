import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'
import Setting from 'views/Setting'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: '/setting', name: 'setting', component: Setting }
  ]
})
