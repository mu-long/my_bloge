import { baseURL } from '@/config'
import axios from 'axios'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 使用自定义配置 创建一个新的axios实例
const instance = axios.create({
  // 配置请求根路径
  baseURL: process.env.NODE_ENV !== 'production' ? baseURL.dev : baseURL.pro,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 10000 // 超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求之前触发
    // 进度条开始
    NProgress.start()

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
