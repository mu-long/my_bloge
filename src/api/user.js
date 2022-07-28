import qs from 'qs'
import myAxios from './myAxios'

// 用户签到
const userSign = () => myAxios.get('/user/fav')

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

export { userSign, updateUserInfo, updatepwd, updateEmail, resetPwd, uploadImg }
