// 自定义指令
import directives from '@/utils/directives'
// 过滤器
import filters from '@/utils/filters'
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

// 批量注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 批量注册自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 可以把vue实例绑定到上，方便调用自定义组件
window.vue = vue

export default vue
