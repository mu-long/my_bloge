// 创建UUID（ES6模块语法）
import { v4 as uuidv4 } from 'uuid'
import store from '../store/index'

const getSid = () => {
  let sid = ''
  // 从浏览器获取
  if (localStorage.getItem('sid')) {
    sid = localStorage.getItem('sid')
  } else {
    // 生成唯一标识符uuid
    sid = uuidv4()
    localStorage.setItem('sid', sid)
  }

  // 在vuex中存储sid
  store.commit('setSid', sid)

  return sid
}

export { getSid }
