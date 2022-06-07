import Vue from 'vue'
// 表单验证
import './api/vee-validate'
import App from './App.vue'
import Alert from './components/modules/alert/index'
import router from './router'
import store from './store'

Vue.use(Alert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
