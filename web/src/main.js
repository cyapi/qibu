// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


import App from './App'
import router from './router'
import store from './store'
import axios from "axios";
axios.defaults.baseURL="http://127.0.0.1:3000";
Vue.prototype.$http = axios;
Vue.prototype.$URL = "http://127.0.0.1:3000/upload";
Vue.config.productionTip = false
Vue.use(ElementUI);
import { Tabbar, TabItem } from 'mint-ui';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

import header from "@/components/header";
import footer from "@/components/footer";
import top from "@/components/header2";
Vue.component("my-top",top)
Vue.component("my-footer",footer)
Vue.component("my-header",header)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
