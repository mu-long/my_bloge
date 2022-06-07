import myAxios from './myAxios'

/**
 * 获取验证码 `/getCaptcha?sid=${sid}`
 *
 * @param {*} sid 唯一标识
 */
const getCaptcha = sid =>
  myAxios
    .get('/public/getCaptcha', {
      params: { sid }
    })
    .then(result => result)

/**
 * 重置 找回密码
 *
 * @param {*} option 用户信息 (邮箱 验证码)
 */
const forget = option => myAxios.post('/forget', { ...option })

/**
 * 登录接口
 *
 * @param {*} loginInfo 用户登录信息
 */
const login = loginInfo => myAxios.post('/login/login', { ...loginInfo })

/**
 * 注册接口
 *
 * @param {*} logonInfo 注册信息
 */
const logon = logonInfo => myAxios.post('/login/logon', { ...logonInfo })

export { getCaptcha, forget, login, logon }
