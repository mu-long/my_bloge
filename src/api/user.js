import qs from 'qs'
import myAxios from './myAxios'

// 用户签到
const userSign = () => myAxios.get('/user/fav')

// 获取用户基本信息
const getUserInfo = data =>
  myAxios.get('/public/user_info?' + qs.stringify(data))

// 更新用户基本资料
const updateUserInfo = data => myAxios.post('/user/basic', data)

// 更新密码
const updatepwd = data => myAxios.post('/user/update_pwd', data)

// 更新用户邮箱
const updateEmail = data =>
  myAxios.get('/public/reset_email?' + qs.stringify(data))

/**
 * 重置密码 忘记的密码
 *
 * @param {*} data 用户信息 (邮箱 密码 验证码)
 */
const resetPwd = data => myAxios.get('/public/reset_pwd?' + qs.stringify(data))

// 上传图片
const uploadImg = formData => myAxios.post('/user/upload_img', formData)

// 新增帖子
const addPost = data => myAxios.post('/user/add_post', data)

// 编辑帖子
const editPost = data => myAxios.post('/user/edit_post', data)

// 文章点赞
const setLikePost = data => myAxios.post('/user/likePost', { ...data })

// 文章收藏
const setCollectPost = data => myAxios.post('/user/collectPost', { ...data })

// 获取用户文章列表
const getPostListByUid = data =>
  myAxios.get('/user/postList?' + qs.stringify(data))

// 删除帖子
const deletePostByUid = data =>
  myAxios.get('/user/deletePost?' + qs.stringify(data))

// 获取收藏的帖子
const getPostCollect = data =>
  myAxios.get('/user/getPostCollect?' + qs.stringify(data))

// 删除收藏的帖子
const deletePostCollect = data =>
  myAxios.get('/user/deletePostCollect?' + qs.stringify(data))

// 获取用户未读消息
const getMsg = data => myAxios.get('/user/getmsg?' + qs.stringify(data))

// 设置用户未读消息
const setMsg = data => myAxios.get('/user/setmsg?' + qs.stringify(data))

export {
  userSign,
  getUserInfo,
  updateUserInfo,
  updatepwd,
  updateEmail,
  resetPwd,
  uploadImg,
  addPost,
  editPost,
  setLikePost,
  setCollectPost,
  getPostListByUid,
  deletePostByUid,
  getPostCollect,
  deletePostCollect,
  getMsg,
  setMsg
}
