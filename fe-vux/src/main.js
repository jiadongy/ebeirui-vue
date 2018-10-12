// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import WxHome from './components/home/wxHome'
import CompetitiveForm from './components/competitive/mainForm'
import {TransferDom} from 'vux'

import {AjaxPlugin} from 'vux'

Vue.use(AjaxPlugin)

Vue.directive('transfer-dom', TransferDom)

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: WxHome,
  meta: {
    title: 'Demo for WxApp'
  }
}, {
  path: '/cc',
  component: CompetitiveForm,
  meta: {
    title: 'Competitive Form Demo for Mobile'
  }
}]

const router = new VueRouter({
  routes
})

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
