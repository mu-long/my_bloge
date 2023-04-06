import configFile from '@/config'
import store from '@/store'

// WebSocket客户端配置
class WebSocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      protocol: 'ws', // 协议
      url: configFile.wsConfig.url,
      port: configFile.wsConfig.port,
      timeInterval: 5 * 1000 // 心跳检测时间
    }

    const finalConfig = { ...defaultConfig, ...config }

    this.ws = {}
    this.protocol = finalConfig.protocol
    this.url = finalConfig.url
    this.port = finalConfig.port
    this.timer = null
    this.timeInterval = finalConfig.timeInterval
  }

  // 初始化
  init () {
    // console.log('初始化客户端webscoekt服务...')
    // 创建并配置原生 WebSocket服务 ws://127.0.0.1:3001
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    // 绑定方法
    this.ws.onopen = () => this.onOpen()
    this.ws.onmessage = msg => this.onMessage(msg)
    this.ws.onerror = () => this.onError()
    this.ws.onclose = () => this.onClose()
  }

  send (msg) {
    this.ws.send(msg)
  }

  // 监听打开连接
  onOpen () {
    // console.log('监听打开连接 ==> token', store.state.token)
    // 发送鉴权请求
    this.send(
      JSON.stringify({
        event: 'auth',
        message: 'Bearer ' + store.state.token
      })
    )
  }

  onMessage (event) {
    // 接收服务端发送过来的消息
    const msgObj = JSON.parse(event.data)

    // 判断事件类型
    switch (msgObj.event) {
      case 'auth':
        // console.log('鉴权成功')
        break
      case 'noauth':
        console.log('鉴权失败')
        // 跳转到登录页面，重新获取token
        break
      case 'heartbeat':
        // 心跳检测
        // 检查服务器连接状态
        this.checkServer()

        // 可以注释掉以下心跳状态，主动测试服务端是否会断开客户端的连接
        // 响应服务器，表示自身在线
        this.ws.send(
          JSON.stringify({
            event: 'heartbeat',
            msg: 'pong'
          })
        )
        break
      default:
        store.dispatch(msgObj.event, msgObj)
        break
    }
  }

  // 当连接失败时，触发error事件
  onError () {
    // console.log('WebSocket 连接失败')
    // 连接失败之后，1秒后进行断线重连
    setTimeout(() => {
      // console.log('WebSocket服务器连接出错，正在重新连接...')
      this.init()
    }, 2000)
  }

  // 当连接主动断开时，触发close事件
  onClose () {
    // console.log('WebSocket 连接已关闭')
    // 主动断开与服务器连接
    this.ws.close()
  }

  // 检查服务器连接状态
  checkServer () {
    // 清除定时器
    clearTimeout(this.timer)

    // 如果超时，重新建立新的连接
    this.timer = setTimeout(() => {
      console.log('正在与WebSocket服务器建立新的连接...')
      // 断开当前连接
      this.onClose()
      this.onError()
      // 设置1s的时延，调试在服务器测未及时响应时，客户端的反应
    }, this.timeInterval + 1000)
  }
}

export default WebSocketClient
