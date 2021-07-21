import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './http/request'
Vue.config.productionTip = false
Vue.use(Antd,ElementUI)
new Vue({
  router,
  store,
  request,
  render: h => h(App)
}).$mount('#app')
