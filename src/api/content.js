// content 首页内容相关
import qs from 'qs'
import myAxios from './myAxios'

/**
 * 读取文章列表
 *
 * @param {Object} options 接口参数
 */
const getList = options => myAxios.get(`/public/list?${qs.stringify(options)}`)
// myAxios.get(`/public/getList?${qs.stringify(options)}`).then(result => result)

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

export { getList, getTips, getLinks, getTop }
