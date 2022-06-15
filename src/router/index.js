import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Login from '../views/Login.vue'
const Test = () => import(/* webpackChunkname: "Test" */ '../views/Test.vue')
const Login = () => import(/* webpackChunkname: "login" */ '../views/Login.vue')
const Logon = () => import(/* webpackChunkname: "logon" */ '../views/Logon.vue')
const Forget = () =>
  import(/* webpackChunkname: "forget" */ '../views/Forget.vue')
const Index = () =>
  import(/* webpackChunkname: "channels-index" */ '../views/channels/Index.vue')
const Template1 = () =>
  import(/* webpackChunkname: "template1" */ '../views/channels/Template1.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/',
    redirect: '/index', // 路由重定向
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog', // 目录
        component: Template1
      }
    ]
  },
  {
    path: '/login',
    name: 'login', // 登录
    component: Login
  },
  {
    path: '/logon',
    name: 'logon', // 注册
    component: Logon
  },
  {
    path: '/forget',
    name: 'forget', // 忘记密码
    component: Forget
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
