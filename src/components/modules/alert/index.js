import AlertComponent from './Alert.vue'

// 初始化组件
const Alert = {}

// 注册组件 绑定 install 方法
Alert.install = Vue => {
  // 创建构造器
  // 使用 Vue.extend 来创建全局的Vue组件
  const AlertConstructor = Vue.extend(AlertComponent)
  // 创建实例 (instance 实例)
  const instance = new AlertConstructor()
  // 把实例挂载到一个元素上
  instance.$mount(document.createElement('div.msg'))
  // 动态添加到body
  document.body.appendChild(instance.$el)

  // 添加实例方法
  // 信息弹框 (vue.$alert('我是标题'))
  Vue.prototype.$alert = msg => {
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }
  // 迷你弹框 (vue.$mini('我是标题'))
  Vue.prototype.$mini = msg => {
    instance.type = 'mini'
    instance.msg = msg
    instance.isShow = true
    instance.time = 3
  }
  // 确认弹框 (vue.$confirm('我是标题','确定', '取消'))
  Vue.prototype.$confirm = (msg, sure, cancel) => {
    instance.type = 'confirm' // 弹框类型
    instance.msg = msg // 提示信息
    instance.isShow = true // 是否显示弹框
    // typeof sure !== 'undefined'
    if (typeof sure === 'function') {
      instance.sure = sure // 确定
    }
    if (typeof cancel === 'function') {
      instance.cancel = cancel // 取消
    }
  }
}

export default Alert
