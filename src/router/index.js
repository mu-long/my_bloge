import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login.vue'
const Test = () => import(/* webpackChunkname: "Test" */ '../views/Test.vue')
const Login = () => import(/* webpackChunkname: "login" */ '../views/Login.vue')
const Logon = () => import(/* webpackChunkname: "logon" */ '../views/Logon.vue')
const Forget = () =>
  import(/* webpackChunkname: "forget" */ '../views/Forget.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logon',
    name: 'logon',
    component: Logon
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

const router = new VueRouter({
  routes
})

export default router
