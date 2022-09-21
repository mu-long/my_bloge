// content 首页内容相关
import store from '@/store'
import qs from 'qs'
import myAxios from './myAxios'

// 添加评论
const addPostComments = data => myAxios.post('/comments/reply', { ...data })

// 更新评论
const updatePostComment = data => myAxios.post('/comments/update', { ...data })

// 删除评论
const deletePostComment = data => myAxios.post('/comments/delete', { ...data })

// 设置采纳评论
const setAdoptComment = data => myAxios.post('/comments/adopt', { ...data })

// 评论点赞
const setLikeComment = data => myAxios.post('/comments/like', { ...data })

/**
 * 获取评论列表
 */
const getPostComments = params => {
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
  console.log('params ==> ', qs.stringify(params))
  return myAxios.get(`/public/postComments?${qs.stringify(params)}`, headers)
}

/**
 * 获取子评论列表
 *
 * @param {Object} options 接口参数
 */
const getChlidComments = options => {
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
  return myAxios.get(`/public/childComments?${qs.stringify(options)}`, headers)
}

export {
  addPostComments,
  getPostComments,
  getChlidComments,
  updatePostComment,
  deletePostComment,
  setAdoptComment,
  setLikeComment
}
