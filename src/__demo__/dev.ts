// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuele from '../index';

import App from './index.vue';
import routes from './routes';

Vue.use(ElementUI);

vuele.install(Vue, {
  selectUrl() {
    return 'https://api.jsonbin.io/b/5d48498f89ed890b24cc2d3a';
  },
  remoteSelectUrl() {
    return 'https://api.jsonbin.io/b/5d48501e77bd85336aa82139';
  },
  authUrl: 'https://nei.netease.com/api/apimock/d006bd9dcbfc2d76c67cb8629e805516/api/post/displayUrl',
  unauthorizedUrl: '/unauth',
});

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes,
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
