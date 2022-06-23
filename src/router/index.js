import jwt from 'jsonwebtoken'
import moment from 'moment'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

const Test = () => import(/* webpackChunkname: "Test" */ '../views/Test.vue')
const Login = () => import(/* webpackChunkname: "login" */ '../views/Login.vue')
const Logon = () => import(/* webpackChunkname: "logon" */ '../views/Logon.vue')
const Forget = () =>
  import(/* webpackChunkname: "forget" */ '../views/Forget.vue')
const Index = () =>
  import(/* webpackChunkname: "channels-index" */ '../views/channels/Index.vue')
const Template1 = () =>
  import(/* webpackChunkname: "template1" */ '../views/channels/Template1.vue')
const MyHome = () =>
  import(/* webpackChunkname: "myHome" */ '../views/MyHome.vue')
const Center = () =>
  import(/* webpackChunkname: "center" */ '../views/Center.vue')
const UserCenter = () =>
  import(/* webpackChunkname: "user_center" */ '../components/user/Center.vue')
const UserMsg = () =>
  import(/* webpackChunkname: "user_msg" */ '../components/user/Msg.vue')
const UserOthers = () =>
  import(/* webpackChunkname: "user_others" */ '../components/user/Others.vue')
const NoFound = () =>
  import(/* webpackChunkname: "404" */ '../views/NoFound.vue')
const UserPosts = () =>
  import(/* webpackChunkname: "user_posts" */ '../components/user/Posts.vue')
const MyPost = () =>
  import(
    /* webpackChunkname: "my_post" */ '../components/user/common/MyPost.vue'
  )
const MyCollection = () =>
  import(
    /* webpackChunkname: "my_collection" */ '../components/user/common/MyCollection.vue'
  )
const UserSettings = () =>
  import(
    /* webpackChunkname: "user_settings" */ '../components/user/Settings.vue'
  )
const MyInfo = () =>
  import(
    /* webpackChunkname: "myinfo" */ '../components/user/common/MyInfo.vue'
  )
const PicUpload = () =>
  import(
    /* webpackChunkname: "picupload" */ '../components/user/common/PicUpload.vue'
  )
const ResetPwd = () =>
  import(
    /* webpackChunkname: "resetpwd" */ '../components/user/common/ResetPwd.vue'
  )
const Accounts = () =>
  import(
    /* webpackChunkname: "accounts" */ '../components/user/common/Accounts.vue'
  )

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
  },
  {
    // path: '/myHome/:id',
    path: '/myHome/0',
    name: 'myHome', // 忘记密码
    props: true,
    component: MyHome
  },
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '',
        name: 'center', // 用户中心
        component: UserCenter,
        // 只有经过身份验证的用户才能访问
        meta: { requiresAuth: true }
      },
      {
        path: 'msg',
        name: 'msg', // 我的消息
        component: UserMsg
      },
      {
        path: 'posts',
        // name: 'posts', // 我的帖子
        component: UserPosts,
        children: [
          {
            path: '',
            name: 'my_post', // 我的帖子
            component: MyPost
          },
          {
            path: 'my_collection',
            name: 'my_collection', // 我的收藏
            component: MyCollection
          }
        ]
      },
      {
        path: 'settings',
        // name: 'settings', // 基础设置
        component: UserSettings,
        children: [
          {
            path: '',
            name: 'myinfo', // 我的资料
            component: MyInfo
          },
          {
            path: 'picupload',
            name: 'picupload', // 修改头像
            component: PicUpload
          },
          {
            path: 'resetpwd',
            name: 'resetpwd', // 修改密码
            component: ResetPwd
          },
          {
            path: 'accounts',
            name: 'accounts', // 账号绑定
            component: Accounts
          }
        ]
      },
      {
        path: 'others',
        name: 'others', // 其它设置
        component: UserOthers
      }
    ]
  },
  {
    path: '/404',
    name: '404', // 未找到
    component: NoFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('路由守卫...')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('to, from, next ==> ', to, from, next)
    const isLogin = store.state.isLogin
    // console.log('isLogin==>', isLogin)
    const token = store.state.token
    // 获取包装的有效签名，不需要保密的私钥
    const decoded = jwt.decode(token)
    // console.log('解码==>', decoded)
    console.log(
      '登录是否过期 ==>',
      !moment().isBefore(moment(decoded.exp * 1000))
    )
    // 如果当前时间 不在过期时间之前 清空登录信息
    if (!moment().isBefore(moment(decoded.exp * 1000))) {
      store.commit('setUserInfo', '')
      store.commit('setToken', '')
      store.commit('setIsLogin', false)
      localStorage.clear()
      return next('/login')
    }
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
