import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = true

// import {NavBar} from 'vant';
//
// Vue.use(NavBar);
//
// import { Tabbar, TabbarItem } from 'vant';
//
// Vue.use(Tabbar).use(TabbarItem);

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
