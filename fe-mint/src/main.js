import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Mint from 'mint-ui';

Vue.use(Mint);

Vue.config.productionTip = true;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
