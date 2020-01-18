import router from './router';
import store from './store';
import Vue from 'vue';
import ElementUI from 'element-ui';
import vant from "vant"
import 'element-ui/lib/theme-chalk/index.css';
import LoadMore from 'vue-loadmore-simple'
import SliderVerificationCode from "slider-verification-code";
import "slider-verification-code/lib/slider-verification-code.css";


import App from './App.vue';
import axios from './util/http'


Vue.use(ElementUI);
Vue.use(LoadMore)
Vue.use(vant);
Vue.use(SliderVerificationCode);




Vue.config.productionTip = false
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = " http://xs.xxtkfp.com/api/";
// axios.defaults.baseURL = " http://192.168.1.61/api/";
axios.defaults.baseURL = " /api/";








new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')