// content 首页内容相关
import store from '@/store'
import qs from 'qs'
import myAxios from './myAxios'

/**
 * 读取文章列表
 *
 * @param {Object} options 接口参数
 */
const getPostList = options =>
  myAxios.get(`/public/postList?${qs.stringify(options)}`)

/**
 * 获取文章详情
 */
const getPostDetail = tid => {
  // 因为是公共路径 查询需要登录才能查看的信息，需要携带 token
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return myAxios.get(`/public/postDetail?tid=${tid}`, headers)
}

/**
 * 温馨通道
 */
const getTips = () => myAxios.get('/public/tips')

/**
 * 友情链接
 */
const getLinks = () => myAxios.get('/public/links')

/**
 * 本周热议
 */
const getTop = () => myAxios.get('/public/topWeek')

export { getPostList, getPostDetail, getTips, getLinks, getTop }
