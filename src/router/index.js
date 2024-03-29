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
const AddPost = () =>
  import(/* webpackChunkname: "addPost" */ '../components/contents/AddPost.vue')
const EditPost = () =>
  import(
    /* webpackChunkname: "editPost" */ '../components/contents/EditPost.vue'
  )
const PostDetail = () =>
  import(
    /* webpackChunkname: "postDetail" */ '../components/contents/PostDetail.vue'
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
    path: '/reset_email',
    name: 'reset_email', // 重置邮箱
    component: ResetEmail
  },
  {
    path: '/reset_pwd',
    name: 'reset_pwd', // 重置密码
    component: ResetPassword
  },
  {
    path: '/addPost',
    name: 'addPost', // 新增帖子
    component: AddPost
  },
  {
    path: '/editPost/:tid',
    name: 'editPost', // 编辑帖子
    component: EditPost,
    beforeEnter (to, from, next) {
      // console.log('编辑帖子 to ==> ', to)
      // console.log('编辑帖子 from ==> ', from)
      // console.log('编辑帖子 next ==> ', next)
      const fromArr = ['postDetail', 'my_post']
      // 正常编辑帖子的情况
      if (
        to.params.post &&
        to.params.post.isEnd === 0 &&
        fromArr.indexOf(from.name) !== -1
      ) {
        next()
      } else {
        // debugger
        // 用户在edit页面刷新的情况
        const editPostData = localStorage.getItem('editPostData')

        if (editPostData && editPostData !== '') {
          const editObj = JSON.parse(editPostData)
          if (editObj.isEnd === 0) {
            next()
          } else {
            next('/')
          }
        } else {
          next('/')
        }
      }
    }
  },
  {
    path: '/postDetail/:tid',
    name: 'postDetail', // 帖子详情
    component: PostDetail
  },
  {
    // path: '/myHome/:id',
    path: '/myHome/0',
    name: 'myHome', // 我的主页
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
            path: 'updatepwd',
            name: 'updatepwd', // 修改密码
            component: UpdatePwd
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
  // console.log('to, from, next ==> ', to, from, next)
  console.log('路由守卫...')

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const token = localStorage.getItem('token')

  if (token) {
    // 获取包装的有效签名，不需要保密的私钥
    const decoded = jwt.decode(token)
    console.log('解码==>', decoded)

    // 判断登录是否过期
    if (decoded && moment().isBefore(moment(decoded.exp * 1000))) {
      console.log(
        '登录是否过期 ==>',
        !moment().isBefore(moment(decoded.exp * 1000))
      )
      // 取localStorage里面缓存的token信息 + 用户信息
      // 8-24小时， refresh token 1个月
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)

      // 初始化webscoekt服务
      console.log('store.state.ws ==>', store.state.ws)
      if (!store.state.ws) {
        console.log('初始化webscoekt服务 store.state.ws ==>', store.state.ws)
        store.commit('initWebSocket', {})
      }
    } else {
      // 如果当前时间 不在过期时间之前 或者没有登录 清空登录信息
      console.log('登录过期...！')
      window.vue.$pop({ msg: '登录已过期！请重新登录...' })

      localStorage.clear()
      next('/login')
      setTimeout(() => {
        window.location.reload()
      }, 500)
      // return
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    console.log('isLogin ==>', isLogin)

    if (isLogin) {
      next()
    } else {
      // 未登录的状态
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
