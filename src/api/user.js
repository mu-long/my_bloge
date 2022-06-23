import store from '../store'
import myAxios from './myAxios'

// 用户签到
const userSign = () => {
  const headers = {
    Authorization: 'Bearer ' + store.state.token,
    'Content-Type': 'application/json'
  }

  return myAxios.get('/user/fav', { headers })
}

export { userSign }
