import Vue from 'vue'
import "normalize.css";
import App from './App.vue'
import router from './router'
import store from './store'
import "@/permission"
import "@/styles/index.scss";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
console.log("VUE_APP_BASE_API", process.env);

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
