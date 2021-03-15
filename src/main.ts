import Vue from 'vue'
import "normalize.css";
import App from './App.vue'
import router from './router'
import store from './store'
import "@/permission"
import "@/styles/index.scss";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import "default-passive-events"; //添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅。 解决chrome下的warning问题

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
