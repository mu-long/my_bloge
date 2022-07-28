import { baseURL, publicPath } from '@/config'
import axios from 'axios'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'

// 定义取消请求令牌
const CancelToken = axios.CancelToken
// 待处理
const pending = {}

/**
 * 取消待处理请求
 *
 * @param {*} key 请求标识
 * @param {boolean} [isRequest=false] 是否是请求
 */
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    // 调用取消函数方法
    pending[key]('取消重复请求！')
  }
  // 删除对象的属性值
  delete pending[key]
}

// 使用自定义配置 创建一个新的axios实例
const instance = axios.create({
  // 配置请求根路径
  baseURL: process.env.NODE_ENV !== '"production"' ? baseURL.dev : baseURL.pro,
  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8'
  // },
  timeout: 20000 // 超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求之前触发
    // 进度条开始
    NProgress.start()

    // 判断是否为公共路径
    let isPublic = false
    publicPath.map(path => {
      isPublic = isPublic || path.test(config.url)
    })
    const token = store.state.token
    // 如果是私有路径携带token
    if (!isPublic && token) {
      config.headers.Authorization = 'Bearer ' + store.state.token
    }

    // 拦截重复请求
    config.cancelToken = new CancelToken(c => {
      const key = config.url + '&' + config.method
      removePending(key, true)
      // 执行函数接收一个 取消函数 作为参数
      pending[key] = c // 每个请求都有一个取消函数
    })

    console.log('请求配置选项:', config)
    return config
  },
  error => {
    // 请求出错触发
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 响应成功触发
    // 任何处于2xx范围内的状态代码都会导致此函数触发
    // 进度条结束
    NProgress.done()

    // 响应成功后调用取消请求函数
    const key = response.config.url + '&' + response.config.method
    removePending(key)

    console.log('响应成功:', response)
    return Promise.resolve(response.data)
  },
  error => {
    // 响应出错触发
    // 任何超出此范围的状态代码的2XX原因此功能可触发
    // 进度条结束
    NProgress.done()

    // 提示信息
    // console.log('响应错误:', error)
    return Promise.reject(error)
  }
)

export default instance
