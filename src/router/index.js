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
const ResetEmail = () =>
  import(/* webpackChunkname: "reset_email" */ '../views/Reset_email.vue')
const ResetPassword = () =>
  import(/* webpackChunkname: "reset_pwd" */ '../views/Reset_pwd.vue')
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
const UpdatePwd = () =>
  import(
    /* webpackChunkname: "updatePwd" */ '../components/user/common/UpdatePwd.vue'
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
    redirect: '/index', // ???????????????
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog', // ??????
        component: Template1
      }
    ]
  },
  {
    path: '/login',
    name: 'login', // ??????
    component: Login
  },
  {
    path: '/logon',
    name: 'logon', // ??????
    component: Logon
  },
  {
    path: '/forget',
    name: 'forget', // ????????????
    component: Forget
  },
  {
    path: '/reset_email',
    name: 'reset_email', // ????????????
    component: ResetEmail
  },
  {
    path: '/reset_pwd',
    name: 'reset_pwd', // ????????????
    component: ResetPassword
  },
  {
    // path: '/myHome/:id',
    path: '/myHome/0',
    name: 'myHome', // ????????????
    props: true,
    component: MyHome
  },
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '',
        name: 'center', // ????????????
        component: UserCenter,
        // ?????????????????????????????????????????????
        meta: { requiresAuth: true }
      },
      {
        path: 'msg',
        name: 'msg', // ????????????
        component: UserMsg
      },
      {
        path: 'posts',
        // name: 'posts', // ????????????
        component: UserPosts,
        children: [
          {
            path: '',
            name: 'my_post', // ????????????
            component: MyPost
          },
          {
            path: 'my_collection',
            name: 'my_collection', // ????????????
            component: MyCollection
          }
        ]
      },
      {
        path: 'settings',
        // name: 'settings', // ????????????
        component: UserSettings,
        children: [
          {
            path: '',
            name: 'myinfo', // ????????????
            component: MyInfo
          },
          {
            path: 'picupload',
            name: 'picupload', // ????????????
            component: PicUpload
          },
          {
            path: 'updatepwd',
            name: 'updatepwd', // ????????????
            component: UpdatePwd
          },
          {
            path: 'accounts',
            name: 'accounts', // ????????????
            component: Accounts
          }
        ]
      },
      {
        path: 'others',
        name: 'others', // ????????????
        component: UserOthers
      }
    ]
  },
  {
    path: '/404',
    name: '404', // ?????????
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

// ??????????????????
router.beforeEach((to, from, next) => {
  console.log('????????????...')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('to, from, next ==> ', to, from, next)
    const isLogin = store.state.isLogin
    // console.log('isLogin==>', isLogin)
    const token = store.state.token
    // ??????????????????????????????????????????????????????
    const decoded = jwt.decode(token)
    // console.log('??????==>', decoded)
    if (!decoded) {
      return next('/')
    }
    console.log(
      '?????????????????? ==>',
      !moment().isBefore(moment(decoded.exp * 1000))
    )
    // ?????????????????? ???????????????????????? ??????????????????
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
