import Vue from 'vue'
// 表单验证
import './api/vee-validate'
import App from './App.vue'
import Alert from './components/modules/alert/index'
import Pop from './components/modules/pop/index'
import router from './router'
import store from './store'

Vue.use(Alert)
Vue.use(Pop)

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue
