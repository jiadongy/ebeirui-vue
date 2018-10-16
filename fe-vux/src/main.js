// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'

import {TransferDom,AjaxPlugin} from 'vux'

Vue.use(AjaxPlugin)

Vue.directive('transfer-dom', TransferDom)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

import VConsole from 'VConsole'
var vConsole = new VConsole();

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

console.log(Vue.wechat) // 可以直接访问 wx 对象。


